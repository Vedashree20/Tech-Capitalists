import json
import socket
import subprocess

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

java_command = 'java -Ddebug=true -Dspeed="2.0" -classpath C:\\feed-play-1.0.jar\\ hackathon.player.Main C:\\dataset.csv 9011'

process = subprocess.Popen(java_command, stdout=subprocess.PIPE, shell=True)

output_dict = {}

with open('output1.txt', 'a') as file:
           file.write('')

try:
    for line in iter(process.stdout.readline, b''):
        line = line.decode('utf-8').strip()
        if ':' in line:
            key, value = line.split(':', 1)
            output_dict[key.strip()] = value.strip()
        print(line)
        json_data = json.dumps(line, indent=4)
        with open('output1.txt', 'a') as file:
             file.write(json_data)

finally:
    process.kill()
    sock.close()

# json_data = json.dumps(output_dict, indent=4)

# with open('output1.json', 'w') as file:
#     file.write(json_data)