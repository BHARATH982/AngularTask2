import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parent-details',
  templateUrl: './parent-details.component.html',
  styleUrls: ['./parent-details.component.css']
})
export class ParentDetailsComponent {
  
  constructor(
    private _formBuilder: FormBuilder  
  ) {}
  
  @Output() fatherNameSentEvent = new EventEmitter<string>();
  
  parentDetailGroup!: FormGroup;

  ngOnInit() {
    this.parentDetailGroup = this._formBuilder.group({
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
    });

    this.parentDetailGroup.get('fatherName')?.valueChanges.subscribe((currFatherName)=>{
      this.fatherNameSentEvent.emit(currFatherName);
    })
    
  }
   
  

}


