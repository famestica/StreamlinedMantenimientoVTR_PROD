import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialesDataProvider } from '../../providers/materiales-data/materiales-data';

import { Network } from '@ionic-native/network';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the OtcrearmaterialesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-otcrearmateriales',
  templateUrl: 'otcrearmateriales.html',
})
export class OtcrearmaterialesPage {

  items: any;
  item: any;
  datosMateriales: any;
  datoMaterial: any;
  almacenes: any;
  myForm: FormGroup;
  valorOT: string = '';
  almacenParam: string = '';
  actividad: string = '';
  descactividad: string = '';
  almacen: any;
  loading: Loading;
  pieza: any;
  cantidad: any;
  tipotransacciones: any;
  rutTecnico: string;
  stock: any;
  validateNumberType: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private loadingCtrl: LoadingController, public dataService: MaterialesDataProvider
    , public alertCtrl: AlertController, public database: DatabaseProvider, private network: Network) {
    this.valorOT = navParams.get('data');
    this.actividad = navParams.get('actividad');
    this.descactividad = navParams.get('descactividad');
    this.rutTecnico = navParams.get('rutTecnico');
    this.almacenParam = navParams.get('almacen');
    this.myForm = this.createMyForm();
    this.myForm.controls['stock'].disable();
  }

  saveData() {
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.showLoading();
    var self = this;
    this.dataService.soapinvokeR5ObtenerMateriales(this.rutTecnico, this.almacenParam).then(function (r5ObtenerMateriales) {
      self.items = r5ObtenerMateriales;
      self.setFilteredItemsTipoTransaccion();
      self.myForm.get('pieza').setValue(self.items.pieza);
      self.loading.dismiss();

    }, function (reason) {
      self.showError("Error al ejecutar servicio R5ObjNuevo");

    });

  }


  private createMyForm() {
    return this.formBuilder.group({
      almacen: [''],
      pieza: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      descpieza: [''],
      actividad: [this.actividad, Validators.compose([Validators.minLength(1), Validators.required])],
      descactividad: [this.descactividad, Validators.compose([Validators.minLength(1), Validators.required])],
      estante: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      cantidad: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      tipotransaccion: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      stock: ['', Validators.compose([Validators.minLength(1), Validators.required])],
    });
  }



  setFilteredItemsTipoTransaccion() {
    this.tipotransacciones = this.dataService.filterTipoTransaccion();
  }



  keyUpChecker(ev) {

    this.validateNumberType = this.validateNumericType(Number(this.cantidad));

    if (this.validateNumberType == false) {
      let alert = this.alertCtrl.create({
        message: '<font size=3 color=black>Valor ingresado no es numérico. Favor ajustar selección</font>',
        cssClass: 'buttonCss',
        buttons: [{
          text: 'Ok',
          cssClass: 'ok-button'
        }]
      });
      alert.present();
      this.myForm.get('cantidad').setValue('');

    }
    else {
      if (Number(this.stock) < Number(this.cantidad)) {
        let alert = this.alertCtrl.create({
          message: '<font size=3 color=black>Cantidad utilizada es mayor a la disponible. Favor ajustar selección</font>',
          cssClass: 'buttonCss',
          buttons: [{
            text: 'Ok',
            cssClass: 'ok-button'
          }]
        });
        alert.present();
        this.myForm.get('cantidad').setValue('');
      }

    }


  }



  llenadoCampos() {
    this.datosMateriales = this.dataService.filterMatByPieza(this.pieza);
    this.myForm.get('stock').setValue(this.datosMateriales[0].stock);
    this.myForm.get('estante').setValue(this.datosMateriales[0].estante);
    this.myForm.get('descpieza').setValue(this.datosMateriales[0].descpieza);

  }

  enviarMaterial() {
    let networkType = this.network.type;

    if (networkType === 'none') {
      this.showLoading();
      var self = this;
      self.database.addInsertarMateriales(self.myForm.get('tipotransaccion').value, this.almacenParam, this.valorOT, this.actividad, self.myForm.get('pieza').value, this.rutTecnico, self.myForm.get('cantidad').value).then(function (value) {

        self.navCtrl.pop();
        let alert = self.alertCtrl.create({
          message: '<font size=3 color=black>Se ha enviado correctamente la solicitud. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
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
      this.dataService.soapinvokeR5IngresarMateriales(self.myForm.get('tipotransaccion').value, this.almacenParam, this.valorOT, this.actividad, self.myForm.get('pieza').value, this.rutTecnico, self.myForm.get('cantidad').value).then(function (r5IngresarMateriales) {
        self.loading.dismiss();
        self.navCtrl.pop();
        let alert = self.alertCtrl.create({
          message: '<font size=3 color=black>Se ha enviado correctamente la solicitud</font>',
          cssClass: 'buttonCss',
          buttons: [{
            text: 'Ok',
            cssClass: 'ok-button'
          }]
        });
        alert.setMode('md');
        alert.present();


      }, function (reason) {
        self.showError("Error al ejecutar servicio R5ObjNuevo");

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

  validateNumericType(data) {
    return !isNaN(Number(data.toString()));
  }

}
