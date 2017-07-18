import React, { Component } from 'react';
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link,
//   // Redirect
} from "react-router-dom"
import PhotoShow from './PhotoShow'


class PhotoIndex extends Component{
	constructor(props) {
    super(props);
    this.state={
      challenges:[]
    } 
    this.entries = this.entries.bind(this)
  }
  componentDidMount() {
   axios.get("http://localhost:3001/api/challenge/photo").then((res)=>{
      this.setState({
        challenges: res.data
      })
   }).catch(function (error) {
    	console.log(error);
  	})
  }
  entries(contest){
  	return contest.submissions
  }


	render() {
		let contests = this.state.challenges.map((contest,idx)=>{
			// console.log(contest)
			return(
				<div key={idx}>
					<Link to={{ pathname:"contest"}}>
						<h3>{contest.title}</h3>
						<p>Created By: {contest.creator}</p>
					</Link>
					<Route 
						path="/contest"
						render={()=>{
							<PhotoShow
								challengeDetails={contest} 
								submissions={this.entries(contest)}
							/>
						}}
					/>
				</div>
			)
		})
		return (
			<Router>
			<div>
	
				<h1>Im the photo competition index page</h1>
				{contests}

			</div>
			
			</Router>
		);
	}
}

export default PhotoIndex


