import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/shared/app.service';
import * as CryptoJS from 'crypto-js';
import { NgForm } from '@angular/forms';
import { state } from 'src/app/shared/app.state';

@Component({
  selector: 'app-mentee-register',
  templateUrl: './mentee-register.component.html',
  styleUrls: ['./mentee-register.component.css']
})
export class MenteeRegisterComponent implements OnInit {
  public decryptedInfo : any;
  hide: boolean = true;
  hideconfirm: boolean = true;
  first = true;
  public option_str:any; city:any;

  @Input() userdetails = {parent_id:'',user_first_name:'',user_last_name:'',user_email_id:'',user_password:'',user_confirm_password:'',user_contact_number:'',role_id:'',mentor_email_id:'',status:'',srs_id:'', user_dateofbirth:'',user_dateofacceptingchrist:'',user_gender:'',user_iam:'',user_jobtitle:'',user_school:'',user_church:'',user_address:'',user_city:'',user_state:'',user_pincode:''};
  
  constructor(public restApi: ApiService, public router: Router, public activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    document.getElementsByTagName('header')[0].style.display = 'none';
    let param = this.activatedroute.snapshot.params;

    var deData= CryptoJS.AES.decrypt(decodeURIComponent(param.encodedurl), 'secret key 123'); 
    this.decryptedInfo = JSON.parse(deData.toString(CryptoJS.enc.Utf8));

    this.userdetails.user_first_name = this.decryptedInfo.first_name;
    this.userdetails.user_last_name = this.decryptedInfo.last_name;
    this.userdetails.user_email_id = this.decryptedInfo.email_id;
    this.userdetails.mentor_email_id = this.decryptedInfo.mentor_email_id;
    this.print_state();
  }
  
  print_state(){
    this.option_str = document.getElementById("user_state");
    this.option_str.length=0;
    this.option_str.options[0] = new Option('Select State','');
    this.option_str.selectedIndex = 0;
    for (var i=0; i< state.state_arr.length; i++) {
      this.option_str.options[this.option_str.length] = new Option(state.state_arr[i], state.state_arr[i]);
    }
  }

  print_city(event:Event){
    let city_index:number = event.target["selectedIndex"];
    this.option_str = document.getElementById("user_city");
    this.option_str.length=0;
    this.option_str.options[0] = new Option('Select City','');
    this.option_str.selectedIndex = 0;
    let city_arr = state.s_a[city_index].split("|");
    for (var i=0; i<city_arr.length; i++) {
      this.option_str.options[this.option_str.length] = new Option(city_arr[i],city_arr[i]);
    }
    if(this.first){
      this.userdetails.user_city = this.city;
      (<HTMLInputElement>document.getElementById('user_city')).value = this.city;
      this.first = false;
    }
  }

  toggleFieldTextType() {
    this.hide = !this.hide;
  }

  toggleFieldTextTypeConfirm() {
    this.hideconfirm = !this.hideconfirm;
  }

  register(){
   // event.preventDefault();
    this.userdetails.role_id = this.decryptedInfo.role_id;
    this.userdetails.srs_id = this.decryptedInfo.srs_id;
    this.userdetails.parent_id = this.decryptedInfo.parent_id;
    this.userdetails.status = "Enable";

    this.restApi.postMethod('register',this.userdetails).subscribe((data:any) => {
      alert(data.message);
      if(data.status == 200){
        location.href='/home';
      }
    });
  }
}
