import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { UsersComponent } from './admin/users/users.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { MenteeRegisterComponent } from './admin/mentee-register/mentee-register.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { FellowshipComponent } from './admin/fellowship/fellowship.component';
import { TrainingCategoryComponent } from './training/training-category/training-category.component';
import { TrainingDasboardComponent } from './training/training-dasboard/training-dasboard.component';
import { TrainingCourseComponent } from './training/training-course/training-course.component';
import { TrainingLessonComponent } from './training/training-lesson/training-lesson.component';
import { TrainingClassComponent } from './training/training-class/training-class.component';
import { MentordashboardComponent } from './training/mentordashboard/mentordashboard.component';
import { FullcalendarComponent } from './admin/fullcalendar/fullcalendar.component';
import { AdmindashboardComponent } from './training/admindashboard/admindashboard.component';
import { ChatInboxComponent } from './user/chat-inbox/chat-inbox.component';
import { PostquizComponent } from './admin/postquiz/postquiz.component';
import { ReportComponent } from './admin/report/report.component';
import { HeaderComponent } from './common/header/header.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"  },
  { path: "home", component: HomeComponent },
  { path: "admin", component: HeaderComponent },
  { path: "profile", component: ProfileComponent },
  { path: "calendar", component: FellowshipComponent },
  { path: "register/:encodedurl", component: MenteeRegisterComponent },
  { path: "forgot-password/:encodedurl", component: ForgotpasswordComponent },
  { path: "training/dasboard", component: TrainingDasboardComponent},
  { path: "training/mentor/dasboard", component: MentordashboardComponent},
  { path: "training/category", component: TrainingCategoryComponent},
  { path: "training/course", component: TrainingCourseComponent},
  { path: "training/lesson", component: TrainingLessonComponent},
  { path: "training/class", component: TrainingClassComponent},
  { path:"new-calendar", component:FullcalendarComponent },
  { path:"admin/dashboard", component:AdmindashboardComponent },
  { path:"chat", component:ChatInboxComponent },
  { path:"add-assessment", component:PostquizComponent },
  { path:"report", component:ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation : 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
