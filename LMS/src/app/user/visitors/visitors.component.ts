import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/app.service';
import { url } from 'src/app/shared/app.constant';
import { NgForm } from '@angular/forms';
import { state } from 'src/app/shared/app.state';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit {
  @Input() visitorsdetails = {visitor_name:'', visitor_email_id:'', visitor_subject:'', visitor_contact_number:'', visitor_state:'', visitor_city:'',visitor_pincode:'',message:''}

  submitted :boolean = false;
  emailPattern = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";  
  public option_str:any;
  displayform ='block'; displayDtls = 'none'; 
  constructor(public restApi: ApiService) { }

  ngOnInit(): void {
  }

  onFormSubmit() {
    console.log("Full Address");  
  }

  changeemail(event) {
    console.log(event.type);
}

// backToList(){
//   this.displayDtls = 'none';
//   this.displayform = 'block';
//   setTimeout(function(){
//     this.option_str = document.getElementById("visitor_state");
//     this.option_str.length=0;
//     this.option_str.options[0] = new Option('Select State','');
//     this.option_str.selectedIndex = 0;
//     for (var i=0; i< state.state_arr.length; i++) {
//       this.option_str.options[this.option_str.length] = new Option(state.state_arr[i], state.state_arr[i]);
//     }
//   },100)
// }
// print_state(){
//   this.option_str = document.getElementById("visitor_state");
//   this.option_str.length=0;
//   this.option_str.options[0] = new Option('Select State','');
//   this.option_str.selectedIndex = 0;
//   for (var i=0; i< state.state_arr.length; i++) {
//     this.option_str.options[this.option_str.length] = new Option(state.state_arr[i], state.state_arr[i]);
//   }
// }

// print_city(event:Event){
//   let city_index:number = event.target["selectedIndex"];
//   this.option_str = document.getElementById("visitor_city");
//   this.option_str.length=0;
//   this.option_str.options[0] = new Option('Select City','');
//   this.option_str.selectedIndex = 0;
//   let city_arr = state.s_a[city_index].split("|");
//   for (var i=0; i<city_arr.length; i++) {
//     this.option_str.options[this.option_str.length] = new Option(city_arr[i],city_arr[i]);
//   }
// }

  visitorDetails(f:NgForm) {
  	this.submitted = true;
   // event.preventDefault();
    this.restApi.postMethod('visitors',this.visitorsdetails).subscribe((resp:any) => {     
      alert(resp.message);   
      f.resetForm()
    })
  }
}