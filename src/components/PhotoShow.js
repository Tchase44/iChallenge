import React, { Component } from 'react';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   // Redirect
// } from "react-router-dom"
// import axios from 'axios'


class PhotoShow extends Component{

	render(){
		return (
				<div>
					<h1>{this.props.title}</h1>
					<p>{this.props.creator}</p>
					<div>

					</div>

				</div>
			)
	}
}


export default PhotoShow