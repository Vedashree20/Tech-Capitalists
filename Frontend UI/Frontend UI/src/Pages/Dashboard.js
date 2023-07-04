import React from 'react';
import '../App.css';
import { Card, CardContent, Typography } from '@material-ui/core';
import { BarChart } from '@material-ui/icons';

function Dashboard() {
  return (
    <div className='container2' style={{height: "100vh"}}>
      <div className='heading'>Dashboard</div>
      <div className='subheading'>Overview</div>
      <div style={{display: "flex",}}><div className='card1'><Card style={{width: 250, height: 150, backgroundColor: "white",}}>
          <CardContent>
            <Typography style={{fontSize: 30}}><BarChart /> <div>xxxx</div></Typography>
          </CardContent>
        </Card></div>
        <div className='card1'><Card style={{width: 250, height: 150, backgroundColor: "white",}}>
          <CardContent>
            <Typography style={{fontSize: 30}}><BarChart /> <div>xxxx</div></Typography>
          </CardContent>
        </Card></div>
        <div className='card1'><Card style={{width: 250, height: 150, backgroundColor: "white",}}>
          <CardContent>
            <Typography style={{fontSize: 30}}><BarChart /> <div>xxxx</div></Typography>
          </CardContent>
        </Card></div>
        <div className='card1'><Card style={{width: 250, height: 150, backgroundColor: "white",}}>
          <CardContent>
            <Typography style={{fontSize: 30}}><BarChart /> <div>xxxx</div></Typography>
          </CardContent>
        </Card></div>
        </div>
      
    </div>
  )
}

export default Dashboard