import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import jwt_decode from "jwt-decode";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-training-course',
  templateUrl: './training-course.component.html',
  styleUrls: ['./training-course.component.css']
})
export class TrainingCourseComponent implements OnInit {
  imageToShow:any;images='';catlist:any=[];courselist:any=[];
  tk:any = {}; edit = false;

  totalRecords:Number = 1; p: Number = 1; pageIndexes:any =[]; paginatecnt:Number;

  @Input() course = {category_id:'', course_name:'', course_description:'', row_id:'',course_image_url:'', created_by:'', course_status:'', modified_by:''}

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

  fetchCategory(){
    this.restApi.getMethod('getLMSCategory/Y').subscribe((resp:any) => {
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

  fetchCourse(){
    this.restApi.getMethod('getLMSCourse/all').subscribe((resp:any) => {
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

  submit(f){
    if(this.edit==false)
    this.addCourse(f);
    else
    this.updateCourse(f);

  }
 
  addCourse(f:NgForm){
    this.course.created_by = this.tk.user_id;
    if(this.images != ''){
      const formData = new FormData();
      formData.append('image', this.images);
      let name = this.course.course_name.split(' ').join('_');

      this.restApi.postImgMethod('addTrainingCourseImg/'+name,formData).subscribe((data:any) => {
        this.course.course_image_url = data.filepath;
        this.addCourseData();
      })
    }else{
      this.course.course_image_url = '';
      this.addCourseData();
    }
  }

  addCourseData() {
    this.restApi.postMethod('addLMSCourse',this.course).subscribe((resp:any) => {
      if(resp.status == 200){
        this.changePagination(this.paginatecnt);
        this.images = '';
        alert(resp.message);
        let element: HTMLElement = document.getElementById('cancel_category') as HTMLElement;
        element.click();
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  editCourse(id){
    this.edit = true;
    this.course.row_id = id;
    this.restApi.getMethod('getLMSCourse/'+id).subscribe((resp:any) => {
      if(resp.status == 200){
        this.course = resp.data[0];    
        this.restApi.getImgMethod('getLMSCourseImg/'+id).subscribe((data:any) => {
          this.createImageFromBlob(data);
        });
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  updateCourse(f:NgForm){
    if(this.images != ''){
      const formData = new FormData();
      formData.append('image', this.images);
      let name = this.course.course_name.split(' ').join('_');
      this.restApi.postImgMethod('addTrainingCourseImg/'+name,formData).subscribe((resp:any) => {
        this.updateCourseData(resp);
      })
    }else{
      this.updateCourseData('');
    }
  }

  updateCourseData(resp){
    if(resp == ''){
      this.course.course_image_url = resp; 
    }else{
      this.course.course_image_url = resp.filepath; 
    }    
    this.course.modified_by = this.tk.user_id;
    this.restApi.postMethod('updateLMSCourse',this.course).subscribe((data:any) => {  
      if(data.status == 200){   
        alert(data.message);
        this.changePagination(this.paginatecnt);
        let element: HTMLElement = document.getElementById('cancel_category') as HTMLElement;
        element.click();
      }else{
        alert(data.message);
        if(data.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  changeStatus(event,id){
    this.course.modified_by = this.tk.user_id;
    this.course.row_id = id;
    (event.target.checked) ? this.course.course_status = "Y" : this.course.course_status = "N";
    this.restApi.postMethod('changeLMSCourseStatus',this.course).subscribe((data:any) => {
      if(data.status == 200){
        this.changePagination(this.paginatecnt);
        alert(data.message);
      }else{
        alert(data.message);
        if(data.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  selectImage(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.images = file;
      this.readURL(event.target.files);
    }
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

  resetForm(f:NgForm){
    f.resetForm(this.course = {category_id:'', course_name:'',course_description:'',row_id:'',course_image_url:'',created_by:'',course_status:'',modified_by:''})
    this.course = {category_id:'', course_name:'',course_description:'',row_id:'',course_image_url:'',created_by:'',course_status:'',modified_by:''};
    this.imageToShow = '';
    (<HTMLInputElement>document.getElementById('blog-image')).value = '';
    this.edit = false;
  }

  changePagination(event){
    let cnt;
    if(event == 'load'){cnt = 1;}else{cnt=event}
    this.restApi.getMethod('getPaginatedCourse/'+cnt).subscribe((resp:any) => {
      if(resp.status == 200){
        this.courselist = resp.data.data;
        if(event == 'load'){
          let total = resp.data.total[0].total, num = total/10, arr = [];
          for(var i=0;i<num;i++){
            arr.push(i+1);
          }
          this.pageIndexes = arr; this.paginatecnt = 1;
        }else{
          this.paginatecnt = event;
        }
        setTimeout(function(){
          let elem = document.getElementsByClassName('page-link');
          for(var i=0;i<elem.length;i++){
            elem[i].classList.remove('active-pagination');
          }
          document.getElementById('pagination_'+cnt).classList.add('active-pagination');
        },10)
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  nextClick(){
    let num = Number(this.paginatecnt);
    if(num < this.pageIndexes.length){
      this.changePagination(num+1);
    }
  }

  previousClick(){
    let num = Number(this.paginatecnt);
    if(num > 1){
      this.changePagination(num-1);
    }
  }
}
