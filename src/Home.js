import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  // Redirect
} from "react-router-dom"
import VideoIndex from './components/VideoIndex'
import PhotoIndex from './components/PhotoIndex'
import TextIndex from './components/TextIndex'

class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state={
  //     comps:[]
  //   } 
  // }
  // componentDidMount() {
  //   axios.get("http://localhost:3001/api/all").then((res)=>{
  //     this.setState={
  //       comps: res.data
  //     }
  //   })
  // }
  render() {
    return (
      <Router>
      <div>
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/Video">Video</Link>
          <Link to="/Text">Text</Link>
          <Link to="/Photo">Photo</Link>
        </div>
        <Route 
            path="/Video"
            render={()=>{
              return <VideoIndex />
            }}
          />
        <Route 
          path="/Text"
          render={()=>{
            return <TextIndex />
          }}
        />
        <Route 
          path="/Photo"
          render={()=>{
            return <PhotoIndex />
          }}
        />
      </div>
      </Router>
    );
  }
}

export default Home;









