import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import jwt_decode from "jwt-decode";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { io, Socket } from 'socket.io-client';
import { url } from 'src/app/shared/app.constant';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-training-dasboard',
  templateUrl: './training-dasboard.component.html',
  styleUrls: ['./training-dasboard.component.css']
})
export class TrainingDasboardComponent implements OnInit {
  tk:any = {}; courselist:any = []; imageToShow; pdfurl; ongoinglist:any=[]; lessonstatus:any=[];
  displayMenteeModal = false; displayTable = true; displayNotes = 'none'; displayVideoModal ='none';
  details:any=[]; lesson:any=[]; menteestatus=''; edit: any = false; lessonSteps:any=[];
  docsList:any=[]; arrLink:any=[]; arrPDF:any=[]; notes:any=[]; joinedClass:any=false;
  socket: Socket; message:string; form:any; messageInput:any; messageContainer:any; name:any; videourl = '';
  urlSafe: SafeResourceUrl; displayAssessmentModal = 'none'; certificate = false; certificateVal:any=[];
  socketConnectionOpts = {forceNew: true}; course_id = 0;
  counter = 0; quizlist:any=[]; quiz:any=[]; toVerify:any=false; isCorrect:any=true;

  @Input() addmentee = {mentee_id:'', mentee_first_name:'', mentee_last_name:'', instructor_id:'', class_id:'', category_id:'', course_id:''}
  @Input() addnotes = {content:'', title:'', class_id:0, course_id:0, user_id:0, row_id:0}
  @Input() deletenotes = {note_id:0, notes_status:''}
  
