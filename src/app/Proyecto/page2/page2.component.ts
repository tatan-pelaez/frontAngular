import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormhelpService } from 'src/app/services/formhelp.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  formDos: FormGroup = new FormGroup({});
  formData: any;
  constructor(
    private fb: FormBuilder,
    public _formServ : FormhelpService,
  ) {
    this.formData = this._formServ.getFormDataDos();
    if(this.formData.value){
      setTimeout(() => {
        this.formDos.patchValue(this.formData.value);
      }, 500);
    }
  }

  ngOnInit(): void {
    this.formDos = this.fb.group({
      PRESUPUESTO: ['', Validators.required],
    });

    this.formDos.valueChanges.subscribe((res: any) =>{
      this._formServ.setFormDataDos(this.formDos);
    })
  }
}
