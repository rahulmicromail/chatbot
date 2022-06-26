import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './shared/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sing And Share';
  constructor (
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public ApiService: ApiService,
    public location: Location,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) {
  }

  ngOnInit(){
    
  }
}
