import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'node_modules-/rxjs';
import { FormhelpService } from 'src/app/services/formhelp.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  datoshistorial : any = [];
  constructor(
    public _formServ : FormhelpService
  ) { 
    combineLatest([
      this._formServ.getPC(),
    ]).subscribe(res =>{
      this._formServ.getHistorial(res[0].ip, res[0].hostname).subscribe(ress =>{
        this.datoshistorial = ress;
      })
    })
  }

  ngOnInit(): void {
  }

}
