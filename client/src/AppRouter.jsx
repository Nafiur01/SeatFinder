import React, {Component} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AboutUs from './components/AboutUs';
import TermsOfService from './components/TermsOfService';
import App from './App';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegPage from './components/RegPage';
import EventPage from './components/EventPage';
import axios from 'axios';

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: [],
    };
  }

  componentDidMount() {
    axios.get('http://192.168.0.106:8000/api/events/')
      .then(response => {
        this.setState({ eventData: response.data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

render() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms" element={<TermsOfService />}>
                {/* <Route element={<Navbar />}></Route> */}

            </Route>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<RegPage/>} />
            <Route path="/:eventLink" element={<EventPage events={this.state.eventData} />} />
        </Routes>
        
    </BrowserRouter>
  );
}
}

export default AppRouter
