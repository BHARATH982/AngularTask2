import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { EducationDetailsComponent } from './education-details/education-details.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dataSource: any[] =[{firstName:'bharath',lastName:'Kumar',gender:'male',email:'bharath@gmail.com',
  phoneNumber:9345400654,collegeName:'Karpagam',degree:'B.E',years:4,city:'Ariyalur'}];
  columnsSchema: any = COLUMNS_SCHEMA;
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);

  personalDetailGroup: FormGroup = new FormGroup({});
  EducationDetailGroup: FormGroup = new FormGroup({});
  
  mergeObj:any;
  @ViewChild('stepper') stepper!: MatStepper;

  @ViewChild('PDE') myInputElement!: PersonalDetailsComponent ;
  @ViewChild('EDE') myInputElement2!: EducationDetailsComponent ;
  constructor(private _formBuilder: FormBuilder) {
    this.isLinear = false;
  }
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  title = 'yasarBroTask2';


  pdeNext = false;
  edeNext = false;
  
  pdeData !: any;
  edeData !: any;

  pdeIsValid(isValid1:boolean){
    console.log("app ",isValid1);
    this.pdeNext = isValid1;
  }

  edeIsValid(isValid2:boolean){
    this.edeNext = isValid2;
  }

  receivePDEData(data:any){
    console.log("pde",data);
    this.pdeData = data;
  }

  receiveEDEData(data:any){
    console.log("ede",data);
    this.edeData = data;
  }

  showTable(){
    this.mergeObj = {...this.pdeData,...this.edeData};
    this.dataSource.push(this.mergeObj);
    this.dataSource = [...this.dataSource];
    console.log(this.dataSource)
    
    this.myInputElement2.reset();
    this.myInputElement.reset();
    this.stepper.reset();
  }

  onStepChange(event: StepperSelectionEvent,stepper:any) {
    //&& !this.educationDetailsFormValid
    if (event.previouslySelectedIndex > event.selectedIndex ) {   
       if (event.previouslySelectedIndex === 1) {
            // this.isResetEducationalDetailsForm += 1
       } else if (event.previouslySelectedIndex === 0) {
       
       }

       stepper.selected.interacted = false;
    }

  }
   
  deleteRow(element: any) {
    const index = this.dataSource.indexOf(element);
    if (index >= 0) {
      this.dataSource.splice(index, 1); // Remove the row from the data source
      this.dataSource = [...this.dataSource]; // Refresh the table
    }
  }

  
}

const COLUMNS_SCHEMA = [
  {
    key: "firstName",
    type: "text",
    label: "FirstName"
},
  {
    key: "lastName",
    type: "text",
    label: "LastName"
},
{
    key: "gender",
    type: "text",
    label: "Gender"
},
{
  key: "email",
  type: "text",
  label: "Email"
},
{
    key: "phoneNumber",
    type: "number",
    label: "Phone Number"
},
 {
  key: "collegeName",
  type: "text",
  label: "College Name",
  
},
{
  key: "degree",
  type: "text",
  label: "Degree",
  
},
{
  key: "years",
  type: "number",
  label: "Years",
},
{
  key: "city",
  type: "text",
  label: "City",
},{
  key: "isEdit",
  type: "isEdit",
  label: "Edit"
},
{ key: 'delete', 
  label: 'Delete', 
  type: 'button' }

]
