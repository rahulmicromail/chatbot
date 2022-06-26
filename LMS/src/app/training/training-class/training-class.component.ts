import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import jwt_decode from "jwt-decode";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-training-class',
  templateUrl: './training-class.component.html',
  styleUrls: ['./training-class.component.css']
})
export class TrainingClassComponent implements OnInit {
  imageToShow:any; images=''; menteeslist:any=[]; courselist:any=[]; classlist:any = []; catlist:any=[];
  tk:any = {}; edit = false; displayClassModal = 'none'; displayMenteeModal = 'none';mainTable = 'block'; displayClassListModal = 'none'; displayTable = 'inline-table';
  attendees:any; total:any; srslist; classrowid; cor_id; cat_id; class_user:any=[];
  public mentee:any;
  morerow:any=[0]; cnt=0; new; lesson:any=[];
  todo:any = [];done:any = []; generate = true;
  totalClass:any = []; role_name;
  displayClassLessonModal = 'none'; class_lesson:any = [];

  totalRecords:Number = 1; p: Number = 1; pageIndexes:any =[]; paginatecnt:Number;
  totalAllRecords:Number = 1; pageAllIndexes:any =[]; paginateallcnt:Number;

  @Input() class = {cat_id:'',class_type:'',class_name:'',start_date:'',end_date:'',connection_link:'',created_by:'',description:'',modified_by:'',course_id:'',instructor_id:'',row_id:'',class_status:''}
  @Input() menteedtls = {vals:[],class_id:''}
  @Input() updatelessonstatus = {class_id:'',lesson_id:'',instructor_id:'',lesson_status:''};
  @Input() uplssstatus = {dtls:[]}
  @Input() code = {course_name:'',class_start_date_mon_yr:''}

