import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { InspeccionesDataProvider } from '../../providers/inspecciones-data/inspecciones-data';
import { OtcrearactividadesPage } from '../otcrearactividades/otcrearactividades';

import { Network } from '@ionic-native/network';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the OtinspeccionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-otinspecciones',
  templateUrl: 'otinspecciones.html',
})
export class OtinspeccionesPage {

  almacen: string = '';
  itemsInspecciones: any;
  tipoOT: string = '';
  validateNumber: boolean;
  validateNumberCoti: boolean;
  validateNumberReti: boolean;
  validateNumberType: boolean;
  validateNumberTypeCoti: boolean;
  validateNumberTypeReti: boolean;
  tipoTrabajo: string;
  username: string;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: InspeccionesDataProvider, private loadingCtrl: LoadingController, public alertCtrl: AlertController, public database: DatabaseProvider, private network: Network) {
    this.almacen = navParams.get('data');
    this.tipoOT = navParams.get('tipoOT');
    this.tipoTrabajo = navParams.get('tipoTrabajo');
    this.username = navParams.get('username');
  }

  showPrompt(descripcion, objeto, item) {
    if (this.tipoTrabajo === 'PPM' && this.tipoOT === 'PMPE01') {
      console.log('Entra al if PMPE01');
      this.showPromptPMPE01(descripcion, objeto, item);
    }
    else {
      console.log('Entra al if PPM');
      this.showPromptPPM(descripcion, objeto, item);
    }
  }

  showPromptPPM(descripcion, objeto, item) {
    const prompt = this.alertCtrl.create({
      title: "<font size=3 color=black>Objeto: " + objeto + "</font>",
      cssClass: 'buttonCss',
      inputs: [
        {
          name: 'valorinspeccion',
          placeholder: 'Ingrese valor',
          value: item.valorinspeccion
        },
      ],
      buttons: [
        {
          text: '+ Actividad',
          cssClass: 'act-button',
          handler: data => {

            this.navCtrl.push(OtcrearactividadesPage, {
              data: this.almacen

            });
          }

        },
        {
          text: 'Cancelar',
          cssClass: 'cancel-button',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          cssClass: 'send-button',
          handler: data => {
            this.validateNumberType = this.validateNumericType(Number(data.valorinspeccion));
            if (this.validateNumberType == false) {
              prompt.setMessage("<font size=2>Valor no es de tipo numérico</font>");
              return false;
            }
            else {
              this.validateNumber = this.validateInspNumber(Number(data.valorinspeccion));
              if (this.validateNumber == false) {
                prompt.setMessage("<font size=2>Rango numérico debe ser de 0 a 100</font>");
                return false;
              } else {



                var self = this;
                let networkType = this.network.type;
                if (networkType === 'none') {

                  self.database.addInspeccion(this.almacen, objeto, data.valorinspeccion, this.username, item.obTypeArr, item.obrTypeArr, item.pointArr, item.pointTypeArr, item.metodo, item.aspecto).then(function (value) {

                    let alert = self.alertCtrl.create({
                      message: '<font size=3 color=black>Se ha ingresado la inspección. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
                      cssClass: 'buttonCss',
                      buttons: [{
                        text: 'Ok',
                        cssClass: 'ok-button'
                      }]
                    });
                    alert.present();
                    return true;

                  }, function (reason) {


                  });
                }
                else {
                  self.dataService.soapinvokeR5InsertarInspecciones(this.almacen, objeto, data.valorinspeccion, this.username, item.obTypeArr, item.obrTypeArr, item.pointArr, item.pointTypeArr, item.metodo, item.aspecto).then(function (R5InspeccionesValue) {
                    return true;

                  }, function (reason) {
                    self.showError("Error al ejecutar servicio de inserción valor PPM");

                  });
                }

              }
            }


          }
        }

      ]
    });
    prompt.setMode('md');
    prompt.present();
  }

  showPromptPMPE01(descripcion, objeto, item) {
    const prompt = this.alertCtrl.create({
      title: "<font size=3 color=black>Ingrese valor</font>",
      subTitle: "<font size=3 color=black>Objeto: " + objeto + "</font>",
      cssClass: 'buttonCss',
      inputs: [
        {
          name: 'valorinspeccioncoti',
          placeholder: 'Valor COTI',
          value: item.valorinspeccion
        },
        {
          name: 'valorinspeccionreti',
          placeholder: 'Valor RETI',
          value: item.valorinspeccion
        }
      ],
      buttons: [
        {
          text: '+ Actividad',
          cssClass: 'act-button',
          handler: data => {

            this.navCtrl.push(OtcrearactividadesPage, {
              data: this.almacen

            });
          }

        },
        {
          text: 'Cancelar',
          cssClass: 'cancel-button',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          cssClass: 'send-button',
          handler: data => {

            if (data.valorinspeccioncoti === '' && data.valorinspeccionreti != '') {
              console.log('Entra a validación de campo RETI');
              this.validateNumberTypeReti = this.validateNumericType(Number(data.valorinspeccionreti));
              if (this.validateNumberTypeReti == false) {
                prompt.setMessage("<font size=2>Valor RETI no es de tipo numérico</font>");
                return false;
              }
              else {
                this.validateNumber = this.validateInspNumber(Number(data.valorinspeccionreti));
                if (this.validateNumber == false) {
                  prompt.setMessage("<font size=2>Rango numérico debe ser de 0 a 100</font>");
                  return false;
                } else {

                  var self = this;
                  let networkType = this.network.type;
                  if (networkType === 'none') {

                    self.database.addInspeccionReti(this.almacen, objeto, data.valorinspeccionreti, this.username).then(function (value) {

                      let alert = self.alertCtrl.create({
                        message: '<font size=3 color=black>Se ha ingresado la inspección RETI. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
                        cssClass: 'buttonCss',
                        buttons: [{
                          text: 'Ok',
                          cssClass: 'ok-button'
                        }]
                      });
                      alert.present();
                      return true;

                    }, function (reason) {


                    });
                  }
                  else {
                    self.dataService.soapinvokeR5InsertarInspeccionesPMPE01RETI(this.almacen, objeto, data.valorinspeccionreti, this.username).then(function (R5InspeccionesRetiValue) {
                      return true;

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio de inserción valor RETI");

                    });
                  }

                }
              }
            }
            if (data.valorinspeccioncoti != '' && data.valorinspeccionreti === '') {

              this.validateNumberTypeCoti = this.validateNumericType(Number(data.valorinspeccioncoti));
              if (this.validateNumberTypeCoti == false) {
                prompt.setMessage("<font size=2>Valor COTI no es de tipo numérico</font>");
                return false;
              }
              else {
                this.validateNumber = this.validateInspNumber(Number(data.valorinspeccioncoti));
                if (this.validateNumber == false) {
                  prompt.setMessage("<font size=2>Rango numérico debe ser de 0 a 100</font>");
                  return false;
                } else {

                  var self = this;
                  let networkType = this.network.type;
                  if (networkType === 'none') {

                    self.database.addInspeccionCoti(this.almacen, objeto, data.valorinspeccioncoti, this.username).then(function (value) {

                      let alert = self.alertCtrl.create({
                        message: '<font size=3 color=black>Se ha ingresado la inspección COTI. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
                        cssClass: 'buttonCss',
                        buttons: [{
                          text: 'Ok',
                          cssClass: 'ok-button'
                        }]
                      });
                      alert.present();
                      return true;

                    }, function (reason) {


                    });
                  }
                  else {
                    self.dataService.soapinvokeR5InsertarInspeccionesPMPE01Coti(this.almacen, objeto, data.valorinspeccioncoti, this.username).then(function (R5InspeccionesCotiValue) {
                      return true;

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio inserción valor COTI");

                    });
                  }

                }
              }
            }
            if (data.valorinspeccioncoti != '' && data.valorinspeccionreti != '') {

              this.validateNumberTypeCoti = this.validateNumericType(Number(data.valorinspeccioncoti));
              this.validateNumberTypeReti = this.validateNumericType(Number(data.valorinspeccionreti));
              if (this.validateNumberTypeCoti == false || this.validateNumberTypeReti == false) {
                prompt.setMessage("<font size=2>Valor no es de tipo numérico</font>");
                return false;
              }
              else {
                this.validateNumberCoti = this.validateInspNumber(Number(data.valorinspeccioncoti));
                this.validateNumberReti = this.validateInspNumber(Number(data.valorinspeccionreti));
                if (this.validateNumberCoti == false || this.validateNumberReti == false) {
                  prompt.setMessage("<font size=2>Rango numérico debe ser de 0 a 100</font>");
                  return false;
                } else {

                  var self = this;
                  let networkType = this.network.type;
                  if (networkType === 'none') {

                    self.database.addInspeccionCoti(self.almacen, objeto, data.valorinspeccioncoti, self.username).then(function (value) {
                      self.database.addInspeccionReti(self.almacen, objeto, data.valorinspeccionreti, self.username).then(function (value) {

                        let alert = self.alertCtrl.create({
                          message: '<font size=3 color=black>Se ha ingresado la inspección RETI/COTI. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
                          cssClass: 'buttonCss',
                          buttons: [{
                            text: 'Ok',
                            cssClass: 'ok-button'
                          }]
                        });
                        alert.present();
                        return true;

                      }, function (reason) {


                      });

                    }, function (reason) {


                    });
                  }
                  else {
                    self.dataService.soapinvokeR5InsertarInspeccionesPMPE01Coti(self.almacen, objeto, data.valorinspeccioncoti, self.username).then(function (R5InspeccionesCotiValue) {
                      self.dataService.soapinvokeR5InsertarInspeccionesPMPE01RETI(self.almacen, objeto, data.valorinspeccionreti, self.username).then(function (R5InspeccionesRetiValue) {
                        return true;

                      }, function (reason) {
                        self.showError("Error al ejecutar servicio inserción valores RETI/COTI");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio inserción valores RETI/COTI");

                    });
                  }

                }
              }


            }

            if (data.valorinspeccioncoti === '' && data.valorinspeccionreti === '') {
              prompt.setMessage("<font size=2>Debe ingresar uno o ambos valores</font>");
              return false;
            }

          }
        }

      ]
    });
    prompt.setMode('md');
    prompt.present();
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.showLoading();
    var self = this;
    console.log('tipoOT: ' + this.tipoOT);
    console.log('tipoTrabajo: ' + this.tipoTrabajo);
    if (this.tipoTrabajo === 'PPM' && this.tipoOT === 'PMPE01') {
      self.dataService.soapinvokeR5ObtenerInspeccionesPMPE01(this.almacen).then(function (R5InspeccionesValue) {
        self.itemsInspecciones = R5InspeccionesValue;
        self.loading.dismiss();

      }, function (reason) {
        self.showError("Error al ejecutar servicio R5ObtenerInspeccionesPMPE01");

      });
    }
    else {
      self.dataService.soapinvokeR5ObtenerInspecciones(this.almacen).then(function (R5InspeccionesValue) {
        self.itemsInspecciones = R5InspeccionesValue;
        self.loading.dismiss();

      }, function (reason) {
        self.showError("Error al ejecutar servicio R5ObtenerInspecciones");

      });
    }


  }

  validateInspNumber(data) {
    if (parseFloat(data) >= 0.00 && parseFloat(data) <= 100.00) {
      return true;
    }
    else {
      return false;
    }
  }

  validateNumericType(data) {
    return !isNaN(Number(data.toString()));
  }



  enviarInspecciones() {
    this.navCtrl.pop();
    let alert = this.alertCtrl.create({
      message: '<font size=3 color=black>Las inspecciones se han enviado correctamente</font>',
      cssClass: 'buttonCss',
      buttons: [{
        text: 'Ok',
        cssClass: 'ok-button'
      }]
    });
    alert.setMode('md');
    alert.present();

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

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    var self = this;
    console.log('tipoOT: ' + this.tipoOT);
    console.log('tipoTrabajo: ' + this.tipoTrabajo);
    if (this.tipoTrabajo === 'PPM' && this.tipoOT === 'PMPE01') {
      self.dataService.soapinvokeR5ObtenerInspeccionesPMPE01(this.almacen).then(function (R5InspeccionesValue) {
        self.itemsInspecciones = R5InspeccionesValue;
        refresher.complete();

      }, function (reason) {
        self.showError("Error al ejecutar servicio R5ObtenerInspeccionesPMPE01");
        refresher.complete();

      });
    }
    else {
      self.dataService.soapinvokeR5ObtenerInspecciones(this.almacen).then(function (R5InspeccionesValue) {
        self.itemsInspecciones = R5InspeccionesValue;
        refresher.complete();

      }, function (reason) {
        self.showError("Error al ejecutar servicio R5ObtenerInspecciones");
        refresher.complete();

      });
    }
  }

}
