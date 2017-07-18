import React, { Component } from 'react';
import axios from 'axios'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   // Redirect
// } from "react-router-dom"
import VideoShow from './VideoShow'

class VideoIndex extends Component{
	constructor(props) {
    super(props);
    this.state={
      challenges:[]
    } 
  }
  componentDidMount() {
   axios.get("http://localhost:3001/api/challenge/video").then((res)=>{
      this.setState({
        challenges: res.data
      })
   }).catch(function (error) {
    	console.log(error);
  	})
  }
	render() {
		let contests = this.state.challenges.map((contest,idx)=>{
			return(
						<div key={idx}>
							<Link to={{ pathname:"/Video/"+contest._id}}>
								<h3>{contest.title}</h3>
								<p>Created By: {contest.creator}</p>
							</Link>
						</div>
				)
		})
		return (
			<Router>
			<div>

				<h1>Im the video index page</h1>
				<h3>'m a comp</h3>
					{contests}

				<Route 
          			path="/Video/comp"
          			render={()=>{

            		return <VideoShow />
          		}}
          		
        		/>
			</div>
			</Router>
		);
	}
}

export default VideoIndex