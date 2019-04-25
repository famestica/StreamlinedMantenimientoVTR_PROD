import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtcrearactividadesPage } from '../otcrearactividades/otcrearactividades';
import { ComentariosPage } from '../comentarios/comentarios';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { ComentariosDataProvider } from '../../providers/comentarios-data/comentarios-data';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { OtcrearmaterialesPage } from '../otcrearmateriales/otcrearmateriales';
import { DetalleOtProgramadaDataProvider } from '../../providers/detalle-ot-programada-data/detalle-ot-programada-data';
import { Base64 } from '@ionic-native/base64';
import { DropboxProvider } from '../../providers/dropbox/dropbox';

import { Network } from '@ionic-native/network';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the OtdetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-otdetalle',
  templateUrl: 'otdetalle.html',
})
export class OtdetallePage {

  items: any;
  myForm: FormGroup;
  valorOT: string = '';
  tipoOT: string = '';
  latitud: any;
  longitud: any;
  loading: Loading;
  itemsComentarios: any;
  itemComentarioCount: number;
  base64Image: string;
  options: BarcodeScannerOptions;
  scannedData: any = {};
  tipoOt: string;
  scanData: string;
  valorEtapa: string;
  actividad: string = '';
  descactividad: string = '';
  r5personel: any;
  estadoOT: string;
  descOt: string;
  nombreactivo: string;
  descripcion: string;
  depto: string;
  clase: string;
  causa: string;
  etapa: string;
  accion: string;
  itemsSistemas: any;
  itemsEstados: any;
  itemsEquipos: any;
  tipoTrabajo: string;
  itemsEtapa: any;
  almacen: string;
  itemsCausa: any;
  itemsAccion: any;
  userTecnico: string;
  rutTecnico: string;
  itemsUrl: any = [];
  itemsUpload: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public geolocation: Geolocation, private loadingCtrl: LoadingController
    , private camera: Camera, public dataService: ComentariosDataProvider, public scanner: BarcodeScanner, public detalleOtProgDataService: DetalleOtProgramadaDataProvider, public alertCtrl: AlertController, public database: DatabaseProvider, private network: Network, public dropbox: DropboxProvider, private base64: Base64) {
    this.items = navParams.get('data');
    this.r5personel = navParams.get('r5personel');
    this.userTecnico = navParams.get('username');
    this.itemsEquipos = [
      { equipo: this.items.nombreactivo, }];
    this.myForm = this.createMyForm();

  }

  saveData() {
    let networkType = this.network.type;

    if (networkType === 'none') {
      this.showLoading();
      var self = this;
      self.database.addActualizarOtProgramada(this.valorOT, this.descripcion, this.tipoTrabajo, this.depto, this.clase, this.etapa, this.causa, this.accion).then(function (value) {


        let alert = self.alertCtrl.create({
          message: '<font size=3 color=black>La actividad se ha actualizado correctamente. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
          cssClass: 'buttonCss',
          buttons: [{
            text: 'Ok',
            cssClass: 'ok-button'
          }]
        });
        alert.present();

      }, function (reason) {


      });
      this.loading.dismiss();

    }
    else {
      this.showLoading();
      var self = this;
      this.detalleOtProgDataService.soapinvokeR5CrearActividad(this.valorOT, this.descripcion, this.tipoTrabajo, this.depto, this.clase, this.etapa, this.causa, this.accion).then(function (valorInsercion) {


        let alert = self.alertCtrl.create({
          message: '<font size=3 color=black>La actividad se ha actualizado correctamente.</font>',
          cssClass: 'buttonCss',
          buttons: [{
            text: 'Ok',
            cssClass: 'ok-button'
          }]
        });
        alert.present();

        console.log(valorInsercion);
      }, function (reason) {
        self.showError("Error al ejecutar servicio para actualizar OT");

      });
      this.loading.dismiss();
    }



  }

  ionViewDidLoad() {

    this.dropbox.setAccessToken("heBg2DZjZxAAAAAAAAAAEJKGasOnhHn8ZJXnndvnRKg8ip7EDLZpERfK41a8UVww");

  }

  ionViewWillEnter() {
    this.valorOT = this.items.numerost;
    this.tipoOT = this.items.tipoot;
    this.tipoTrabajo = this.items.tipootdb;
    this.actividad = this.items.actividad;
    this.descactividad = this.items.desctarea;
    this.rutTecnico = this.r5personel[0].rutTecnico;
    this.almacen = this.r5personel[0].almacenTecnico;
    this.estadoOT = this.items.estado;
    this.clase = this.items.claseSistema;
    this.depto = this.items.codDepto;



    this.showLoading();
    var self = this;
    this.detalleOtProgDataService.soapinvokeR5countaddetails(this.valorOT).then(function (CountComment) {
      self.itemComentarioCount = parseInt(CountComment.toString());
      self.detalleOtProgDataService.soapinvokeR5authEstados(self.userTecnico, self.estadoOT).then(function (valueR5Auth) {
        self.itemsEstados = valueR5Auth;

        self.detalleOtProgDataService.soapinvokeR5ucodesSistemas().then(function (valueR5CodesSistemas) {
          self.itemsSistemas = valueR5CodesSistemas;

        }, function (reason) {
          self.showError("Error al ejecutar servicio R5UcodesSistemas");

        });



      }, function (reason) {
        self.showError("Error al ejecutar servicio R5Auth");

      });
    }, function (reason) {
      self.showError("Error al ejecutar servicio Contador Comentarios");

    });


    this.loading.dismiss();


  }

  private getBlob(b64Data: string, contentType: string) {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.toString().replace(/^[^,]+,/, '');
    b64Data = b64Data.toString().replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }



  private createMyForm() {
    return this.formBuilder.group({
      numerost: [this.items.numerost, Validators.required],
      idst: [this.items.idst, Validators.required],
      nombreactivo: ['', Validators.required],
      descactivo: [this.items.nombreactivo, Validators.required],
      descripcion: [this.items.descripcion, Validators.required],
      tipoot: [this.items.tipoot, Validators.required],
      prioridad: [''],
      localidad: [''],
      departamento: [''],
      sistema: [''],
      impacto: [''],
      activoafectado: ['', Validators.required],
      comuna: [''],
      nodo: [''],
      cuadrante: [''],
      estado: ['', Validators.required],
      etapa: ['', Validators.required],
      causa: ['', Validators.required],
      accion: ['', Validators.required],
    });
  }

  goToOtMateriales() {
    this.navCtrl.push(OtcrearmaterialesPage, {
      data: this.valorOT,
      actividad: this.actividad,
      descactividad: this.descactividad,
      rutTecnico: this.rutTecnico,
      almacen: this.almacen
    });
  }

  goToOtActividades() {
    this.navCtrl.push(OtcrearactividadesPage, {
      data: this.valorOT,
      equipo: this.nombreactivo,
      username: this.userTecnico,
      actividad: this.actividad,
      estadoOt: this.items.estado

    });
  }

  goToOtComentarios() {
    this.navCtrl.push(ComentariosPage, {
      data: this.valorOT,
      username: this.userTecnico
    });
  }

  cargarGeolocalizacion() {

    this.geolocation.getCurrentPosition().then((position) => {
      this.longitud = position.coords.longitude;
      this.latitud = position.coords.latitude;

    }, (err) => {
      console.log(err);
    });

  }

  getPicture() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this
      .camera
      .getPicture(options)
      .then((imageData) => {
        var self = this;
        self.showLoading();
        self.base64Image = imageData;
        self.base64.encodeFile(self.base64Image).then((base64File: string) => {
          let imageBlob = self.getBlob(base64File, "Content-Type: image/jpeg");
          let rand = Math.floor(Math.random() * 2000000000000) + 1;
          let nombreArchivo = rand + '.jpg';

          self.dropbox.uploadFile(imageBlob, nombreArchivo).then(data => {
            self.dropbox.getPublicUrl(nombreArchivo).then(dataDos => {
              self.itemsUpload = dataDos;
              self.itemsUrl = JSON.parse(self.itemsUpload);
              self.dataService.soapinvokeR5countaddetails(self.valorOT).then(function (countComents) {
                self.dataService.soapinvokeR5addetailsinterface(self.valorOT, 'Link Foto: ' + self.itemsUrl.url, self.userTecnico, countComents).then(function (valueR5addetailsinterface) {
                  self.loading.dismiss();
                  let alert = self.alertCtrl.create({
                    message: '<font size=3 color=black>Imagen subida exitosamente</font>',
                    cssClass: 'buttonCss',
                    buttons: [{
                      text: 'Ok',
                      cssClass: 'ok-button'
                    }]
                  });
                  alert.present();

                }, function (reason) {
                  self.showError("Error al ejecutar servicio Insercion Comentarios");

                });

              }, function (reason) {
                self.showError("Error al ejecutar servicio Contador Comentarios");

              });
            });
          });


        }, (err) => {
          console.log(err);
        });

      }, (err) => {
        console.log(err);
      });
  }

  scan() {
    this.options = {
      prompt: 'Escanear QR Equipo'
    };
    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;
      this.myForm.get('activoafectado').setValue(this.scannedData.text);

    }, (err) => {
      console.log('Error: ', err);
      this.scanData = err;

    })

  }

  checkform() {
    console.log(this.myForm.value);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  obtenerEtapa() {
    this.showLoading();
    var self = this;
    this.detalleOtProgDataService.soapinvokeR5CierreCorrectivoEtapa(this.nombreactivo).then(function (valorEtapa) {
      self.itemsEtapa = valorEtapa;
    }, function (reason) {
      self.showError("Error al ejecutar servicio Obtener Etapa");

    });
    this.loading.dismiss();
  }

  obtenerCausa() {
    this.showLoading();
    var self = this;
    this.detalleOtProgDataService.soapinvokeR5CierreCorrectivoCausa(this.nombreactivo, this.etapa).then(function (valorCausa) {
      self.itemsCausa = valorCausa;
    }, function (reason) {
      self.showError("Error al ejecutar servicio Obtener Etapa");

    });
    this.loading.dismiss();
  }

  obtenerAccion() {
    this.showLoading();
    var self = this;
    this.detalleOtProgDataService.soapinvokeR5CierreCorrectivoAccion(this.nombreactivo, this.etapa, this.causa).then(function (valorAccion) {
      self.itemsAccion = valorAccion;
    }, function (reason) {
      self.showError("Error al ejecutar servicio Obtener Etapa");

    });
    this.loading.dismiss();
  }

}
