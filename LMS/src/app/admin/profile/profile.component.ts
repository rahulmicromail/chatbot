import { Component, OnInit, Input, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from 'src/app/shared/app.service';
import jwt_decode from "jwt-decode";
import { state } from 'src/app/shared/app.state';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  tk:any = {}; images =''; imageToShow; first = true;
  public option_str:any; city:any;
  hide: boolean = true;
  hideconfirm: boolean = true; number = true;

  @Input() email = {id:''};
  @Input() userprofile = {image_url:'',user_first_name:'', user_last_name:'', user_email_id:'', user_contact_number:'',user_address:'',user_pincode:'',user_city:'',user_state:'',role_name:'',user_id:'', gender:'',accepted_date:'',dob:'',status_type:'',status_name:'',church_name:'',status:''}
  @Input() reset = {password:'',email_id:'',confirmpassword:''}

  constructor(public restApi: ApiService) { }

  ngOnInit(): void {
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.userprofile.user_id = this.tk.user_id;
    this.fetchUserDetails();
    //this.print_state();
  }
  
  toggleFieldTextType() {
    this.hide = !this.hide;
  }

  toggleFieldTextType_confirm() {
    this.hideconfirm = !this.hideconfirm;
  }

  fetchUserDetails(){
    this.email.id = this.tk.user_id;
    this.restApi.postMethod('getProfile',this.email).subscribe((resp:any) => {
      this.userprofile = resp.data[0];
      //this.city = resp.data[0].user_city;

      this.restApi.getImgMethod('getUserImg/'+this.tk.user_id).subscribe((data:any) => {
        this.createImageFromBlob(data);
        /* const e = new Event("change");
        const element = document.querySelector('#user_state')
        element.dispatchEvent(e);

        var a = new Date(resp.data[0].dob);
        var mon, dte;
        (a.getMonth()+1 < 10) ? mon = "0"+(a.getMonth()+1) : mon = (a.getMonth()+1);
        (a.getDate() < 10) ? dte = "0"+a.getDate() : dte = a.getDate();
        (<HTMLInputElement>document.getElementById('dob')).value = a.getFullYear()+'-'+mon+'-'+dte;
  
        a = new Date(resp.data[0].accepted_date);
        (a.getMonth()+1 < 10) ? mon = "0"+(a.getMonth()+1) : mon = (a.getMonth()+1);
        (a.getDate() < 10) ? dte = "0"+a.getDate() : dte = a.getDate();
        (<HTMLInputElement>document.getElementById('accepted_date')).value = a.getFullYear()+'-'+mon+'-'+dte; */
        //this.print_state.onchange();
      })
    })
  }

  print_state(){
    this.option_str = document.getElementById("user_state");
    this.option_str.length=0;
    this.option_str.options[0] = new Option('Select State','');
    this.option_str.selectedIndex = 0;
    for (var i=0; i< state.state_arr.length; i++) {
      this.option_str.options[this.option_str.length] = new Option(state.state_arr[i], state.state_arr[i]);
    }
    this.fetchUserDetails();
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
      this.userprofile.user_city = this.city;
      (<HTMLInputElement>document.getElementById('user_city')).value = this.city;
      this.first = false;
    }
  }

  selectImage(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.images = file;
      this.readURL(event.target.files);
    }
  }

  triggerClick(){
    document.getElementById('blog-image').click();
  }

  updateProfile(f:NgForm) {     
   // event.preventDefault();
    var regEx = /^[+]?\d+$/;
    if(!regEx.test(this.userprofile.user_contact_number)){
      document.getElementById('user_contact_number').classList.add('invalid-data');
      this.number = false;
      return false;
    }else{
      document.getElementById('user_contact_number').classList.remove('invalid-data');
      this.number = true;
    }
    if(this.images){
      const formData = new FormData();
      formData.append('image', this.images);
      let user_id = this.tk.user_id;

      this.restApi.postImgMethod('addUserImg/'+user_id,formData).subscribe((resp:any) => {
        this.updateEditProfile(resp);
      })
    }else{
      this.updateEditProfile('');
    }
  }

  updateEditProfile(resp){
    /* var a = new Date(this.userprofile.dob);
    var mon, dte;
    (a.getMonth()+1 < 10) ? mon = "0"+(a.getMonth()+1) : mon = (a.getMonth()+1);
    (a.getDate() < 10) ? dte = "0"+a.getDate() : dte = a.getDate();
    this.userprofile.dob = a.getFullYear()+'-'+mon+'-'+dte;

    a = new Date(this.userprofile.accepted_date);
    (a.getMonth()+1 < 10) ? mon = "0"+(a.getMonth()+1) : mon = (a.getMonth()+1);
    (a.getDate() < 10) ? dte = "0"+a.getDate() : dte = a.getDate();
    this.userprofile.accepted_date = a.getFullYear()+'-'+mon+'-'+dte; */

    (resp != '') ? this.userprofile.image_url = resp.filepath : this.userprofile.image_url = '';
    this.restApi.postMethod('updateProfile',this.userprofile).subscribe((data:any) => {     
      alert(data.message);
      this.images = '';
      this.restApi.getImgMethod('getUserImg/'+this.tk.user_id).subscribe((resp:any) => {
        this.createImageFromBlob(resp);
      })
    })
  }

  readURL(event: Event): void {
    if (event && event[0]) {
        const file = event[0];
        const reader = new FileReader();
        reader.onload = e => this.imageToShow = reader.result;
        reader.readAsDataURL(file);
    }
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
  }

  resetPassword(g:NgForm){
    if(this.reset.password == this.reset.confirmpassword){
      this.reset.email_id = this.tk.email;
      this.restApi.postMethod('resetPassword',this.reset).subscribe((resp:any) => {
        alert(resp.message);
        g.resetForm()
      //  this.reset.password = '';this.reset.confirmpassword = '';
      })
    }else{
      alert('Password and Confirm Password do not match. Please try again.')
    }
  }

  numberValidate(event){
    var regEx = /^[+]?\d+$/;
    if(regEx.test(event.target.value)){
      this.number = true;
      document.getElementById('user_contact_number').classList.remove('invalid-data');
    }else{
      document.getElementById('user_contact_number').classList.add('invalid-data')
      this.number = false;
    }
  }
}
