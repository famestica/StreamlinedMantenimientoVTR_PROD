import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { ComentariosDataProvider } from '../../providers/comentarios-data/comentarios-data';
import { OtagregarcomentarioPage } from '../otagregarcomentario/otagregarcomentario';

/**
 * Generated class for the ComentariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {

  ot: string = '';
  act: string = '';
  items: any;
  loading: Loading;
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: ComentariosDataProvider, private loadingCtrl: LoadingController
    , public alertCtrl: AlertController) {
    this.ot = navParams.get('data');
    this.username = navParams.get('username');
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.showLoading();
    var self = this;
    this.dataService.soapinvokeR5ObtenerComentarios(self.ot).then(function (r5ObtenerComentarios) {
      self.items = r5ObtenerComentarios;
      self.loading.dismiss();
    }, function (reason) {
      self.showError("Error al ejecutar servicio R5ObjNuevo");

    });
  }


  agregarComentario() {
    this.navCtrl.push(OtagregarcomentarioPage, {
      data: this.ot,
      username: this.username

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
