import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/mainpage';
import LoadingScreen from './pages/loading';

function App() {
  return (
    <>
    <div>
      <HomePage/>
      <LoadingScreen/>
    </div>
    </>
  );
}


export default App
