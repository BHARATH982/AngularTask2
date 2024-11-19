import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
  
  genders : string[] = ['Male','Female','Others'];
  languages: string[] = ['English','Tamil','Spanish'];
   
  personalDetailGroup!: FormGroup;
  personalDetailsFormValid = false;
  setFormData : any = {};
  isSetFormData = false;

  @Output() PDEIsValid = new EventEmitter<boolean>();
  @Output() sendPDEData = new EventEmitter<any>();

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder

  ) {
  }

  ngOnInit() {
   this.createForm();
    this.personalDetailGroup.statusChanges.subscribe((status) => {
      console.log("sending pdf",this.personalDetailGroup.valid)
      this.PDEIsValid.emit(this.personalDetailGroup.valid);
    }); 
    
  }
 
 createForm(){

  this.personalDetailGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
    languages:[[]]

    // firstName: ['', Validators.required],
    // lastName: ['', Validators.required],
    // gender: ['',Validators.required],
    // email: ['', [Validators.required, Validators.email]],
    // phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
  });
 }
  phoneNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const phoneNumberPattern = /^[0-9]{10,15}$/;
    if (control.value && !phoneNumberPattern.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  sendData(){
    this.sendPDEData.emit(this.personalDetailGroup.value);
    
  }

  reset(){
    console.log("pde reset")
    this.personalDetailGroup.reset();
  }

}
