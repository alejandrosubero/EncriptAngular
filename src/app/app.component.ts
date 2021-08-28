import { Component, OnInit } from '@angular/core';
import { EncryptService } from './service/encrypt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EncriptAngular';
  titleObjetos = 'Objetos EncriptAngular';
  mensaje = '';
  descrypt = '';
  encript = '';

  objetoSample = [{ id: 1, mane: 'Julio' }, { id: 2, mane: 'Margarita' }];
  objetoSampleEncript = new Array<string>();
  objetoSampleDescrypt = new Array<string>();

  constructor(private encryptService: EncryptService) { }


  ngOnInit(): void {
    this.encryptService.get().subscribe(x => {
      let clave = this.encryptService.decryptKey(x);
      console.log('GENERADA====== ', clave);
    });
  }


  // tslint:disable-next-line: typedef
  encrypMessage() {
    this.encryptService.encrypt(this.mensaje).then(Encript => {
      this.encript = Encript;
    });
  }


  // tslint:disable-next-line: typedef
  decryptMessage() {
    this.encryptService.decrypt(this.encript).then(y => {
      this.descrypt = y;
    });
  }


  // tslint:disable-next-line: typedef
  encrypObject() {
    this.objetoSample.forEach(object => {
      // tslint:disable-next-line: no-shadowed-variable
      this.encryptService.encryptObject(object).then(object => {
        this.objetoSampleEncript.push(object);
      });

    });
  }


  // tslint:disable-next-line: typedef
  decryptObject() {
    this.objetoSampleEncript.forEach(encriptObject => {
      this.encryptService.decryptObject(encriptObject).then(object => {
        this.objetoSampleDescrypt.push(object);
      });
    });
  }


  // tslint:disable-next-line: typedef
  sendObject(item) {
    this.encryptService.encryptObject(item).then(objectTosend => {
      const objetoToSend = JSON.stringify(objectTosend);
      this.encryptService.enviarMensaje(objetoToSend).subscribe(x => {
        console.log(x);
      });
    });
  }


}


