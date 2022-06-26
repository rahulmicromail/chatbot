import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { DashboardComponent } from 'angular-google-charts';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full"  },
  { path: "home", component: HomeComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "profile", component: ProfileComponent },
  // { path: "calendar", component: FellowshipComponent },
  // { path: "register/:encodedurl", component: MenteeRegisterComponent },
  // { path: "forgot-password/:encodedurl", component: ForgotpasswordComponent },
  // { path: "training/dasboard", component: TrainingDasboardComponent},
  // { path: "training/mentor/dasboard", component: MentordashboardComponent},
  // { path: "training/category", component: TrainingCategoryComponent},
  // { path: "training/course", component: TrainingCourseComponent},
  // { path: "training/lesson", component: TrainingLessonComponent},
  // { path: "training/class", component: TrainingClassComponent},
  // { path:"new-calendar", component:FullcalendarComponent },
  // { path:"admin/dashboard", component:AdmindashboardComponent },
  // { path:"chat", component:ChatInboxComponent },
  // { path:"add-assessment", component:PostquizComponent },
  // { path:"report", component:ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation : 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
