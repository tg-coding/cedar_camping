import React from 'react';
import routes from './routes';
import Header from './Components/Nav/Header';
import Footer from './Components/Nav/Footer';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Footer/>
      {routes}
    </div>
  );
}

export default App;
