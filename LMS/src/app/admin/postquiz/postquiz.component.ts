import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import * as CryptoJS from 'crypto-js';
import jwt_decode from "jwt-decode";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postquiz',
  templateUrl: './postquiz.component.html',
  styleUrls: ['./postquiz.component.css']
})

export class PostquizComponent implements OnInit {
  tk:any = {}; quizlist:any = []; edit = false; viewblog:any=[]; lessonlist:any=[]; questionlist:any=[];
  public form : any; public formelem : any; 
  resp :any; access; encryptInfo; displayQuiz:any='none';

  @Input() addquiz = {question:'', status:'', row_id:0, user_id:1, option1:'', option2:'', option3:'', option4:'', is_answer:'', assessment_name:'', lesson_id:'', lesson_name:'', questionstatus:''};
  @Input() quizdtls = {vals:[]}

  constructor(public restApi: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.tk = jwt_decode(sessionStorage.getItem('user_token'));
    this.getQuiz();
    this.addquiz.user_id = this.tk.user_id;
  }

  submit(f){
    if(!this.edit)
    this.addQuiz(f);
    else
    this.updateQuiz(f);
  }

  async addQuiz(f:NgForm){
    this.edit = false;
    let resp:any = await this.restApi.postMethod('addAssessment',this.addquiz).toPromise();
    let resp1 = resp.data.insertId;

    if(resp.status == 200){
      var arrElem = [],b = [];
      for (var i=1; i<=4; i++) {
        arrElem.push(resp1);
        let opt = document.getElementById('option'+i) as HTMLInputElement;
        arrElem.push(opt.value);
        const ele = document.getElementById('is_answer_'+i) as HTMLInputElement;
        (ele.checked) ? arrElem.push('Y') : arrElem.push('N');
        b.push(arrElem);
        arrElem = [];
      }
      this.quizdtls.vals = b;

      resp = await this.restApi.postMethod('addAssessmentOptions',this.quizdtls).toPromise(); 

      if(resp.status == 200){
        alert(resp.message);
        this.resetForm(f);
        this.getQuestions();
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    }else{
      alert(resp.message);
      if(resp.status == 403){
        window.location.href= '/home';
      }
    }
  }

  async updateQuiz(f:NgForm){
    let resp:any = await this.restApi.postMethod('updateAssessment',this.addquiz).toPromise();
    if(resp.status == 200){
      var arrElem = [],b = [];
      for (var i=1; i<=4; i++) {
        let opt = document.getElementById('option'+i) as HTMLInputElement;
        arrElem.push(opt.getAttribute('data-row-id'));
        arrElem.push(opt.value);
        const ele = document.getElementById('is_answer_'+i) as HTMLInputElement;
        (ele.checked) ? arrElem.push('Y') : arrElem.push('N');
        b.push(arrElem);
        arrElem = [];
      }
      this.quizdtls.vals = b;
      resp = await this.restApi.postMethod('updateAssessmentAnswer',this.quizdtls).toPromise(); 
      if(resp.status == 200){
        alert(resp.message);
        this.resetForm(f);
        this.getQuestions();
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    }else{
      alert(resp.message);
      if(resp.status == 403){
        window.location.href= '/home';
      }
    }
  }
 
  changeStatus(event,id:any){
    this.addquiz.row_id = id;
    (event.target.checked) ? this.addquiz.status = "Y" : this.addquiz.status = "N";
    this.restApi.postMethod('updateStatusAssessment',this.addquiz).subscribe((resp:any) => {
      if(resp.status == 200){
        alert(resp.message);  
        this.getQuiz();
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  async editQuiz(id){
    this.edit = false;
    this.addquiz.row_id = id;
    let resp:any = await this.restApi.getMethod('getAssessment/'+id).toPromise();
    if(resp.status == 200){
      this.openLoginModal();
      this.addquiz.lesson_name = resp.data[0].lesson_name;
      this.addquiz.assessment_name = resp.data[0].assessment_name;
      let resp1:any = await this.restApi.getMethod('getQuestion/all').toPromise();
      this.questionlist = resp1.data;
    }else{
      alert(resp.message);
      if(resp.status == 403){
        window.location.href= '/home';
      }
    }
  }

  async getQuiz(){
    let resp:any = await this.restApi.getMethod('getAssessment/all').toPromise();
    if(resp.status == 200){
      this.quizlist = resp.data;    
    }else{
      alert(resp.message);
      if(resp.status == 403){
        window.location.href= '/home';
      }
    }
  }

  async getQuestions(){
    let resp:any = await this.restApi.getMethod('getQuestion/all').toPromise();
    if(resp.status == 200){
      this.questionlist = resp.data;    
    }else{
      alert(resp.message);
      if(resp.status == 403){
        window.location.href= '/home';
      }
    }
  }

  async editQuestions(id){
    this.edit = true;
    this.addquiz.row_id = id;
    let resp:any = await this.restApi.getMethod('getQuestion/'+id).toPromise();
    if(resp.status == 200){
      let res = resp.data[0];
      this.addquiz.question = res.question;
      this.addquiz.option1 = res.options[0].options;
      this.addquiz.option2 = res.options[1].options;
      this.addquiz.option3 = res.options[2].options;
      this.addquiz.option4 = res.options[3].options;

      for(var i=0; i<res.options.length; i++){
        if(res.options[i].is_answer == 'Y'){
          let radioopt = document.getElementById('is_answer_'+Number(i+1)) as HTMLInputElement;
          radioopt.checked = true;
        }
        let el = document.getElementById('option'+Number(i+1)) as HTMLInputElement;
        el.setAttribute('data-row-id',res.options[i].option_id);
      }
    }else{
      alert(resp.message);
      if(resp.status == 403){
        window.location.href= '/home';
      }
    }
  }

  resetForm(f){
    /* this.addquiz.question = '';
    this.addquiz.option1 = '';
    this.addquiz.option2 = ''; 
    this.addquiz.option3 = ''; 
    this.addquiz.option4 = ''; */
    f.resetForm();
    this.edit = false;
  }

  disableQuestions(id:any){
    this.addquiz.row_id = id;
    this.addquiz.questionstatus = "N";
    this.restApi.postMethod('disableQuestion',this.addquiz).subscribe((resp:any) => {
      if(resp.status == 200){
        alert(resp.message);  
        this.getQuestions();
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  openLoginModal(){
    this.displayQuiz='block';
    document.getElementsByTagName('body')[0].classList.add('modal-open');
    document.getElementsByTagName('html')[0].classList.add('modal-open');
  }

  closeLoginModal() {
    this.displayQuiz='none';
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    document.getElementsByTagName('html')[0].classList.remove('modal-open');
    this.getQuiz();
  }
}
