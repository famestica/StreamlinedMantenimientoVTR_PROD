import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, NavParams, ViewController, Platform, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Network } from '@ionic-native/network';

import { DatabaseProvider } from '../../providers/database/database';

import { MainPage } from '../main/main';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  loading: Loading;
  registerCredentials = { usuario: '', password: '' };
  onGPS: boolean = null;
  successCallback: any;
  errorCallback: any;
  estadoRed: string;
  variableSalida: string;
  valorBlob: Blob;
  valorLogin: boolean;
  estadosOT: any;
  base64Image: string;
  depth: number = 0;
  folders: any;
  items: any = [];
  itemsUrl: any = [];

  constructor(private toast: ToastController, private network: Network, public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private diagnostic: Diagnostic
    , public viewCtrl: ViewController, public plt: Platform, private camera: Camera, public database: DatabaseProvider) {
    let networkType = this.network.type;

  }

  public login() {

    this.showLoading();
    var self = this;

    this.auth.soapinvoke(this.registerCredentials).then(function (value) {
      self.auth.login(value, self.registerCredentials.usuario).subscribe(allowed => {
        if (allowed) {
          self.navCtrl.setRoot(MainPage);
        } else {
          self.showError("Credenciales incorrectas");
        }
      },
        error => {
          self.showError(error);
        });

    }, function (reason) {
      self.showError("Credenciales incorrectas");

    });


  }


  displayNetworkUpdate(connectionState: string) {
    let networkType = this.network.type;
    const toast = this.toast.create({
      message: `Usted está en modo ${connectionState} via ${networkType}`,
      duration: 3000,
      showCloseButton: false,
      dismissOnPageChange: false
    }).present();
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

  showInfo(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  showMessage(text) {
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }



  ionViewDidEnter() {

    this.network.onConnect().subscribe(data => {
      this.displayNetworkUpdate(data.type);
      this.syncDB();
    }, error => console.error(error));

    this.network.onDisconnect().subscribe(data => {
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }

  ionViewDidLoad() {


  }

  checkGPSAndLogin() {
    let networkType = this.network.type;
    if (networkType === 'none') {
      var self = this;
      self.showError("Dispositivo sin conexión");
    }
    else {


      this.successCallback = (isAvailable) => {
        this.onGPS = isAvailable;
        if (this.onGPS) {
          this.login();
        }
        else {
          alert('GPS No se encuentra encendido y es requerido para usar la aplicación. Será redirigido a opciones de dispositivo para encender GPS');
          this.diagnostic.switchToLocationSettings();
          this.showInfo("Si ya encendió su GPS, Intente ingresar nuevamente");

        }
      }
      this.errorCallback = (e) => {
        console.error(e);
      }

      if (this.plt.is('android')) {
        this.diagnostic.isGpsLocationEnabled().then(
          this.successCallback
          , this.errorCallback);



      }
      if (this.plt.is('ios')) {
        this.diagnostic.isLocationEnabled().then(
          this.successCallback

        ).catch(this.errorCallback);


      }

    }

  }

  syncDB() {
    this.database.syncDatabaseToWebServices();
  }




}
