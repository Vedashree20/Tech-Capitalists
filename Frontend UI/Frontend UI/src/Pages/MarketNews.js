import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CardActions,CardMedia,Button } from '@material-ui/core';
import { FormatAlignLeft } from '@material-ui/icons';


function MarketNews() {
  const [data,setData] = useState([])
  const options = {
    method: 'GET',
    url: 'https://share-market-news-api-india.p.rapidapi.com/marketNews',
    headers: {
      'X-RapidAPI-Key': '9c3006884amshaf4b18e6f292650p1a706bjsna7058c253986',
      'X-RapidAPI-Host': 'share-market-news-api-india.p.rapidapi.com'
    }
  }; 

  useEffect(()=>{
    getnews();
  },[]);
  
  const getnews=()=>{
    axios.request("https://newsapi.org/v2/top-headlines?q=stock&country=in&apiKey=37986c58bbfc41f9b5aa9380585efa85")
    .then((response)=>{
      // console.log(response);
      setData(response.data.articles)
    })
    
  }

  return (
    <>
    {/* <div>
      <button onClick={getnews}>Get News</button>
    </div> */}
    <div className='container2' style={{height: "100vh"}}>
      <div className='heading'>Market News</div>
      <div className='subheading'>Latest News</div>
      <div className='flex-container3'>
        {
          data.map((value)=>{
            return(
              // <div className='flex-container3' >
              <div className='card2'>
              <Card style={{width:300,height:400,backgroundColor:"white",borderRadius:20}}>
                <img src={value.urlToImage} alt='Test' style={{height: 250,
               width: 280, borderRadius: 17, marginTop:10}}/>
                <CardContent>
                  <Typography variant="body2" align='left' style={{color: "text.secondary", wordBreak:"break-all",overflow:"hidden",maxHeight:60}}>
                    {value.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <a href={value.url} target='blank'><Button size="small" style={{marginLeft:10,marginTop:-6}}>Read More</Button></a>
                </CardActions>
              </Card>
            </div>
            // </div>
            )
          })
        }

       
      </div>
      
    </div>
    </>
    
  )
}

export default MarketNews