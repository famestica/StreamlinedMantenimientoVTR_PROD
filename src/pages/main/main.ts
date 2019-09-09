import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController, Loading } from 'ionic-angular';
import { MainDataProvider } from '../../providers/main-data/main-data';
import 'rxjs/add/operator/debounceTime';
import { OtdetallePage } from '../otdetalle/otdetalle';
import { LoginPage } from '../login/login';

import { AuthService } from '../../providers/auth-service/auth-service';
import moment from 'moment';
import { Geolocation } from '@ionic-native/geolocation';
import { OtdetallepreventivaPage } from '../otdetallepreventiva/otdetallepreventiva';
import { DatabaseProvider } from '../../providers/database/database';



/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  fechadesde: string = '';
  fechahasta: string = '';
  items: any;
  fechaInicioOt: String;
  horaInicioOt: String;
  longitud: any;
  itemOtCount: number;
  itemOt: any;
  latitud: any;
  itemR5Personel: any;
  loading: Loading;
  fechaGeoRef: string;
  valorBarra: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: MainDataProvider, private auth: AuthService, private loadingCtrl: LoadingController, public alertCtrl: AlertController
    , public geolocation: Geolocation, public modalCtrl: ModalController, public database: DatabaseProvider) {

  }

  customOptionsDesde: any = {
    buttons: [{
      text: 'Limpiar',
      handler: () => {
        this.fechadesde = '';
        this.busquedaSt();
      }
    }]
  };

  customOptionsHasta: any = {
    buttons: [{
      text: 'Limpiar',
      handler: () => {
        this.fechahasta = '';
        this.busquedaSt();
      }
    }]
  };


  ionViewDidLoad() {
  }

  setFilteredItems() {
    this.items = this.dataService.getItems();
  }

  setFilteredItemsFechaDesde() {
    this.items = this.dataService.filterItemsFechaDesde(this.fechadesde);
  }

  setFilteredItemsFechaFin() {
    this.items = this.dataService.filterItemsFechaFin(this.fechahasta);
  }

  setFilteredItemsFechaDesdeFechaFin() {
    this.items = this.dataService.filterItemsFechaDesdeFechaFin(this.fechadesde, this.fechahasta);
  }


  busquedaSt() {


    if (this.fechadesde.length > 0 && this.fechahasta.length == 0) {
      this.setFilteredItemsFechaDesde();
    }
    if (this.fechadesde.length == 0 && this.fechahasta.length > 0) {
      this.setFilteredItemsFechaFin();
    }
    if (this.fechadesde.length > 0 && this.fechahasta.length > 0) {
      this.setFilteredItemsFechaDesdeFechaFin();
    }
    if (this.fechadesde.length == 0 && this.fechahasta.length == 0) {
      this.setFilteredItems();
    }
  }

  ionViewWillEnter() {
    this.showLoading();
    var self = this;
    this.dataService.soapinvokeR5Personel(this.auth.getUserInfo().name.toString()).then(function (value) {
      self.itemR5Personel = value;
      self.dataService.soapinvokeR5ListaAct(self.auth.getUserInfo().name.toString()).then(function (valueR5ListAcc) {
        self.items = valueR5ListAcc;
        self.itemOtCount = self.items.length;
        


      }, function (reason) {
        self.showError("Error al ejecutar servicio R5ListaAcc");

      });

    }, function (reason) {
      self.showError("Error al ejecutar servicio R5Personel");

    });

    this.loading.dismiss();
  }

  goToOtDetalle(item) {
    var self = this;
    if (item['prioridad'] !== 'SI')
    {
    if (item['estado'] == 'LIBE') {
      if (item['flagActIniciada'] == 'Iniciada') {
        const prompt = this.alertCtrl.create({
          message: "<font size=3 color=black>¿Desea Pausar el trabajo para la OT <b>" + item['numerost'] + "</b>?</font>",
          cssClass: 'buttonCss',
          buttons: [
            {
              text: 'No',
              handler: data => {

                if (item['tipootdb'] == 'JOB') {
                  this.navCtrl.push(OtdetallePage, {
                    data: item,
                    r5personel: self.itemR5Personel,
                    username: self.auth.getUserInfo().name.toString()
                  });

                }
                if (item['tipootdb'] == 'PPM') {
                  this.navCtrl.push(OtdetallepreventivaPage, {
                    data: item,
                    r5personel: self.itemR5Personel,
                    username: self.auth.getUserInfo().name.toString()
                  });

                }
              },
              cssClass: 'no-button'
            },
            {
              text: 'Si',
              handler: data => {
                this.showLoading();
                if (item['tipootdb'] == 'JOB') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;

                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad pausada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Pausar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {

                          self.loading.dismiss();

                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });

                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });



                }
                if (item['tipootdb'] == 'PPM') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;
                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad pausada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Pausar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {

                          self.loading.dismiss();


                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });

                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });

                }
              },
              cssClass: 'si-button'
            }
          ]
        });
        prompt.setMode('md');
        prompt.present();
      }
      if (item['flagActIniciada'] == 'Pausada') {
        const prompt = this.alertCtrl.create({
          message: "<font size=3 color=black>¿Desea Iniciar el trabajo para la OT <b>" + item['numerost'] + "</b>?</font>",
          cssClass: 'buttonCss',
          buttons: [
            {
              text: 'No',
              handler: data => {
              },
              cssClass: 'no-button'
            },
            {
              text: 'Si',
              handler: data => {
                this.showLoading();
                if (item['tipootdb'] == 'JOB') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;

                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                          self.navCtrl.push(OtdetallePage, {
                            data: item,
                            r5personel: self.itemR5Personel,
                            username: self.auth.getUserInfo().name.toString()
                          });

                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });

                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });



                }
                if (item['tipootdb'] == 'PPM') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;
                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                          self.navCtrl.push(OtdetallepreventivaPage, {
                            data: item,
                            r5personel: self.itemR5Personel,
                            username: self.auth.getUserInfo().name.toString()
                          });

                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });

                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });

                }
              },
              cssClass: 'si-button'
            }
          ]
        });
        prompt.setMode('md');
        prompt.present();
      }
    }
    if (item['estado'] == 'OTEP') {
      if (item['flagActIniciada'] == 'Iniciada') {
        const prompt = this.alertCtrl.create({
          message: "<font size=3 color=black>¿Desea pausar la OT <b>" + item['numerost'] + "</b>?</font>",
          cssClass: 'buttonCss',
          buttons: [
            {
              text: 'No',
              handler: data => {
                if (item['tipootdb'] == 'JOB') {
                  this.navCtrl.push(OtdetallePage, {
                    data: item,
                    r5personel: self.itemR5Personel,
                    username: self.auth.getUserInfo().name.toString()
                  });

                }
                if (item['tipootdb'] == 'PPM') {
                  this.navCtrl.push(OtdetallepreventivaPage, {
                    data: item,
                    r5personel: self.itemR5Personel,
                    username: self.auth.getUserInfo().name.toString()
                  });

                }
              },
              cssClass: 'no-button'
            },
            {
              text: 'Si',
              handler: data => {
                this.showLoading();
                if (item['tipootdb'] == 'JOB') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;
                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad Pausada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Pausar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                          self.loading.dismiss();

                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });



                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });

                }
                if (item['tipootdb'] == 'PPM') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;

                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad Pausada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Pausar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {

                          self.loading.dismiss();
                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });

                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });

                }
              },
              cssClass: 'si-button'
            }
          ]
        });
        prompt.setMode('md');
        prompt.present();
      }
      if (item['flagActIniciada'] == 'Pausada') {
        const prompt = this.alertCtrl.create({
          message: "<font size=3 color=black>¿Desea volver a iniciar la OT <b>" + item['numerost'] + "</b>?</font>",
          cssClass: 'buttonCss',
          buttons: [
            {
              text: 'No',
              handler: data => {
              },
              cssClass: 'no-button'
            },
            {
              text: 'Si',
              handler: data => {
                this.showLoading();
                if (item['tipootdb'] == 'JOB') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;

                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {

                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad Iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                          self.navCtrl.push(OtdetallePage, {
                            data: item,
                            r5personel: self.itemR5Personel,
                            username: self.auth.getUserInfo().name.toString()
                          });

                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });



                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });
                }
                if (item['tipootdb'] == 'PPM') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;

                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                          self.navCtrl.push(OtdetallepreventivaPage, {
                            data: item,
                            r5personel: self.itemR5Personel,
                            username: self.auth.getUserInfo().name.toString()
                          });

                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });

                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });

                }
              },
              cssClass: 'si-button'
            }
          ]
        });
        prompt.setMode('md');
        prompt.present();
      }
    }
    if (item['estado'] == 'OTPL') {
      if (item['flagActIniciada'] == 'Iniciada') {
        const prompt = this.alertCtrl.create({
          message: "<font size=3 color=black>¿Desea pausar la OT <b>" + item['numerost'] + "</b>?</font>",
          cssClass: 'buttonCss',
          buttons: [
            {
              text: 'No',
              handler: data => {
                if (item['tipootdb'] == 'JOB') {
                  this.navCtrl.push(OtdetallePage, {
                    data: item,
                    r5personel: self.itemR5Personel,
                    username: self.auth.getUserInfo().name.toString()
                  });

                }
                if (item['tipootdb'] == 'PPM') {
                  this.navCtrl.push(OtdetallepreventivaPage, {
                    data: item,
                    r5personel: self.itemR5Personel,
                    username: self.auth.getUserInfo().name.toString()
                  });

                }
              },
              cssClass: 'no-button'
            },
            {
              text: 'Si',
              handler: data => {
                this.showLoading();
                if (item['tipootdb'] == 'JOB') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;
                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad Pausada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Pausar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                          self.loading.dismiss();

                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });



                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });

                }
                if (item['tipootdb'] == 'PPM') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;

                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad Pausada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Pausar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {

                          self.loading.dismiss();
                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });

                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });

                }
              },
              cssClass: 'si-button'
            }
          ]
        });
        prompt.setMode('md');
        prompt.present();
      }
      if (item['flagActIniciada'] == 'Pausada') {
        const prompt = this.alertCtrl.create({
          message: "<font size=3 color=black>¿Desea volver a iniciar la OT <b>" + item['numerost'] + "</b>?</font>",
          cssClass: 'buttonCss',
          buttons: [
            {
              text: 'No',
              handler: data => {
              },
              cssClass: 'no-button'
            },
            {
              text: 'Si',
              handler: data => {
                this.showLoading();
                if (item['tipootdb'] == 'JOB') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;

                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {

                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad Iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                          self.navCtrl.push(OtdetallePage, {
                            data: item,
                            r5personel: self.itemR5Personel,
                            username: self.auth.getUserInfo().name.toString()
                          });

                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });



                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });
                }
                if (item['tipootdb'] == 'PPM') {
                  this.fechaInicioOt = moment(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                  this.horaInicioOt = moment(new Date().toISOString()).format("HH:mm");
                  this.fechaGeoRef = this.fechaInicioOt + ' ' + this.horaInicioOt;

                  self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                    self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                      self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                        self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                          self.navCtrl.push(OtdetallepreventivaPage, {
                            data: item,
                            r5personel: self.itemR5Personel,
                            username: self.auth.getUserInfo().name.toString()
                          });

                        }, function (reason) {
                          self.showError("Error al ejecutar servicio R5actudfchar01Iniciar");

                        });

                      }, function (reason) {
                        self.showError("Error al ejecutar servicio R5addetailsinterface");

                      });

                    }, function (reason) {
                      self.showError("Error al ejecutar servicio GeoLocalizacion");

                    });
                  }, function (reason) {
                    self.showError("Error al ejecutar servicio Contador de comentarios");

                  });

                }
              },
              cssClass: 'si-button'
            }
          ]
        });
        prompt.setMode('md');
        prompt.present();
      }
    }
  }
  }

  public logout() {
    this.auth.logout();
    this.itemR5Personel = [];
    this.items = [];
    this.dataService.clearArrays();
    this.navCtrl.setRoot(LoginPage);

  }

  cargarGeolocalizacion() {
    var self = this;
    return new Promise(function (resolve, reject) {
      let options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
      self.geolocation.getCurrentPosition(options).then((position) => {
        self.longitud = position.coords.longitude;
        self.latitud = position.coords.latitude;

        resolve('Latitud: ' + self.latitud + ' ,' + 'Longitud: ' + self.longitud);

      }
        , (err) => {
          reject(new Error(err));
        });
    });
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

  doRefresh(refresher) {
    var self = this;
    this.dataService.soapinvokeR5Personel(this.auth.getUserInfo().name.toString()).then(function (value) {
      self.itemR5Personel = value;
      self.dataService.soapinvokeR5ListaAct(self.auth.getUserInfo().name.toString()).then(function (valueR5ListAcc) {
        self.items = valueR5ListAcc;
        self.itemOtCount = self.items.length;
        refresher.complete();


      }, function (reason) {
        self.showError("Error al ejecutar servicio R5ListaAcc");
        refresher.complete();

      });

    }, function (reason) {
      self.showError("Error al ejecutar servicio R5Personel");
      refresher.complete();

    });
  }




}
