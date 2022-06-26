import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/shared/app.service';
import * as CryptoJS from 'crypto-js';
import jwt_decode from "jwt-decode";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public displayLogin='none';
  public resp:any;
  public loggeduser:any;

  login = true; forgot = false; register = false;

  classApplied = false;
  tk:any = {}; access; encryptInfo; role_name;
  classtoggle = false; f_nme; l_nme;
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";  
  hide: boolean = true;

  @Input() userdetails = {email:'',pass_word:''};
  @Input() user = {user_id:''};
  @Input() forgotpassword = {email_id:'', url:''};
  @Input() registerForm = {register_first_name:'', register_last_name:'', register_email_id:'', register_contact_number:0, register_role:'', register_password:''}

  constructor(public restApi: ApiService, public router: Router, public activatedroute:ActivatedRoute) {  }

  ngOnInit(): void {
    if(window.location.href.indexOf('new-home') > 0){
      document.getElementsByTagName('header')[0].style.display = 'none';
    }else{
      document.getElementsByTagName('header')[0].style.display = 'block';
    }
    if(sessionStorage.getItem('user_token')){
      this.tk = jwt_decode(sessionStorage.getItem('user_token'));
      this.f_nme = this.tk.first_name.charAt(0); 
      this.l_nme = this.tk.last_name.charAt(0);
      console.log("Token Present");
      this.loggeduser = true;     
      this.role_name = this.tk.role_name;
    }else{
      console.log("Token not present");
      this.loggeduser = false;
    }
    this.encryptInfo = sessionStorage.getItem('access_token');
    if(this.encryptInfo){
      var deData= CryptoJS.AES.decrypt(decodeURIComponent(this.encryptInfo), 'secret key 123'); 
      this.access = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
    }
  }

  toggleFieldTextType() {
    this.hide = !this.hide;
  }

  userLogin(f:NgForm){
    this.userdetails.email = (<HTMLInputElement>document.getElementById('email_id')).value;
    this.userdetails.pass_word = (<HTMLInputElement>document.getElementById('your_password')).value;    
    this.restApi.postMethod('login',this.userdetails).subscribe((data:{}) => {
      this.resp = data;
      if(this.resp.status == '201'){
        alert(this.resp.message);
      }else{
        this.restApi.setUserToken(this.resp);
        this.closeLoginModal();
        this.getAccessList();
        f.resetForm()
      }
    });
  }

  logOut() {
    sessionStorage.clear();
    window.location.href= '/home';
  }

  openLoginModal(){
    this.displayLogin='block';
    this.login = true;
    this.forgot = false;
    this.register = false;
    document.getElementsByTagName('body')[0].classList.add('modal-open');
    document.getElementsByTagName('html')[0].classList.add('modal-open');
  }

  closeLoginModal() {
    this.displayLogin='none';
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    document.getElementsByTagName('html')[0].classList.remove('modal-open');
  }
  
  fpwd(){
    this.login = false;
    this.forgot = true;
    this.register = false;
  }

  registerUser(){
    this.login = false;
    this.forgot = false;
    this.register = true;
  }

  toggleHeaderMenu(){
    this.classApplied = !this.classApplied;
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }

  getAccessList(){
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.user.user_id = this.tk.user_id;
    this.restApi.postMethod('getLoginAccessList',this.user).subscribe((resp:any) => {
      var encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(resp.data[0]), 'secret key 123').toString());
      this.restApi.setAccessToken(encryptInfo);
      if(this.tk.role_id == '10'){
        window.location.href = '/dashboard';
      }else if(this.tk.role_id == '9'){
        window.location.href = '/dashboard';
      }else{
        window.location.href = '/dashboard';
      }
    })
  }

  navToggleClass() {
    this.classtoggle = !this.classtoggle;
  }

  forgotPassword(g:NgForm){
    let obj = {"email_id": this.forgotpassword.email_id }
    this.encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(obj), 'secret key 123').toString());
    this.forgotpassword.url = this.encryptInfo;

    this.restApi.postMethod('forgotpassword',this.forgotpassword).subscribe((resp:any) => {
      alert(resp.message);
      g.resetForm();
    })
  }

  registerTheUser(r:NgForm){
    this.restApi.postMethod('register',this.registerForm).subscribe((resp:any) => {
      if(resp.status == 200){
        r.resetForm();
      }
      alert(resp.message);
    })
  }
}
