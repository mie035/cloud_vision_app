import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Input from '@material-ui/core/Input';
import {btn_clicked} from './Backend/CloudVision';
import {picture_uploaded} from './Backend/CloudVision';
import {readKey} from './Backend/CloudVision';
import capture from './capture.png';
//import {pictCapture_clicked} from './Backend/CloudVision';
import CaptureForm from './CaptureForm';

class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      isOpen:false,
    };
  } 
  path = "C:\Users\Michitoshi\Pictures\sweetsApp\receipt";
  onClick() {
       
      }
  pictCapture_clicked() {
    if(this.state.isOpen)
    this.setState({isOpen:false});
    else
    this.setState({isOpen:true});
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
      <img height = "300" width = "300" src = {capture} alt ="camera" onClick = {this.pictCapture_clicked.bind(this)}/>{
      <CaptureForm isOpen = {this.state.isOpen} onClick = {this.pictCapture_clicked.bind(this)}/>}
        <canvas id = "canvas"></canvas>
        
        <Button id='btnInput' color ="secondary" variant="contained" onClick = {btn_clicked.bind(this,this.path)}>Send</Button>
        <Button id='btnRef' color ="secondary"  component="label">
          Ref
        <Input
        className="inputter"
        id = 'txtPicture'
        type = 'file'
        onChange = {picture_uploaded.bind(this)}
        style={{display:'none'}} 
        inputProps={{
          'aria-label': 'Description',
        }}
      />
      </Button>
      <Button id='btnKey' color ="secondary"  component="label">
          UPLOAD_GCP_KEY
        <Input
        className="inputterKey"
        id = 'txtKey'
        type = 'file'
        onChange = {readKey.bind(this)}
        style={{display:'none'}} 
        inputProps={{
          'aria-label': 'Description',
        }}
      />
      </Button>
      </header>
    </div>
  );}
}
export default App;
