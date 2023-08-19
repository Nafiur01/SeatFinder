import logo from './logo.svg';
import './css/style.css';
import React, { Component } from 'react';
import NavBar from './components/Navbar';
import SearchBar from './components/SearchBar';
import AppRouter from './AppRouter';
import Layout from './components/Layout';
import EventCard from './components/EventCard';
import EventList from './components/EventList';
import axios from 'axios';

class App extends Component {

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
    const { eventData } = this.state;
    return (
      <main className='context'>
        {/* <NavBar />
        <SearchBar /> */}
        <Layout>
          <SearchBar />
          <div className="app container mt-3 mb-3">
            <EventList events={this.state.eventData} />
          </div>
        </Layout>
        
      </main>
    );
  }
}

export default App;