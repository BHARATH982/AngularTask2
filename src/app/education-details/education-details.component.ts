import { Component, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-education-details',
  templateUrl: './education-details.component.html',
  styleUrls: ['./education-details.component.css']
})
export class EducationDetailsComponent {
      
  years : string[] = ['3','4'];
  educationDetailsFormValid = false;

  @Input() isResetForm : number = 0;
  @Output() EDEIsValid  = new EventEmitter<boolean>();
  @Output() sendEDEData = new EventEmitter<any>();

  constructor(
    private router : Router,
    private _formBuilder: FormBuilder  
  ) {
  }
   
  EducationDetailGroup!:FormGroup;
  

  createForm(){

    this.EducationDetailGroup = this._formBuilder.group({
      collegeName: ['',Validators.required],
      degree:['',Validators.required],
      years:[''],
      city:['',Validators.required],
      dummy:['']
    });
  
   }

  ngOnInit() {
      this.createForm();

    this.EducationDetailGroup.statusChanges.subscribe(()=>{
      console.log("valid",this.EducationDetailGroup.valid);
       this.EDEIsValid.emit(this.EducationDetailGroup.valid);
    })
  }


  // secondFormGroup:FormGroup = this._formBuilder.group({
  //   collegeName: ['', Validators.required],
  //   degree:['',Validators.required],
  //   years:['',Validators.required],
  //   city:['']
  // });
  
  sendData(){
    this.sendEDEData.emit(this.EducationDetailGroup.value);
    console.log('val emiteed',this.EducationDetailGroup.value)
  }
  
  reset(){
    console.log("ede reset")
    this.EducationDetailGroup.reset();
  }

}