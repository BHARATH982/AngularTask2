import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-declaration-details',
  templateUrl: './declaration-details.component.html',
  styleUrls: ['./declaration-details.component.css']
})
export class DeclarationDetailsComponent {
  
  constructor(private _formBuilder: FormBuilder){
    
  }
  
  thirdFormGroup = this._formBuilder.group({
    declarationBox: ['', Validators.required],
  });

}
