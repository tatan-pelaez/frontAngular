import { Component, OnInit } from '@angular/core';
import { FormhelpService } from 'src/app/services/formhelp.service';
import { ProcesoService } from 'src/app/services/proceso.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {
  valorunitario = 1;
  constructor(
    public _formServ : FormhelpService,
    public _proServ : ProcesoService,
  ) {
    this._proServ.inicioproceso();
  }

  ngOnInit(): void {
  }
}
