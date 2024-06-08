import { Injectable } from '@angular/core';
import { FormhelpService } from './formhelp.service';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  datospc : any = [];
  datos : any = [];
  pais : any = [];
  moneda : any =[];
  public datosprincipales : any = {};
  constructor(
    private _formServ : FormhelpService,
  ) { }


  public inicioproceso(){
    const monedaseleccionada = this._formServ.idioma;
    const formuno = this._formServ.formData.value;
    const formdos = this._formServ.formDataDos.value;
    combineLatest([
      this._formServ.getClima(formuno.CIUDAD),
      this._formServ.getPaises(),
      this._formServ.getPC(),
    ]).subscribe(res =>{
      this.datospc = res[2];
      if(res){
        this.datos = res[0];
        const paisdestino = res[1].find((a : any) => a.PK_PAIS === parseInt(formuno.PAIS));
        this.datosprincipales.PAISDESTINO = paisdestino.TX_NOMBRE;
        this.datosprincipales.MONEDAREPRESENTACION = paisdestino.TX_CODIGO_MONEDA;
        this.datosprincipales.CIUDADDESTINO = formuno.CIUDAD;
        this.datosprincipales.PRESUPUESTO = formdos.PRESUPUESTO;
        this.datosprincipales.LONGITUD = this.datos.coord.lon;
        this.datosprincipales.LATITUD = this.datos.coord.lat;
        this.datosprincipales.HUMEDAD = this.datos.main.humidity;
        this.datosprincipales.TEMPERATURA = this.datos.main.temp;
        this.datosprincipales.TEMPERATURAMAXIMA = this.datos.main.temp_max;
        this.datosprincipales.TEMPERATURAMINIMA = this.datos.main.temp_min;
        this.convercash(monedaseleccionada)
      }
    })
  }

  convercash(monedaseleccionada : any){
    this._formServ.getcash(monedaseleccionada,this.datosprincipales.MONEDAREPRESENTACION, this.datosprincipales.PRESUPUESTO).subscribe((res : any) =>{
      this.datosprincipales.NOMBREMONEDA = res['rates'][this.datosprincipales.MONEDAREPRESENTACION]['currency_name'];
      this.datosprincipales.PRECIO = res['rates'][this.datosprincipales.MONEDAREPRESENTACION]['rate'];
      this.datosprincipales.CONVERSION = res['rates'][this.datosprincipales.MONEDAREPRESENTACION]['rate_for_amount'];
      this.datosprincipales.IPCONSULTA = this.datospc.ip;
      this.datosprincipales.NOMBREPC = this.datospc.hostname;
      this.datosprincipales.ORIGEN = this._formServ.idioma;
      this._formServ.postHistorial(this.datosprincipales).subscribe(res =>{

      });
    });
  }
}
