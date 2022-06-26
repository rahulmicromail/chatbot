import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './shared/app.service';
import { RouterModule,Router, NavigationEnd } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
//import interactionPlugin from '@fullcalendar/interaction'; // a plugin */
//import { NgxEditorModule } from 'ngx-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GoogleChartsModule } from 'angular-google-charts';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import {NgxPaginationModule} from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { QuillModule } from 'ngx-quill';
import { OrgchartModule } from '@dabeng/ng-orgchart';
import { ChartsModule } from 'ng2-charts';
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
//import { SwiperModule } from "swiper/angular";
//import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { HomeComponent } from './user/home/home.component';

import { SwiperModule } from 'swiper/angular';

import { UsersComponent } from './admin/users/users.component';
import { MenteeRegisterComponent } from './admin/mentee-register/mentee-register.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { FellowshipComponent } from './admin/fellowship/fellowship.component';

import { VisitorsComponent } from './user/visitors/visitors.component';
import { TrainingCategoryComponent } from './training/training-category/training-category.component';
import { TrainingCourseComponent } from './training/training-course/training-course.component';
import { TrainingDasboardComponent } from './training/training-dasboard/training-dasboard.component';
import { TrainingClassComponent } from './training/training-class/training-class.component';
import { TrainingLessonComponent } from './training/training-lesson/training-lesson.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { CustomValidatorDirective } from './shared/app.validator';
import { CKEditorModule } from 'ng2-ckeditor';
import { MentordashboardComponent } from './training/mentordashboard/mentordashboard.component';
import { FullcalendarComponent } from './admin/fullcalendar/fullcalendar.component';
import { AdmindashboardComponent } from './training/admindashboard/admindashboard.component';
import { ChatInboxComponent } from './user/chat-inbox/chat-inbox.component';
import { PostquizComponent } from './admin/postquiz/postquiz.component';
import { ReportComponent } from './admin/report/report.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  //interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UsersComponent,
    MenteeRegisterComponent,
    ProfileComponent,
    FellowshipComponent,
    VisitorsComponent,
    TrainingCategoryComponent,
    TrainingCourseComponent,
    TrainingDasboardComponent,
    TrainingClassComponent,
    TrainingLessonComponent,
    ForgotpasswordComponent,  
    CustomValidatorDirective,   
    MentordashboardComponent,
    FullcalendarComponent,  
    AdmindashboardComponent, 
    ChatInboxComponent, PostquizComponent, ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    //NgxSpinnerModule,
    RouterModule,
    ToastrModule.forRoot(),
    SwiperModule,
    FullCalendarModule,
    //NgxEditorModule
    AngularEditorModule,
    DragDropModule,
    GoogleChartsModule,
    ChartsModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    NgxPaginationModule,
    CarouselModule,
    SwiperModule,
    ScrollingModule,
    OrgchartModule,
    QuillModule.forRoot(), 
    CKEditorModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
