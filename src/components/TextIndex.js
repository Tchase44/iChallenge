import React, { Component } from 'react';
import axios from 'axios'
// import {
//   BrowserRouter as Router,
//   // Route,
//   Link,
//   // Redirect
// } from "react-router-dom"



class TextIndex extends Component{
	constructor(props) {
    super(props);
    this.state={
      challenges:[]
    }
  }
  componentDidMount() {
   axios.get("http://localhost:3001/api/challenge/text").then((res)=>{
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
							<Link to={{ pathname:"/Text/"+contest._id}}>
								<h3>{contest.title}</h3>
								<p>Created By: {contest.creator}</p>
							</Link>
						</div>
				)
		})
		return (
			<div>
				<h1>Im the text based compition home page</h1>
				{contests}
			</div>
		);
	}
}

export default TextIndex