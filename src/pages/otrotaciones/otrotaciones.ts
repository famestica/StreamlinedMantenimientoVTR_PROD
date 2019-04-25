import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { RotacionDataProvider } from '../../providers/rotacion-data/rotacion-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Network } from '@ionic-native/network';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the OtrotacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-otrotaciones',
  templateUrl: 'otrotaciones.html',
})
export class OtrotacionesPage {

  ot: string = '';
  itemsNuevos: any;
  itemsAntiguos: any;
  ruttecnico: string;
  loading: Loading;
  almacen: string;
  myForm: FormGroup;
  itemAntiguo: any;
  itemNuevo: any;
  itemAnt: string;
  itemNew: string;
  itemAntVacio: string;
  itemNewVacio: string;
  itemEstado: string;
  estadosEquipo: any;
  estadoEquipo: any;
  descripcionEquipo: string;
  descripcionEquipoVacio: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: RotacionDataProvider, private loadingCtrl: LoadingController, public formBuilder: FormBuilder
    , public alertCtrl: AlertController, public database: DatabaseProvider, private network: Network) {
    this.ot = navParams.get('data');
    this.almacen = navParams.get('almacenParam');
    this.ruttecnico = navParams.get('rutTecParam');

    this.myForm = this.formularioRotacion();
  }


  ionViewDidLoad() {


  }

  ionViewWillEnter() {
    this.showLoading();
    var self = this;
    this.dataService.soapinvokeR5ObjAntiguo(this.ot).then(function (r5ObjAntiguoValue) {
      self.itemsAntiguos = r5ObjAntiguoValue;
      self.dataService.soapinvokeR5ObjNuevo(self.ruttecnico, self.almacen).then(function (r5ObjnuevoValue) {
        self.itemsNuevos = r5ObjnuevoValue;
        self.setFilteredItemsEstadosEquipo();

      }, function (reason) {
        self.showError("Error al ejecutar servicio R5ObjNuevo");

      });

    }, function (reason) {
      self.showError("Error al ejecutar servicio R5ObjAntiguo");

    });

    this.loading.dismiss();
  }

  saveData() {
    console.log("Pasa por Save");
  }

  setFilteredItemsEstadosEquipo() {
    this.estadosEquipo = this.dataService.filterEstadosEquipo();
  }



  private formularioRotacion() {
    return this.formBuilder.group({
      itemAntiguo: ['', Validators.required],
      itemNuevo: ['', Validators.required],
      estadoEquipo: ['', Validators.required],
      descripcionEquipo: ['', Validators.required],
    });
  }

  enviarRotacionAgregarOtra() {

    let networkType = this.network.type;
    if (networkType === 'none') {
      var self = this;
      self.database.addInsertarRotacion(self.itemAnt, self.itemNew, self.ot, self.itemEstado, self.ruttecnico, self.descripcionEquipoVacio).then(function (value) {

        let alert = self.alertCtrl.create({
          message: '<font size=3 color=black>La rotación se ha enviado exitosamente. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
          cssClass: 'buttonCss',
          buttons: [{
            text: 'Ok',
            cssClass: 'ok-button'
          }]
        });
        alert.present();

        self.myForm.get('itemAntiguo').setValue('');
        self.myForm.get('itemNuevo').setValue('');
        self.myForm.get('estadoEquipo').setValue('');
        self.myForm.get('descripcionEquipo').setValue('');

      }, function (reason) {


      });


    }
    else {
      var self = this;
      if (self.itemNew === undefined) {
        self.itemNewVacio = '';

      }
      else {
        self.itemNewVacio = self.itemNew;

      }

      if (self.descripcionEquipo === undefined) {
        self.descripcionEquipoVacio = '';

      }
      else {
        self.descripcionEquipoVacio = self.descripcionEquipo;

      }
      this.dataService.soapinvokeR5IngresarRotacion(self.itemAnt, self.itemNewVacio, self.ot, self.itemEstado, self.ruttecnico, self.descripcionEquipoVacio).then(function (r5ObjAntiguoValue) {

        let alert = self.alertCtrl.create({
          message: '<font size=3 color=black>La rotación se ha enviado exitosamente</font>',
          cssClass: 'buttonCss',
          buttons: [{
            text: 'Ok',
            cssClass: 'ok-button'
          }]
        });
        alert.present();

        self.myForm.get('itemAntiguo').setValue('');
        self.myForm.get('itemNuevo').setValue('');
        self.myForm.get('estadoEquipo').setValue('');
        self.myForm.get('descripcionEquipo').setValue('');


      }, function (reason) {
        self.showError("Error al ejecutar servicio R5IngresarRotacion");

      });
    }

  }

  enviarRotacion() {
    let networkType = this.network.type;
    if (networkType === 'none') {
      var self = this;
      self.database.addInsertarRotacion(self.itemAnt, self.itemNew, self.ot, self.itemEstado, self.ruttecnico, self.descripcionEquipoVacio).then(function (value) {
        self.navCtrl.pop();
        let alert = self.alertCtrl.create({
          message: '<font size=3 color=black>La rotación se ha enviado exitosamente. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
          cssClass: 'buttonCss',
          buttons: [{
            text: 'Ok',
            cssClass: 'ok-button'
          }]
        });
        alert.present();

        self.myForm.get('itemAntiguo').setValue('');
        self.myForm.get('itemNuevo').setValue('');
        self.myForm.get('estadoEquipo').setValue('');
        self.myForm.get('descripcionEquipo').setValue('');

      }, function (reason) {


      });


    }
    else {
      var self = this;
      if (self.itemNew === undefined) {
        self.itemNewVacio = '';

      }
      else {
        self.itemNewVacio = self.itemNew;

      }

      if (self.descripcionEquipo === undefined) {
        self.descripcionEquipoVacio = '';

      }
      else {
        self.descripcionEquipoVacio = self.descripcionEquipo;

      }
      this.dataService.soapinvokeR5IngresarRotacion(self.itemAnt, self.itemNewVacio, self.ot, self.itemEstado, self.ruttecnico, self.descripcionEquipoVacio).then(function (r5ObjAntiguoValue) {
        self.navCtrl.pop();
        let alert = self.alertCtrl.create({
          message: '<font size=3 color=black>La rotación se ha enviado exitosamente</font>',
          cssClass: 'buttonCss',
          buttons: [{
            text: 'Ok',
            cssClass: 'ok-button'
          }]
        });
        alert.present();

        self.myForm.get('itemAntiguo').setValue('');
        self.myForm.get('itemNuevo').setValue('');
        self.myForm.get('estadoEquipo').setValue('');
        self.myForm.get('descripcionEquipo').setValue('');


      }, function (reason) {
        self.showError("Error al ejecutar servicio R5IngresarRotacion");

      });
    }



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