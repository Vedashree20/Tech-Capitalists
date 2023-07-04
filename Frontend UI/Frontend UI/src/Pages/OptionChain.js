import React, { useState, useEffect } from "react";
import '../App.css'
// import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer } from 'mdb-react-ui-kit';
import { io } from 'socket.io-client';
const socket = io('ws://localhost:50000');



function OptionChain() {
  const [msg, setMsg] = useState([]);
  const [ind_underlying, setIndex] = useState(188400);
  const [symbolvalue, setSymbolValue] = useState("MAINIDX");
  const [expirydatevalue, setExpiryDateValue] = useState("");
  const [sortedData, setSortedData] = useState([]);

  const symbols = ['MAINDIX', 'ALLBANKS', 'FINANCIALS', 'MIDCAP'];

  socket.on('connect', function() {
    socket.emit('my_event', {data: 'I\'m connected!'});
  });



  useEffect(() => {
    socket.on('my_response', function(data, cb) {
      // $('#log').append('<br>' + $('<div/>').text('Received ' + msg.option + '  ' + msg.underlying + '  ' + msg.expiry+ '  ' + msg.OI + '  ' + msg.ChangeInOI+ '  ' + msg.Volume + '  ' + msg.IV+ '  ' + msg.LTP + '  ' + msg.ChangeInLTP + '  ' + msg.BidQuantity+ '  ' + 
      // msg.Bid + '  ' + msg.AskQuantity+ '  ' + msg.Ask + '  ' + msg.strike ).html());
      
      setMsg((prevMsg) => {
        const existingIndex = prevMsg.findIndex((item) => item.strike === data.strike && item.option == data.option);
        if (existingIndex !== -1) {
          const updatedMsg = [...prevMsg];
          updatedMsg[existingIndex] = data;
          setSortedData(updatedMsg.sort((a, b) => a.strike - b.strike));
          return updatedMsg;
        } else {
          const filteredMsg = prevMsg.filter(
            (item) => (symbolvalue === "" || item.underlying === symbolvalue) && (expirydatevalue === "" || item.expiry === expirydatevalue)
          );
          const updatedMsg = [...filteredMsg, data];
          setSortedData(updatedMsg.sort((a, b) => a.strike - b.strike));
          return updatedMsg;
        }
      });
      if (cb)
          cb();
      });
  }, [symbolvalue, expirydatevalue])

  

  useEffect(() => {
    setMsg([]);
  }, [symbolvalue, expirydatevalue]);
  
  useEffect(() => {
    let ind_underlying = 188840;
    msg.forEach(record => {
      if(record.option === null) {
        ind_underlying = record.LTP;
      }
    })
    setIndex(ind_underlying);
    }, [msg]);

   
  const expirydates = Array.isArray(msg) ? msg.map((record) => record.expiry) : [];

  return (
    <MDBContainer>
        <div className='heading'>Option Chain</div>
        <div style={{marginTop: "50px"}}>
          <div className='cont1'><MDBRow>
              <MDBCol size="3">
              <h8>View Options Contracts For:</h8>
              <select style={{width: "80%", borderRadius: "7px", height: "37px"}} onChange={(e) => setSymbolValue(e.target.value)} value={symbolvalue}>
                {symbols.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </MDBCol>
            <MDBCol size="3">
              <h8>Select Expiry Date:</h8>
              <select style={{width: "80%", borderRadius: "7px", height: "37px"}} onChange= {(e) => setExpiryDateValue(e.target.value)} value={expirydatevalue}>
                <option value='none'>Select</option>
                {expirydates.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select></MDBCol>
          </MDBRow></div>
        </div>
        <div style={{marginTop: "30px"}}>
          <MDBCol size="5">
            <h9>Underlying Index: <b>{symbolvalue}</b><span style={{marginLeft: "5px", fontSize: "small"}}>{ind_underlying}</span></h9>
          </MDBCol>
          <MDBCol size="10">
            <h10><u>In The Money is defined by Grey</u></h10>
          </MDBCol>
          <MDBCol size="10">
            <h10><u>Out The Money is defined by White</u></h10>
          </MDBCol>
        </div>
        <div style={{marginTop: "10px", marginLeft: "-17px"}}>
          <MDBRow>
            <MDBCol size="12">
              <MDBTable className='table table-bordered'>
                <MDBTableHead dark className='text-center mb-0'>
                  <tr>
                    <th scope='col'>Option</th>
                    {/* <th scope='col'>Underlying</th> */}
                    <th scope='col'>OI</th>
                    <th scope='col'>Change In OI</th>
                    <th scope='col'>Volume</th>
                    <th scope='col'>IV</th>
                    <th scope='col'>LTP</th>
                    <th scope='col'>Change In LTP</th>
                    <th scope='col'>Bid Qty</th>
                    <th scope='col'>Bid</th>
                    <th scope='col'>Ask Qty</th>
                    <th scope='col'>Ask</th>
                    <th scope='col'>Strike Price</th>
                    
                  </tr>
                </MDBTableHead>
                {Array.isArray(msg) && msg.length > 0 ? (
                msg.slice(0, 50).map((item, index) => {
                  let rowbg = "white";
                  let col = "black";
                  let bg_option = "orange";
                  let col_option = "white";
                  if (item.option === "CE" && item.strike < 188840){
                    rowbg = "#757b82";
                    col = "white";
                  } else if (item.option === "PE" && item.strike > 188840) {
                    rowbg = "#757b82";
                    col = "white";
                  }

                  if (item.option === "CE") {
                    bg_option = "#6deeff";
                    col_option = "black";
                  }

                  return (
                    <MDBTableBody key={index} className='text-center mb-0'>
                    <tr style={{ backgroundColor: rowbg, color: col}}>
                      <td style={{backgroundColor: bg_option, color: col_option}}>{item.option}</td>
                      {/* <td>{item.underlying}</td> */}
                      <td>{item.OI}</td>
                      <td>{item.ChangeInOI}</td>
                      <td>{item.Volume}</td>
                      <td>{item.IV}</td>
                      <td>{item.LTP}</td>
                      <td>{item.ChangeInLTP}</td>
                      <td>{item.BidQuantity}</td>
                      <td>{item.Bid}</td>
                      <td>{item.AskQuantity}</td>
                      <td>{item.Ask}</td>
                      <td>{item.strike}</td>
                    </tr>
                  </MDBTableBody>
                  )

                  
              })
              ) : (
                <MDBTableBody className='align-center mb-0'>
                  <tr>
                    <td colSpan={14} className='text-center mb-0'>No Data Found</td>
                  </tr>
                </MDBTableBody>
              )}
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
  )
}

export default OptionChain
