import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    if(window.location.href.indexOf('pcs') > 0 ||window.location.href.indexOf('training') > 0 || window.location.href.indexOf('user') > 0 || window.location.href.indexOf('sns') > 0 || window.location.href.indexOf('events') > 0 || window.location.href.indexOf('profile') > 0 || window.location.href.indexOf('addblog') > 0 || window.location.href.indexOf('attendance') > 0 || window.location.href.indexOf('calendar') > 0 || window.location.href.indexOf('report') > 0 || window.location.href.indexOf('new-home') > 0){
      document.getElementsByTagName('footer')[0].style.display = 'none';
    }else{
      document.getElementsByTagName('footer')[0].style.display = 'block';
    }
  }
}