  constructor (public restApi: ApiService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_token')){
      this.tk = jwt_decode(sessionStorage.getItem('user_token'));
      this.fetchUpcomingCourse();
    }else{
      alert("Access Denied. You are not authorized to access without logging in.");
      window.location.href= '/home';
    }
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '300px',
      minHeight: '300px',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: "no",
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: "p",
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    //uploadUrl: 'v1/image',
    //uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      //['undo','redo','bold', 'italic'],
      ['customClasses','insertVideo'] //'fontSize',
    ]
  };

  fetchUpcomingCourse(){ 
    this.restApi.getMethod('getAllUpComingCourse').subscribe((resp:any) => {
      this.courselist = resp.data;
      this.restApi.getMethod('getMyCourseForMentees/'+this.tk.user_id).subscribe((resptwo:any) => {
        this.ongoinglist = resptwo.data;
      });
    });
  }

  openLink(id){
    window.open(id);
  }

  openNotes(){
    this.addnotes.content = '';
    this.addnotes.title = '';
    this.edit = false;
    this.displayNotes = 'block';
  }

  closeNotes(){
    this.displayNotes = 'none';
  }

  saveNotes(){
    this.restApi.postMethod('addNotes',this.addnotes).subscribe((data:any) => {     
      alert(data.message);
      this.getNotes();
      this.closeNotes();
    })
  }

  updateNotes(){
    this.restApi.postMethod('updateNotes',this.addnotes).subscribe((data:any) => {     
      alert(data.message);
      this.edit = false;
      this.getNotes();
      this.closeNotes();
    })
  }

  deleteNotes(id){
    this.deletenotes.note_id = id;
    this.deletenotes.notes_status = 'N';
    this.restApi.postMethod('changeNoteStatus',this.deletenotes).subscribe((data:any) => {     
      alert(data.message);
      this.getNotes();
    })
  } 

  editNotes(id){
    this.edit = true;
    this.addnotes.row_id = id;
    this.restApi.getMethod('getNotes/0/0/'+id).subscribe((resp:any) => {     
      this.displayNotes = 'block';
      this.addnotes = resp.data[0];
    })
  }

  getNotes(){
    this.restApi.getMethod('getNotes/'+this.tk.user_id+'/'+this.addnotes.class_id+'/'+this.addnotes.course_id).subscribe((resp:any) => {
      this.notes = resp.data;
    })
  }

  async openCourseDtls(id, class_id, type){
    this.displayTable = false;
    this.displayMenteeModal = true;
    this.course_id = id;
    (type == 'ongoing') ? this.joinedClass = true : this.joinedClass = false;
    
    let resp:any = await this.restApi.getMethod('getCourseDetailsForMentees/'+id+'/'+this.tk.user_id+'/'+class_id).toPromise();
    if(resp.status == 200){
      this.details = resp.data;
    }else{
      alert(resp.message);
      if(resp.status == 403){
        window.location.href= '/home';
      }
    }

    let resptwo:any = await this.restApi.getMethod('getLessonsForMenteesDashboard/'+id).toPromise();
    if(resptwo.status == 200){
      this.lesson = resptwo.data;
    }else{
      alert(resptwo.message);
      if(resptwo.status == 403){
        window.location.href= '/home';
      }
    }

    if(type == 'ongoing'){
      this.addnotes.class_id = class_id;
      this.addnotes.course_id = id;
      this.addnotes.user_id = this.tk.user_id;
      this.getNotes();
      //document.getElementsByTagName('body')[0].classList.add('modal-open');
      //document.getElementsByTagName('html')[0].classList.add('modal-open');
      //this.initSocket();
    }else{
      //document.getElementsByTagName('body')[0].classList.remove('modal-open');
      //document.getElementsByTagName('html')[0].classList.remove('modal-open');
    }
  }

  async addMentee(category_id,course_id,class_id,instructor_id){
    let checkIfJoined:any = await this.restApi.getMethod('isJoined/'+this.tk.user_id+'/'+class_id+'/'+course_id).toPromise();

    if(checkIfJoined.data[0].count > 0){
      alert('You have already registered yourself for this course')
    }else{
      this.addmentee.mentee_id = this.tk.user_id;
      this.addmentee.mentee_first_name = this.tk.first_name;
      this.addmentee.mentee_last_name = this.tk.last_name;
      this.addmentee.instructor_id = instructor_id;
      this.addmentee.class_id = class_id;
      this.addmentee.category_id = category_id;
      this.addmentee.course_id = course_id;
      this.restApi.postMethod('addLMSMenteeToCourse',this.addmentee).subscribe((data:any) => {     
        alert(data.message);
        this.fetchUpcomingCourse();
      })
    }
  }

  closeMenteeDiv(){
    this.displayMenteeModal = false;
    this.displayTable = true;
  }

  downloadPDF(id,url){   
    let arr = url.split('/');
    let len = arr.length;
    this.pdfurl = arr[len-1];
    this.restApi.getImgMethod('downloadPDF/1').subscribe((data:any) => {
      this.downloadFile(data);
    });
  }

  downloadLessonPDF(id,url){   
    let arr = url.split('/');
    let len = arr.length;
    this.pdfurl = arr[len-1];
    this.restApi.getImgMethod('downloadLessonPDF/'+id).subscribe((data:any) => {
      this.downloadFile(data);
    });
  }

  downloadFile(blob){
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = this.pdfurl;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 7000);
  }
  
  toggleClass(id){
    this.restApi.getMethod('getMenteeStatusForClass/'+id+'/'+this.tk.user_id).subscribe((resp:any) => {
      if(resp.status == 200){
        this.menteestatus = resp.data[0].mentee_status;
        if(this.menteestatus){
          if(this.menteestatus == 'N'){
            document.getElementsByClassName('lessons-details')[0].classList.add('pointer-none');
          }
        }        
        this.restApi.getMethod('getLessonsActivityForMentees/'+id).subscribe((lessondata:any) => {
          if(lessondata.status == 200){
            let lessonstatus = lessondata.data;
            for(var i=0;i<lessonstatus.length;i++){
              if(document.getElementById('lesson_'+lessonstatus[i].lesson_id+'_'+id)){
                document.getElementById('lesson_'+lessonstatus[i].lesson_id+'_'+id).style.display = 'block';
                document.getElementById('lesson_'+lessonstatus[i].lesson_id+'_'+id).classList.add('label-success');
              }
            }
            var classlen = document.getElementsByClassName('class-div-hide');
            for(let i=0;i<classlen.length;i++){
              (document.getElementsByClassName("class-div-hide")[i] as HTMLElement).style.display = 'none'
            }
            document.getElementById('row_'+id).style.display = 'block';
          }else{
            alert(lessondata.message);
            if(lessondata.status == 403){
              window.location.href= '/home';
            }
          }
        })
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  playVideo(url){
    this.displayVideoModal = 'block';
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    document.getElementsByTagName('body')[0].classList.add('modal-open');
    document.getElementsByTagName('html')[0].classList.add('modal-open');
  }

  closeVideoModal(){
    this.displayVideoModal = 'none';
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    document.getElementsByTagName('html')[0].classList.remove('modal-open');
  }

  async takeAssessment(id){
    let resp:any = await this.restApi.getMethod('getLssAssessment/'+id).toPromise();
    let quiz:any = await this.restApi.getMethod('getQuiz/'+resp.data.row_id).toPromise();
    this.displayAssessmentModal = 'block';
    this.quizlist = quiz;
    this.loadQuiz();
  }

  closeAssessmentModal(){
    this.counter = 0; this.quizlist=[]; this.quiz=[]; this.toVerify=false; this.isCorrect=true;
    this.displayAssessmentModal = 'none';
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    document.getElementsByTagName('html')[0].classList.remove('modal-open');
  }

  loadQuiz() {
    if(this.quizlist.data.length == this.counter) {
      alert('Thanks for taking the quiz. Kindly visit us again.');
      this.closeAssessmentModal();
      this.certificate = true;
    }else{
      this.quiz = this.quizlist.data[this.counter];
      this.toVerify = true; this.isCorrect = true;
      this.counter++;
    }
  }

  verifyAnswer() {
    let el = document.querySelector('input[name="quiz-options"]:checked') as HTMLInputElement;
    (el.value == 'N') ? this.isCorrect = false : this.isCorrect = true;
    this.toVerify = false;
  }

  async toggleLessonClass(id){
    let resp1:any = await this.restApi.getMethod('gethreeStepsForLessons/'+id).toPromise();
    if(resp1.status == 200){
      this.lessonSteps = resp1.data[0];
    }else{
      alert(resp1.message);
      if(resp1.status == 403){
        window.location.href= '/home';
      }
    }
    
    let resp:any = await this.restApi.getMethod('getDocsForLesson/'+id).toPromise();
    if(resp.status == 200){
      this.docsList = resp.data;
      var classlen = document.getElementsByClassName('lesson-div-hide');
      for(let i=0;i<classlen.length;i++){
        (document.getElementsByClassName("lesson-div-hide")[i] as HTMLElement).style.display = 'none'
      }
      document.getElementById('lessondiv_'+id).style.display = 'block';
      this.arrLink = []; this.arrPDF = [];
      for(var i=0; i<resp.data.length; i++){
        if(resp.data[i].meeting_url){
          this.arrLink.push(resp.data[i].meeting_url)
        }
        if(resp.data[i].pdf_path){
          this.arrPDF.push(resp.data[i].pdf_path)
        }
      }
    }else{
      alert(resp.message);
      if(resp.status == 403){
        window.location.href= '/home';
      }
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
    this.socket = io(url.SOCKET_ENDPOINT); //
    this.form = document.getElementById('send-container');
    this.messageInput = document.getElementById('messageInp');
    this.messageContainer = document.querySelector('.chat-container');
    this.name = this.tk.first_name+' '+this.tk.last_name;
    this.socket.emit('new-user-joined',this.name);
    this.socket.on('user-joined', name => {
      if(name){ this.append(name +' joined the chat','center') }
    });
    this.socket.on('receive', data => {
      this.append(`${data.name} : ${data.message}`,'left')
    });
  }

  async submitChat(){
    this.append(`You: ${this.message}`,'right');
    await this.socket.emit('send', this.message);
    this.message = '';
  }

  async generatePDF(class_id) {
    let resp:any = await this.restApi.getMethod('certificate/'+this.tk.user_id+'/'+class_id+'/'+this.course_id).toPromise();   
    this.certificateVal = resp.data[0];
    setTimeout(function(){
      var data = document.getElementById('certificate');
      html2canvas(data).then(canvas => {
        //var imgWidth = 208;
        //var imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('l', 'mm', [267, 200]); 
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, 267, 200)
        pdf.save('certificate.pdf');
      });
    },500)
  }
}
