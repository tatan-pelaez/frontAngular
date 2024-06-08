import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { FormhelpService } from 'src/app/services/formhelp.service';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  listadopaises : any = [];
  listadociudades : any = [];
  listadociudadesselect : any = [];
  form: FormGroup = new FormGroup({});
  formData: any;
  constructor(
    private fb: FormBuilder,
    public _formServ : FormhelpService,
  ) { 
    combineLatest([
      this._formServ.getPaises(),
      this._formServ.getCiudades(),
    ]).subscribe(res =>{
      this.listadopaises = res[0].filter(( a: any) => a.BL_ESTADO === 1);
      this.listadociudades = res[1];
    });
    this.formData = this._formServ.getFormData();
    if(this.formData.value){
      setTimeout(() => {
        this.form.patchValue(this.formData.value);
      }, 500);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      CIUDAD: ['', Validators.required],
      PAIS: ['', Validators.required]
    });

    this.form.get('PAIS')!.valueChanges.subscribe(res =>{
      this.listadociudadesselect = this.listadociudades.filter((a : any) => a.FK_PAIS === parseInt(res) && a.BL_ESTADO === 1);
    });

    this.form.valueChanges.subscribe(res =>{
      this._formServ.setFormData(this.form);
    })
    
  }

}
