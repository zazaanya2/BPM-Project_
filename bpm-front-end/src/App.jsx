import { useState } from 'react'
import './App.css'
import TextArea from './components/part/TextArea'
import TextField from './components/part/TextField'
import TextFieldAngka from './components/part/TextFieldAngka'
import DatePicker from './components/part/DatePicker'
import UploadFoto from './components/part/UploadFoto'


function App() {
  return (
    <> 
    <TextArea></TextArea>
    <TextField></TextField>
    <TextFieldAngka></TextFieldAngka>
    <DatePicker></DatePicker>
    <UploadFoto></UploadFoto>
    </>
  )
}

export default App
