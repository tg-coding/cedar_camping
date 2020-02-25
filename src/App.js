import React from 'react';
import routes from './routes';
import Header from './Components/Nav/Header';
import Footer from './Components/Nav/Footer';
import ReactNotification from 'react-notifications-component';
import './sass/notification-theme.scss';
import 'animate.css';

// import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ReactNotification/>
      <Header/>
      {routes}
      <Footer/>
    </div>
  );
}

export default App;
