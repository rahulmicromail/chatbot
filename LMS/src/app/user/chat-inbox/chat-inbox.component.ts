import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { url } from 'src/app/shared/app.constant';
import { NgForm } from '@angular/forms';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  socket: Socket; tk: any = {};
  message:string; form:any; messageInput:any; messageContainer:any; name:any;
  socketConnectionOpts = {
    forceNew: true
  }

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_token')){
      this.tk = jwt_decode(sessionStorage.getItem('user_token'));
      this.initSocket();
    }else{
      alert("Access Denied. You are not authorized to access without logging in.");
      window.location.href= '/home';
    }
  }

  append(message, position){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    this.messageContainer.append(messageElement)
  }

  initSocket(){
    this.socket = io(url.SOCKET_ENDPOINT);
    //this.socket.connect(url.SOCKET_ENDPOINT, this.socketConnectionOpts)
    //this.setupSocketConnection();
    this.form = document.getElementById('send-container');
    this.messageInput = document.getElementById('messageInp');
    this.messageContainer = document.querySelector('.chat-container');
    this.name = prompt("Enter your name");

    this.socket.emit('new-user-joined',this.name);
    this.socket.on('user-joined', name => {
      if(name){
        this.append(name +' joined the chat','right')
      }
    });
    this.socket.on('receive', data => {
      this.append(`${data.name} : ${data.message}`,'right')
    });
  }

  async submitChat(){
    this.append(`You: ${this.message}`,'right');
    await this.socket.emit('send', this.message);
    this.message = '';
  }

  /* setupSocketConnection() {
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list').appendChild(element);
      }
    });
  }

  async SendMessage() {
    await this.socket.emit('send', this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list').appendChild(element);
    this.message = '';
  } */
}
