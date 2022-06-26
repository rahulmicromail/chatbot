import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public slides:any;
  public eventslide: any;
  public imgArr: any = [];
  public imgurl : any;
  public display='none'; eventmodaldisplay = 'none';
  bloglist:any = []; galleryitems:any=[]; eventlist:any=[];
  imageToShow: any;
  modalimage:any;
  
  @Input() visitorsdetails = {visitor_name:'', visitor_email_id:'', visitor_subject:'', visitor_contact_number:'', message:''}

  submitted :boolean = false; emailPattern = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"; number = true;
  @Input() verifyuser = {user_email_id:''};
  
  constructor(public restApi: ApiService, public router: Router) {
  }

  ngOnInit(): void {
    
  }

  openModal(id){
    this.display='block';
    document.getElementsByTagName('body')[0].classList.add('modal-open');
    var el = document.getElementsByClassName('hide-first');
    for(var i=0;i<el.length;i++){
      Array.from(document.getElementsByClassName('hide-first') as HTMLCollectionOf<HTMLElement>)[i].style.display = 'none';
    }
    (<HTMLInputElement>document.getElementById('event_hidden_id')).value=id;
    (<HTMLInputElement>document.getElementById('verify_email_btn')).style.display = 'block';
  }

  resetForm(){
    this.verifyuser  = { user_email_id:'' };
    this.visitorsdetails = {visitor_name:'', visitor_email_id:'', visitor_subject:'', visitor_contact_number:'', message:''}
  }

  closeModal() {
    this.display='none';
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    document.getElementsByTagName('html')[0].classList.remove('modal-open');
    var el = document.getElementsByClassName('backdrop');
    for (var i = 0; i < el.length; i++) {
      Array.from(document.getElementsByClassName('backdrop') as HTMLCollectionOf<HTMLElement>)[i].style.display = 'none';
    }
  }

  visitorDetails(f:NgForm) {
  	this.submitted = true;
    this.restApi.postMethod('lms-visitors',this.visitorsdetails).subscribe((resp:any) => {     
      alert(resp.message);   
      f.resetForm();
    })
  }

  numberValidate(event){
    var regEx = /^[+]?\d+$/;
    if(regEx.test(event.target.value)){
      this.number = true;
      document.getElementById('visitor_contact_number').classList.remove('invalid-data');
    }else{
      document.getElementById('visitor_contact_number').classList.add('invalid-data')
      this.number = false;
    }
  }
}
