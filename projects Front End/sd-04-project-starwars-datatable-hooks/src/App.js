import React from 'react';
import MainContainer from './components/MainContainer';
import { StarWarsProvider } from './context/StarWarsContext';
import './App.css';
// ToDo
function App() {
  return (
    <div className="App">
      <StarWarsProvider>
        <MainContainer />
      </StarWarsProvider>
    </div>
  );
}

export default App;
