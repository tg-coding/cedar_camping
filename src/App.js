import React from 'react';
import routes from './routes';
import Header from './Components/Nav/Header';
import Footer from './Components/Nav/Footer';
// import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header/>
      {routes}
      <Footer/>
    </div>
  );
}

export default App;
