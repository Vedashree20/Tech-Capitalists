import React from 'react';
import '../App.css';

function AboutUs() {
  return (
    <div className='container2'>
      <div className='heading'>About Us</div>
      <div className='subheading2'>Our Team</div>
      <div className='flex-container'>
        <img src='' alt='A' width='200' height='200'></img>
        <img src='' alt='B' width='200' height='200'></img>
        <img src='' alt='C' width='200' height='200'></img>
      </div>
      <div className='flex-container2'>
        <img style={{marginLeft: '27%'}} src='' alt='D' width='200' height='200'></img>
        <img  style={{marginLeft: '14%'}} src='' alt='E' width='200' height='200'></img>
      </div>
    </div>
  )
}

export default AboutUs