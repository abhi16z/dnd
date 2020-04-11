import React from 'react';
import './App.css';
import BasicDND from './dndBasic/Basic';
import ArrangeBasic from './ArrangeBasic';

function App() {
  return (
    <div className="App">
      <h1> Basic drag and drop </h1>
      <BasicDND />
      <h1> Arrange basic  </h1>
      <ArrangeBasic />
    </div>
  );
}

export default App;
