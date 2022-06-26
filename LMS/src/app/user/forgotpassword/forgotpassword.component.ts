import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { ApiService } from 'src/app/shared/app.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide: boolean = true;
  hideconfirm: boolean = true;
  
  constructor(public restApi: ApiService, private formBuilder: FormBuilder, public router: Router, public activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    document.getElementsByTagName('header')[0].style.display = 'none';
    document.getElementsByTagName('footer')[0].classList.add('footer-bottom');
    let param = this.activatedroute.snapshot.params;

    var deData= CryptoJS.AES.decrypt(decodeURIComponent(param.encodedurl), 'secret key 123'); 
    let decryptedInfo = JSON.parse(deData.toString(CryptoJS.enc.Utf8));

    this.form = this.formBuilder.group({
      //email_id: ['', Validators.required],
      pass_word: ['', Validators.required],
      confirmpassword:  ['', Validators.required]
    });
    setTimeout(function(){
      (<HTMLInputElement>document.getElementById('reset_email_id')).value = decryptedInfo.email_id;
    },1000)
  }

  toggleFieldTextType() {
    this.hide = !this.hide;
  }

  toggleFieldTextTypeConfirm() {
    this.hideconfirm = !this.hideconfirm;
  }


  get f() { return this.form.controls; }

  resetPassword() {
    this.submitted = true;
    this.form = this.formBuilder.group({
      pass_word: ['', Validators.required],
      confirmpassword:  ['', Validators.required]
    });
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    let obj = {email_id:(<HTMLInputElement>document.getElementById('reset_email_id')).value, password: this.f.pass_word.value}
    this.restApi.postMethod('resetPassword',obj).subscribe((resp:any) => {
      alert(resp.message);
      if(resp.status == 200){
        window.location.href='/home';
      }
    })
  }

  resetForm() {
    this.form.get('pass_word').clearValidators();
    this.form.get('pass_word').updateValueAndValidity();
    this.form.get('confirmpassword').clearValidators();
    this.form.get('confirmpassword').updateValueAndValidity();
    this.form.reset({
      "pass_word": '',
      "confirmpassword": ''
    });
  }
}
