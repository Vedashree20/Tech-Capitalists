from threading import Lock
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import subprocess
import json
from engineio.payload import Payload
Payload.max_decode_packets = 5000
from datetime import datetime,timedelta
from py_vollib.black_scholes.implied_volatility import implied_volatility
from scipy.stats import norm
from scipy.optimize import brentq
import numpy as np


async_mode = None

app = Flask(__name__)
socketio = SocketIO(app, async_mode=async_mode,cors_allowed_origins="*")
thread = None
thread_lock = Lock()

global mp_ALLBANKS
global mp_FINANCIALS
global mp_MAINIDX
global mp_MIDCAPS

mp_ALLBANKS=4398250/100
mp_MAINIDX=1854880/100
mp_MIDCAPS=785650/100
mp_FINANCIALS=1940360/100
global mp_dict
mp_dict={"ALLBANKS":mp_ALLBANKS,"FINANCIALS":mp_FINANCIALS,"MIDCAPS":mp_MIDCAPS,"MAINIDX":mp_MAINIDX}


def getsymbol(symbol,data):
    i = 1
    underlying = ""
    expiry = None
    strike = None
    option = None
    while symbol[i].isalpha():
        underlying += symbol[i]
        i += 1
    underlying = underlying.strip()
    if len(symbol) > 15:
        expiry = symbol[i:i+7].strip()
        strike = symbol[i+7:-3].strip()
        option = symbol[-3:-1].strip()
    else:
        if symbol=="ALLBANKS" :
             mp_ALLBANKS=float(data["LTP"])/100
        if symbol=="FINANCIALS":
            mp_FINANCIALS=float(data["LTP"])/100
        if symbol=="MIDCAPS":
            mp_MIDCAPS=float(data["LTP"])/100
        if symbol=="MAINIDX":
            mp_MAINIDX=float(data["LTP"])/100


    return underlying, expiry, strike, option

def preprocess(line):
    data = {}
    desired = line[22:-1]
    field = [item.strip() for item in desired.split(',')]
    for items in field:
        key, value = items.strip().split('=')
        data[key] = value
        if key == 'symbol':
            result = getsymbol(value,line)
            underlying, expiry, strike, option = result
            data["underlying"] = underlying
            data["expiry"] = expiry
            data["strike"] = strike
            data["option"] = option
            continue
        data[key] = value
    return data

def calculateIV(data):
    if data['strike']==None or data['strike']=='0' or data['option']==None:
        return 0
    price=float(data["LTP"])
    K=float(data['strike'])
    S=mp_dict[data["underlying"]]
    r=0.5
    tp=data['timestamp']
    tp = tp[4:11] + tp[-4:]+tp[10:19]
    t1=datetime.strptime(tp, "%b %d %Y %H:%M:%S")
    exp=data["expiry"]+" 15:30:00"
    t2=datetime.strptime(exp, "%d%b%y %H:%M:%S")
    t=(t2-t1)/timedelta(days=1)/365
    flag='c'
    if data['option']=="PE":
        flag='p'
    def black_scholes(sigma):
        d1 = (1 / (sigma * (t ** 0.5))) * (np.log(S / K) + (r + 0.5 * sigma ** 2) * t)
        d2 = d1 - sigma * (t ** 0.5)
        
        if flag == 'c':
            option_price = S * norm.cdf(d1) - K * np.exp(-r * t) * norm.cdf(d2) - price
        else:
            option_price = K * np.exp(-r * t) * norm.cdf(-d2) - S * norm.cdf(-d1) - price

        return option_price
    implied_volatility = brentq(black_scholes, 0, 1)

    return implied_volatility(price,S,K,t,r,flag)

def getDate(s):
    from datetime import datetime
    if s is not None:
        s = s + " " + "15:30"
        date_obj = datetime.strptime(s, '%d%b%y %H:%M')
        formatted_date = date_obj.strftime('%Y-%m-%d %H:%M')
        return formatted_date
    else:
        return None

def tablevalues(data):
    table_dict = {}
    table_dict["symbol"]=data["symbol"]
    table_dict["option"] = data["option"]
    table_dict["underlying"] = data["underlying"]
    table_dict["expiry"] = getDate(data["expiry"])
    table_dict["OI"] = int(data["openInterest"]) 
    table_dict["ChangeInOI"] = int(data["openInterest"]) - int(data["prevOpenInterest"])
    table_dict["Volume"] = int(data["totalTradedVolume"])
    table_dict["IV"] = calculateIV(data)
    table_dict["LTP"] = float(data["LTP"])/100
    if data["prevClosePrice"]=='0':
        table_dict["ChangeInLTP"] = ((float(data["LTP"])/100) - (float(data["prevClosePrice"])/100))
    else:
        table_dict["ChangeInLTP"] = ((float(data["LTP"])/100) - (float(data["prevClosePrice"])/100))*100/(float(data["prevClosePrice"])/100)
    table_dict["BidQuantity"] = int(data["bestBidQty"])  
    table_dict["Bid"] = float(data["bestBid"])/100
    table_dict["AskQuantity"] = int(data["bestAskQty"])  
    table_dict["Ask"] = float(data["bestAsk"])/100  
    if data['strike']!=None:
        table_dict["strike"] = float(data["strike"])/100
    else:
        table_dict["strike"] = data["strike"]
    table_dict["marketprice"]=float(mp_dict[data["underlying"]])
    return table_dict

def read_json_file(file_path):
    with open(file_path, 'r') as file:
        try:
            data_list = json.load(file)
        except json.JSONDecodeError:
            data_list = []
    return data_list

def write_json_file(file_path, data_list):
    with open(file_path, 'w') as file:
        json.dump(data_list, file, indent=4)

def update_json_data(file_path, received_data):
    data_list = read_json_file(file_path)
    symbol = received_data["symbol"]
    existing_object = next((obj for obj in data_list if obj["symbol"] == symbol), None)
        
    if existing_object:
        existing_object.update(received_data)
    else:
        data_list.append(received_data)

    write_json_file(file_path, data_list)

def background_thread():
    output_dict={}
    java_command = 'java -Ddebug=true -Dspeed="2.0" -classpath C:\\Users\\mihik\\Downloads\\feed-play-1.0.jar\\ hackathon.player.Main C:\\Users\\mihik\\Downloads\\dataset.csv 4500'
    process = subprocess.Popen(java_command, stdout=subprocess.PIPE, shell=True)
    for line in iter(process.stdout.readline, b''):
        socketio.sleep(5)
        line = line.decode('utf-8').strip()
        if ':' in line:
            key, value = line.split(':', 1)
            output_dict[key.strip()] = value.strip()
        line = preprocess(line)
        line = tablevalues(line)
        latest_data = line
        socketio.emit('my_response',{'option':latest_data['option'],'underlying': latest_data['underlying'], 'expiry': latest_data['expiry'], 'OI':latest_data['OI'], 'ChangeInOI': latest_data['ChangeInOI'], 'Volume': latest_data['Volume'], 'IV': latest_data['IV'], 'LTP': latest_data['LTP'], 'ChangeInLTP': latest_data['ChangeInLTP'], 'BidQuantity': latest_data['BidQuantity'], 'Bid':latest_data['Bid'], 'AskQuantity': latest_data['AskQuantity'], 'Ask':latest_data['Ask'], 'strike': latest_data['strike']})

@socketio.event
def connect():
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)

if __name__ == '__main__':
    socketio.run(app,port=50000)