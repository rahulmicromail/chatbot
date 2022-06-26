import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  title:any; 
  data:any=[];
  options:any={}; mon = '0';
  width:any; membertype = 'member';
  height:any; lmsdisplay = false;
  tk:any={}; graphresp:any=[];
  attendancelist:any=[]; tofilter:any=[]; originalfilter:any=[]; srslist:any=[];

  monthArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  @Input() filter = {name:'',srs_name:'',role_name:'',from_date:''}

  constructor(public restApi: ApiService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user_token')){
      this.getEventlist();
    }else{
      alert("Access Denied. You are not authorized to access without logging in.");
      window.location.href= '/home';
    }
  }

  getEventlist(){
    this.restApi.getAuthMethod('getBirthday').subscribe((resp:any) => {
      if(resp.status == 200){
        this.attendancelist = resp.data;
        this.tofilter = resp.data;
        this.originalfilter = resp.data;
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  filterList(event,type){
    var result;
    if((event.keyCode == 8 || event.keyCode == 46) || (type == 'srs_id')){
      var el = Array.from(document.getElementsByClassName('filter-fld') as HTMLCollectionOf<HTMLElement>);
      let cnt = 0;
      for(var j=0; j<el.length ; j++){  
        if((el[j] as HTMLInputElement).value == ''){
          cnt++;
        }
      }
      if(cnt == el.length){
        result = this.originalfilter;
      }else{
        result = this.valFilter();
      }      
    }else{
      result = this.tofilter.filter(function(item){
        if(String(item[type]).toLowerCase().indexOf(String(event.target.value).toLowerCase()) > -1){
          return item;
        }
      })
    }
  
    this.tofilter = result;
    this.attendancelist = result;
  }

  valFilter(){
    var el = Array.from(document.getElementsByClassName('filter-fld') as HTMLCollectionOf<HTMLElement>);
    this.tofilter = [];
    var arr = this.originalfilter;
    var list =[];
    for(var j=0; j<el.length ; j++){     
      if((el[j] as HTMLInputElement).value != ''){
        for(var i=0; i<arr.length; i++){
          if(String(arr[i][el[j].id]).toLowerCase().indexOf(String((el[j] as HTMLInputElement).value).toLowerCase()) > -1){
            list.push(arr[i]);
          }
        }
      }
    }
    return list;
  }

  exportData() {
    var table = document.getElementById("pcs-excel-table") as HTMLTableElement;
    var rows =[]; var column1, column2, column3, column4;
    for(var i=0,row; row = table.rows[i];i++){
      if(!table.rows[i].classList.contains('excel-hide')){
        column1 = row.cells[0].innerText;
        column2 = row.cells[1].innerText;
        column3 = row.cells[2].innerText;
        column4 = row.cells[3].innerText;
        rows.push([column1,column2,column3,column4]);
      }
    }
    var csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function(rowArray){
      row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "event-report.csv");
    document.body.appendChild(link);
    link.click();
  }

  filterDate(){
    this.mon = this.filter.from_date.split('-')[1];
    this.restApi.getAuthMethod('getBirthday/'+this.mon).subscribe((resp:any) => {
      if(resp.status == 200){
        this.attendancelist = resp.data;
        this.tofilter = resp.data;
        this.originalfilter = resp.data;
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }

  reset(){
    this.filter = {name:'',srs_name:'',role_name:'',from_date:''}
    this.getEventlist();
  }

  printPageArea(){
    window.print();
  }

  generatePDF() {
    var data = document.getElementById('printable_box');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('events-report.pdf');
    });
  }

  membersType(event){
    let url;
    if(event.target.value == 'member'){
      url = 'getEventMemberReportList';
    }else if(event.target.value == 'all'){
      url = 'getEventAllUsersReportList';
    }else{
      url = 'getEventNonMemberReportList';
    }
    this.restApi.getAuthMethod(url).subscribe((resp:any) => {
      if(resp.status == 200){
        this.attendancelist = resp.data;
        this.tofilter = resp.data;
        this.originalfilter = resp.data;
      }else{
        alert(resp.message);
        if(resp.status == 403){
          window.location.href= '/home';
        }
      }
    })
  }
}
