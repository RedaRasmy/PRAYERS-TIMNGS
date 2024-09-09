import { useState } from 'react'
import './App.css'
import Button from '@mui/material/Button';
import MainContent from './MainContent';
import Container from '@mui/material/Container';


function App() {
  return (
    <>
      <div style={{display:'flex',justifyContent:'center',width:'100vw'}}>
        <Container fixed >
          <MainContent></MainContent>
        </Container>
      </div>
    </>
  )
}

export default App
