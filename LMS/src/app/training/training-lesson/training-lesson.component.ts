import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import jwt_decode from "jwt-decode";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-training-lesson',
  templateUrl: './training-lesson.component.html',
  styleUrls: ['./training-lesson.component.css']
})
export class TrainingLessonComponent implements OnInit {
  imageToShow: any; images: any = []; catlist: any = []; courselist: any = []; lessonlist: any = [];
  tk: any = {}; edit = false; docurl: any = []; files: any; cnt = 0;
  lessoncourse_id = ''; isChecked = true;
  totalRecords: Number = 1; p: Number = 1; pageIndexes: any = []; paginatecnt: Number;

  @Input() lesson = { docdata: [], course_id: '', category_id: '', lesson_name: '', lesson_description: '', row_id: '', lesson_image_url: '', created_by: '', lesson_status: '', modified_by: '', assessment_name:'', assessment_id:'', video_url:'',video_title:'' }
  // ,lesson_document:'', meeting_link:''
  @Input() lessondocs = { vals: [], row: '' }

  constructor(public restApi: ApiService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_token')){
      this.tk = jwt_decode(sessionStorage.getItem('user_token'));
      this.fetchCategory();
      this.changePagination('load');
    }else{
      alert("Access Denied. You are not authorized to access without logging in.");
      window.location.href= '/home';
    }
  }

  fetchCategory() {
    this.restApi.getMethod('getLMSCategory/Y').subscribe((resp: any) => {
      if(resp.status == 200){
        this.catlist = resp.data;
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  fetchCourse() {
    this.restApi.getMethod('getLMSCourseOnCatSelect/' + this.lesson.category_id).subscribe((resp: any) => {
      if(resp.status == 200){
        this.courselist = resp.data;
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  fetchLesson() {
    this.lessonlist = [];
    this.restApi.getMethod('getLMSLesson/all').subscribe((resp: any) => {
      if(resp.status == 200){
        this.lessonlist = resp.data;
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  handleFileSelect(e) {
    if (e.target.files.length > 0) {
      this.files = e.target.files;
      for (var i = 0; i < e.target.files.length; i++) {
        this.images.push(e.target.files[i]);
      }
    }
  }

  submit(f) {
    if (this.edit == false)
      this.addLesson(f);
    else
      this.updateLesson(f);
  }

  addLesson(f: NgForm) {
    this.lesson.created_by = this.tk.user_id;
    let arr = this.docurl;
    this.lesson.docdata = this.docurl;
    let a = this.lesson.video_url;
    this.lesson.video_url = 'https://www.youtube.com/embed/'+a.split('v')[1].split('=')[1].split('&')[0];

    this.restApi.postMethod('addLMSLesson', this.lesson).subscribe((resp: any) => {
      if(resp.status == 200){
        const formData = new FormData();
        for (var i = 0; i < this.images.length; i++) {
          formData.append("image", this.images[i]);
        }
        this.restApi.postImgMethod('addLessonDoc/' + resp.data, formData).subscribe((resp: any) => {
          console.log(resp)
          this.changePagination(this.paginatecnt);
          alert(resp.message);
          f.resetForm()
          let element: HTMLElement = document.getElementById('cancel_category') as HTMLElement;
          element.click();
        })
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  editLesson(id) {
    this.edit = true;
    this.lesson.row_id = id;
    this.restApi.getMethod('getLMSLesson/' + id).subscribe((resp: any) => {
      if(resp.status == 200){
        this.docurl = resp.data.list;
        this.lesson.category_id = resp.data.data[0].category_id;
        this.restApi.getMethod('getLMSCourseOnCat/' + this.lesson.category_id).subscribe((courseresp: any) => {
          if(courseresp.status == 200){
            this.courselist = courseresp.data;
            this.lesson = resp.data.data[0];
            setTimeout(function(){
              (<HTMLInputElement>document.getElementById('course_id')).value = resp.data.data[0].course_id;
            },100)
          }else{
            alert(courseresp.message);
            if(courseresp.status == 403){
              window.location.href= '/home';
            }
          }
        });
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  updateLesson(f: NgForm) {
    this.lesson.modified_by = this.tk.user_id;
    let arr = this.docurl;
    this.lesson.docdata = this.docurl;
    let a = this.lesson.video_url;
    this.lesson.video_url = 'https://www.youtube.com/embed/'+a.split('v')[1].split('=')[1].split('&')[0];

    this.restApi.postMethod('updateLMSLesson', this.lesson).subscribe((resp: any) => {
      if(resp.status == 200){
        if (this.images.length > 0) {
          const formData = new FormData();
          for (var i = 0; i < this.images.length; i++) {
            formData.append("image", this.images[i]);
          }
          this.restApi.postImgMethod('addLessonDoc/' + resp.data, formData).subscribe((data: any) => {
            this.changePagination(this.paginatecnt);
            alert(data.message);
            f.resetForm();
            let element: HTMLElement = document.getElementById('cancel_category') as HTMLElement;
            element.click();
          })
        } else {
          this.changePagination(this.paginatecnt);
          alert(resp.message);
          let element: HTMLElement = document.getElementById('cancel_category') as HTMLElement;
          element.click();
          f.resetForm();
        }
        this.edit = false;
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  changeStatus(event, id) {
    this.lesson.modified_by = this.tk.user_id;
    this.lesson.row_id = id;
    (event.target.checked) ? this.lesson.lesson_status = "Y" : this.lesson.lesson_status = "N";
    this.restApi.postMethod('changeLMSLessonStatus', this.lesson).subscribe((data: any) => {
      if(data.status == 200){
        this.changePagination(this.paginatecnt);
        alert("The status has been changed successfully");
      }else{
        alert(data.message);
        if(data.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  /* resetForm(){
    this.lesson = {docdata:[], course_id:'', category_id:'', lesson_name:'', lesson_description:'',row_id:'',lesson_image_url:'', created_by:'', lesson_status:'',modified_by:''};
    this.imageToShow = '';
    this.images = []; this.docurl =[];
    (<HTMLInputElement>document.getElementById('meeting_link')).value='';
    (<HTMLInputElement>document.getElementById('doc-upload')).value='';
  } */

  addFld() {
    if (!this.files) {
       alert("upload the document")
    return false
    }
    this.cnt++
    this.docurl.push({
      lesson_id: '',
      row_id: 'add_' + this.cnt,
      pdf_path: this.files[0].name,
      meeting_url: (<HTMLInputElement>document.getElementsByClassName('meeting_link')[0]).value
    })   
  }

  removeFld(row_id, lesson_id) {
    if (typeof row_id == 'number') {
      this.restApi.getMethod('removeDoc/' + row_id + '/' + lesson_id).subscribe((data: any) => {
        alert(data.message);
        this.editLesson(lesson_id);
      })
    } else {
      this.docurl = this.docurl.filter(item => item.row_id !== row_id);
    }
  }

  resetForm(f: NgForm) {
    f.resetForm({ course_id: '', category_id: '', lesson_name: '', lesson_description: '', row_id: '', lesson_image_url: '', created_by: '', lesson_status: '', modified_by: '' })
    this.lesson = { docdata: [], course_id: '', category_id: '', lesson_name: '', lesson_description: '', row_id: '', lesson_image_url: '', created_by: '', lesson_status: '', modified_by: '', assessment_name:'', assessment_id:'', video_title:'', video_url:''};
    this.imageToShow = '';
    this.imageToShow = '';
    this.images = []; this.docurl = [];
    (<HTMLInputElement>document.getElementById('meeting_link')).value = '';
    (<HTMLInputElement>document.getElementById('doc-upload')).value = '';
    this.edit = false;
  }

  changePagination(event) {
    let cnt;
    if (event == 'load') { cnt = 1; } else { cnt = event }
    this.restApi.getMethod('getPaginatedLesson/' + cnt).subscribe((resp: any) => {
      if(resp.status == 200){
        this.lessonlist = resp.data.data;
        if (event == 'load') {
          let total = resp.data.total[0].total, num = total / 10, arr = [];
          for (var i = 0; i < num; i++) {
            arr.push(i + 1);
          }
          this.pageIndexes = arr; this.paginatecnt = 1;
        } else {
          this.paginatecnt = event;
        }
        setTimeout(function () {
          let elem = document.getElementsByClassName('page-link');
          for (var i = 0; i < elem.length; i++) {
            elem[i].classList.remove('active-pagination');
          }
          document.getElementById('pagination_' + cnt).classList.add('active-pagination');
        }, 10)
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  nextClick() {
    let num = Number(this.paginatecnt);
    if (num < this.pageIndexes.length) {
      this.changePagination(num + 1);
    }
  }

  previousClick() {
    let num = Number(this.paginatecnt);
    if (num > 1) {
      this.changePagination(num - 1);
    }
  }

  isAssNeeded(){
    this.isChecked = !this.isChecked;
  }

  http_string: string
  checkedhttp: boolean
  includehttp(event: any) {
    this.http_string = event.target.value;
    if (this.http_string.includes('http'))
      this.checkedhttp = true
    else
      this.checkedhttp = false
  }
}
