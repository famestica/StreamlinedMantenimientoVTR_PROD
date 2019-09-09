import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OtrotacionesPage } from '../otrotaciones/otrotaciones';
import { OtinspeccionesPage } from '../otinspecciones/otinspecciones';
import { OtcrearactividadesPage } from '../otcrearactividades/otcrearactividades';
import { ComentariosPage } from '../comentarios/comentarios';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { ComentariosDataProvider } from '../../providers/comentarios-data/comentarios-data';
import { OtcrearmaterialesPage } from '../otcrearmateriales/otcrearmateriales';
import { DetalleOtPreventivaDataProvider } from '../../providers/detalle-ot-preventiva-data/detalle-ot-preventiva-data';
import { Base64 } from '@ionic-native/base64';
import { DropboxProvider } from '../../providers/dropbox/dropbox';

/**
 * Generated class for the OtdetallepreventivaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-otdetallepreventiva',
  templateUrl: 'otdetallepreventiva.html',
})
export class OtdetallepreventivaPage {

  items: any;
  r5personel: any;
  myForm: FormGroup;
  valorOT: string = '';
  tipoOT: string = '';
  descOt: string;
  latitud: any;
  longitud: any;
  nombreactivo: string;
  itemsComentarios: any;
  userTecnico: string;
  itemComentarioCount: number;
  estadoOT: string;
  descripcionActividad: string;
  codTarea: string;
  depto: string;
  tipoTrabajo: string;
  rutTecnico: string;
  estadoLista: any = [];
  equipo: string;
  almacen: string;
  base64Image: string;
  actividad: string = '';
  loading: Loading;
  descactividad: string = '';
  itemsSistemas: any;
  itemsEstados: any;
  itemsMtto: any;
  itemsUrl: any = [];
  itemsUpload: any = [];
  claseSistema: string;
  descTarea: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private loadingCtrl: LoadingController, public geolocation: Geolocation
    , private camera: Camera, public dataService: ComentariosDataProvider, public detalleOtPrevDataService: DetalleOtPreventivaDataProvider, public alertCtrl: AlertController, public dropbox: DropboxProvider, private base64: Base64) {

    this.items = navParams.get('data');
    this.r5personel = navParams.get('r5personel');
    this.userTecnico = navParams.get('username');

    this.myForm = this.createMyForm();
    this.myForm.controls['numerost'].disable();
    this.myForm.controls['idst'].disable();
    this.myForm.controls['nombreactivo'].disable();
    this.myForm.controls['tipoot'].disable();
    this.myForm.controls['direccion'].disable();
    this.myForm.controls['activoafectado'].disable();
    this.myForm.controls['estado'].disable();
    this.myForm.controls['sistema'].disable();
  }

  saveData() {
    
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
    this.descripcionActividad = this.items.descactividad;
    this.descOt = this.items.descripcion;
    this.equipo = this.items.equipo;
    this.rutTecnico = this.r5personel[0].rutTecnico;
    this.almacen = this.r5personel[0].almacenTecnico;
    this.estadoOT = this.items.estado;
    this.depto = this.items.codDepto;
    this.claseSistema = this.items.claseSistema;
    this.codTarea = this.items.tarea;
    this.descTarea = this.items.desctarea;

    this.showLoading();
    var self = this;
    this.detalleOtPrevDataService.soapinvokeR5countaddetails(this.valorOT).then(function (CountComment) {
      self.itemComentarioCount = parseInt(CountComment.toString());
      self.detalleOtPrevDataService.soapinvokeR5authEstados(self.userTecnico, self.estadoOT).then(function (valueR5Auth) {
        self.itemsEstados = valueR5Auth;
        self.estadoLista = self.itemsEstados[0].estado;
        self.myForm.get('estado').setValue(self.estadoLista);
        self.detalleOtPrevDataService.soapinvokeR5ucodesMtto().then(function (valueR5CodesMtto) {
          self.itemsMtto = valueR5CodesMtto;
          self.detalleOtPrevDataService.soapinvokeR5ucodesSistemas().then(function (valueR5CodesSistemas) {
            self.itemsSistemas = valueR5CodesSistemas;

          }, function (reason) {
            self.showError("Error al ejecutar servicio R5UcodesSistemas");

          });

        }, function (reason) {
          self.showError("Error al ejecutar servicio R5UcodesMtto");

        });

      }, function (reason) {
        self.showError("Error al ejecutar servicio R5Auth");

      });
    }, function (reason) {
      self.showError("Error al ejecutar servicio Contador Comentarios");

    });


    this.loading.dismiss();
  }


  private createMyForm() {
    return this.formBuilder.group({
      numerost: [this.items.numerost],
      idst: [this.items.idst],
      nombreactivo: [this.items.nombreactivo],
      tipoot: [this.items.tipoot],
      direccion: [this.items.direccion],
      sistema: [this.items.claseSistema],
      activoafectado: [''],
      estado: [''],
      tipomtto: [''],
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
         
        });

      }, (err) => {
       
      });
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

  goToOtComentarios() {
    this.navCtrl.push(ComentariosPage, {
      data: this.valorOT,
      username: this.userTecnico
    });
  }

  goToOtActividades() {
    this.navCtrl.push(OtcrearactividadesPage, {
      data: this.valorOT,
      equipo: this.items.nombreactivo,
      username: this.userTecnico,
      actividad: this.actividad,
      estadoOt: this.items.estado,
      tipoOt: this.tipoOT,
      descOt: this.descOt,
      codTarea: this.codTarea,
      descripcionActividad: this.descripcionActividad,
      descTarea: this.descTarea,
      depto: this.depto,
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

  goToOtInspecciones() {
    this.navCtrl.push(OtinspeccionesPage, {
      data: this.valorOT,
      equipo: this.items.nombreactivo,
      username: this.userTecnico,
      actividad: this.actividad,
      estadoOt: this.items.estado,
      tipoOt: this.tipoOT,
      descOt: this.descOt,
      tipoTrabajo: this.tipoTrabajo
      
    });
  }

  goToOtRotaciones() {
    this.navCtrl.push(OtrotacionesPage, {
      data: this.valorOT,
      almacenParam: this.almacen,
      rutTecParam: this.rutTecnico
    });
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



}
