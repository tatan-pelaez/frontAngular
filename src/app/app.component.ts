import { Component } from '@angular/core';
import { FormhelpService } from './services/formhelp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba';
  constructor(
    public _formServ : FormhelpService
  ){
  }
}
