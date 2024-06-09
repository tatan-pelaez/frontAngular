import { Component, OnInit } from '@angular/core';
import { FormhelpService } from 'src/app/services/formhelp.service';
import { Page3Component } from '../page3/page3.component';
import { ProcesoService } from 'src/app/services/proceso.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  formData: any;
  formDataDos: any;
  constructor(
    public _formServ : FormhelpService,
    private _proceServ : ProcesoService
  ) { }

  ngOnInit(): void {
  }

  changeLanguage(language: string) {
    this._formServ.idioma = language;
    this._proceServ.inicioproceso();
  }

  viewHistory() {
    this._formServ.page = 4;
  }

  sgtepage(){
    this.formData = this._formServ.getFormData();
    this.formDataDos = this._formServ.getFormDataDos();
    if(this.formData.value){
      const page = this._formServ.page;
      if(page === 1 && !this.formData.invalid){
        this._formServ.page = 2;
      }else if(page === 2 && this.formDataDos.value && !this.formDataDos.invalid){
        this._formServ.page = 3;
      }else{
        alert('Validar los campos obligatorios.')
    }
    }else{
      alert('Validar los campos obligatorios.');
    }
  }

  regresar(){
    const page = this._formServ.page;
    if(page === 2){
      this._formServ.page = 1;
    }
    if(page === 3){
      this._formServ.page = 2;
    }
  }

  inicio(){
    this._formServ.page = 1;
  }

}
