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
    <TextArea label="Ini Text Area"></TextArea>
    <TextField label="Ini Text Field"></TextField>
    <TextFieldAngka label="Ini Text Field Number"></TextFieldAngka>
    <DatePicker label="Ini DatePicker"></DatePicker>
    <UploadFoto label="Ini Upload Foto"></UploadFoto>
    </>
  )
}

export default App
