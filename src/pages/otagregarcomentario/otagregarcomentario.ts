import { Component } from '@angular/core';
import { Platform, NavController, NavParams, AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { ComentariosDataProvider } from '../../providers/comentarios-data/comentarios-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition';

import { Network } from '@ionic-native/network';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the OtagregarcomentarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-otagregarcomentario',
  templateUrl: 'otagregarcomentario.html',
})
export class OtagregarcomentarioPage {

  myForm: FormGroup;
  valorOT: string = '';
  act: string = '';
  comentario: string = '';
  speechList: Array<String> = [];
  androidOptions: SpeechRecognitionListeningOptionsAndroid;
  iosOptions: SpeechRecognitionListeningOptionsIOS;
  isRecording = false;
  loading: Loading;
  leftCharacters: number = 200;
  username: string;

  constructor(private speech: SpeechRecognition, private platform: Platform, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public dataService: ComentariosDataProvider
    , public alertCtrl: AlertController, private toast: ToastController, private loadingCtrl: LoadingController, public database: DatabaseProvider, private network: Network) {
    this.valorOT = navParams.get('data');
    this.username = navParams.get('username');
    this.act = "1";
    this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {

  }

  isIos() {
    return this.platform.is('ios');
  }

  changed() {
    this.leftCharacters = 200 - this.comentario.length;
  }

  stopListening() {
    this.speech.stopListening().then(() => {
      this.isRecording = false;
    });
  }

  saveData() {
    console.log(this.myForm.value);
  }

  private createMyForm() {
    return this.formBuilder.group({
      comentario: ['', Validators.required],
    });


  }

  enviarComentario() {
    let networkType = this.network.type;
    if (networkType === 'none') {
      this.showLoading();
      var self = this;
      self.database.addCommentario(self.valorOT, self.comentario.toString(), self.username, '1').then(function (value) {

        self.navCtrl.pop();
        let alert = self.alertCtrl.create({
          message: '<font size=3 color=black>El comentario se ha enviado exitosamente. Se ha enviado en modo offline, se sincronizará cuando se disponga de conexión</font>',
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

      self.dataService.soapinvokeR5countaddetails(self.valorOT).then(function (countComents) {
        self.dataService.soapinvokeR5addetailsinterface(self.valorOT, self.comentario.toString(), self.username, countComents).then(function (valueR5addetailsinterface) {
          self.loading.dismiss();
          self.navCtrl.pop();
          let alert = self.alertCtrl.create({
            message: '<font size=3 color=black>El comentario se ha enviado exitosamente</font>',
            cssClass: 'buttonCss',
            buttons: [{
              text: 'Ok',
              cssClass: 'ok-button'
            }]
          });
          alert.present();
        }, function (reason) {
          self.showError("Error al ejecutar servicio Contador Comentarios");

        });

      }, function (reason) {
        self.showError("Error al ejecutar servicio Contador Comentarios");

      });

    }

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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere',
      dismissOnPageChange: true
    });
    this.loading.present();
  }


  async initSpeech() {
    const isAvailable = await this.speech.isRecognitionAvailable();
    if (isAvailable == true) {
      const hasPermissions = await this.speech.hasPermission();
      if (hasPermissions == false) {
        this.speech.requestPermission().then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
      }
      else if (hasPermissions == true) {
        this.androidOptions = {
          prompt: 'Indique su comentario',

          language: 'es-CL'
        }

        this.iosOptions = {


          language: 'es-CL'
        }


        if (this.platform.is('android')) {
          this.isRecording = true;
          this.speech.startListening(this.androidOptions)
            .subscribe(
              data => this.myForm.get('comentario').setValue(data[0]),
              error => console.log(error))
          this.isRecording = false;


        }
        else if (this.platform.is('ios')) {
          this.isRecording = true;
          this.speech.startListening(this.iosOptions)
            .subscribe(
              data => this.myForm.get('comentario').setValue(data[0]),
              error => console.log(error))


        }
      }
    }
    else {
      this.toast.create({

        message: "Su equipo no soporta funciones de reconocimiento de voz"

      }).present();
    }
  }

}
