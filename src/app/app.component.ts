import { Component } from '@angular/core';
import { ConfiguracionService } from './servicesComponents/configuracion.service';
import { STORAGES } from './interfaces/sotarage';
import { Store } from '@ngrx/store';
import { ConfiguracionAction } from './redux/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'locomproAqui';
  empresa:any = {};

  constructor(
    private _config: ConfiguracionService,
    private _store: Store<STORAGES>,
  ){
    this._store.subscribe((store: any) => {
      console.log(store);
      store = store.name;
      this.empresa = store.configuracion || {};
    });

    this.getEmpresa();
  }

  getEmpresa(){
    this._config.get({ where: {}, limit: 1 }).subscribe(( res:any )=>{
      console.log(res);
      res = res.data[0];
      if( !res ) return false;
      if( res.id != this.empresa.id){
        let accion = new ConfiguracionAction( res, 'post');
        this._store.dispatch( accion );
      }
    },( error:any )=> console.error( error ));
  }
}
