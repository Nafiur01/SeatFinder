import logo from './logo.svg';
// import './App.css';
import './css/style.css';
import React, { Component } from 'react';
import NavBar from './components/Navbar';
import SearchBar from './components/SearchBar';

const events = [
  {"id":1,"name":"BUBT IUPC","description":"Intra University Programming Contest","link":"bubtiupc2023","date":"2023-12-31T15:00:00Z","location":"BUBT Permanent Campus, Mirpur, Dhaka","city":"Dhaka","capacity":200,"isPrivate":true,"pkey":"bubtiupc","hasFee":true,"entry_fee":400,"host":"BUBT"}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: events,
    };
  }

  render() {
    return (
      <main className='context'>
        <NavBar />
        <SearchBar />
      </main>
    );
  }
}

export default App;