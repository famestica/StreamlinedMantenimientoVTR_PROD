import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActividadesDataProvider } from '../../providers/actividades-data/actividades-data';
import { ComentariosDataProvider } from '../../providers/comentarios-data/comentarios-data';
import { Base64 } from '@ionic-native/base64';
import { DropboxProvider } from '../../providers/dropbox/dropbox';
import { Network } from '@ionic-native/network';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the OtcrearactividadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-otcrearactividadnueva',
  templateUrl: 'otcrearactividadnueva.html',
})
export class OtcrearactividadnuevaPage {

  items: any;
  myForm: FormGroup;
  valorOT: string = '';
  valorFilter: number;
  base64Image: string;
  loading: Loading;
  checkactividad: boolean = false;
  codigoctr: any;
  tarea: any;
  equipo: string;
  motivorep: any;
  estadoOt: string;
  notasVacio: string;
  userTecnico: string;
  itemsCodigoActCtr: any;
  itemsTareas: any;
  itemsMotivoRep: any;
  numActividad: number;
  tipoOt: string;
  descOt: string;
  numActividadInc: number;
  checkActividadString: string;
  notas: string;
  horasestimadas: string;
  itemsUrl: any = [];
  itemsUpload: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private camera: Camera, private loadingCtrl: LoadingController
    , public alertCtrl: AlertController, public dataService: ActividadesDataProvider, public comentariosDataService: ComentariosDataProvider, public database: DatabaseProvider, private network: Network, public dropbox: DropboxProvider, private base64: Base64) {
    this.valorOT = navParams.get('data');
    this.userTecnico = navParams.get('username');
    this.equipo = navParams.get('equipo');
    this.estadoOt = navParams.get('estadoOt');
    this.numActividad = navParams.get('actividad');
    this.tipoOt = navParams.get('tipoOt');
    this.descOt = navParams.get('descOt');
    this.myForm = this.createMyForm();
  }

  saveData() {
    console.log(this.myForm.value);
  }

  ionViewDidLoad() {

    this.dropbox.setAccessToken("heBg2DZjZxAAAAAAAAAAEJKGasOnhHn8ZJXnndvnRKg8ip7EDLZpERfK41a8UVww");
  }

  ionViewWillEnter() {
    this.showLoading();
    var self = this;

    self.dataService.soapinvokeR5ucodesTareas().then(function (valueR5CodesTareas) {
      self.itemsTareas = valueR5CodesTareas;

      self.dataService.soapinvokeR5ucodesMotivoRep().then(function (valueR5CodesMotivoRep) {

        self.itemsMotivoRep = valueR5CodesMotivoRep;
        self.loading.dismiss();

      }, function (reason) {
        self.showError("Error al ejecutar servicio R5UcodesMotivoRep");

      });



    }, function (reason) {
      self.showError("Error al ejecutar servicio R5UcodesTareas");

    });
  }

  private createMyForm() {
    return this.formBuilder.group({
      horasestimadas: ['', Validators.required],
      tarea: ['', Validators.required],
      codigoactividad: [''],
      tecnicoplanificado: [this.userTecnico, Validators.required],
      checkactividad: [false],
      desctarea: [''],
      equipo: [this.equipo, Validators.required],
      notas: [''],
      motivorep: ['', Validators.required],
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
              self.comentariosDataService.soapinvokeR5countaddetails(self.valorOT).then(function (countComents) {
                self.comentariosDataService.soapinvokeR5addetailsinterface(self.valorOT, 'Link Foto: ' + self.itemsUrl.url, self.userTecnico, countComents).then(function (valueR5addetailsinterface) {
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

  enviarActividad() {
    let networkType = this.network.type;
    if (this.checkactividad == true) {
      const prompt = this.alertCtrl.create({
        message: "<font size=3 color=black>¿Confirma envío Completado y 100% Avance?</font>",
        cssClass: 'buttonCss',
        buttons: [
          {
            text: 'Enviar',
            handler: data => {

              if (networkType === 'none') {
                this.showLoading();
                var self = this;
                if (self.notas === undefined) {
                  self.notasVacio = '';
                }
                else {
                  self.notasVacio = self.notas;

                }
                self.checkActividadString = '+';
                self.numActividadInc = self.numActividad++;
                self.database.addCrearActividad(self.valorOT, self.estadoOt, self.notasVacio, self.userTecnico, self.tarea, self.checkActividadString, self.horasestimadas, self.numActividadInc, self.equipo, self.tipoOt, self.descOt).then(function (value) {

                  self.navCtrl.pop();
                  let alert = self.alertCtrl.create({
                    message: '<font size=3 color=black>La actividad se ha enviado exitosamente. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
                    cssClass: 'buttonCss',
                    buttons: [{
                      text: 'Ok',
                      cssClass: 'ok-button'
                    }]
                  });
                  alert.present();

                }, function (reason) {


                });

              }
              else {
                this.showLoading();
                var self = this;
                if (self.notas === undefined) {
                  self.notasVacio = '';
                }
                else {
                  self.notasVacio = self.notas;

                }
                self.checkActividadString = '+';
                self.numActividadInc = self.numActividad++;
                self.dataService.soapinvokeR5EventInterfacePpmCreate(self.valorOT, self.estadoOt, self.notasVacio, self.userTecnico, self.tarea, self.checkActividadString, self.horasestimadas, self.numActividadInc, self.equipo, self.tipoOt, self.descOt).then(function (valueR5EventCreate) {

                  self.navCtrl.pop();
                  let alert = self.alertCtrl.create({
                    message: '<font size=3 color=black>La actividad se ha enviado exitosamente</font>',
                    cssClass: 'buttonCss',
                    buttons: [{
                      text: 'Ok',
                      cssClass: 'ok-button'
                    }]
                  });
                  alert.setMode('md');
                  alert.present();


                }, function (reason) {
                  self.showError("Error al ejecutar servicio R5EventInterfacePpmCreate");

                });

              }

            },
            cssClass: 'cancelaract-button'
          },
          {
            text: 'Cancelar',
            handler: data => {
            },
            cssClass: 'exitact-button'
          }
        ]
      });
      prompt.setMode('md');
      prompt.present();
    }
    else {

      if (networkType === 'none') {
        this.showLoading();
        var self = this;
        if (self.notas === undefined) {
          self.notasVacio = '';
        }
        else {
          self.notasVacio = self.notas;

        }
        self.checkActividadString = '-';
        self.numActividadInc = this.numActividad++;
        console.log(self.numActividadInc);
        self.database.addCrearActividad(self.valorOT, self.estadoOt, self.notasVacio, self.userTecnico, self.tarea, self.checkActividadString, self.horasestimadas, self.numActividadInc, self.equipo, self.tipoOt, self.descOt).then(function (value) {

          self.navCtrl.pop();
          let alert = self.alertCtrl.create({
            message: '<font size=3 color=black>La actividad se ha enviado exitosamente. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
            cssClass: 'buttonCss',
            buttons: [{
              text: 'Ok',
              cssClass: 'ok-button'
            }]
          });
          alert.present();

        }, function (reason) {


        });


      }
      else {
        this.showLoading();
        var self = this;
        if (self.notas === undefined) {
          self.notasVacio = '';
        }
        else {
          self.notasVacio = self.notas;

        }
        self.checkActividadString = '-';
        self.numActividadInc = this.numActividad++;
        self.dataService.soapinvokeR5EventInterfacePpmCreate(self.valorOT, self.estadoOt, self.notasVacio, self.userTecnico, self.tarea, self.checkActividadString, self.horasestimadas, self.numActividadInc, self.equipo, self.tipoOt, self.descOt).then(function (valueR5EventCreate) {

          self.navCtrl.pop();
          let alert = self.alertCtrl.create({
            message: '<font size=3 color=black>La actividad se ha enviado exitosamente</font>',
            cssClass: 'buttonCss',
            buttons: [{
              text: 'Ok',
              cssClass: 'ok-button'
            }]
          });
          alert.setMode('md');
          alert.present();


        }, function (reason) {
          self.showError("Error al ejecutar servicio R5EventInterfacePpmUpdate");

        });
      }

    }


  }

  llenadoCampos() {
    this.valorFilter = this.itemsTareas.findIndex(k => k.tareaItem == this.tarea);
    this.myForm.get('desctarea').setValue(this.itemsTareas[this.valorFilter].tareaDesc);

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
