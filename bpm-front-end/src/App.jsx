import { useState } from 'react'
import './App.css'
import KriteriaKuesioner from './components/page/9_Survei/ms-kriteria-survei/Index' // sesuaikan dengan path file Anda

function App() {
  return (
    <>
      <div className="container-fluid p-4">
        <KriteriaKuesioner />
      </div>
    </>
  )
}

export default App