  constructor(public restApi: ApiService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_token')){
      this.tk = jwt_decode(sessionStorage.getItem('user_token'));
      this.role_name = this.tk.role_name;
      this.changePagination('load');
      this.fetchCategory();
      this.fetchMentees();
    }else{
      alert("Access Denied. You are not authorized to access without logging in.");
      window.location.href= '/home';
    }
  }

  submit(f){
    if(this.edit==false)
    this.addClass(f);
    else
    this.updateClass(f);

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

  catChange(){
    this.restApi.getMethod('getCourseFromCat/'+this.class.cat_id).subscribe((resp:any) => {
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

  fetchMentees(){
    this.restApi.getMethod('getMentees/'+this.tk.user_id+'/'+this.tk.srs_id).subscribe((resp:any) => {
      if(resp.status == 200){
        this.menteeslist = resp.data;
        this.mentee = resp.data;
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  addMentees(){
    let arr = this.done;
    var dte = new Date();   
    let a=[], b=[];
    for(var i=0;i<arr.length;i++){
      let newArray = [];
      for(var key in arr[i]){
        if(key != 'mentee_status'){
          newArray.push(arr[i][key]);
        }
      }
      newArray.push(this.classrowid);
      newArray.push(this.cat_id);
      newArray.push(this.cor_id);
      newArray.push(this.tk.user_id);
      newArray.push(dte.getFullYear()+'-'+((dte.getMonth())+1)+'-'+dte.getDate()+' '+dte.getHours()+':'+dte.getMinutes()+':'+dte.getSeconds());
      newArray.push("Y");
      b.push(newArray);
    }
    this.menteedtls.vals = b;
    this.menteedtls.class_id = this.classrowid;
    this.restApi.postMethod('addMenteeToClass',this.menteedtls).subscribe((resp:any) => {
      alert(resp.message);
      if(resp.status == 200){
        setTimeout(function(){
          location.reload();
        },1000)
      }else if(resp.status == 403){
        window.location.href= '/home';
      }
    });
  }

  getMentees(id,course_id,cat_id){
    this.classrowid = id;
    this.cor_id = course_id;
    this.cat_id = cat_id;
    
    this.restApi.getMethod('getMentees/'+this.tk.user_id+'/'+this.tk.srs_id).subscribe((respone:any) => {
      if(respone.status == 200){
        this.restApi.getMethod('getLmsMentees/'+id).subscribe((resptwo:any) => {
          if(resptwo.status == 200){
            this.displayTable = 'none';
            this.displayMenteeModal = 'block';
            if(resptwo.data.length == 0){
              this.new = true;
              this.todo = respone.data; //this.menteeslist;
              this.done = [];
            }else{
              this.new = false;
              let res = respone.data;
              let arr =[], arrtwo=[];
              
              let res2 = resptwo.data;
              for (var i = 0, len = res2.length; i < len; i++) { 
                for (var j = 0, len2 = res.length; j < len2; j++) { 
                  if (res2[i].user_id === res[j].user_id) {
                    res.splice(j, 1);
                    len2=res.length;
                  }
                }
              }

              this.todo = res;
              for(var i=0;i<resptwo.data.length;i++){
                if(resptwo.data[i].mentee_status == 'Y'){
                  arrtwo.push(resptwo.data[i]);
                }
              }
              this.done = arrtwo;
            }
            setTimeout(function(){
              (<HTMLInputElement>document.getElementById('user_cnt')).innerHTML = String(document.querySelectorAll('.fromunit').length);
              (<HTMLInputElement>document.getElementById('present_cnt')).innerHTML = String(document.querySelectorAll('.tounit').length);
            },500)
          }else{
            alert(resptwo.message);
            if(resptwo.status == 403){
              window.location.href= '/home';
            }
          }
        });
      }else{
        alert(respone.message);
        if(respone.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  removeMentee(id){
    var txt = confirm("Are you sure you want to delete this user ?");
    if (txt == true) {
      this.restApi.getMethod('disableMentee/'+this.tk.user_id+'/'+id).subscribe((resp:any) => {
        if(resp.status == 200){
          this.toggleUser(id);
        }else{
          alert(resp.message);
          if(resp.status == 403){
            window.location.href= '/home';
          }
        }
      })
    }
  }

  closeMenteeDiv(){
    this.displayMenteeModal = 'none';
    this.displayTable = 'inline-table';
    this.fetchMentees();
  }

  fetchCourse(){
    this.restApi.getMethod('getLMSCourse/Y').subscribe((resp:any) => {
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

  openClassModal(){
    this.displayClassModal='block';
    this.edit = false;
    this.generate = true;
    document.getElementsByTagName('body')[0].classList.add('modal-open');
  }

  closeClassModal(f:NgForm){
    f.resetForm()
    this.displayClassModal='none';
    this.edit = true;
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    let element: HTMLElement = document.getElementById('cancel_category') as HTMLElement;
    element.click();
  }

  addClass(f:NgForm){
    this.class.created_by = this.tk.user_id;
    this.class.instructor_id = this.tk.user_id;   
    this.restApi.postMethod('addLMSClass',this.class).subscribe((resp:any) => {
      if(resp.status == 200){
        this.changePagination(this.paginatecnt);
        alert(resp.message);
        this.generate = true;
        let element: HTMLElement = document.getElementById('cancel_category') as HTMLElement;
        element.click();
        this.closeClassModal(f);
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      } 
    })
  }

  editClass(id){
    this.edit = true;
    this.generate = false;
    this.class.row_id = id;
    this.displayClassModal = 'block';
    this.restApi.getMethod('getLMSClass/'+id).subscribe((resp:any) => {
      if(resp.status == 200){
        this.class = resp.data[0];
        let classobj = resp.data[0];
        this.class.cat_id = resp.data[0].category_id;
        this.restApi.getMethod('getCourseFromCat/'+this.class.cat_id).subscribe((resp2:any) => {
          if(resp2.status == 200){
            this.courselist = resp2.data;
            this.class.course_id = resp.data[0].course_id;
          }else{
            alert(resp2.message);
            if(resp2.status == 403){
              window.location.href= '/home';
            }
          }
        });
        setTimeout(function(){
          let create_dte = new Date(classobj.start_date);
          let month, dte, hrs, mins;
          (create_dte.getDate() < 10) ? dte = '0'+create_dte.getDate() : dte = create_dte.getDate();
          (create_dte.getMonth() < 10) ? month = '0'+(create_dte.getMonth()+1) : month = (create_dte.getMonth()+1);
          (create_dte.getHours() < 10) ? hrs = '0'+create_dte.getHours() : hrs = create_dte.getHours();
          (create_dte.getMinutes() < 10) ? mins = '0'+create_dte.getMinutes() : mins = create_dte.getMinutes();

          (<HTMLInputElement>document.getElementById('class_start_date')).value = create_dte.getFullYear()+'-'+month+'-'+dte+'T'+hrs+':'+mins;

          create_dte = new Date(classobj.end_date);
          (create_dte.getDate() < 10) ? dte = '0'+create_dte.getDate() : dte = create_dte.getDate();
          (create_dte.getMonth() < 10) ? month = '0'+(create_dte.getMonth()+1) : month = (create_dte.getMonth()+1);
          (create_dte.getHours() < 10) ? hrs = '0'+create_dte.getHours() : hrs = create_dte.getHours();
          (create_dte.getMinutes() < 10) ? mins = '0'+create_dte.getMinutes() : mins = create_dte.getMinutes();
          (<HTMLInputElement>document.getElementById('class_end_date')).value = create_dte.getFullYear()+'-'+month+'-'+dte+'T'+hrs+':'+mins;
        },100)
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  updateClass(f:NgForm){
    this.class.modified_by = this.tk.user_id;
    this.class.start_date = this.changeDateFormat(this.class.start_date);
    this.class.end_date = this.changeDateFormat(this.class.end_date);
    this.restApi.postMethod('updateLMSClass',this.class).subscribe((data:any) => {
      if(data.status == 200){
        alert('Class Updated Successfully.');
        this.changePagination(this.paginatecnt);
        this.displayClassModal = 'none';
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

  changeStatus(event,id,type){
    this.class.modified_by = this.tk.user_id;
    this.class.row_id = id;
    (event.target.checked) ? this.class.class_status = "Y" : this.class.class_status = "N";
    this.restApi.postMethod('changeLMSClassStatus',this.class).subscribe((data:any) => {
      if(data.status == 200){  
        if(type == 'all'){
          this.changeAllPagination(this.paginateallcnt);  
        }else{
          this.changePagination(this.paginatecnt);
        }     
        alert("The status has been changed successfully");
      }else{
        alert(data.message);
        if(data.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  drop(event: CdkDragDrop<string[]>,type:any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    setTimeout(function(){
      (<HTMLInputElement>document.getElementById('user_cnt')).innerHTML = String(document.querySelectorAll('.fromunit').length);
      (<HTMLInputElement>document.getElementById('present_cnt')).innerHTML = String(document.querySelectorAll('.tounit').length);
    },500)
  }

  changeDateFormat(newdte){
    let create_dte = new Date(newdte);
    let month, dte, hrs, mins;
    (create_dte.getDate() < 10) ? dte = '0'+create_dte.getDate() : dte = create_dte.getDate();
    ((create_dte.getMonth()+1) < 10) ? month = '0'+(create_dte.getMonth()+1) : month = (create_dte.getMonth()+1);
    (create_dte.getHours() < 10) ? hrs = '0'+create_dte.getHours() : hrs = create_dte.getHours();
    (create_dte.getMinutes() < 10) ? mins = '0'+create_dte.getMinutes() : mins = create_dte.getMinutes();
    return create_dte.getFullYear()+'-'+month+'-'+dte+' '+hrs+':'+mins;
  }

  toggleUser(id:any){
    this.restApi.getMethod('getLmsClassMentees/'+id).subscribe((resp:any) => {
      if(resp.status == 200){ 
        this.class_user = resp.data;
        var classlen = document.getElementsByClassName('table-hidden-row');
        for(let i=0;i<classlen.length;i++){
          (document.getElementsByClassName("table-hidden-row")[i] as HTMLElement).style.display = 'none'
        }
        document.getElementById('row'+id).style.display = 'contents';
        this.fetchLmsClassLesson(id,'toggle','');
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })   
  }

  closeToggle(id){
    document.getElementById('row'+id).style.display = 'none';
  }

  addMore(){
    this.cnt++;
    this.morerow.push(this.cnt);
  }

  updateLessonStatus(lesson_id,class_id){  
    this.restApi.getMethod('getMenteeIDForClass/'+class_id).subscribe((resp:any) => {
      if(resp.status == 200){ 
        if(resp.data.length > 0){
          let b = [];
          var a = new Date(), month = (a.getMonth()+1), mon = '', dte = a.getDate(), dt = '';
          month < 10 ? mon = "0"+month : mon = String(month);
          dte < 10 ? dt = "0"+dte : dt = String(dte);
          var reqdte = a.getFullYear()+'-'+mon+'-'+dt+' '+a.getHours()+':'+a.getMinutes()+':'+a.getSeconds();       
          for(var i=0; i<resp.data.length; i++){
            let arr = [];
            arr.push(Number(class_id));
            arr.push(Number(lesson_id));
            arr.push(this.tk.user_id);
            arr.push('Y');
            arr.push(resp.data[i].mentee_id);
            arr.push(reqdte);
            b.push(arr);
          }
          this.uplssstatus.dtls = b;
          this.restApi.postMethod('updateLessonMenteeStatus',this.uplssstatus).subscribe((data:any) => {
            this.fetchLmsClassLesson(class_id,'update',lesson_id);
            alert(data.message);
          })  
        }else{
          alert('Kindly add Mentee to this class to update the status');
        }
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  fetchLmsClassLesson(id,type,lessid){
    this.restApi.getMethod('getLMSClassLesson/'+id).subscribe((resp:any) => {
      if(resp.status == 200){ 
        if(type == 'toggle'){
          this.lesson = resp.data;
        }
        this.getActiveLesson(id);
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }     
    })
  }

  getActiveLesson(id) {
    this.restApi.getMethod('getActiveLesson/'+id).subscribe((resp:any) => {
      if(resp.status == 200){ 
        for(var i=0; i<resp.data.length;i++){
          document.getElementById('lesson_'+id+'_'+resp.data[i].lesson_id).classList.add('active');
        }
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  courseChange($event){
    let txt = $event.target.options[$event.target.options.selectedIndex].text;
    this.code.course_name = txt.split(' ').join('_');
  }
  
  generateCode(f:NgForm){
    let codedte = new Date(this.class.start_date);
    let dte = String(codedte.getMonth()+1)+String(codedte.getFullYear());
    this.code.class_start_date_mon_yr = dte;
    this.restApi.postMethod('generateCode',this.code).subscribe((resp:any) => {
      if(resp.status == 200){
        this.generate = false;
        this.class.class_name = dte+'_'+resp.data+'_'+this.code.course_name;
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  showAllClasses(){
    this.mainTable = 'none';
    this.displayTable = 'none';
    this.displayClassListModal = 'block';
    this.restApi.getMethod('getAllLMSClass').subscribe((resp:any) => {
      if(resp.status == 200){
        this.totalClass = resp.data;
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  closeClassListDiv(){
    this.displayClassListModal = 'none';
    this.mainTable = 'block';
    this.displayTable = 'inline-table';
  }

  resetForm(f:NgForm,g:NgForm){
    f.resetForm( {cat_id:'',class_type:'',class_name:'',start_date:'',end_date:'',connection_link:'',created_by:'',description:'',modified_by:'',course_id:'',instructor_id:'',row_id:'',class_status:''});
    g.resetForm( {cat_id:'',class_type:'',class_name:'',start_date:'',end_date:'',connection_link:'',created_by:'',description:'',modified_by:'',course_id:'',instructor_id:'',row_id:'',class_status:''})
  }

  changePagination(event){
    let cnt;
    if(event == 'load'){cnt = 1;}else{cnt=event}
    this.restApi.getMethod('getPaginatedClass/'+this.tk.user_id+'/'+cnt).subscribe((resp:any) => {
      if(resp.status == 200){
        this.classlist = resp.data.data;
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

  changeAllPagination(event){
    let cnt;
    if(event == 'load'){cnt = 1;}else{cnt=event}
    this.restApi.getMethod('getPaginatedAllClass/'+cnt).subscribe((resp:any) => {
      if(resp.status == 200){
        this.totalClass = resp.data.data;
        if(event == 'load'){
          this.mainTable = 'none';
          this.displayTable = 'none';
          this.displayClassListModal = 'block';

          let total = resp.data.total[0].total, num = total/10, arr = [];
          for(var i=0;i<num;i++){
            arr.push(i+1);
          }
          this.pageAllIndexes = arr; this.paginateallcnt = 1;
        }else{
          this.paginateallcnt = event;
        }
        setTimeout(function(){
          let elem = document.getElementsByClassName('page-all-link');
          for(var i=0;i<elem.length;i++){
            elem[i].classList.remove('active-all-pagination');
          }
          document.getElementById('pagination_all_'+cnt).classList.add('active-all-pagination');
        },10)
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    });
  }

  nextAllClick(){
    let num = Number(this.paginateallcnt);
    if(num < this.pageIndexes.length){
      this.changeAllPagination(num+1);
    }
  }

  previousAllClick(){
    let num = Number(this.paginateallcnt);
    if(num > 1){
      this.changeAllPagination(num-1);
    }
  }

  http_string:string
  checkedhttp:boolean
  includehttp(event:any){
    this.http_string = event.target.value;
    if(this.http_string.includes('http'))
     this.checkedhttp = true
      else 
      this.checkedhttp = false
     // f.resetForm();
  }

  editClassLessonBox(id){
    this.restApi.getMethod('getLMSClassLesson/'+id).subscribe((resp1:any) => {
      if(resp1.status == 200){
        this.displayClassLessonModal = 'block';
        document.getElementsByTagName('body')[0].classList.add('modal-open');
        document.getElementsByTagName('html')[0].classList.add('modal-open');
        for(var i = 0;i<resp1.data.length;i++){
          resp1.data[i].class_id = id;
        }
        this.class_lesson = resp1.data;
        this.restApi.getMethod('getActiveAllLesson/'+id).subscribe((resp:any) => {
          if(resp.status == 200){
            for(var i=0; i<resp.data.length;i++){
              document.getElementById('classlesson_'+id+'_'+resp.data[i].lesson_id).classList.add('active');
            }
          }else{
            alert(resp.message);
            if(resp.status == 403){
              window.location.href= '/home';
            }
          }
        });
      }else{
        alert(resp1.message);
        if(resp1.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  updateClassLessonStatus(lesson_id,class_id){
    this.updatelessonstatus.class_id = class_id; 
    this.updatelessonstatus.lesson_id = lesson_id;
    this.updatelessonstatus.instructor_id = this.tk.user_id;
    if(document.getElementById('classlesson_'+class_id+'_'+lesson_id).classList.contains('active')){
      this.updatelessonstatus.lesson_status = 'N';
    }else{
      this.updatelessonstatus.lesson_status = 'Y';
    }
    this.restApi.postMethod('updateLessonStatus',this.updatelessonstatus).subscribe((data:any) => {
      if(data.status == 200){
        this.restApi.getMethod('getActiveAllLesson/'+class_id).subscribe((resp:any) => {
          if(resp.status == 200){
            let elem = document.getElementsByClassName('lesson-class-list_'+class_id);
            for(var i=0; i<elem.length; i++){
              elem[i].classList.remove('active');
            }
            for(var i=0; i<resp.data.length;i++){
              document.getElementById('classlesson_'+class_id+'_'+resp.data[i].lesson_id).classList.add('active');
            }
            alert(data.message);
          }else{
            alert(resp.message);
            if(resp.status == 403){
              window.location.href= '/home';
            }
          }
        });
      }else{
        alert(data.message);
        if(data.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  closeClassLessonModal(){
    this.displayClassLessonModal='none';
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    document.getElementsByTagName('html')[0].classList.remove('modal-open');
  }
}
