import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/app.service';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public encryptInfo : any;
  public userrole:any;
  display='none'; edit_id = 0;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";  
  userlist:any=[]; studentlist:any=[]; status_id; userfilterlist:any=[]; pendinglist:any=[];
  filter= false; menteefilter= false; pendingfilter= false;
  tk:any = {}; totalRecords:Number = 1; p: Number = 1; pageIndexes:any =[]; statusModaldisplay='none'; 
  status; edit; srs_name = ''; role_nme; srslist:any = []; paginatecnt:Number;
  menteepageIndexes:any =[]; menteepaginatecnt:Number; usertype=''; statustype='';
  pendingpageIndexes:any =[]; pendingpaginatecnt:Number;

  @Input() userdetails = {url:'',email:''}
  @Input() disableuser = {modified_by_user_id:'',userid:'',status:'',description:'',statusEnableDesc:'',statusDisableDesc:''}
  @Input() updateuser = {user_first_name:'', user_last_name:'', user_email_id:'', user_id:0, modified_by:''}
  @Input() search = {name:'', type:'', mentee_name:'', user_name:''}

  constructor(public restApi: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.role_nme = this.tk.role_name;
    this.fetchUser('load');
    this.fetchMentees('load');
    this.fetchPending('load');
  }

  openStatusModal(event,id, type){
    (event.target.checked) ? this.status = "Enable" : this.status = "Disable";
    this.statustype = type;
    this.statusModaldisplay = 'block';
    this.displayScroll();
    this.status_id = id;
  }

  closeStatusModal(f){
    this.statusModaldisplay = 'none';
    //(this.statustype == 'mentor') ? this.fetchUser(this.paginatecnt) : this.fetchMentees(this.menteepaginatecnt);
    this.hideScroll();
    f.resetForm();
  }

  changeStatus(f){   
    this.disableuser.modified_by_user_id = this.tk.user_id;
    this.disableuser.userid = this.status_id;
    this.disableuser.status = this.status;
    if(this.status == 'Enable'){
      this.disableuser.statusEnableDesc = this.disableuser.description;
    }else{
      this.disableuser.statusDisableDesc = this.disableuser.description;
    }
    this.restApi.postMethod('changeUserStatus',this.disableuser).subscribe((data:any) => {
      (this.statustype == 'mentor') ? this.fetchUser(this.paginatecnt) : this.fetchMentees(this.menteepaginatecnt);      
      alert(data.message);
      this.statusModaldisplay = 'none';
      f.resetForm();
      this.hideScroll();
    })
  }

  submit(f: NgForm){
    if(this.edit==false){
      this.addUser(f);
    }else{
      this.updateUser(f);
    }  
  }

  addUser(f:NgForm){
    var obj = {
      "first_name": this.updateuser.user_first_name,
      "last_name": this.updateuser.user_last_name,
      "email_id": this.updateuser.user_email_id
    }
    this.encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(obj),'secret key 123').toString());
    this.userdetails.url = this.encryptInfo;
    this.userdetails.email = this.updateuser.user_email_id;
    this.restApi.postMethod('sendUserLink',this.userdetails).subscribe((data:any) => {
      alert(data.message);
      if(data.status == 200){
        this.display = 'none';
        this.closeModal(f);
      }
    });
  }

  nextClick(){
    let num = Number(this.paginatecnt);
    if(num < this.pageIndexes.length){
      this.fetchUser(num+1);
    }
  }

  previousClick(){
    let num = Number(this.paginatecnt);
    if(num > 1){
      this.fetchUser(num-1);
    }
  }

  nextMenteeClick(){
    let num = Number(this.menteepaginatecnt);
    if(num < this.menteepageIndexes.length){
      this.fetchMentees(num+1);
    }
  }

  previousMenteeClick(){
    let num = Number(this.menteepaginatecnt);
    if(num > 1){
      this.fetchMentees(num-1);
    }
  }

  nextPendingClick(){
    let num = Number(this.pendingpaginatecnt);
    if(num < this.pendingpageIndexes.length){
      this.fetchPending(num+1);
    }
  }

  previousPendingClick(){
    let num = Number(this.pendingpaginatecnt);
    if(num > 1){
      this.fetchPending(num-1);
    }
  }

  fetchUser(event) {
    let cnt;
    if(event == 'load'){cnt = 1;}else{cnt=event}   
    this.restApi.getMethod("getPaginatedMentors/"+cnt).subscribe((resp:any) => {
      this.userlist = resp.data;     
      if(event == 'load'){
        let total = resp.data[0].total, num = total/10, arr = [];
        for(var i=0;i<num;i++){
          arr.push(i+1);
        }
        this.pageIndexes = arr; this.paginatecnt = 1;
      }else{
        this.paginatecnt = event;
      }
      setTimeout(function(){
        let elem = document.getElementsByClassName('mentor-page-link');
        for(var i=0;i<elem.length;i++){
          elem[i].classList.remove('active-pagination');
        }
        document.getElementById('mentorpagination_'+cnt).classList.add('active-pagination');
      },10)
    });
  }

  fetchMentees(event) {
    let cnt;
    if(event == 'load'){cnt = 1;}else{cnt=event}   
    this.restApi.getMethod("getPaginatedMentees/"+cnt).subscribe((resp:any) => {
      this.studentlist = resp.data;     
      if(event == 'load'){
        let total = resp.data[0].total, num = total/10, arr = [];
        for(var i=0;i<num;i++){
          arr.push(i+1);
        }
        this.menteepageIndexes = arr; this.menteepaginatecnt = 1;
      }else{
        this.menteepaginatecnt = event;
      }
      setTimeout(function(){
        let elem = document.getElementsByClassName('mentee-page-link');
        for(var i=0;i<elem.length;i++){
          elem[i].classList.remove('active-pagination');
        }
        document.getElementById('menteepagination_'+cnt).classList.add('active-pagination');
      },10)
    });
  }

  fetchPending(event) {
    let cnt;
    if(event == 'load'){cnt = 1;}else{cnt=event}   
    this.restApi.getMethod("getPaginatedPending/"+cnt).subscribe((resp:any) => {
      this.pendinglist = resp.data;     
      if(event == 'load'){
        let total = resp.data[0].total, num = total/10, arr = [];
        for(var i=0;i<num;i++){
          arr.push(i+1);
        }
        this.pendingpageIndexes = arr; this.pendingpaginatecnt = 1;
      }else{
        this.pendingpaginatecnt = event;
      }
      setTimeout(function(){
        let elem = document.getElementsByClassName('pending-page-link');
        for(var i=0;i<elem.length;i++){
          elem[i].classList.remove('active-pagination');
        }
        document.getElementById('pendingpagination_'+cnt).classList.add('active-pagination');
      },10)
    });
  }

  filterUser(){
    if(this.search.name){
      this.filter = true;
      this.search.type = 'mentor';
      this.restApi.postMethod('filterUserList',this.search).subscribe((resp:any) => {
        this.userlist = resp.data;
      })
    }else{
      alert("Enter the name of the Teacher to be searched");
    }
  }

  filterMentee(){
    if(this.search.mentee_name){
      this.menteefilter = true;
      this.search.type = 'mentee';
      this.restApi.postMethod('filterUserList',this.search).subscribe((resp:any) => {
        this.studentlist = resp.data;
      })
    }else{
      alert("Enter the name of the Student to be searched");
    }
  }

  filterPendingUser(){
    if(this.search.user_name){
      this.pendingfilter = true;
      this.search.type = 'pending';
      this.restApi.postMethod('filterPendingList',this.search).subscribe((resp:any) => {
        this.pendinglist = resp.data;
      })
    }else{
      alert("Enter the name of the User to be searched");
    }
  }

  resetFilter(type){
    this.search = {name:'', type:'', mentee_name:'', user_name:''};
    this.filter = false;
    if(type == 'mentor'){
      this.fetchUser('load');
    }else if(type == 'mentee'){
      this.fetchMentees('load');
    }else{
      this.fetchPending('load');
    }
  }

  openModal(){
    this.edit = false;
    this.display='block';
    this.displayScroll();
  }

  closeModal(f:NgForm) {
    f.resetForm()
    this.display='none';
    this.hideScroll();
  }

  editUser(id,type){
    this.edit = true;
    this.edit_id = id;
    this.usertype = type;
    this.restApi.getMethod('getUsers/'+this.edit_id).subscribe((resp:any) => {
      this.updateuser = resp.data[0];
      this.display='block';
      this.displayScroll();
    });
  }

  updateUser(f){
    this.updateuser.modified_by = this.tk.user_id;
    this.updateuser.user_id = this.edit_id;
    this.restApi.postMethod('updateUser',this.updateuser).subscribe((data:any) => {
      alert('User updated Successfully');
      this.closeModal(f);
      this.edit = false;
      if(this.usertype == 'mentor'){
        this.fetchUser(this.paginatecnt);
      }else{
        this.fetchMentees(this.menteepaginatecnt);
      }
    });
  }

  displayScroll(){
    document.getElementsByTagName('body')[0].classList.add('modal-open');
    document.getElementsByTagName('html')[0].classList.add('modal-open');
  }

  hideScroll(){
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    document.getElementsByTagName('html')[0].classList.remove('modal-open');
  }

  openTabContent(id){
    let elem;
    elem = Array.from(document.getElementsByClassName('user-tab-content') as HTMLCollectionOf<HTMLElement>);
    for(var i=0; i<elem.length; i++){
      elem[i].style.display = 'none';
    }
    
    elem = Array.from(document.getElementsByClassName('users-tab-list') as HTMLCollectionOf<HTMLElement>);
    for(var i=0; i<elem.length; i++){
      elem[i].classList.remove('active');
    }

    document.getElementById(id).style.display = 'block';
    Array.from(document.getElementsByClassName(id) as HTMLCollectionOf<HTMLElement>)[0].classList.add('active');
  }

  disapprove(id){
    this.restApi.getMethod('changeStatus/D/'+id).subscribe((data:any) => {
      alert(data.message);
      this.fetchPending(this.pendingpaginatecnt);
    });
  }

  approve(id, role){
    this.restApi.getMethod('changeStatus/A/'+id).subscribe((data:any) => {
      this.fetchPending(this.pendingpaginatecnt);
      alert(data.message);
      (role == '9') ? this.fetchUser('load') : this.fetchMentees('load');
    });
  }
}

