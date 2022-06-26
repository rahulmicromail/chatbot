import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-mentordashboard',
  templateUrl: './mentordashboard.component.html',
  styleUrls: ['./mentordashboard.component.css']
})
export class MentordashboardComponent implements OnInit {
  tk:any = {}; courselist:any = []; imageToShow; pdfurl; ongoinglist:any=[]; lessonstatus:any=[];
  displayMenteeModal = false; displayTable = true;
  details:any=[]; lesson:any=[]; menteestatus='';
  docsList:any=[]; arrLink:any=[]; arrPDF:any=[];

  constructor (public restApi: ApiService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_token')){
      this.tk = jwt_decode(sessionStorage.getItem('user_token'));
      this.fetchUpcomingCourse();
    }else{
      alert("Access Denied. You are not authorized to access without logging in.");
      window.location.href= '/home';
    }
  }

  fetchUpcomingCourse(){ 
    this.restApi.getMethod('getUpComingCourseForMentors/'+this.tk.user_id).subscribe((resp:any) => {
      if(resp.status == 200){
        this.courselist = resp.data;
        this.restApi.getMethod('getOnGoingCourseForMentors/'+this.tk.user_id).subscribe((resptwo:any) => {
          if(resptwo.status == 200){ 
            this.ongoinglist = resptwo.data;
          }else{
            alert(resptwo.message);
            if(resptwo.status == 403){
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

  openLink(id){
    window.open(id);
  }

  openCourseDtls(id){
    this.displayTable = false;
    this.displayMenteeModal = true;
    this.restApi.getAuthMethod('getCourseDetailsForMentor/'+id+'/'+this.tk.user_id).subscribe((resp:any) => {
      if(resp.status == 200){
        this.details = resp.data;
        this.restApi.getAuthMethod('getLessonsForMentees/'+id).subscribe((resptwo:any) => {
          if(resptwo.status == 200){ 
            this.lesson = resptwo.data;
          }else{
            alert(resptwo.message);
            if(resptwo.status == 403){
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
    });
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
    this.restApi.getAuthMethod('getLessonsActivityForMentees/'+id).subscribe((lessondata:any) => {
      if(lessondata.status == 200){
        let lessonstatus = lessondata.data;
        for(var i=0;i<lessonstatus.length;i++){
          document.getElementById('lesson_'+lessonstatus[i].lesson_id+'_'+id).style.display = 'block';
          document.getElementById('lesson_'+lessonstatus[i].lesson_id+'_'+id).classList.add('label-success');
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
  }

  toggleLessonClass(id){
    this.restApi.getAuthMethod('getDocsForLesson/'+id).subscribe((resp:any) => {
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
    })
  }
}
