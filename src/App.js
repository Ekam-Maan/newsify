import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import "./App.css";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { Component } from "react";

export default class App extends Component {
  state = {
    progress : 0
  }

  apiKey =  process.env.REACT_APP_NEWS_API_KEY;

  setProgress = (progress)=>{
    this.setState({progress:progress})
  }
  componentDidMount(){
    console.log("api ,,,,,,,,,,,,,,,,," + process.env.REACT_APP_NEWS_API_KEY);
  }
  render(){
    return (
      <div className="App">
        <Router>
          <Navbar />
          <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
          <Routes>
            <Route exact path="/" element = {<News apiKey = {this.apiKey} setProgress={this.setProgress} key="general" pageSize={6} country="us" category="general"/>}/>
            <Route exact path="/business" element = {<News apiKey = {this.apiKey} setProgress={this.setProgress} key="business" pageSize={6} country="us" category="business"/>}/>
            <Route exact path="/sports" element = {<News apiKey = {this.apiKey} setProgress={this.setProgress} key="sports" pageSize={6} country="us" category="sports"/>}/>
            <Route exact path="/science" element = {<News apiKey = {this.apiKey} setProgress={this.setProgress} key="science" pageSize={6} country="us" category="science"/>}/>
            <Route exact path="/entertainment" element = {<News apiKey = {this.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={6} country="us" category="entertainment" />}/>
            <Route exact path="/health" element = {<News apiKey = {this.apiKey} setProgress={this.setProgress} key="health"  pageSize={6} country="us" category="health"/>}/>
            <Route exact path="/technology" element = {<News apiKey = {this.apiKey} setProgress={this.setProgress} key="technology"  pageSize={6} country="us" category="technology"/>}/>
          </Routes>
        </Router>
      </div>
    );
  }

 
}
