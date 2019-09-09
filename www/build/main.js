webpackJsonp([0],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());

var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.login = function (value, usuario) {
        var _this = this;
        if (value === false) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw("Credencial Incorrecta");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
                //Se realiza chequeo del servicio de acceso, si devuelve true, hay que asignar true a la variable access, de lo contrario, asignar false
                var access = (value === "true");
                _this.currentUser = new User(usuario);
                observer.next(access);
                observer.complete();
            });
        }
    };
    AuthService.prototype.soapinvoke = function (credentials) {
        return new Promise(function (resolve, reject) {
            if (credentials.usuario === null || credentials.password === null) {
            }
            else {
                //Se realiza chequeo del servicio de acceso, si devuelve true, hay que asignar true a la variable access, de lo contrario, asignar false
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open('POST', 'https://seam.vtr.cl/loginUser?wsdl', true);
                xmlhttp.withCredentials = true;
                xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
                xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
                xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
                xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
                xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
                xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/loginUser/LOGEMPLoginUserPortType/LOGEMPLoginUserOperationRequest");
                var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:log=\"http://osbcorp.vtr.cl/LOG/EMP/loginUser\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                     <log:loginUserRequest>\n                        <log:codigoUsuario>" + credentials.usuario + "</log:codigoUsuario>\n                        <log:passwordUsuario>" + credentials.password + "</log:passwordUsuario>\n                     </log:loginUserRequest>\n                  </soap:Body>\n               </soap:Envelope>";
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        if (xmlhttp.status == 200) {
                            var xml = xmlhttp.responseXML;
                            if (credentials.usuario === null || credentials.password === null || credentials.usuario === '' || credentials.password === '') {
                                reject(new Error('Ingrese todos los datos requeridos'));
                            }
                            else {
                                var loginvalue = void 0;
                                loginvalue = xml.getElementsByTagName("log:estadoAutenticacion")[0].childNodes[0].nodeValue;
                                resolve(loginvalue);
                            }
                        }
                        else {
                            reject(new Error('HTTPStatus: ' + xmlhttp.status + ' Error en invocacion'));
                        }
                    }
                };
                xmlhttp.onerror = function () {
                    reject(new Error('Error en invocacion (ReadyStateOfChange)'));
                };
                xmlhttp.responseType = "document";
                xmlhttp.send(sr);
            }
        });
    };
    ;
    AuthService.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_database_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__main_main__ = __webpack_require__(373);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(toast, network, navCtrl, navParams, auth, alertCtrl, loadingCtrl, diagnostic, viewCtrl, plt, camera, database) {
        this.toast = toast;
        this.network = network;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.diagnostic = diagnostic;
        this.viewCtrl = viewCtrl;
        this.plt = plt;
        this.camera = camera;
        this.database = database;
        this.registerCredentials = { usuario: '', password: '' };
        this.onGPS = null;
        this.depth = 0;
        this.items = [];
        this.itemsUrl = [];
        var networkType = this.network.type;
    }
    LoginPage.prototype.login = function () {
        this.showLoading();
        var self = this;
        this.auth.soapinvoke(this.registerCredentials).then(function (value) {
            self.auth.login(value, self.registerCredentials.usuario).subscribe(function (allowed) {
                if (allowed) {
                    self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__main_main__["a" /* MainPage */]);
                }
                else {
                    self.showError("Credenciales incorrectas");
                }
            }, function (error) {
                self.showError(error);
            });
        }, function (reason) {
            self.showError("Credenciales incorrectas");
        });
    };
    LoginPage.prototype.displayNetworkUpdate = function (connectionState) {
        var networkType = this.network.type;
        var toast = this.toast.create({
            message: "Usted est\u00E1 en modo " + connectionState + " via " + networkType,
            duration: 3000,
            showCloseButton: false,
            dismissOnPageChange: false
        }).present();
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.showInfo = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Info',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.showMessage = function (text) {
        var alert = this.alertCtrl.create({
            title: 'Info',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.network.onConnect().subscribe(function (data) {
            _this.displayNetworkUpdate(data.type);
            _this.syncDB();
        }, function (error) { return console.error(error); });
        this.network.onDisconnect().subscribe(function (data) {
            _this.displayNetworkUpdate(data.type);
        }, function (error) { return console.error(error); });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
    };
    LoginPage.prototype.checkGPSAndLogin = function () {
        var _this = this;
        var networkType = this.network.type;
        if (networkType === 'none') {
            var self = this;
            self.showError("Dispositivo sin conexión");
        }
        else {
            this.successCallback = function (isAvailable) {
                _this.onGPS = isAvailable;
                if (_this.onGPS) {
                    _this.login();
                }
                else {
                    alert('GPS No se encuentra encendido y es requerido para usar la aplicación. Será redirigido a opciones de dispositivo para encender GPS');
                    _this.diagnostic.switchToLocationSettings();
                    _this.showInfo("Si ya encendió su GPS, Intente ingresar nuevamente");
                }
            };
            this.errorCallback = function (e) {
                console.error(e);
            };
            if (this.plt.is('android')) {
                this.diagnostic.isGpsLocationEnabled().then(this.successCallback, this.errorCallback);
            }
            if (this.plt.is('ios')) {
                this.diagnostic.isLocationEnabled().then(this.successCallback).catch(this.errorCallback);
            }
        }
    };
    LoginPage.prototype.syncDB = function () {
        this.database.syncDatabaseToWebServices();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content class="background">\n  <img src="assets/imgs/vtr-logo.png" class="logovtr" />\n  <ion-card>\n    <ion-card-header>\n      <p style="font-weight: bold; font-size: 20px;">SAM-ESM</p>\n    </ion-card-header>\n    <ion-card-content>\n      <ion-list no-lines>\n        <ion-item>\n          <ion-label color="dark" floating>Usuario</ion-label>\n          <ion-input type="text" name="usuario" [(ngModel)]="registerCredentials.usuario" required></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label color="dark" floating>Password</ion-label>\n          <ion-input type="password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n        </ion-item>\n        <button ion-button color="dark" block (click)="login()">Iniciar Sesión</button>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n  <div class="bar bar-footer">\n    <h1 class="title">By Streamlined Systems</h1>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_auth_service_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__providers_database_database__["a" /* DatabaseProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleOtPreventivaDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the DetalleOtPreventivaDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DetalleOtPreventivaDataProvider = /** @class */ (function () {
    function DetalleOtPreventivaDataProvider(http) {
        this.http = http;
        this.sistemaItems = [];
        this.estadoItems = [];
        this.mttoItems = [];
    }
    DetalleOtPreventivaDataProvider.prototype.soapinvokeR5ucodesSistemas = function () {
        var self = this;
        this.sistemaItems = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerListaSistemas?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas/LOGEMPObtenerListaSistemasPortType/LOGEMPObtenerListaSistemasOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerListaSistemasRequest>\n                      <obt:codigoParametro>VTRSIS</obt:codigoParametro>\n                  </obt:obtenerListaSistemasRequest>         \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codSistemas = void 0;
                        var descSistemas = void 0;
                        var codSistemasArr = void 0;
                        var descSistemasArr = void 0;
                        var i = 0;
                        codSistemas = xml.getElementsByTagName("obt:codigoParametro");
                        descSistemas = xml.getElementsByTagName("obt:descripcionParametro");
                        responseLenght = xml.getElementsByTagName("obt:listas")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codSistemas[i].childNodes[0]) {
                            }
                            else {
                                if (codSistemas[i].childNodes[0]) {
                                    codSistemasArr = codSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codSistemasArr = '';
                                }
                                if (descSistemas[i].childNodes[0]) {
                                    descSistemasArr = descSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descSistemasArr = '';
                                }
                                self.sistemaItems.push({
                                    sistema: descSistemasArr,
                                    sistemaCod: codSistemasArr,
                                });
                            }
                        }
                        resolve(self.sistemaItems);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtPreventivaDataProvider.prototype.soapinvokeR5countaddetails = function (codOt) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/contadorComentarios?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/contadorComentarios/LOGEMPContadorComentariosPortType/LOGEMPContadorComentariosOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:con=\"http://osbcorp.vtr.cl/LOG/EMP/contadorComentarios\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <con:contadorComentariosRequest>\n                    <con:codigoEntidad>EVNT</con:codigoEntidad>\n                    <con:codigoOT>" + codOt + "</con:codigoOT>\n                 </con:contadorComentariosRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        var resultCheck = void 0;
                        var resultCount = void 0;
                        resultCheck = xml.getElementsByTagName("res:codigoError");
                        resultCount = xml.getElementsByTagName("con:cantidadComentarios");
                        if (resultCount.length > 0) {
                            result = parseInt(resultCount[0].childNodes[0].nodeValue);
                        }
                        else {
                            result = 0;
                        }
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtPreventivaDataProvider.prototype.soapinvokeR5ucodesMtto = function () {
        var self = this;
        this.mttoItems = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerListaSistemas?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas/LOGEMPObtenerListaSistemasPortType/LOGEMPObtenerListaSistemasOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerListaSistemasRequest>\n                      <obt:codigoParametro>VTRMTTO</obt:codigoParametro>\n                  </obt:obtenerListaSistemasRequest>         \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codSistemas = void 0;
                        var descSistemas = void 0;
                        var codSistemasArr = void 0;
                        var descSistemasArr = void 0;
                        var i = 0;
                        codSistemas = xml.getElementsByTagName("obt:codigoParametro");
                        descSistemas = xml.getElementsByTagName("obt:descripcionParametro");
                        responseLenght = xml.getElementsByTagName("obt:listas")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codSistemas[i].childNodes[0]) {
                            }
                            else {
                                if (codSistemas[i].childNodes[0]) {
                                    codSistemasArr = codSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codSistemasArr = '';
                                }
                                if (descSistemas[i].childNodes[0]) {
                                    descSistemasArr = descSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descSistemasArr = '';
                                }
                                self.mttoItems.push({
                                    mtto: descSistemasArr,
                                    mttoCod: codSistemasArr,
                                });
                            }
                        }
                        resolve(self.mttoItems);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtPreventivaDataProvider.prototype.soapinvokeR5authEstados = function (usuario, estado) {
        var self = this;
        this.estadoItems = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerAutorizacionEstado?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/authUsers/LOGEMPAuthUsersPortType/LOGEMPAuthUsersOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:aut=\"http://osbcorp.vtr.cl/LOG/EMP/authUsers\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <aut:authUsersRequest>\n                    <aut:codigoUsuario>" + usuario + "</aut:codigoUsuario>\n                    <aut:codigoEstado>" + estado + "</aut:codigoEstado>\n                  </aut:authUsersRequest>         \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codEstado = void 0;
                        var descEstado = void 0;
                        var codEstadoArr = void 0;
                        var descEstadoArr = void 0;
                        var i = 0;
                        codEstado = xml.getElementsByTagName("aut:codigoEstado");
                        descEstado = xml.getElementsByTagName("aut:descripcionEstado");
                        responseLenght = xml.getElementsByTagName("aut:autorizaciones")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codEstado[i].childNodes[0]) {
                            }
                            else {
                                if (codEstado[i].childNodes[0]) {
                                    codEstadoArr = codEstado[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codEstadoArr = '';
                                }
                                if (descEstado[i].childNodes[0]) {
                                    descEstadoArr = descEstado[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descEstadoArr = '';
                                }
                                self.estadoItems.push({
                                    estado: descEstadoArr,
                                    estadoCod: codEstadoArr,
                                });
                            }
                        }
                        resolve(self.estadoItems);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtPreventivaDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], DetalleOtPreventivaDataProvider);
    return DetalleOtPreventivaDataProvider;
}());

//# sourceMappingURL=detalle-ot-preventiva-data.js.map

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleOtProgramadaDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the DetalleOtProgramadaDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DetalleOtProgramadaDataProvider = /** @class */ (function () {
    function DetalleOtProgramadaDataProvider(http) {
        this.http = http;
        this.sistemaItems = [];
        this.estadoItems = [];
        this.etapaItems = [];
        this.causaItems = [];
        this.accionItems = [];
    }
    DetalleOtProgramadaDataProvider.prototype.soapinvokeR5ucodesSistemas = function () {
        var self = this;
        this.sistemaItems = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerListaSistemas?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas/LOGEMPObtenerListaSistemasPortType/LOGEMPObtenerListaSistemasOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerListaSistemasRequest>\n                      <obt:codigoParametro>VTRSIS</obt:codigoParametro>\n                  </obt:obtenerListaSistemasRequest>         \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codSistemas = void 0;
                        var descSistemas = void 0;
                        var codSistemasArr = void 0;
                        var descSistemasArr = void 0;
                        var i = 0;
                        codSistemas = xml.getElementsByTagName("obt:codigoParametro");
                        descSistemas = xml.getElementsByTagName("obt:descripcionParametro");
                        responseLenght = xml.getElementsByTagName("obt:listas")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codSistemas[i].childNodes[0]) {
                            }
                            else {
                                if (codSistemas[i].childNodes[0]) {
                                    codSistemasArr = codSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codSistemasArr = '';
                                }
                                if (descSistemas[i].childNodes[0]) {
                                    descSistemasArr = descSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descSistemasArr = '';
                                }
                                self.sistemaItems.push({
                                    sistema: descSistemasArr,
                                    sistemaCod: codSistemasArr,
                                });
                            }
                        }
                        resolve(self.sistemaItems);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtProgramadaDataProvider.prototype.soapinvokeR5CierreCorrectivoEtapa = function (equipo) {
        var self = this;
        this.etapaItems = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/listaValoresCierre?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/listaValoresCierre/LOGEMPListaValoresCierrePortType/LOGEMPListaValoresCierreOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:lis=\"http://osbcorp.vtr.cl/LOG/EMP/listaValoresCierre\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <lis:listaValoresCierreRequest>\n                    <lis:metodo>ETAPA</lis:metodo>\n                    <lis:equipo>" + equipo + "</lis:equipo>\n                    <lis:etapa></lis:etapa>\n                    <lis:causa></lis:causa>\n                  </lis:listaValoresCierreRequest>      \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var valoresLenght = void 0;
                        var valorLista = void 0;
                        var valorListaArr = void 0;
                        var i = 0;
                        valorLista = xml.getElementsByTagName("lis:valorLista");
                        valoresLenght = xml.getElementsByTagName("lis:valores");
                        if (valoresLenght.length > 0) {
                            responseLenght = xml.getElementsByTagName("lis:valores")[0].childNodes.length;
                            for (i = 0; i < responseLenght; i++) {
                                if (!valorLista[i].childNodes[0]) {
                                }
                                else {
                                    if (valorLista[i].childNodes[0]) {
                                        valorListaArr = valorLista[i].childNodes[0].nodeValue;
                                    }
                                    else {
                                        valorListaArr = '';
                                    }
                                    self.etapaItems.push({
                                        etapa: valorListaArr
                                    });
                                }
                            }
                            resolve(self.etapaItems);
                        }
                        else {
                        }
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtProgramadaDataProvider.prototype.soapinvokeR5CierreCorrectivoAccion = function (equipo, etapa, causa) {
        var self = this;
        this.etapaItems = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/listaValoresCierre?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/listaValoresCierre/LOGEMPListaValoresCierrePortType/LOGEMPListaValoresCierreOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:real=\"http://osbcorp.vtr.cl/STLN/EMP/realizarCierreCorrOt\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <lis:listaValoresCierreRequest>\n                    <lis:metodo>ACCION</lis:metodo>\n                    <lis:equipo>" + equipo + "</lis:equipo>\n                    <lis:etapa>" + etapa + "</lis:etapa>\n                    <lis:causa>" + causa + "</lis:causa>\n                  </lis:listaValoresCierreRequest>      \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var valorLista = void 0;
                        var valoresLenght = void 0;
                        var valorListaArr = void 0;
                        var i = 0;
                        valorLista = xml.getElementsByTagName("lis:valorLista");
                        valoresLenght = xml.getElementsByTagName("lis:valores");
                        if (valoresLenght.length > 0) {
                            responseLenght = xml.getElementsByTagName("lis:valores")[0].childNodes.length;
                            for (i = 0; i < responseLenght; i++) {
                                if (!valorLista[i].childNodes[0]) {
                                }
                                else {
                                    if (valorLista[i].childNodes[0]) {
                                        valorListaArr = valorLista[i].childNodes[0].nodeValue;
                                    }
                                    else {
                                        valorListaArr = '';
                                    }
                                    self.accionItems.push({
                                        accion: valorListaArr
                                    });
                                }
                            }
                            resolve(self.accionItems);
                        }
                        else {
                        }
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtProgramadaDataProvider.prototype.soapinvokeR5CierreCorrectivoCausa = function (equipo, etapa) {
        var self = this;
        this.etapaItems = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/listaValoresCierre?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/listaValoresCierre/LOGEMPListaValoresCierrePortType/LOGEMPListaValoresCierreOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:real=\"http://osbcorp.vtr.cl/STLN/EMP/realizarCierreCorrOt\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <lis:listaValoresCierreRequest>\n                    <lis:metodo>CAUSA</lis:metodo>\n                    <lis:equipo>" + equipo + "</lis:equipo>\n                    <lis:etapa>" + etapa + "</lis:etapa>\n                    <lis:causa></lis:causa>\n                  </lis:listaValoresCierreRequest>      \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var valorLista = void 0;
                        var valorListaArr = void 0;
                        var valoresLenght = void 0;
                        var i = 0;
                        valorLista = xml.getElementsByTagName("lis:valorLista");
                        valoresLenght = xml.getElementsByTagName("lis:valores");
                        if (valoresLenght.length > 0) {
                            responseLenght = xml.getElementsByTagName("lis:valores")[0].childNodes.length;
                            for (i = 0; i < responseLenght; i++) {
                                if (!valorLista[i].childNodes[0]) {
                                }
                                else {
                                    if (valorLista[i].childNodes[0]) {
                                        valorListaArr = valorLista[i].childNodes[0].nodeValue;
                                    }
                                    else {
                                        valorListaArr = '';
                                    }
                                    self.causaItems.push({
                                        causa: valorListaArr
                                    });
                                }
                            }
                            resolve(self.causaItems);
                        }
                        else {
                        }
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtProgramadaDataProvider.prototype.soapinvokeR5countaddetails = function (codOt) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/contadorComentarios?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/contadorComentarios/LOGEMPContadorComentariosPortType/LOGEMPContadorComentariosOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:con=\"http://osbcorp.vtr.cl/LOG/EMP/contadorComentarios\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <con:contadorComentariosRequest>\n                    <con:codigoEntidad>EVNT</con:codigoEntidad>\n                    <con:codigoOT>" + codOt + "</con:codigoOT>\n                 </con:contadorComentariosRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        var resultCheck = void 0;
                        var resultCount = void 0;
                        resultCheck = xml.getElementsByTagName("res:codigoError");
                        resultCount = xml.getElementsByTagName("con:cantidadComentarios");
                        if (resultCount.length > 0) {
                            result = parseInt(resultCount[0].childNodes[0].nodeValue);
                        }
                        else {
                            result = 0;
                        }
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtProgramadaDataProvider.prototype.soapinvokeR5authEstados = function (usuario, estado) {
        var self = this;
        this.estadoItems = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerAutorizacionEstado?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/authUsers/LOGEMPAuthUsersPortType/LOGEMPAuthUsersOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:aut=\"http://osbcorp.vtr.cl/LOG/EMP/authUsers\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <aut:authUsersRequest>\n                    <aut:codigoUsuario>" + usuario + "</aut:codigoUsuario>\n                    <aut:codigoEstado>" + estado + "</aut:codigoEstado>\n                  </aut:authUsersRequest>         \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codEstado = void 0;
                        var descEstado = void 0;
                        var codEstadoArr = void 0;
                        var descEstadoArr = void 0;
                        var i = 0;
                        codEstado = xml.getElementsByTagName("aut:codigoEstado");
                        descEstado = xml.getElementsByTagName("aut:descripcionEstado");
                        responseLenght = xml.getElementsByTagName("aut:autorizaciones")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codEstado[i].childNodes[0]) {
                            }
                            else {
                                if (codEstado[i].childNodes[0]) {
                                    codEstadoArr = codEstado[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codEstadoArr = '';
                                }
                                if (descEstado[i].childNodes[0]) {
                                    descEstadoArr = descEstado[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descEstadoArr = '';
                                }
                                self.estadoItems.push({
                                    estado: descEstadoArr,
                                    estadoCod: codEstadoArr,
                                });
                            }
                        }
                        resolve(self.estadoItems);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtProgramadaDataProvider.prototype.soapinvokeR5CrearActividad = function (codOt, descOt, tipo, depto, codClase, falla, causa, accion) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/crearActividad?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/cerrarActividadCorrectiva/LOGEMPCerrarActividadCorrectivaPortType/LOGEMPCerrarActividadCorrectivaOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:cer=\"http://osbcorp.vtr.cl/LOG/EMP/cerrarActividadCorrectiva\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <cer:cerrarActividadCorrectivaRequest>\n                      <cer:codigoOT>" + codOt + "</cer:codigoOT>\n                      <cer:descripcionOT>" + descOt + "</cer:descripcionOT>\n                      <cer:tipoActividad>" + tipo + "</cer:tipoActividad>\n                      <cer:codigoDepartamento>" + depto + "</cer:codigoDepartamento>\n                      <cer:centroCosto>213</cer:centroCosto>\n                      <cer:codigoClase>" + codClase + "</cer:codigoClase>\n                      <cer:falla>" + falla + "</cer:falla>\n                      <cer:causa>" + causa + "</cer:causa>\n                      <cer:accion>" + accion + "</cer:accion>\n                 </cer:cerrarActividadCorrectivaRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = parseInt(xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue);
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    DetalleOtProgramadaDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], DetalleOtProgramadaDataProvider);
    return DetalleOtProgramadaDataProvider;
}());

//# sourceMappingURL=detalle-ot-programada-data.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InspeccionesDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the InspeccionesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var InspeccionesDataProvider = /** @class */ (function () {
    function InspeccionesDataProvider(http) {
        this.http = http;
        this.itemsInspecciones = [];
    }
    //Llamar listado de inspecciones para OTs distintas a PMPE01
    InspeccionesDataProvider.prototype.soapinvokeR5ObtenerInspecciones = function (codOt) {
        var self = this;
        this.itemsInspecciones = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerInspeccionPpm?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerInspeccionPpm/LOGEMPObtenerInspeccionPpmPortType/LOGEMPObtenerInspeccionPpmOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerInspeccionPpm\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerInspeccionPpmRequest>\n                    <obt:codigoOT>" + codOt + "</obt:codigoOT>\n                  </obt:obtenerInspeccionPpmRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codOT = void 0;
                        var aspecto = void 0;
                        var direccion = void 0;
                        var codEquipo = void 0;
                        var categoriaEquipo = void 0;
                        var descEquipo = void 0;
                        var departamento = void 0;
                        var metodo = void 0;
                        var valor = void 0;
                        var obType = void 0;
                        var obrType = void 0;
                        var point = void 0;
                        var pointType = void 0;
                        var codOTArr = void 0;
                        var aspectoArr = void 0;
                        var direccionArr = void 0;
                        var codEquipoArr = void 0;
                        var categoriaEquipoArr = void 0;
                        var descEquipoArr = void 0;
                        var aspectoFull = void 0;
                        var descAspectoArr = void 0;
                        var departamentoArr = void 0;
                        var metodoArr = void 0;
                        var valorArr = void 0;
                        var obTypeArr = void 0;
                        var obrTypeArr = void 0;
                        var pointArr = void 0;
                        var pointTypeArr = void 0;
                        var i = 0;
                        codOT = xml.getElementsByTagName("obt:codigoOt");
                        aspecto = xml.getElementsByTagName("obt:aspecto");
                        direccion = xml.getElementsByTagName("obt:direccion");
                        codEquipo = xml.getElementsByTagName("obt:codigoEquipo");
                        categoriaEquipo = xml.getElementsByTagName("obt:categoriaEquipo");
                        descEquipo = xml.getElementsByTagName("obt:descripcionEquipo");
                        departamento = xml.getElementsByTagName("obt:departamento");
                        metodo = xml.getElementsByTagName("obt:metodo");
                        valor = xml.getElementsByTagName("obt:valor");
                        obType = xml.getElementsByTagName("obt:obType");
                        obrType = xml.getElementsByTagName("obt:obrType");
                        point = xml.getElementsByTagName("obt:point");
                        pointType = xml.getElementsByTagName("obt:pointType");
                        responseLenght = xml.getElementsByTagName("obt:inspecciones")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codOT[i].childNodes[0]) {
                            }
                            else {
                                if (codOT[i].childNodes[0]) {
                                    codOTArr = codOT[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codOTArr = '';
                                }
                                if (aspecto[i].childNodes[0]) {
                                    aspectoFull = aspecto[i].childNodes[0].nodeValue.split("//");
                                    aspectoArr = aspectoFull[0];
                                    descAspectoArr = aspectoFull[1];
                                }
                                else {
                                    aspectoArr = '';
                                    descAspectoArr = '';
                                }
                                if (direccion[i].childNodes[0]) {
                                    direccionArr = direccion[i].childNodes[0].nodeValue;
                                }
                                else {
                                    direccionArr = '';
                                }
                                if (codEquipo[i].childNodes[0]) {
                                    codEquipoArr = codEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codEquipoArr = '';
                                }
                                if (categoriaEquipo[i].childNodes[0]) {
                                    categoriaEquipoArr = categoriaEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    categoriaEquipoArr = '';
                                }
                                if (descEquipo[i].childNodes[0]) {
                                    descEquipoArr = descEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descEquipoArr = '';
                                }
                                if (departamento[i].childNodes[0]) {
                                    departamentoArr = departamento[i].childNodes[0].nodeValue;
                                }
                                else {
                                    departamentoArr = '';
                                }
                                if (metodo[i].childNodes[0]) {
                                    metodoArr = metodo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    metodoArr = '';
                                }
                                if (valor[i].childNodes[0]) {
                                    valorArr = valor[i].childNodes[0].nodeValue;
                                }
                                else {
                                    valorArr = '';
                                }
                                if (obType[i].childNodes[0]) {
                                    obTypeArr = obType[i].childNodes[0].nodeValue;
                                }
                                else {
                                    obTypeArr = '';
                                }
                                if (obrType[i].childNodes[0]) {
                                    obrTypeArr = obrType[i].childNodes[0].nodeValue;
                                }
                                else {
                                    obrTypeArr = '';
                                }
                                if (point[i].childNodes[0]) {
                                    pointArr = point[i].childNodes[0].nodeValue;
                                }
                                else {
                                    pointArr = '';
                                }
                                if (pointType[i].childNodes[0]) {
                                    pointTypeArr = pointType[i].childNodes[0].nodeValue;
                                }
                                else {
                                    pointTypeArr = '';
                                }
                                self.itemsInspecciones.push({
                                    objeto: codEquipoArr,
                                    almacen: codOTArr,
                                    categoria: categoriaEquipoArr,
                                    descripcion: descEquipoArr,
                                    aspecto: aspectoArr,
                                    descaspecto: descAspectoArr,
                                    metodo: metodoArr,
                                    metodouno: '',
                                    nodo: '',
                                    cuadrante: '',
                                    valorinspeccion: valorArr,
                                    direccion: direccionArr,
                                    numero: '',
                                    obTypeArr: obTypeArr,
                                    obrTypeArr: obrTypeArr,
                                    pointArr: pointArr,
                                    pointTypeArr: pointTypeArr
                                });
                            }
                        }
                        resolve(self.itemsInspecciones);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    //Llamar listado de inspecciones para OTs PMPE01
    InspeccionesDataProvider.prototype.soapinvokeR5ObtenerInspeccionesPMPE01 = function (codOt) {
        var self = this;
        this.itemsInspecciones = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerInspeccionPmpe01?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerInspeccionPmpe01/LOGEMPObtenerInspeccionPmpe01PortType/LOGEMPObtenerInspeccionPmpe01OperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerInspeccionPmpe01\">\n                    <soap:Header>\n                       <head:HeaderRequest>\n                          <head:Username>STLN</head:Username>\n                          <head:Company>STLN</head:Company>\n                          <head:AppName>SEAM</head:AppName>\n                          <head:IdClient>STLN</head:IdClient>\n                          <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                       </head:HeaderRequest>\n                    </soap:Header>\n                    <soap:Body>\n                    <obt:obtenerInspeccionPmpe01Request>\n                        <obt:codigoOT>" + codOt + "</obt:codigoOT>\n                    </obt:obtenerInspeccionPmpe01Request>\n                    </soap:Body>\n                 </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codOT = void 0;
                        var organizacion = void 0;
                        var direccion = void 0;
                        var codEquipo = void 0;
                        var categoriaEquipo = void 0;
                        var descEquipo = void 0;
                        var departamento = void 0;
                        var metodo = void 0;
                        var valor = void 0;
                        var codOTArr = void 0;
                        var organizacionArr = void 0;
                        var direccionArr = void 0;
                        var codEquipoArr = void 0;
                        var categoriaEquipoArr = void 0;
                        var descEquipoArr = void 0;
                        var departamentoArr = void 0;
                        var metodoArr = void 0;
                        var valorArr = void 0;
                        var i = 0;
                        codOT = xml.getElementsByTagName("obt:codigoOt");
                        organizacion = xml.getElementsByTagName("obt:organizacion");
                        direccion = xml.getElementsByTagName("obt:direccion");
                        codEquipo = xml.getElementsByTagName("obt:codigoEquipo");
                        categoriaEquipo = xml.getElementsByTagName("obt:categoriaEquipo");
                        descEquipo = xml.getElementsByTagName("obt:descripcionEquipo");
                        departamento = xml.getElementsByTagName("obt:departamento");
                        metodo = xml.getElementsByTagName("obt:metodo");
                        valor = xml.getElementsByTagName("obt:valor");
                        responseLenght = xml.getElementsByTagName("obt:inspecciones")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codOT[i].childNodes[0]) {
                            }
                            else {
                                if (codOT[i].childNodes[0]) {
                                    codOTArr = codOT[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codOTArr = '';
                                }
                                if (organizacion[i].childNodes[0]) {
                                    organizacionArr = organizacion[i].childNodes[0].nodeValue;
                                }
                                else {
                                    organizacionArr = '';
                                }
                                if (direccion[i].childNodes[0]) {
                                    direccionArr = direccion[i].childNodes[0].nodeValue;
                                }
                                else {
                                    direccionArr = '';
                                }
                                if (codEquipo[i].childNodes[0]) {
                                    codEquipoArr = codEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codEquipoArr = '';
                                }
                                if (categoriaEquipo[i].childNodes[0]) {
                                    categoriaEquipoArr = categoriaEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    categoriaEquipoArr = '';
                                }
                                if (descEquipo[i].childNodes[0]) {
                                    descEquipoArr = descEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descEquipoArr = '';
                                }
                                if (departamento[i].childNodes[0]) {
                                    departamentoArr = departamento[i].childNodes[0].nodeValue;
                                }
                                else {
                                    departamentoArr = '';
                                }
                                if (metodo[i].childNodes[0]) {
                                    metodoArr = metodo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    metodoArr = '';
                                }
                                if (valor[i].childNodes[0]) {
                                    valorArr = valor[i].childNodes[0].nodeValue;
                                }
                                else {
                                    valorArr = '';
                                }
                                self.itemsInspecciones.push({
                                    objeto: codEquipoArr,
                                    almacen: codOTArr,
                                    categoria: categoriaEquipoArr,
                                    descripcion: descEquipoArr,
                                    aspecto: '',
                                    metodo: metodoArr,
                                    metodouno: '',
                                    nodo: '',
                                    cuadrante: '',
                                    valorinspeccion: valorArr,
                                    direccion: direccionArr,
                                    numero: ''
                                });
                            }
                        }
                        resolve(self.itemsInspecciones);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    InspeccionesDataProvider.prototype.soapinvokeR5InsertarInspeccionesPMPE01Coti = function (codOt, codEquipo, valorMedicion, codTecnico) {
        var self = this;
        this.itemsInspecciones = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/ingresarInspeccion?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion/LOGEMPIngresarInspeccionPortType/LOGEMPIngresarInspeccionOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:ing=\"http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion\">\n                    <soap:Header>\n                       <head:HeaderRequest>\n                          <head:Username>STLN</head:Username>\n                          <head:Company>STLN</head:Company>\n                          <head:AppName>SEAM</head:AppName>\n                          <head:IdClient>STLN</head:IdClient>\n                          <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                       </head:HeaderRequest>\n                    </soap:Header>\n                    <soap:Body>\n                          <ing:ingresarInspeccionRequest>\n                          <ing:codigoSistemaSatelite>SEAM</ing:codigoSistemaSatelite>\n                          <ing:codigoOT>" + codOt + "</ing:codigoOT>\n                          <ing:codigoEquipo>" + codEquipo + "</ing:codigoEquipo>\n                          <ing:tipoEquipo>P</ing:tipoEquipo>\n                          <ing:tipoEquipoSecundario>P</ing:tipoEquipoSecundario>\n                          <ing:puntoInspeccion>1</ing:puntoInspeccion>\n                          <ing:tipoInspeccion>METI</ing:tipoInspeccion>\n                          <ing:codigoAspecto>COTI</ing:codigoAspecto>\n                          <ing:metodo>PMPE01TI</ing:metodo>\n                          <ing:valorInspeccion>" + valorMedicion + "</ing:valorInspeccion>\n                          <ing:codigoTecnico>" + codTecnico + "</ing:codigoTecnico>\n                      </ing:ingresarInspeccionRequest>\n                    </soap:Body>\n                 </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    InspeccionesDataProvider.prototype.soapinvokeR5InsertarInspeccionesPMPE01RETI = function (codOt, codEquipo, valorMedicion, codTecnico) {
        var self = this;
        this.itemsInspecciones = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/ingresarInspeccion?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion/LOGEMPIngresarInspeccionPortType/LOGEMPIngresarInspeccionOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:ing=\"http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion\">\n                    <soap:Header>\n                       <head:HeaderRequest>\n                          <head:Username>STLN</head:Username>\n                          <head:Company>STLN</head:Company>\n                          <head:AppName>SEAM</head:AppName>\n                          <head:IdClient>STLN</head:IdClient>\n                          <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                       </head:HeaderRequest>\n                    </soap:Header>\n                    <soap:Body>\n                        <ing:ingresarInspeccionRequest>\n                          <ing:codigoSistemaSatelite>SEAM</ing:codigoSistemaSatelite>\n                          <ing:codigoOT>" + codOt + "</ing:codigoOT>\n                          <ing:codigoEquipo>" + codEquipo + "</ing:codigoEquipo>\n                          <ing:tipoEquipo>P</ing:tipoEquipo>\n                          <ing:tipoEquipoSecundario>P</ing:tipoEquipoSecundario>\n                          <ing:puntoInspeccion>1</ing:puntoInspeccion>\n                          <ing:tipoInspeccion>METI</ing:tipoInspeccion>\n                          <ing:codigoAspecto>RETI</ing:codigoAspecto>\n                          <ing:metodo>PMPE01TI</ing:metodo>\n                          <ing:valorInspeccion>" + valorMedicion + "</ing:valorInspeccion>\n                          <ing:codigoTecnico>" + codTecnico + "</ing:codigoTecnico>\n                      </ing:ingresarInspeccionRequest>\n                    </soap:Body>\n                 </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    InspeccionesDataProvider.prototype.soapinvokeR5InsertarInspecciones = function (codOt, codEquipo, valorMedicion, codTecnico, obType, obrType, point, pointType, method, aspecto) {
        var self = this;
        this.itemsInspecciones = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/ingresarInspeccion?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion/LOGEMPIngresarInspeccionPortType/LOGEMPIngresarInspeccionOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:ing=\"http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion\">\n                    <soap:Header>\n                       <head:HeaderRequest>\n                          <head:Username>STLN</head:Username>\n                          <head:Company>STLN</head:Company>\n                          <head:AppName>SEAM</head:AppName>\n                          <head:IdClient>STLN</head:IdClient>\n                          <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                       </head:HeaderRequest>\n                    </soap:Header>\n                    <soap:Body>\n                          <ing:ingresarInspeccionRequest>\n                          <ing:codigoSistemaSatelite>SEAM</ing:codigoSistemaSatelite>\n                          <ing:codigoOT>" + codOt + "</ing:codigoOT>\n                          <ing:codigoEquipo>" + codEquipo + "</ing:codigoEquipo>\n                          <ing:tipoEquipo>" + obType + "</ing:tipoEquipo>\n                          <ing:tipoEquipoSecundario>" + obrType + "</ing:tipoEquipoSecundario>\n                          <ing:puntoInspeccion>" + point + "</ing:puntoInspeccion>\n                          <ing:tipoInspeccion>" + pointType + "</ing:tipoInspeccion>\n                          <ing:codigoAspecto>" + aspecto + "</ing:codigoAspecto>\n                          <ing:metodo>" + method + "</ing:metodo>\n                          <ing:valorInspeccion>" + valorMedicion + "</ing:valorInspeccion>\n                          <ing:codigoTecnico>" + codTecnico + "</ing:codigoTecnico>\n                      </ing:ingresarInspeccionRequest>\n                    </soap:Body>\n                 </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    InspeccionesDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], InspeccionesDataProvider);
    return InspeccionesDataProvider;
}());

//# sourceMappingURL=inspecciones-data.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialesDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the MaterialesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MaterialesDataProvider = /** @class */ (function () {
    function MaterialesDataProvider(http) {
        this.http = http;
        this.items = [];
        this.listadoAlmacen = [];
        this.tipotransaccion = [
            { tipotransaccion: 'DESPACHO' },
            { tipotransaccion: 'DEVOLUCION' }
        ];
        this.estadosEquipo = [
            { estadoequipo: 'BUENO' },
            { estadoequipo: 'DAÑADO' },
            { estadoequipo: 'PERDIDO' },
            { estadoequipo: 'DESCUADRE' }
        ];
    }
    MaterialesDataProvider.prototype.filterItemsOt = function (OtParam) {
        return this.items.filter(function (item) {
            return item.almacen.toLowerCase().
                indexOf(OtParam.toLowerCase()) > -1;
        });
    };
    MaterialesDataProvider.prototype.soapinvokeR5ObtenerMateriales = function (rutTecnico, almacen) {
        var self = this;
        this.items = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerMaterial?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerMaterial/LOGEMPObtenerMaterialPortType/LOGEMPObtenerMaterialOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerMaterial\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerMaterialRequest>\n                    <obt:codigoTecnico>" + rutTecnico + "</obt:codigoTecnico>\n                  </obt:obtenerMaterialRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codigoPieza = void 0;
                        var stockPieza = void 0;
                        var materialFull = void 0;
                        var descPiezaArr = void 0;
                        var codigoPiezaArr = void 0;
                        var stockPiezaArr = void 0;
                        var i = 0;
                        codigoPieza = xml.getElementsByTagName("obt:codigoPieza");
                        stockPieza = xml.getElementsByTagName("obt:stockPieza");
                        responseLenght = xml.getElementsByTagName("obt:materiales")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codigoPieza[i].childNodes[0]) {
                            }
                            else {
                                if (codigoPieza[i].childNodes[0]) {
                                    materialFull = codigoPieza[i].childNodes[0].nodeValue.split("//");
                                    codigoPiezaArr = materialFull[0];
                                    descPiezaArr = materialFull[1];
                                }
                                else {
                                    codigoPiezaArr = '';
                                    descPiezaArr = '';
                                }
                                if (stockPieza[i].childNodes[0]) {
                                    stockPiezaArr = stockPieza[i].childNodes[0].nodeValue;
                                }
                                else {
                                    stockPiezaArr = '';
                                }
                                self.items.push({
                                    idpieza: codigoPiezaArr,
                                    almacen: almacen,
                                    descpieza: descPiezaArr,
                                    compradirecta: '',
                                    pieza: codigoPiezaArr,
                                    stock: stockPiezaArr,
                                    fecha: '',
                                    cantidad: stockPiezaArr,
                                    estante: rutTecnico,
                                    comppieza: codigoPiezaArr + ' - ' + descPiezaArr,
                                });
                            }
                        }
                        self.listadoAlmacen.push({
                            almacen: almacen
                        });
                        resolve(self.items);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    MaterialesDataProvider.prototype.soapinvokeR5IngresarMateriales = function (tipoTrx, almacen, codOt, codAct, codPieza, rutTecnico, cantidad, estadoEquipo) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/instalarMateriales?wsdl', true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/instalarMateriales/LOGEMPInstalarMaterialesPortType/LOGEMPInstalarMaterialesOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:ins=\"http://osbcorp.vtr.cl/LOG/EMP/instalarMateriales\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                      <ins:instalarMaterialesRequest>\n                      <ins:tipoTransaccion>" + tipoTrx + '-' + estadoEquipo + "</ins:tipoTransaccion>\n                      <ins:almacen>" + almacen + "</ins:almacen>\n                      <ins:codigoOT>" + codOt + "</ins:codigoOT>\n                      <ins:pieza>" + codPieza + "</ins:pieza>\n                      <ins:codigoActividad>" + codAct + "</ins:codigoActividad>\n                      <ins:rut>" + rutTecnico + "</ins:rut>\n                      <ins:cantidad>" + cantidad + "</ins:cantidad>\n                  </ins:instalarMaterialesRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    MaterialesDataProvider.prototype.filterAlmacen = function () {
        return this.listadoAlmacen;
    };
    MaterialesDataProvider.prototype.filterEstadosEquipo = function () {
        return this.estadosEquipo;
    };
    MaterialesDataProvider.prototype.filterTipoTransaccion = function () {
        return this.tipotransaccion;
    };
    MaterialesDataProvider.prototype.filterMatByAlmacen = function (almacen) {
        return this.items.filter(function (item) {
            return item.almacen.toLowerCase().
                indexOf(almacen.toLowerCase()) > -1;
        });
    };
    MaterialesDataProvider.prototype.filterMatByPieza = function (pieza) {
        return this.items.filter(function (item) {
            return item.pieza.toLowerCase().
                indexOf(pieza.toLowerCase()) > -1;
        });
    };
    MaterialesDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], MaterialesDataProvider);
    return MaterialesDataProvider;
}());

//# sourceMappingURL=materiales-data.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RotacionDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the RotacionDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RotacionDataProvider = /** @class */ (function () {
    function RotacionDataProvider(http) {
        this.http = http;
        this.itemsEquipoNuevo = [];
        this.itemsEquipoAntiguo = [];
        this.estadosEquipo = [
            { estadoequipo: 'BUENO' },
            { estadoequipo: 'DAÑADO' },
            { estadoequipo: 'PERDIDO' },
            { estadoequipo: 'DESCUADRE' }
        ];
    }
    RotacionDataProvider.prototype.soapinvokeR5IngresarRotacion = function (equipoAntiguo, equipoNuevo, codOt, estadoEquipo, rutTecnico, descripcion) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/ingresarRotacion?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/ingresarRotacion/LOGEMPIngresarRotacionPortType/LOGEMPIngresarRotacionOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:ing=\"http://osbcorp.vtr.cl/LOG/EMP/ingresarRotacion\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <ing:ingresarRotacionRequest>\n                    <ing:codigoEquipoNuevo>" + equipoNuevo + "</ing:codigoEquipoNuevo>\n                    <ing:codigoOt>" + codOt + "</ing:codigoOt>\n                    <ing:codigoEquipoAntiguo>" + equipoAntiguo + "</ing:codigoEquipoAntiguo>\n                    <ing:estadoEquipo>" + estadoEquipo + "</ing:estadoEquipo>\n                    <ing:rutTecnico>" + rutTecnico + "</ing:rutTecnico>\n                    <ing:descripcion>" + descripcion + "</ing:descripcion>\n                  </ing:ingresarRotacionRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:mensaje")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    RotacionDataProvider.prototype.soapinvokeR5ObjAntiguo = function (codOt) {
        var self = this;
        this.itemsEquipoAntiguo = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerObjetoOriginal?wsdl', true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerObjetoOriginal/LOGEMPObtenerObjetoOriginalPortType/LOGEMPObtenerObjetoOriginalOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerObjetoOriginal\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerObjetoOriginalRequest>\n                      <obt:codigoOT>" + codOt + "</obt:codigoOT>\n                  </obt:obtenerObjetoOriginalRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codEquipo = void 0;
                        var descEquipo = void 0;
                        var claseEquipo = void 0;
                        var catEquipo = void 0;
                        var codEquipoArr = void 0;
                        var descEquipoArr = void 0;
                        var claseEquipoArr = void 0;
                        var catEquipoArr = void 0;
                        var i = 0;
                        codEquipo = xml.getElementsByTagName("obt:codigoEquipo");
                        descEquipo = xml.getElementsByTagName("obt:descripcionEquipo");
                        claseEquipo = xml.getElementsByTagName("obt:claseEquipo");
                        catEquipo = xml.getElementsByTagName("obt:categoriaEquipo");
                        responseLenght = xml.getElementsByTagName("obt:equipos")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codEquipo[i].childNodes[0]) {
                            }
                            else {
                                if (codEquipo[i].childNodes[0]) {
                                    codEquipoArr = codEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codEquipoArr = '';
                                }
                                if (descEquipo[i].childNodes[0]) {
                                    descEquipoArr = descEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descEquipoArr = '';
                                }
                                if (claseEquipo[i].childNodes[0]) {
                                    claseEquipoArr = claseEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    claseEquipoArr = '';
                                }
                                if (catEquipo[i].childNodes[0]) {
                                    catEquipoArr = catEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    catEquipoArr = '';
                                }
                                self.itemsEquipoAntiguo.push({
                                    equipoantiguo: codEquipoArr,
                                    equipoantiguoCod: '',
                                    descequipoantiguo: descEquipoArr,
                                    claseequipoantiguo: claseEquipoArr,
                                    catequipoantiguo: catEquipoArr,
                                    compequipoantiguo: codEquipoArr + ' - ' + descEquipoArr,
                                });
                            }
                        }
                        resolve(self.itemsEquipoAntiguo);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    RotacionDataProvider.prototype.soapinvokeR5ObjNuevo = function (ruttecnico, almacen) {
        var self = this;
        this.itemsEquipoNuevo = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerObjetoNuevo?wsdl', true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerObjetoNuevo/LOGEMPObtenerObjetoNuevoPortType/LOGEMPObtenerObjetoNuevoOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerObjetoNuevo\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerObjetoNuevoRequest>\n                      <obt:codigoAlmacen>" + almacen + "</obt:codigoAlmacen>\n                      <obt:codigoTecnico>" + ruttecnico + "</obt:codigoTecnico>\n                  </obt:obtenerObjetoNuevoRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codTecnico = void 0;
                        var codSeriado = void 0;
                        var codEquipo = void 0;
                        var descEquipo = void 0;
                        var codTecnicoArr = void 0;
                        var codSeriadoArr = void 0;
                        var codEquipoArr = void 0;
                        var descEquipoArr = void 0;
                        var i = 0;
                        codTecnico = xml.getElementsByTagName("obt:codigoTecnico");
                        codSeriado = xml.getElementsByTagName("obt:codigoSeriado");
                        codEquipo = xml.getElementsByTagName("obt:codigoEquipo");
                        descEquipo = xml.getElementsByTagName("obt:descripcionEquipo");
                        responseLenght = xml.getElementsByTagName("obt:equipos")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codTecnico[i].childNodes[0]) {
                            }
                            else {
                                if (codTecnico[i].childNodes[0]) {
                                    codTecnicoArr = codTecnico[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codTecnicoArr = '';
                                }
                                if (codSeriado[i].childNodes[0]) {
                                    codSeriadoArr = codSeriado[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codSeriadoArr = '';
                                }
                                if (codEquipo[i].childNodes[0]) {
                                    codEquipoArr = codEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codEquipoArr = '';
                                }
                                if (descEquipo[i].childNodes[0]) {
                                    descEquipoArr = descEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descEquipoArr = '';
                                }
                                self.itemsEquipoNuevo.push({
                                    equiponuevo: codEquipoArr,
                                    codSeriado: codSeriadoArr,
                                    codTecnico: codTecnicoArr,
                                    descEquipo: descEquipoArr,
                                    compequiponuevo: codEquipoArr + ' - ' + descEquipoArr,
                                });
                            }
                        }
                        resolve(self.itemsEquipoNuevo);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    RotacionDataProvider.prototype.filterEstadosEquipo = function () {
        return this.estadosEquipo;
    };
    RotacionDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], RotacionDataProvider);
    return RotacionDataProvider;
}());

//# sourceMappingURL=rotacion-data.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtcrearactividadesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_actividades_data_actividades_data__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__otcrearactividadnueva_otcrearactividadnueva__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_comentarios_data_comentarios_data__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_base64__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_dropbox_dropbox__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_database_database__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the OtcrearactividadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtcrearactividadesPage = /** @class */ (function () {
    function OtcrearactividadesPage(navCtrl, navParams, formBuilder, camera, loadingCtrl, alertCtrl, dataService, comentariosDataService, database, network, dropbox, base64) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.dataService = dataService;
        this.comentariosDataService = comentariosDataService;
        this.database = database;
        this.network = network;
        this.dropbox = dropbox;
        this.base64 = base64;
        this.valorOT = '';
        this.checkactividad = false;
        this.itemsUrl = [];
        this.itemsUpload = [];
        this.valorOT = navParams.get('data');
        this.userTecnico = navParams.get('username');
        this.equipo = navParams.get('equipo');
        this.numActividad = navParams.get('actividad');
        this.descripcionActividad = navParams.get('descripcionActividad');
        this.codTarea = navParams.get('codTarea');
        this.estadoOt = navParams.get('estadoOt');
        this.descTarea = navParams.get('descTarea');
        this.tipoOt = navParams.get('tipoOt');
        this.descOt = navParams.get('descOt');
        this.depto = navParams.get('depto');
        this.myForm = this.createMyForm();
        this.myForm.controls['actividad'].disable();
    }
    OtcrearactividadesPage.prototype.saveData = function () {
    };
    OtcrearactividadesPage.prototype.ionViewDidLoad = function () {
        this.dropbox.setAccessToken("heBg2DZjZxAAAAAAAAAAEJKGasOnhHn8ZJXnndvnRKg8ip7EDLZpERfK41a8UVww");
    };
    OtcrearactividadesPage.prototype.ionViewWillEnter = function () {
        this.showLoading();
        var self = this;
        self.dataService.soapinvokeR5ucodesTareas().then(function (valueR5CodesTareas) {
            self.itemsTareas = valueR5CodesTareas;
            self.dataService.soapinvokeR5ucodesMotivoRep().then(function (valueR5CodesMotivoRep) {
                self.itemsMotivoRep = valueR5CodesMotivoRep;
                self.valorFilterTarea = self.itemsTareas.findIndex(function (k) { return k.tareaItem == self.codTarea; });
                self.tarea = self.itemsTareas[self.valorFilterTarea];
                self.dataService.soapinvokeR5ucodesTecnicos(self.depto).then(function (valueR5CodesTecnicos) {
                    self.itemsTecnicos = valueR5CodesTecnicos;
                    self.valorFilter = self.itemsTecnicos.findIndex(function (k) { return k.tecnicoItem == self.userTecnico; });
                    self.tecnicoplanificado = self.itemsTecnicos[self.valorFilter];
                    self.loading.dismiss();
                }, function (reason) {
                    self.showError("Error al ejecutar servicio R5UcodesTecnicos");
                });
            }, function (reason) {
                self.showError("Error al ejecutar servicio R5UcodesMotivoRep");
            });
        }, function (reason) {
            self.showError("Error al ejecutar servicio R5UcodesTareas");
        });
    };
    OtcrearactividadesPage.prototype.createMyForm = function () {
        return this.formBuilder.group({
            actividad: [this.numActividad],
            horasestimadas: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            tarea: [this.codTarea, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            tecnicoplanificado: [this.userTecnico, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            checkactividad: [false],
            desctarea: [this.descTarea],
            equipo: [this.equipo, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            notas: [this.descripcionActividad],
            motivorep: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
    };
    OtcrearactividadesPage.prototype.getBlob = function (b64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        b64Data = b64Data.toString().replace(/^[^,]+,/, '');
        b64Data = b64Data.toString().replace(/\s/g, '');
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    OtcrearactividadesPage.prototype.llenadoCampos = function (event) {
        this.myForm.get('desctarea').setValue(event.value.tareaDesc);
    };
    OtcrearactividadesPage.prototype.keyUpChecker = function (ev) {
        this.validateNumberType = this.validateNumericType(Number(this.horasestimadas));
        if (this.validateNumberType == false) {
            var alert_1 = this.alertCtrl.create({
                message: '<font size=3 color=black>Valor ingresado no es numérico. Favor ajustar selección</font>',
                cssClass: 'buttonCss',
                buttons: [{
                        text: 'Ok',
                        cssClass: 'ok-button'
                    }]
            });
            alert_1.present();
            this.myForm.get('horasestimadas').setValue('');
        }
    };
    OtcrearactividadesPage.prototype.getPicture = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this
            .camera
            .getPicture(options)
            .then(function (imageData) {
            var self = _this;
            self.showLoading();
            self.base64Image = imageData;
            self.base64.encodeFile(self.base64Image).then(function (base64File) {
                var imageBlob = self.getBlob(base64File, "Content-Type: image/jpeg");
                var rand = Math.floor(Math.random() * 2000000000000) + 1;
                var nombreArchivo = rand + '.jpg';
                self.dropbox.uploadFile(imageBlob, nombreArchivo).then(function (data) {
                    self.dropbox.getPublicUrl(nombreArchivo).then(function (dataDos) {
                        self.itemsUpload = dataDos;
                        self.itemsUrl = JSON.parse(self.itemsUpload);
                        self.comentariosDataService.soapinvokeR5countaddetails(self.valorOT).then(function (countComents) {
                            self.comentariosDataService.soapinvokeR5addetailsinterface(self.valorOT, 'Link Foto: ' + self.itemsUrl.url, self.userTecnico, countComents).then(function (valueR5addetailsinterface) {
                                self.loading.dismiss();
                                var alert = self.alertCtrl.create({
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
            }, function (err) {
                console.log(err);
            });
        }, function (err) {
            console.log(err);
        });
    };
    OtcrearactividadesPage.prototype.enviarActividad = function () {
        var _this = this;
        var networkType = this.network.type;
        if (this.checkactividad == true) {
            var prompt_1 = this.alertCtrl.create({
                message: "<font size=3 color=black>¿Confirma envío Completado y 100% Avance?</font>",
                cssClass: 'buttonCss',
                buttons: [
                    {
                        text: 'Enviar',
                        handler: function (data) {
                            if (networkType === 'none') {
                                _this.showLoading();
                                var self = _this;
                                if (self.notas === undefined) {
                                    self.notasVacio = '';
                                }
                                else {
                                    self.notasVacio = self.notas;
                                }
                                self.checkActividadString = '+';
                                self.database.addActualizarActividad(self.valorOT, self.estadoOt, self.notasVacio, self.tecnicoplanificado.tecnicoItem, self.tarea.tareaItem, self.checkActividadString, self.numActividad, self.horasestimadas, self.equipo, self.tipoOt, self.descOt, self.motivorep.motivoRep).then(function (value) {
                                    self.navCtrl.popToRoot();
                                    var alert = self.alertCtrl.create({
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
                                _this.showLoading();
                                var self = _this;
                                if (self.notas === undefined) {
                                    self.notasVacio = '';
                                }
                                else {
                                    self.notasVacio = self.notas;
                                }
                                self.checkActividadString = '+';
                                self.dataService.soapinvokeR5EventInterfacePpmUpdate(self.valorOT, self.estadoOt, self.notasVacio, self.tecnicoplanificado.tecnicoItem, self.tarea.tareaItem, self.checkActividadString, self.numActividad, self.horasestimadas, self.equipo, self.tipoOt, self.descOt, self.motivorep.motivoRep).then(function (valueR5EventUpdate) {
                                    self.navCtrl.popToRoot();
                                    var alert = self.alertCtrl.create({
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
                                    self.showError("Error al ejecutar servicio R5UcodesMotivoRep");
                                });
                            }
                        },
                        cssClass: 'cancelaract-button'
                    },
                    {
                        text: 'Cancelar',
                        handler: function (data) {
                        },
                        cssClass: 'exitact-button'
                    }
                ]
            });
            prompt_1.setMode('md');
            prompt_1.present();
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
                self.database.addActualizarActividad(self.valorOT, self.estadoOt, self.notasVacio, self.tecnicoplanificado.tecnicoItem, self.tarea.tareaItem, self.checkActividadString, self.numActividad, self.horasestimadas, self.equipo, self.tipoOt, self.descOt, self.motivorep.motivoRep).then(function (value) {
                    self.navCtrl.pop();
                    var alert = self.alertCtrl.create({
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
                self.dataService.soapinvokeR5EventInterfacePpmUpdate(self.valorOT, self.estadoOt, self.notasVacio, self.tecnicoplanificado.tecnicoItem, self.tarea.tareaItem, self.checkActividadString, self.numActividad, self.horasestimadas, self.equipo, self.tipoOt, self.descOt, self.motivorep.motivoRep).then(function (valueR5EventUpdate) {
                    self.navCtrl.pop();
                    var alert = self.alertCtrl.create({
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
    };
    OtcrearactividadesPage.prototype.goToOtActividadesNuevas = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__otcrearactividadnueva_otcrearactividadnueva__["a" /* OtcrearactividadnuevaPage */], {
            data: this.valorOT,
            equipo: this.equipo,
            username: this.userTecnico,
            actividad: this.numActividad,
            estadoOt: this.estadoOt,
            tipoOt: this.tipoOt,
            descOt: this.descOt,
            codTarea: this.codTarea,
            descripcionActividad: this.descripcionActividad,
            descTarea: this.descTarea,
            depto: this.depto
        });
    };
    OtcrearactividadesPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    OtcrearactividadesPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    OtcrearactividadesPage.prototype.validateNumericType = function (data) {
        return !isNaN(Number(data.toString()));
    };
    OtcrearactividadesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-otcrearactividades',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otcrearactividades/otcrearactividades.html"*/'<!--\n  Generated template for the OtcrearactividadesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="liberty">\n    <ion-title text-right><font size="2">Actualizar Actividad OT {{valorOT}}</font></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <form [formGroup]="myForm" (ngSubmit)="saveData()">\n    <ion-item no-lines>\n      <ion-label color="dark" stacked>Actividad:<span danger>*</span></ion-label>\n      <ion-input text-center formControlName="actividad"></ion-input>\n    </ion-item>\n    <ion-item no-lines>\n      <ion-label color="dark" stacked>Horas Estimadas:<span danger>*</span></ion-label>\n      <ion-input text-center (keyup)="keyUpChecker($event)" formControlName="horasestimadas"\n        [(ngModel)]="horasestimadas"></ion-input>\n    </ion-item>\n    <ion-grid>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-5>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Tareas:<span danger>*</span></ion-label>\n            <ionic-selectable\n            item-content \n            [(ngModel)]="tarea"\n            [items]="itemsTareas"\n            class="busquedatarea"\n            itemValueField="tareaItem"\n            itemTextField="comptarea"\n            formControlName="tarea"\n            [canSearch]="true"\n            (onChange)="llenadoCampos($event)">\n            <ng-template ionicSelectableItemTemplate let-port="item"\n            let-isPortSelected="isItemSelected">\n              <ion-label text-wrap>\n                {{port.comptarea}}\n              </ion-label>\n            </ng-template>\n          </ionic-selectable>\n          </ion-item>\n        </ion-col>\n        <ion-col col-7>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Desc. Tarea:</ion-label>\n            <ion-input text-center formControlName="desctarea"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-6>\n            <ion-item no-lines>\n                <ion-label color="dark" stacked>Técnico planificado:<span danger>*</span></ion-label>\n                <ionic-selectable\n                item-content \n                [(ngModel)]="tecnicoplanificado"\n                [items]="itemsTecnicos"\n                class="busquedamotivorep"\n                itemValueField="tecnicoItem"\n                itemTextField="comptecnico"\n                formControlName="tecnicoplanificado"\n                [canSearch]="true">\n                <ng-template ionicSelectableItemTemplate let-port="item"\n                let-isPortSelected="isItemSelected">\n              <ion-label text-wrap>\n                {{port.comptecnico}}\n              </ion-label>\n            </ng-template>\n          </ionic-selectable>\n              </ion-item>\n        </ion-col>\n        <ion-col col-6>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Equipo:<span danger>*</span></ion-label>\n            <ion-input text-center formControlName="equipo" class="inputcorrectivo"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Solución:<span danger>*</span></ion-label>\n            <ionic-selectable\n                item-content \n                [(ngModel)]="motivorep"\n                [items]="itemsMotivoRep"\n                class="busquedamotivorep"\n                itemValueField="motivoRep"\n                itemTextField="compmotivo"\n                formControlName="motivorep"\n                [canSearch]="true">\n                <ng-template ionicSelectableItemTemplate let-port="item"\n                let-isPortSelected="isItemSelected">\n              <ion-label text-wrap>\n                {{port.compmotivo}}\n              </ion-label>\n            </ng-template>\n          </ionic-selectable>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6>\n          <ion-item no-lines>\n            <ion-checkbox item-end formControlName="checkactividad" [(ngModel)]="checkactividad"></ion-checkbox>\n            <ion-label color="dark" class="checkboxclass" stacked>Acti. Completada</ion-label>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Notas:</ion-label>\n            <ion-textarea formControlName="notas" [(ngModel)]="notas"></ion-textarea>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-grid>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-5>\n          <div>\n            <button class="botonguardar" ion-button color="dark" (click)="enviarActividad()" [disabled]="!myForm.valid"\n              rounded>\n              <font size="2">Enviar</font>\n            </button>\n          </div>\n        </ion-col>\n        <ion-col col-1>\n\n        </ion-col>\n        <ion-col col-5>\n          <div>\n            <button class="botononedrive" type="button" ion-button color="dark" rounded (click)="getPicture()">\n              <font size="2">Fotos</font>\n            </button>\n          </div>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivoboton">\n        <ion-col col-2>\n\n        </ion-col>\n        <ion-col col-6>\n          <div>\n            <button class="botonnuevact" type="button" ion-button color="dark" (click)="goToOtActividadesNuevas()"\n              rounded>\n              <font size="2">Agregar Nueva Actividad</font>\n            </button>\n          </div>\n        </ion-col>\n        <ion-col col-2>\n\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otcrearactividades/otcrearactividades.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__providers_actividades_data_actividades_data__["a" /* ActividadesDataProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_comentarios_data_comentarios_data__["a" /* ComentariosDataProvider */], __WEBPACK_IMPORTED_MODULE_10__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_8__providers_dropbox_dropbox__["a" /* DropboxProvider */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_base64__["a" /* Base64 */]])
    ], OtcrearactividadesPage);
    return OtcrearactividadesPage;
}());

//# sourceMappingURL=otcrearactividades.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtcrearactividadnuevaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_actividades_data_actividades_data__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_comentarios_data_comentarios_data__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_base64__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_dropbox_dropbox__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_network__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_database_database__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the OtcrearactividadesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtcrearactividadnuevaPage = /** @class */ (function () {
    function OtcrearactividadnuevaPage(navCtrl, navParams, formBuilder, camera, loadingCtrl, alertCtrl, dataService, comentariosDataService, database, network, dropbox, base64) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.dataService = dataService;
        this.comentariosDataService = comentariosDataService;
        this.database = database;
        this.network = network;
        this.dropbox = dropbox;
        this.base64 = base64;
        this.valorOT = '';
        this.checkactividad = false;
        this.itemsUrl = [];
        this.itemsUpload = [];
        this.valorOT = navParams.get('data');
        this.userTecnico = navParams.get('username');
        this.equipo = navParams.get('equipo');
        this.estadoOt = navParams.get('estadoOt');
        this.numActividad = navParams.get('actividad');
        this.descTarea = navParams.get('descTarea');
        this.descripcionActividad = navParams.get('descripcionActividad');
        this.codTarea = navParams.get('codTarea');
        this.tipoOt = navParams.get('tipoOt');
        this.descOt = navParams.get('descOt');
        this.depto = navParams.get('depto');
        this.myForm = this.createMyForm();
    }
    OtcrearactividadnuevaPage.prototype.saveData = function () {
    };
    OtcrearactividadnuevaPage.prototype.ionViewDidLoad = function () {
        this.dropbox.setAccessToken("heBg2DZjZxAAAAAAAAAAEJKGasOnhHn8ZJXnndvnRKg8ip7EDLZpERfK41a8UVww");
    };
    OtcrearactividadnuevaPage.prototype.ionViewWillEnter = function () {
        this.showLoading();
        var self = this;
        self.dataService.soapinvokeR5ucodesTareas().then(function (valueR5CodesTareas) {
            self.itemsTareas = valueR5CodesTareas;
            self.dataService.soapinvokeR5ucodesMotivoRep().then(function (valueR5CodesMotivoRep) {
                self.itemsMotivoRep = valueR5CodesMotivoRep;
                self.valorFilterTarea = self.itemsTareas.findIndex(function (k) { return k.tareaItem == self.codTarea; });
                self.tarea = self.itemsTareas[self.valorFilterTarea];
                self.dataService.soapinvokeR5ucodesTecnicos(self.depto).then(function (valueR5CodesTecnicos) {
                    self.itemsTecnicos = valueR5CodesTecnicos;
                    self.valorFilter = self.itemsTecnicos.findIndex(function (k) { return k.tecnicoItem == self.userTecnico; });
                    self.tecnicoplanificado = self.itemsTecnicos[self.valorFilter];
                    self.loading.dismiss();
                }, function (reason) {
                    self.showError("Error al ejecutar servicio R5UcodesTecnicos");
                });
            }, function (reason) {
                self.showError("Error al ejecutar servicio R5UcodesMotivoRep");
            });
        }, function (reason) {
            self.showError("Error al ejecutar servicio R5UcodesTareas");
        });
    };
    OtcrearactividadnuevaPage.prototype.createMyForm = function () {
        return this.formBuilder.group({
            horasestimadas: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            tarea: [this.codTarea, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            codigoactividad: [''],
            tecnicoplanificado: [this.userTecnico, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            checkactividad: [false],
            desctarea: [this.descTarea],
            equipo: [this.equipo, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            notas: [this.descripcionActividad],
            motivorep: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
        });
    };
    OtcrearactividadnuevaPage.prototype.getPicture = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this
            .camera
            .getPicture(options)
            .then(function (imageData) {
            var self = _this;
            self.showLoading();
            self.base64Image = imageData;
            self.base64.encodeFile(self.base64Image).then(function (base64File) {
                var imageBlob = self.getBlob(base64File, "Content-Type: image/jpeg");
                var rand = Math.floor(Math.random() * 2000000000000) + 1;
                var nombreArchivo = rand + '.jpg';
                self.dropbox.uploadFile(imageBlob, nombreArchivo).then(function (data) {
                    self.dropbox.getPublicUrl(nombreArchivo).then(function (dataDos) {
                        self.itemsUpload = dataDos;
                        self.itemsUrl = JSON.parse(self.itemsUpload);
                        self.comentariosDataService.soapinvokeR5countaddetails(self.valorOT).then(function (countComents) {
                            self.comentariosDataService.soapinvokeR5addetailsinterface(self.valorOT, 'Link Foto: ' + self.itemsUrl.url, self.userTecnico, countComents).then(function (valueR5addetailsinterface) {
                                self.loading.dismiss();
                                var alert = self.alertCtrl.create({
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
            }, function (err) {
            });
        }, function (err) {
        });
    };
    OtcrearactividadnuevaPage.prototype.getBlob = function (b64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        b64Data = b64Data.toString().replace(/^[^,]+,/, '');
        b64Data = b64Data.toString().replace(/\s/g, '');
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    OtcrearactividadnuevaPage.prototype.enviarActividad = function () {
        var _this = this;
        var networkType = this.network.type;
        if (this.checkactividad == true) {
            var prompt_1 = this.alertCtrl.create({
                message: "<font size=3 color=black>¿Confirma envío Completado y 100% Avance?</font>",
                cssClass: 'buttonCss',
                buttons: [
                    {
                        text: 'Enviar',
                        handler: function (data) {
                            if (networkType === 'none') {
                                _this.showLoading();
                                var self = _this;
                                if (self.notas === undefined) {
                                    self.notasVacio = '';
                                }
                                else {
                                    self.notasVacio = self.notas;
                                }
                                self.checkActividadString = '+';
                                self.numActividadInc = self.numActividad++;
                                self.database.addCrearActividad(self.valorOT, self.estadoOt, self.notasVacio, self.tecnicoplanificado.tecnicoItem, self.tarea.tareaItem, self.checkActividadString, self.horasestimadas, self.numActividadInc, self.equipo, self.tipoOt, self.descOt, self.motivorep.motivoRep).then(function (value) {
                                    self.navCtrl.popToRoot();
                                    var alert = self.alertCtrl.create({
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
                                _this.showLoading();
                                var self = _this;
                                if (self.notas === undefined) {
                                    self.notasVacio = '';
                                }
                                else {
                                    self.notasVacio = self.notas;
                                }
                                self.checkActividadString = '+';
                                self.numActividadInc = self.numActividad++;
                                self.dataService.soapinvokeR5EventInterfacePpmCreate(self.valorOT, self.estadoOt, self.notasVacio, self.tecnicoplanificado.tecnicoItem, self.tarea.tareaItem, self.checkActividadString, self.horasestimadas, self.numActividadInc, self.equipo, self.tipoOt, self.descOt, self.motivorep.motivoRep).then(function (valueR5EventCreate) {
                                    self.navCtrl.popToRoot();
                                    var alert = self.alertCtrl.create({
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
                        handler: function (data) {
                        },
                        cssClass: 'exitact-button'
                    }
                ]
            });
            prompt_1.setMode('md');
            prompt_1.present();
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
                self.database.addCrearActividad(self.valorOT, self.estadoOt, self.notasVacio, self.tecnicoplanificado.tecnicoItem, self.tarea.tareaItem, self.checkActividadString, self.horasestimadas, self.numActividadInc, self.equipo, self.tipoOt, self.descOt, self.motivorep.motivoRep).then(function (value) {
                    self.navCtrl.pop();
                    self.navCtrl.pop();
                    var alert = self.alertCtrl.create({
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
                self.dataService.soapinvokeR5EventInterfacePpmCreate(self.valorOT, self.estadoOt, self.notasVacio, self.tecnicoplanificado.tecnicoItem, self.tarea.tareaItem, self.checkActividadString, self.horasestimadas, self.numActividadInc, self.equipo, self.tipoOt, self.descOt, self.motivorep.motivoRep).then(function (valueR5EventCreate) {
                    self.navCtrl.pop();
                    self.navCtrl.pop();
                    var alert = self.alertCtrl.create({
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
    };
    OtcrearactividadnuevaPage.prototype.llenadoCampos = function (event) {
        this.myForm.get('desctarea').setValue(event.value.tareaDesc);
    };
    OtcrearactividadnuevaPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    OtcrearactividadnuevaPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    OtcrearactividadnuevaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-otcrearactividadnueva',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otcrearactividadnueva/otcrearactividadnueva.html"*/'<!--\n  Generated template for the OtcrearactividadesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="liberty">\n    <ion-title text-right><font size="2">Crear Actividad OT {{valorOT}}</font></ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <form [formGroup]="myForm" (ngSubmit)="saveData()">\n    <ion-item no-lines>\n      <ion-label color="dark" stacked>Horas Estimadas:<span danger>*</span></ion-label>\n      <ion-input text-center formControlName="horasestimadas" [(ngModel)]="horasestimadas"></ion-input>\n    </ion-item>\n    <ion-grid>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-5>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Tareas:<span danger>*</span></ion-label>\n            <ionic-selectable\n            item-content \n            [(ngModel)]="tarea"\n            [items]="itemsTareas"\n            class="busquedatarea"\n            itemValueField="tareaItem"\n            itemTextField="comptarea"\n            formControlName="tarea"\n            [canSearch]="true"\n            (onChange)="llenadoCampos($event)">\n            <ng-template ionicSelectableItemTemplate let-port="item"\n            let-isPortSelected="isItemSelected">\n              <ion-label text-wrap>\n                {{port.comptarea}}\n              </ion-label>\n            </ng-template>\n          </ionic-selectable>\n          </ion-item>\n        </ion-col>\n        <ion-col col-7>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Desc. Tarea:</ion-label>\n            <ion-input text-center formControlName="desctarea"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-6>\n            <ion-item no-lines>\n                <ion-label color="dark" stacked>Técnico planificado:<span danger>*</span></ion-label>\n                <ionic-selectable\n                item-content \n                [(ngModel)]="tecnicoplanificado"\n                [items]="itemsTecnicos"\n                class="busquedamotivorep"\n                itemValueField="tecnicoItem"\n                itemTextField="comptecnico"\n                formControlName="tecnicoplanificado"\n                [canSearch]="true">\n                <ng-template ionicSelectableItemTemplate let-port="item"\n                let-isPortSelected="isItemSelected">\n              <ion-label text-wrap>\n                {{port.comptecnico}}\n              </ion-label>\n            </ng-template>\n          </ionic-selectable>\n              </ion-item>\n        </ion-col>\n        <ion-col col-6>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Equipo:<span danger>*</span></ion-label>\n            <ion-input text-center formControlName="equipo" class="inputcorrectivo"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Solución:<span danger>*</span></ion-label>\n            <ionic-selectable\n                item-content \n                [(ngModel)]="motivorep"\n                [items]="itemsMotivoRep"\n                class="busquedamotivorep"\n                itemValueField="motivoRep"\n                itemTextField="compmotivo"\n                formControlName="motivorep"\n                [canSearch]="true">\n                <ng-template ionicSelectableItemTemplate let-port="item"\n                let-isPortSelected="isItemSelected">\n              <ion-label text-wrap>\n                {{port.compmotivo}}\n              </ion-label>\n            </ng-template>\n          </ionic-selectable>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6>\n          <ion-item no-lines>\n            <ion-checkbox item-end formControlName="checkactividad" [(ngModel)]="checkactividad"></ion-checkbox>\n            <ion-label color="dark" class="checkboxclass" stacked>Acti. Completada</ion-label>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Notas:</ion-label>\n            <ion-textarea formControlName="notas" [(ngModel)]="notas"></ion-textarea>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-grid>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-5>\n          <div>\n            <button class="botonguardar" ion-button color="dark" (click)="enviarActividad()" [disabled]="!myForm.valid"\n              rounded>\n              <font size="2">Enviar</font>\n            </button>\n          </div>\n        </ion-col>\n        <ion-col col-1>\n\n        </ion-col>\n        <ion-col col-5>\n          <div>\n            <button class="botononedrive" type="button" ion-button color="dark" rounded (click)="getPicture()">\n              <font size="2">Fotos</font>\n            </button>\n          </div>\n        </ion-col>\n      </ion-row>\n\n    </ion-grid>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otcrearactividadnueva/otcrearactividadnueva.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_4__providers_actividades_data_actividades_data__["a" /* ActividadesDataProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_comentarios_data_comentarios_data__["a" /* ComentariosDataProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_7__providers_dropbox_dropbox__["a" /* DropboxProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_base64__["a" /* Base64 */]])
    ], OtcrearactividadnuevaPage);
    return OtcrearactividadnuevaPage;
}());

//# sourceMappingURL=otcrearactividadnueva.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComentariosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_comentarios_data_comentarios_data__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__otagregarcomentario_otagregarcomentario__ = __webpack_require__(499);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ComentariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ComentariosPage = /** @class */ (function () {
    function ComentariosPage(navCtrl, navParams, dataService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataService = dataService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.ot = '';
        this.act = '';
        this.ot = navParams.get('data');
        this.username = navParams.get('username');
    }
    ComentariosPage.prototype.ionViewDidLoad = function () {
    };
    ComentariosPage.prototype.ionViewWillEnter = function () {
        this.showLoading();
        var self = this;
        this.dataService.soapinvokeR5ObtenerComentarios(self.ot).then(function (r5ObtenerComentarios) {
            self.items = r5ObtenerComentarios;
            self.loading.dismiss();
        }, function (reason) {
            self.showError("Error al ejecutar servicio R5ObjNuevo");
        });
    };
    ComentariosPage.prototype.agregarComentario = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__otagregarcomentario_otagregarcomentario__["a" /* OtagregarcomentarioPage */], {
            data: this.ot,
            username: this.username
        });
    };
    ComentariosPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    ComentariosPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    ComentariosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-comentarios',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/comentarios/comentarios.html"*/'<!--\n  Generated template for the ComentariosPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="liberty">\n    <ion-title text-right>\n      <font size="2">Comentarios OT {{ot}}&emsp;&emsp;&emsp;Actividad {{act}}</font>\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-row>\n      <ion-item text-wrap [color]="even? \'lightgrey\' : \'light\'" *ngFor="let item of items ; let even = even">\n        <div class="CustomColour">\n          {{item.comentario}}\n        </div>\n      </ion-item>\n    </ion-row>\n    <ion-row>\n      <ion-col col-4>\n      </ion-col>\n      <ion-col col-4>\n        <button class="botonguardar" ion-button color="dark" (click)="agregarComentario()" rounded>Agregar</button>\n      </ion-col>\n      <ion-col col-4>\n      </ion-col>\n    </ion-row>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/comentarios/comentarios.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_comentarios_data_comentarios_data__["a" /* ComentariosDataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], ComentariosPage);
    return ComentariosPage;
}());

//# sourceMappingURL=comentarios.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtrotacionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rotacion_data_rotacion_data__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_database_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__ = __webpack_require__(173);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the OtrotacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtrotacionesPage = /** @class */ (function () {
    function OtrotacionesPage(navCtrl, navParams, dataService, loadingCtrl, formBuilder, alertCtrl, scanner, database, network) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataService = dataService;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.scanner = scanner;
        this.database = database;
        this.network = network;
        this.ot = '';
        this.encodText = '';
        this.encodedData = {};
        this.scannedData = {};
        this.ot = navParams.get('data');
        this.almacen = navParams.get('almacenParam');
        this.ruttecnico = navParams.get('rutTecParam');
        this.myForm = this.formularioRotacion();
    }
    OtrotacionesPage.prototype.ionViewDidLoad = function () {
    };
    OtrotacionesPage.prototype.ionViewWillEnter = function () {
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
    };
    OtrotacionesPage.prototype.saveData = function () {
    };
    OtrotacionesPage.prototype.setFilteredItemsEstadosEquipo = function () {
        this.estadosEquipo = this.dataService.filterEstadosEquipo();
    };
    OtrotacionesPage.prototype.formularioRotacion = function () {
        return this.formBuilder.group({
            itemAntiguo: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            itemNuevo: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            estadoEquipo: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            descripcionEquipo: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
        });
    };
    OtrotacionesPage.prototype.enviarRotacionAgregarOtra = function () {
        var networkType = this.network.type;
        if (networkType === 'none') {
            var self = this;
            self.database.addInsertarRotacion(self.itemAnt.equipoantiguo, self.itemNew.equiponuevo, self.ot, self.itemEstado, self.ruttecnico, self.descripcionEquipoVacio).then(function (value) {
                var alert = self.alertCtrl.create({
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
                self.itemNewVacio.equiponuevo = '';
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
            this.dataService.soapinvokeR5IngresarRotacion(self.itemAnt.equipoantiguo, self.itemNewVacio.equiponuevo, self.ot, self.itemEstado, self.ruttecnico, self.descripcionEquipoVacio).then(function (r5ObjAntiguoValue) {
                var alert = self.alertCtrl.create({
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
    };
    OtrotacionesPage.prototype.scan = function () {
        var _this = this;
        this.options = {
            prompt: 'Escanear QR Desc. Equipo'
        };
        this.scanner.scan(this.options).then(function (data) {
            _this.scannedData = data;
            _this.myForm.get('descripcionEquipo').setValue(_this.scannedData.text);
        }, function (err) {
            _this.scanData = err;
        });
    };
    OtrotacionesPage.prototype.enviarRotacion = function () {
        var networkType = this.network.type;
        if (networkType === 'none') {
            var self = this;
            self.database.addInsertarRotacion(self.itemAnt.equipoantiguo, self.itemNew.equiponuevo, self.ot, self.itemEstado, self.ruttecnico, self.descripcionEquipoVacio).then(function (value) {
                self.navCtrl.pop();
                var alert = self.alertCtrl.create({
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
                self.itemNewVacio.equiponuevo = '';
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
            this.dataService.soapinvokeR5IngresarRotacion(self.itemAnt.equipoantiguo, self.itemNewVacio.equiponuevo, self.ot, self.itemEstado, self.ruttecnico, self.descripcionEquipoVacio).then(function (r5ObjAntiguoValue) {
                self.navCtrl.pop();
                var alert = self.alertCtrl.create({
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
    };
    OtrotacionesPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    OtrotacionesPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    OtrotacionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-otrotaciones',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otrotaciones/otrotaciones.html"*/'<!--\n  Generated template for the OtrotacionesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="liberty">\n    <ion-title text-right>Rotación equipos OT {{ot}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <form [formGroup]="myForm" (ngSubmit)="saveData()">\n    <ion-grid>\n      <ion-item text-wrap no-lines>\n        <ion-label color="dark" stacked>Objeto Original:<span danger>*</span></ion-label>\n        <ionic-selectable\n                item-content \n                [(ngModel)]="itemAnt"\n                [items]="itemsAntiguos"\n                class="busquedaestado"\n                itemValueField="equipoantiguo"\n                itemTextField="compequipoantiguo"\n                formControlName="itemAntiguo"\n                [canSearch]="true">\n                <ng-template ionicSelectableItemTemplate let-port="item"\n                let-isPortSelected="isItemSelected">\n              <ion-label text-wrap>\n                {{port.compequipoantiguo}}\n              </ion-label>\n            </ng-template>\n          </ionic-selectable>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label color="dark" stacked>Estado Equipo:<span danger>*</span></ion-label>\n        <ion-select interface="popover" formControlName="estadoEquipo" [(ngModel)]="itemEstado" class="busquedaestado">\n          <ion-option *ngFor="let estadoEquipo of estadosEquipo" value="{{estadoEquipo.estadoequipo}}">\n            {{estadoEquipo.estadoequipo}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item no-lines>\n        <ion-label color="dark" stacked>Objeto Nuevo:<span danger>*</span></ion-label>\n        <ionic-selectable\n                item-content \n                [(ngModel)]="itemNew"\n                [items]="itemsNuevos"\n                class="busquedaestado"\n                itemValueField="equiponuevo"\n                itemTextField="compequiponuevo"\n                formControlName="itemNuevo"\n                [canSearch]="true">\n                <ng-template ionicSelectableItemTemplate let-port="item"\n                let-isPortSelected="isItemSelected">\n              <ion-label text-wrap>\n                {{port.compequiponuevo}}\n              </ion-label>\n            </ng-template>\n          </ionic-selectable>\n      </ion-item>\n      <ion-row>\n      <ion-col col-11>\n        <ion-item no-lines>\n          <ion-label color="dark" stacked>Descripcion:<span danger>*</span></ion-label>\n          <ion-input text-center formControlName="descripcionEquipo" [(ngModel)]="descripcionEquipo"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-1>\n        <button type="button" (click)="scan()" class="codigoqr"><img src="assets/imgs/qr.png"></button>\n    </ion-col>\n  </ion-row>\n      <ion-row>\n          <ion-col col-3>\n            </ion-col>\n        <ion-col col-4>\n          <button class="botonguardar" ion-button color="dark" (click)="enviarRotacion()" [disabled]="!myForm.valid"\n          rounded>Enviar Rotación y <br />Salir</button>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n          <ion-col col-3>\n            </ion-col>\n        <ion-col col-4>\n          <button class="botonguardar" ion-button color="dark" (click)="enviarRotacionAgregarOtra()"\n            [disabled]="!myForm.valid" rounded>Enviar Rotación y <br />Rotar Otro AF</button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otrotaciones/otrotaciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_rotacion_data_rotacion_data__["a" /* RotacionDataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_6__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_5__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]])
    ], OtrotacionesPage);
    return OtrotacionesPage;
}());

//# sourceMappingURL=otrotaciones.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtcrearmaterialesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_materiales_data_materiales_data__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_database_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_animations__ = __webpack_require__(175);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the OtcrearmaterialesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtcrearmaterialesPage = /** @class */ (function () {
    function OtcrearmaterialesPage(navCtrl, navParams, formBuilder, loadingCtrl, dataService, alertCtrl, database, network) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.dataService = dataService;
        this.alertCtrl = alertCtrl;
        this.database = database;
        this.network = network;
        this.valorOT = '';
        this.almacenParam = '';
        this.actividad = '';
        this.descactividad = '';
        this.showEstadoEquipo = false;
        this.valorOT = navParams.get('data');
        this.actividad = navParams.get('actividad');
        this.descactividad = navParams.get('descactividad');
        this.rutTecnico = navParams.get('rutTecnico');
        this.almacenParam = navParams.get('almacen');
        this.myForm = this.createMyForm();
        this.myForm.controls['stock'].disable();
        this.myForm.controls['actividad'].disable();
        this.myForm.controls['descpieza'].disable();
        this.myForm.controls['estante'].disable();
    }
    OtcrearmaterialesPage.prototype.saveData = function () {
    };
    OtcrearmaterialesPage.prototype.ionViewDidLoad = function () {
    };
    OtcrearmaterialesPage.prototype.ionViewWillEnter = function () {
        this.showLoading();
        var self = this;
        this.dataService.soapinvokeR5ObtenerMateriales(this.rutTecnico, this.almacenParam).then(function (r5ObtenerMateriales) {
            self.items = r5ObtenerMateriales;
            self.setFilteredItemsTipoTransaccion();
            self.setFilteredItemsEstadosEquipo();
            self.myForm.get('pieza').setValue(self.items.pieza);
            self.loading.dismiss();
        }, function (reason) {
            self.showError("Error al ejecutar servicio R5ObjNuevo");
        });
    };
    OtcrearmaterialesPage.prototype.createMyForm = function () {
        return this.formBuilder.group({
            almacen: [''],
            pieza: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            descpieza: [''],
            actividad: [this.actividad, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            descactividad: [''],
            estante: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            cantidad: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            tipotransaccion: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            stock: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            estadoEquipo: [''],
        });
    };
    OtcrearmaterialesPage.prototype.setFilteredItemsTipoTransaccion = function () {
        this.tipotransacciones = this.dataService.filterTipoTransaccion();
    };
    OtcrearmaterialesPage.prototype.keyUpChecker = function (ev) {
        this.validateNumberType = this.validateNumericType(Number(this.cantidad));
        if (this.validateNumberType == false) {
            var alert_1 = this.alertCtrl.create({
                message: '<font size=3 color=black>Valor ingresado no es numérico. Favor ajustar selección</font>',
                cssClass: 'buttonCss',
                buttons: [{
                        text: 'Ok',
                        cssClass: 'ok-button'
                    }]
            });
            alert_1.present();
            this.myForm.get('cantidad').setValue('');
        }
        else {
            if (Number(this.stock) < Number(this.cantidad)) {
                var alert_2 = this.alertCtrl.create({
                    message: '<font size=3 color=black>Cantidad utilizada es mayor a la disponible. Favor ajustar selección</font>',
                    cssClass: 'buttonCss',
                    buttons: [{
                            text: 'Ok',
                            cssClass: 'ok-button'
                        }]
                });
                alert_2.present();
                this.myForm.get('cantidad').setValue('');
            }
        }
    };
    OtcrearmaterialesPage.prototype.setFilteredItemsEstadosEquipo = function () {
        this.estadosEquipo = this.dataService.filterEstadosEquipo();
    };
    OtcrearmaterialesPage.prototype.llenadoCampos = function (event) {
        this.datosMateriales = this.dataService.filterMatByPieza(event.value.idpieza);
        this.myForm.get('stock').setValue(this.datosMateriales[0].stock);
        this.myForm.get('estante').setValue(this.datosMateriales[0].estante);
        this.myForm.get('descpieza').setValue(this.datosMateriales[0].descpieza);
    };
    OtcrearmaterialesPage.prototype.enviarMaterial = function () {
        var networkType = this.network.type;
        if (networkType === 'none') {
            this.showLoading();
            var self = this;
            self.database.addInsertarMateriales(self.myForm.get('tipotransaccion').value, self.almacenParam, self.valorOT, self.actividad, self.pieza.idpieza, self.rutTecnico, self.myForm.get('cantidad').value, self.myForm.get('estadoEquipo').value).then(function (value) {
                self.navCtrl.pop();
                var alert = self.alertCtrl.create({
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
            this.dataService.soapinvokeR5IngresarMateriales(self.myForm.get('tipotransaccion').value, self.almacenParam, self.valorOT, self.actividad, self.pieza.idpieza, self.rutTecnico, self.myForm.get('cantidad').value, self.myForm.get('estadoEquipo').value).then(function (r5IngresarMateriales) {
                self.loading.dismiss();
                self.navCtrl.pop();
                var alert = self.alertCtrl.create({
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
    };
    OtcrearmaterialesPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    OtcrearmaterialesPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    OtcrearmaterialesPage.prototype.showHideEstadoEquipo = function () {
        var self = this;
        if (self.myForm.get('tipotransaccion').value == 'DEVOLUCION') {
            this.showEstadoEquipo = true;
            this.myForm.get('estadoEquipo').setValue('');
        }
        else {
            this.showEstadoEquipo = false;
            this.myForm.get('estadoEquipo').setValue('');
        }
    };
    OtcrearmaterialesPage.prototype.validateNumericType = function (data) {
        return !isNaN(Number(data.toString()));
    };
    OtcrearmaterialesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-otcrearmateriales',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otcrearmateriales/otcrearmateriales.html"*/'<!--\n  Generated template for the OtcrearmaterialesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="liberty">\n    <ion-title text-right>\n      <font size="2">Materiales Utilizados OT {{valorOT}}</font>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]="myForm" (ngSubmit)="saveData()">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Actividad:<span danger>*</span></ion-label>\n            <ion-input text-center formControlName="actividad"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-6>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Pieza:<span danger>*</span></ion-label>\n            <ionic-selectable\n            item-content \n            [(ngModel)]="pieza"\n            [items]="items"\n            class="busquedapieza"\n            itemValueField="pieza"\n            itemTextField="comppieza"\n            formControlName="pieza"\n            [canSearch]="true"\n            (onChange)="llenadoCampos($event)">\n            <ng-template ionicSelectableItemTemplate let-port="item"\n            let-isPortSelected="isItemSelected">\n              <ion-label text-wrap>\n                {{port.comppieza}}\n              </ion-label>\n            </ng-template>\n          </ionic-selectable>\n          </ion-item>\n        </ion-col>\n        <ion-col col-6>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Desc. Pieza:</ion-label>\n            <ion-input text-center class="inputdescpieza" formControlName="descpieza"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Stock en Estante:<span danger>*</span></ion-label>\n            <ion-input text-center formControlName="stock" [(ngModel)]="stock"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Estante:<span danger>*</span></ion-label>\n            <ion-input text-center formControlName="estante"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Cantidad Utilizada:<span danger>*</span></ion-label>\n            <ion-input text-center formControlName="cantidad" (keyup)="keyUpChecker($event)" [(ngModel)]="cantidad">\n            </ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Tipo Transacción:<span danger>*</span></ion-label>\n            <ion-select interface="popover" formControlName="tipotransaccion" class="busquedatransaccion" (ionChange)="showHideEstadoEquipo()">\n              <ion-option *ngFor="let tipotransaccion of tipotransacciones" value="{{tipotransaccion.tipotransaccion}}">\n                {{tipotransaccion.tipotransaccion}}</ion-option>\n            </ion-select>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n          <ion-col col-12>\n            <ion-item no-lines [@showEstadoEquipo]="showEstadoEquipo">\n              <ion-label color="dark" stacked>Estado Equipo:<span danger>*</span></ion-label>\n              <ion-select interface="popover" formControlName="estadoEquipo" class="busquedatransaccion">\n                <ion-option *ngFor="let estadoEquipo of estadosEquipo" value="{{estadoEquipo.estadoequipo}}">\n                  {{estadoEquipo.estadoequipo}}</ion-option>\n              </ion-select>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n    </ion-grid>\n    <ion-row>\n      <ion-col col-4>\n      </ion-col>\n      <ion-col col-4>\n        <button class="botonguardar" ion-button color="dark" [disabled]="!myForm.valid" (click)="enviarMaterial()"\n          rounded>Enviar</button>\n        </ion-col>\n        <ion-col col-4>\n        </ion-col>\n    </ion-row>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otcrearmateriales/otcrearmateriales.html"*/,
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_6__angular_animations__["j" /* trigger */])('showEstadoEquipo', [
                    Object(__WEBPACK_IMPORTED_MODULE_6__angular_animations__["g" /* state */])('true', Object(__WEBPACK_IMPORTED_MODULE_6__angular_animations__["h" /* style */])({ opacity: 1 })),
                    Object(__WEBPACK_IMPORTED_MODULE_6__angular_animations__["g" /* state */])('false', Object(__WEBPACK_IMPORTED_MODULE_6__angular_animations__["h" /* style */])({ opacity: 0, display: 'none' })),
                    Object(__WEBPACK_IMPORTED_MODULE_6__angular_animations__["i" /* transition */])('false => true', Object(__WEBPACK_IMPORTED_MODULE_6__angular_animations__["e" /* animate */])('300ms ease-in')),
                    Object(__WEBPACK_IMPORTED_MODULE_6__angular_animations__["i" /* transition */])('true => false', Object(__WEBPACK_IMPORTED_MODULE_6__angular_animations__["e" /* animate */])('300ms ease-out'))
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_3__providers_materiales_data_materiales_data__["a" /* MaterialesDataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_5__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]])
    ], OtcrearmaterialesPage);
    return OtcrearmaterialesPage;
}());

//# sourceMappingURL=otcrearmateriales.js.map

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 230:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 230;

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite_porter__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_actividades_data_actividades_data__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_comentarios_data_comentarios_data__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_detalle_ot_preventiva_data_detalle_ot_preventiva_data__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_detalle_ot_programada_data_detalle_ot_programada_data__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_inspecciones_data_inspecciones_data__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_materiales_data_materiales_data__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_rotacion_data_rotacion_data__ = __webpack_require__(168);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DatabaseProvider = /** @class */ (function () {
    function DatabaseProvider(sqlitePorter, storage, sqlite, platform, http, actividadesProv, comentariosProv, detalleOtPreventivaProv, detalleOtProgramadaProv, inspeccionesProv, materialesProv, rotacionProv) {
        var _this = this;
        this.sqlitePorter = sqlitePorter;
        this.storage = storage;
        this.sqlite = sqlite;
        this.platform = platform;
        this.http = http;
        this.actividadesProv = actividadesProv;
        this.comentariosProv = comentariosProv;
        this.detalleOtPreventivaProv = detalleOtPreventivaProv;
        this.detalleOtProgramadaProv = detalleOtProgramadaProv;
        this.inspeccionesProv = inspeccionesProv;
        this.materialesProv = materialesProv;
        this.rotacionProv = rotacionProv;
        this.databaseReady = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["BehaviorSubject"](false);
        this.platform.ready().then(function () {
            _this.sqlite.create({
                name: 'streamlined.db',
                location: 'default'
            })
                .then(function (db) {
                _this.database = db;
                _this.storage.get('database_filled').then(function (val) {
                    if (val) {
                        _this.databaseReady.next(true);
                    }
                    else {
                        _this.createTables();
                    }
                });
            });
        });
    }
    DatabaseProvider.prototype.addCommentario = function (codOt, comentario, usuario, linea) {
        var data = [codOt, comentario, usuario, linea];
        return this.database.executeSql("INSERT INTO comentarios (codOt,comentario, usuario, linea) VALUES (?, ?, ?, ?)", data).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.addActualizarActividad = function (codOt, estadoOt, notas, codUsuario, tareas, actComplete, codActividad, horasEstimadas, equipo, tipoOt, descOT, motivorep) {
        var data = [codOt, estadoOt, notas, codUsuario, tareas, actComplete, codActividad, horasEstimadas, equipo, tipoOt, descOT, motivorep];
        return this.database.executeSql("INSERT INTO actualizarActividad (codOt,estadoOt, notas, codUsuario, tareas, actComplete, codActividad, horasEstimadas, equipo, tipoOt, descOT, motivorep) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)", data).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.addCrearActividad = function (codOt, estadoOt, notas, codUsuario, tareas, actComplete, horasEstimadas, numActividad, equipo, tipoOt, descOt, motivorep) {
        var data = [codOt, estadoOt, notas, codUsuario, tareas, actComplete, horasEstimadas, numActividad, equipo, tipoOt, descOt, motivorep];
        return this.database.executeSql("INSERT INTO crearActividad (codOt,estadoOt, notas, codUsuario, tareas, actComplete, horasEstimadas, numActividad, equipo, tipoOt, descOt, motivorep) VALUES (?, ?, ?,?,?,?,?,?,?,?,?,?)", data).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.addActualizarOtProgramada = function (codOt, descOt, tipo, depto, codClase, falla, causa, accion) {
        var data = [codOt, descOt, tipo, depto, codClase, falla, causa, accion];
        return this.database.executeSql("INSERT INTO OtProgramada (codOt,descOt, tipo, depto, codClase, falla, causa, accion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", data).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.addInspeccionCoti = function (codOt, codEquipo, valorMedicion, codTecnico) {
        var data = [codOt, codEquipo, valorMedicion, codTecnico];
        return this.database.executeSql("INSERT INTO inspeccionesCoti (codOt, codEquipo, valorMedicion, codTecnico) VALUES (?, ?, ?, ?)", data).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.addInspeccionReti = function (codOt, codEquipo, valorMedicion, codTecnico) {
        var data = [codOt, codEquipo, valorMedicion, codTecnico];
        return this.database.executeSql("INSERT INTO inspeccionesReti (codOt, codEquipo, valorMedicion, codTecnico) VALUES (?, ?, ?, ?)", data).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.addInspeccion = function (codOt, codEquipo, valorMedicion, codTecnico, obType, obrType, point, pointType, method, aspecto) {
        var data = [codOt, codEquipo, valorMedicion, codTecnico, obType, obrType, point, pointType, method, aspecto];
        return this.database.executeSql("INSERT INTO inspecciones (codOt, codEquipo, valorMedicion, codTecnico, obType, obrType, point, pointType, method, aspecto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", data).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.addCambiarEstadoOt = function (codOt, codAct, estado) {
        var data = [codOt, codAct, estado];
        return this.database.executeSql("INSERT INTO estadosOt (codOt,codAct, estado) VALUES (?, ?, ?)", data).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.addInsertarMateriales = function (tipoTrx, almacen, codOt, codAct, codPieza, rutTecnico, cantidad, estadoEquipo) {
        var data = [tipoTrx, almacen, codOt, codAct, codPieza, rutTecnico, cantidad, estadoEquipo];
        return this.database.executeSql("INSERT INTO materiales (tipoTrx, almacen, codOt, codAct, codPieza, rutTecnico, cantidad, estadoEquipo) VALUES (?, ?, ?, ?, ?, ?, ?,?)", data).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.addInsertarRotacion = function (equipoNuevo, equipoAntiguo, codOt, estadoEquipo, rutTecnico, descripcion) {
        var data = [equipoNuevo, equipoAntiguo, codOt, estadoEquipo, rutTecnico, descripcion];
        return this.database.executeSql("INSERT INTO rotaciones (equipoNuevo, equipoAntiguo, codOt, estadoEquipo, rutTecnico, descripcion) VALUES (?, ?, ?, ?, ?, ?)", data).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.getComentarios = function () {
        return this.database.executeSql("SELECT * FROM comentarios", []).then(function (data) {
            var comentarios = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    comentarios.push({ codOt: data.rows.item(i).codOt, comentario: data.rows.item(i).comentario, usuario: data.rows.item(i).usuario, linea: data.rows.item(i).linea });
                }
            }
            return comentarios;
        }, function (err) {
            return [];
        });
    };
    DatabaseProvider.prototype.getActualizarActividad = function () {
        return this.database.executeSql("SELECT * FROM actualizarActividad", []).then(function (data) {
            var actualizarActividad = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    actualizarActividad.push({ codOt: data.rows.item(i).codOt, estadoOt: data.rows.item(i).estadoOt, notas: data.rows.item(i).notas, codUsuario: data.rows.item(i).codUsuario, tareas: data.rows.item(i).tareas, actComplete: data.rows.item(i).actComplete, codActividad: data.rows.item(i).codActividad, horasEstimadas: data.rows.item(i).horasEstimadas, equipo: data.rows.item(i).equipo, tipoOt: data.rows.item(i).tipoOt, descOT: data.rows.item(i).descOT });
                }
            }
            return actualizarActividad;
        }, function (err) {
            return [];
        });
    };
    DatabaseProvider.prototype.getCrearActividad = function () {
        return this.database.executeSql("SELECT * FROM crearActividad", []).then(function (data) {
            var crearActividad = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    crearActividad.push({ codOt: data.rows.item(i).codOt, estadoOt: data.rows.item(i).estadoOt, notas: data.rows.item(i).notas, codUsuario: data.rows.item(i).codUsuario, tareas: data.rows.item(i).tareas, actComplete: data.rows.item(i).actComplete, horasEstimadas: data.rows.item(i).horasEstimadas, numActividad: data.rows.item(i).numActividad, equipo: data.rows.item(i).equipo, tipoOt: data.rows.item(i).tipoOt, descOT: data.rows.item(i).descOT });
                }
            }
            return crearActividad;
        }, function (err) {
            return [];
        });
    };
    DatabaseProvider.prototype.getOtProgramada = function () {
        return this.database.executeSql("SELECT * FROM OtProgramada", []).then(function (data) {
            var otProgramada = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    otProgramada.push({ codOt: data.rows.item(i).codOt, descOt: data.rows.item(i).descOt, tipo: data.rows.item(i).tipo, depto: data.rows.item(i).depto, codClase: data.rows.item(i).codClase, falla: data.rows.item(i).falla, causa: data.rows.item(i).causa, accion: data.rows.item(i).accion });
                }
            }
            return otProgramada;
        }, function (err) {
            return [];
        });
    };
    DatabaseProvider.prototype.getInspeccionesCoti = function () {
        return this.database.executeSql("SELECT * FROM inspeccionesCoti", []).then(function (data) {
            var inspeccionesCoti = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    inspeccionesCoti.push({ codOt: data.rows.item(i).codOt, codEquipo: data.rows.item(i).codEquipo, valorMedicion: data.rows.item(i).valorMedicion, codTecnico: data.rows.item(i).codTecnico });
                }
            }
            return inspeccionesCoti;
        }, function (err) {
            return [];
        });
    };
    DatabaseProvider.prototype.getInspeccionesReti = function () {
        return this.database.executeSql("SELECT * FROM inspeccionesReti", []).then(function (data) {
            var inspeccionesReti = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    inspeccionesReti.push({ codOt: data.rows.item(i).codOt, codEquipo: data.rows.item(i).codEquipo, valorMedicion: data.rows.item(i).valorMedicion, codTecnico: data.rows.item(i).codTecnico });
                }
            }
            return inspeccionesReti;
        }, function (err) {
            return [];
        });
    };
    DatabaseProvider.prototype.getInspecciones = function () {
        return this.database.executeSql("SELECT * FROM inspecciones", []).then(function (data) {
            var inspecciones = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    inspecciones.push({ codOt: data.rows.item(i).codOt, codEquipo: data.rows.item(i).codEquipo, valorMedicion: data.rows.item(i).valorMedicion, codTecnico: data.rows.item(i).codTecnico, obType: data.rows.item(i).obType, obrType: data.rows.item(i).obrType, point: data.rows.item(i).point, pointType: data.rows.item(i).pointType, method: data.rows.item(i).method, aspecto: data.rows.item(i).aspecto });
                }
            }
            return inspecciones;
        }, function (err) {
            return [];
        });
    };
    DatabaseProvider.prototype.getEstadosOt = function () {
        return this.database.executeSql("SELECT * FROM estadosOt", []).then(function (data) {
            var estadosOt = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    estadosOt.push({ codOt: data.rows.item(i).codOt, codAct: data.rows.item(i).codAct, estado: data.rows.item(i).estado });
                }
            }
            return estadosOt;
        }, function (err) {
            return [];
        });
    };
    DatabaseProvider.prototype.getMateriales = function () {
        return this.database.executeSql("SELECT * FROM materiales", []).then(function (data) {
            var materiales = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    materiales.push({ tipoTrx: data.rows.item(i).tipoTrx, almacen: data.rows.item(i).almacen, codOt: data.rows.item(i).codOt, codAct: data.rows.item(i).codAct, codPieza: data.rows.item(i).codPieza, rutTecnico: data.rows.item(i).rutTecnico, cantidad: data.rows.item(i).cantidad, estadoEquipo: data.rows.item(i).estadoEquipo });
                }
            }
            return materiales;
        }, function (err) {
            return [];
        });
    };
    DatabaseProvider.prototype.getRotaciones = function () {
        return this.database.executeSql("SELECT * FROM rotaciones", []).then(function (data) {
            var rotaciones = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    rotaciones.push({ equipoNuevo: data.rows.item(i).equipoNuevo, equipoAntiguo: data.rows.item(i).equipoAntiguo, codOt: data.rows.item(i).codOt, estadoEquipo: data.rows.item(i).estadoEquipo, rutTecnico: data.rows.item(i).rutTecnico, descripcion: data.rows.item(i).descripcion });
                }
            }
            return rotaciones;
        }, function (err) {
            return [];
        });
    };
    DatabaseProvider.prototype.getDatabaseState = function () {
        return this.databaseReady.asObservable();
    };
    DatabaseProvider.prototype.deleteComentarios = function () {
        return this.database.executeSql("DELETE FROM comentarios").then(function (data) {
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.deleteActualizarActividad = function () {
        return this.database.executeSql("DELETE FROM actualizarActividad").then(function (data) {
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.deleteCrearActividad = function () {
        return this.database.executeSql("DELETE FROM crearActividad").then(function (data) {
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.deleteOtProgramada = function () {
        return this.database.executeSql("DELETE FROM OtProgramada").then(function (data) {
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.deleteInspeccionesCoti = function () {
        return this.database.executeSql("DELETE FROM inspeccionesCoti").then(function (data) {
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.deleteInspeccionesReti = function () {
        return this.database.executeSql("DELETE FROM inspeccionesReti").then(function (data) {
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.deleteInspecciones = function () {
        return this.database.executeSql("DELETE FROM inspecciones").then(function (data) {
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.deleteEstadosOt = function () {
        return this.database.executeSql("DELETE FROM estadosOt").then(function (data) {
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.deleteMateriales = function () {
        return this.database.executeSql("DELETE FROM materiales").then(function (data) {
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.deleteRotaciones = function () {
        return this.database.executeSql("DELETE FROM rotaciones").then(function (data) {
        }, function (err) {
            return err;
        });
    };
    DatabaseProvider.prototype.createTables = function () {
        var _this = this;
        return this.database.executeSql('CREATE TABLE IF NOT EXISTS comentarios (id INTEGER PRIMARY KEY AUTOINCREMENT,codOt TEXT,comentario TEXT,usuario TEXT,linea INTEGER);', {})
            .then(function () {
            return _this.database.executeSql("CREATE TABLE IF NOT EXISTS actualizarActividad (\n      id INTEGER PRIMARY KEY AUTOINCREMENT,\n      codOt TEXT,\n      estadoOt TEXT,\n      notas TEXT,\n      codUsuario TEXT,\n      tareas TEXT,\n      actComplete TEXT,\n      codActividad TEXT,\n      horasEstimadas TEXT,\n      equipo TEXT,\n      tipoOt TEXT,\n      descOT TEXT,\n      motivorep TEXT\n      );", {})
                .then(function () {
                return _this.database.executeSql("CREATE TABLE IF NOT EXISTS crearActividad (\n          id INTEGER PRIMARY KEY AUTOINCREMENT,\n          codOt TEXT,\n          estadoOt TEXT,\n          notas TEXT,\n          codUsuario TEXT,\n          tareas TEXT,\n          actComplete TEXT,\n          horasEstimadas TEXT,\n          numActividad TEXT,\n          equipo TEXT,\n          tipoOt TEXT,\n          descOt TEXT,\n          motivorep TEXT\n          );", {})
                    .then(function () {
                    return _this.database.executeSql("CREATE TABLE IF NOT EXISTS OtProgramada (\n              id INTEGER PRIMARY KEY AUTOINCREMENT,\n              codOt TEXT,\n              descOt TEXT,\n              tipo TEXT,\n              depto TEXT,\n              codClase TEXT,\n              falla TEXT,\n              causa TEXT,\n              accion TEXT\n              );", {})
                        .then(function () {
                        return _this.database.executeSql("CREATE TABLE IF NOT EXISTS inspeccionesCoti (\n                  id INTEGER PRIMARY KEY AUTOINCREMENT,\n                  codOt TEXT,\n                  codEquipo TEXT,\n                  valorMedicion TEXT,\n                  codTecnico TEXT\n                  );", {})
                            .then(function () {
                            return _this.database.executeSql("CREATE TABLE IF NOT EXISTS inspeccionesReti (\n                      id INTEGER PRIMARY KEY AUTOINCREMENT,\n                      codOt TEXT,\n                      codEquipo TEXT,\n                      valorMedicion TEXT,\n                      codTecnico TEXT\n                      );", {})
                                .then(function () {
                                return _this.database.executeSql("CREATE TABLE IF NOT EXISTS inspecciones (\n                          id INTEGER PRIMARY KEY AUTOINCREMENT,\n                          codOt TEXT,\n                          codEquipo TEXT,\n                          valorMedicion TEXT,\n                          codTecnico TEXT,\n                          obType TEXT,\n                          obrType TEXT,\n                          point TEXT,\n                          pointType TEXT,\n                          method TEXT,\n                          aspecto TEXT\n                          );", {})
                                    .then(function () {
                                    return _this.database.executeSql("CREATE TABLE IF NOT EXISTS estadosOt (\n                              id INTEGER PRIMARY KEY AUTOINCREMENT,\n                              codOt TEXT,\n                              codAct TEXT,\n                              estado TEXT\n                              );", {})
                                        .then(function () {
                                        return _this.database.executeSql("CREATE TABLE IF NOT EXISTS materiales (\n                                  id INTEGER PRIMARY KEY AUTOINCREMENT,\n                                  tipoTrx TEXT,\n                                  almacen TEXT,\n                                  codOt TEXT,\n                                  codAct TEXT,\n                                  codPieza TEXT,\n                                  rutTecnico TEXT,\n                                  cantidad TEXT,\n                                  estadoEquipo TEXT\n                                  );", {})
                                            .then(function () {
                                            return _this.database.executeSql("CREATE TABLE IF NOT EXISTS rotaciones (\n                                      id INTEGER PRIMARY KEY AUTOINCREMENT,\n                                      equipoNuevo TEXT,\n                                      equipoAntiguo TEXT,\n                                      codOt TEXT, \n                                      estadoEquipo TEXT,\n                                      rutTecnico TEXT, \n                                      descripcion TEXT\n                                      );", {});
                                        }).catch(function (err) { return console.log("Error al crear tabla rotaciones", err.toString()); });
                                    }).catch(function (err) { return console.log("Error al crear tabla materiales", err.toString()); });
                                }).catch(function (err) { return console.log("Error al crear tabla estadosOt", err.toString()); });
                            }).catch(function (err) { return console.log("Error al crear tabla inspecciones", err.toString()); });
                        }).catch(function (err) { return console.log("Error al crear tabla inspeccionesReti", err.toString()); });
                    }).catch(function (err) { return console.log("Error al crear tabla inspeccionesCoti", err.toString()); });
                }).catch(function (err) { return console.log("Error al crear tabla OtProgramada", err.toString()); });
            }).catch(function (err) { return console.log("Error al crear tabla crearActividad", err.toString()); });
        }).catch(function (err) { return console.log("Error al crear tabla actualizarActividad", err.toString()); });
    };
    DatabaseProvider.prototype.syncDatabaseToWebServices = function () {
        var self = this;
        self.getComentarios().then(function (valueComentarios) {
            self.itemsComentarios = valueComentarios;
            if (self.itemsComentarios.length > 0) {
                for (var i = 0; i < self.itemsComentarios.length; i++) {
                    self.comentariosProv.soapinvokeR5addetailsinterface(self.itemsComentarios[i].codOt, self.itemsComentarios[i].comentario, self.itemsComentarios[i].usuario, self.itemsComentarios[i].linea);
                }
                self.deleteComentarios().then(function (valueComentarios) {
                }, function (reason) {
                });
            }
            //2do servicio
            self.getActualizarActividad().then(function (valueActActividad) {
                self.itemsActualizarActividad = valueActActividad;
                if (self.itemsActualizarActividad.length > 0) {
                    for (var i = 0; i < self.itemsActualizarActividad.length; i++) {
                        self.actividadesProv.soapinvokeR5EventInterfacePpmUpdate(self.itemsActualizarActividad[i].codOt, self.itemsActualizarActividad[i].estadoOt, self.itemsActualizarActividad[i].notas, self.itemsActualizarActividad[i].codUsuario, self.itemsActualizarActividad[i].tareas, self.itemsActualizarActividad[i].actComplete, self.itemsActualizarActividad[i].codActividad, self.itemsActualizarActividad[i].horasEstimadas, self.itemsActualizarActividad[i].equipo, self.itemsActualizarActividad[i].tipoOt, self.itemsActualizarActividad[i].descOT, self.itemsActualizarActividad[i].motivorep);
                    }
                    self.deleteActualizarActividad().then(function (valueActActividad) {
                    }, function (reason) {
                    });
                }
                //3 servicio
                self.getCrearActividad().then(function (valueCrearActividad) {
                    self.itemsCrearActividad = valueCrearActividad;
                    if (self.itemsCrearActividad.length > 0) {
                        for (var i = 0; i < self.itemsCrearActividad.length; i++) {
                            self.actividadesProv.soapinvokeR5EventInterfacePpmCreate(self.itemsCrearActividad[i].codOt, self.itemsCrearActividad[i].estadoOt, self.itemsCrearActividad[i].notas, self.itemsCrearActividad[i].codUsuario, self.itemsCrearActividad[i].tareas, self.itemsCrearActividad[i].actComplete, self.itemsCrearActividad[i].horasEstimadas, self.itemsCrearActividad[i].numActividad, self.itemsCrearActividad[i].equipo, self.itemsCrearActividad[i].tipoOt, self.itemsCrearActividad[i].descOT, self.itemsActualizarActividad[i].motivorep);
                        }
                        self.deleteCrearActividad().then(function (valueCrearActividad) {
                        }, function (reason) {
                        });
                    }
                    //4 servicio
                    self.getOtProgramada().then(function (valueOtProgramada) {
                        self.itemsOtProgramada = valueOtProgramada;
                        if (self.itemsOtProgramada.length > 0) {
                            for (var i = 0; i < self.itemsOtProgramada.length; i++) {
                                self.detalleOtProgramadaProv.soapinvokeR5CrearActividad(self.itemsOtProgramada[i].codOt, self.itemsOtProgramada[i].descOt, self.itemsOtProgramada[i].tipo, self.itemsOtProgramada[i].depto, self.itemsOtProgramada[i].codClase, self.itemsOtProgramada[i].falla, self.itemsOtProgramada[i].causa, self.itemsOtProgramada[i].accion);
                            }
                            self.deleteOtProgramada().then(function (valueOtProgramada) {
                            }, function (reason) {
                            });
                        }
                        //5 servicio
                        self.getInspeccionesCoti().then(function (valueInsCoti) {
                            self.itemsInspeccionesCoti = valueInsCoti;
                            if (self.itemsInspeccionesCoti.length > 0) {
                                for (var i = 0; i < self.itemsInspeccionesCoti.length; i++) {
                                    self.inspeccionesProv.soapinvokeR5InsertarInspeccionesPMPE01Coti(self.itemsInspeccionesCoti[i].codOt, self.itemsInspeccionesCoti[i].codEquipo, self.itemsInspeccionesCoti[i].valorMedicion, self.itemsInspeccionesCoti[i].codTecnico);
                                }
                                self.deleteInspeccionesCoti().then(function (valueInsCoti) {
                                }, function (reason) {
                                });
                            }
                            //6 servicio
                            self.getInspeccionesReti().then(function (valueInsReti) {
                                self.itemsInspeccionesReti = valueInsReti;
                                if (self.itemsInspeccionesReti.length > 0) {
                                    for (var i = 0; i < self.itemsInspeccionesReti.length; i++) {
                                        self.inspeccionesProv.soapinvokeR5InsertarInspeccionesPMPE01RETI(self.itemsInspeccionesReti[i].codOt, self.itemsInspeccionesReti[i].codEquipo, self.itemsInspeccionesReti[i].valorMedicion, self.itemsInspeccionesReti[i].codTecnico);
                                    }
                                    self.deleteInspeccionesReti().then(function (valueInsReti) {
                                    }, function (reason) {
                                    });
                                }
                                //7 servicio
                                self.getInspecciones().then(function (valueInspeccion) {
                                    self.itemsInspecciones = valueInspeccion;
                                    if (self.itemsInspecciones.length > 0) {
                                        for (var i = 0; i < self.itemsInspecciones.length; i++) {
                                            self.inspeccionesProv.soapinvokeR5InsertarInspecciones(self.itemsInspecciones[i].codOt, self.itemsInspecciones[i].codEquipo, self.itemsInspecciones[i].valorMedicion, self.itemsInspecciones[i].codTecnico, self.itemsInspecciones[i].obType, self.itemsInspecciones[i].obrType, self.itemsInspecciones[i].point, self.itemsInspecciones[i].pointType, self.itemsInspecciones[i].method, self.itemsInspecciones[i].aspecto);
                                        }
                                        self.deleteInspecciones().then(function (valueInspeccion) {
                                        }, function (reason) {
                                        });
                                    }
                                    //8 servicio
                                    self.getEstadosOt().then(function (valueEstadosOt) {
                                        self.itemsCambiarEstadoOt = valueEstadosOt;
                                        if (self.itemsCambiarEstadoOt.length > 0) {
                                            for (var i = 0; i < self.itemsCambiarEstadoOt.length; i++) {
                                            }
                                            self.deleteEstadosOt().then(function (valueEstadosOt) {
                                            }, function (reason) {
                                            });
                                        }
                                        //9 servicio
                                        self.getMateriales().then(function (valueMateriales) {
                                            self.itemsMateriales = valueMateriales;
                                            if (self.itemsMateriales.length > 0) {
                                                for (var i = 0; i < self.itemsMateriales.length; i++) {
                                                    self.materialesProv.soapinvokeR5IngresarMateriales(self.itemsMateriales[i].tipoTrx, self.itemsMateriales[i].almacen, self.itemsMateriales[i].codOt, self.itemsMateriales[i].codAct, self.itemsMateriales[i].codPieza, self.itemsMateriales[i].rutTecnico, self.itemsMateriales[i].cantidad, self.itemsMateriales[i].estadoEquipo);
                                                }
                                                self.deleteMateriales().then(function (valueMateriales) {
                                                }, function (reason) {
                                                });
                                            }
                                            self.getRotaciones().then(function (valueRotacion) {
                                                self.itemsRotaciones = valueRotacion;
                                                if (self.itemsRotaciones.length > 0) {
                                                    for (var i = 0; i < self.itemsRotaciones.length; i++) {
                                                        self.rotacionProv.soapinvokeR5IngresarRotacion(self.itemsRotaciones[i].equipoNuevo, self.itemsRotaciones[i].equipoAntiguo, self.itemsRotaciones[i].codOt, self.itemsRotaciones[i].estadoEquipo, self.itemsRotaciones[i].rutTecnico, self.itemsRotaciones[i].descripcion);
                                                    }
                                                    self.deleteRotaciones().then(function (valueRotacion) {
                                                    }, function (reason) {
                                                    });
                                                }
                                            }, function (reason) {
                                            });
                                        }, function (reason) {
                                        });
                                    }, function (reason) {
                                    });
                                }, function (reason) {
                                });
                            }, function (reason) {
                            });
                        }, function (reason) {
                        });
                    }, function (reason) {
                    });
                }, function (reason) {
                });
            }, function (reason) {
            });
        }, function (reason) {
        });
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite_porter__["a" /* SQLitePorter */], __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__["a" /* SQLite */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_8__providers_actividades_data_actividades_data__["a" /* ActividadesDataProvider */], __WEBPACK_IMPORTED_MODULE_9__providers_comentarios_data_comentarios_data__["a" /* ComentariosDataProvider */], __WEBPACK_IMPORTED_MODULE_10__providers_detalle_ot_preventiva_data_detalle_ot_preventiva_data__["a" /* DetalleOtPreventivaDataProvider */],
            __WEBPACK_IMPORTED_MODULE_11__providers_detalle_ot_programada_data_detalle_ot_programada_data__["a" /* DetalleOtProgramadaDataProvider */], __WEBPACK_IMPORTED_MODULE_12__providers_inspecciones_data_inspecciones_data__["a" /* InspeccionesDataProvider */], __WEBPACK_IMPORTED_MODULE_13__providers_materiales_data_materiales_data__["a" /* MaterialesDataProvider */], __WEBPACK_IMPORTED_MODULE_14__providers_rotacion_data_rotacion_data__["a" /* RotacionDataProvider */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_main_data_main_data__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__otdetalle_otdetalle__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__otdetallepreventiva_otdetallepreventiva__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_database_database__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MainPage = /** @class */ (function () {
    function MainPage(navCtrl, navParams, dataService, auth, loadingCtrl, alertCtrl, geolocation, modalCtrl, database) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataService = dataService;
        this.auth = auth;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.geolocation = geolocation;
        this.modalCtrl = modalCtrl;
        this.database = database;
        this.fechadesde = '';
        this.fechahasta = '';
        this.customOptionsDesde = {
            buttons: [{
                    text: 'Limpiar',
                    handler: function () {
                        _this.fechadesde = '';
                        _this.busquedaSt();
                    }
                }]
        };
        this.customOptionsHasta = {
            buttons: [{
                    text: 'Limpiar',
                    handler: function () {
                        _this.fechahasta = '';
                        _this.busquedaSt();
                    }
                }]
        };
    }
    MainPage.prototype.ionViewDidLoad = function () {
    };
    MainPage.prototype.setFilteredItems = function () {
        this.items = this.dataService.getItems();
    };
    MainPage.prototype.setFilteredItemsFechaDesde = function () {
        this.items = this.dataService.filterItemsFechaDesde(this.fechadesde);
    };
    MainPage.prototype.setFilteredItemsFechaFin = function () {
        this.items = this.dataService.filterItemsFechaFin(this.fechahasta);
    };
    MainPage.prototype.setFilteredItemsFechaDesdeFechaFin = function () {
        this.items = this.dataService.filterItemsFechaDesdeFechaFin(this.fechadesde, this.fechahasta);
    };
    MainPage.prototype.busquedaSt = function () {
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
    };
    MainPage.prototype.ionViewWillEnter = function () {
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
    };
    MainPage.prototype.goToOtDetalle = function (item) {
        var _this = this;
        var self = this;
        if (item['prioridad'] !== 'SI') {
            if (item['estado'] == 'LIBE') {
                if (item['flagActIniciada'] == 'Iniciada') {
                    var prompt_1 = this.alertCtrl.create({
                        message: "<font size=3 color=black>¿Desea Pausar el trabajo para la OT <b>" + item['numerost'] + "</b>?</font>",
                        cssClass: 'buttonCss',
                        buttons: [
                            {
                                text: 'No',
                                handler: function (data) {
                                    if (item['tipootdb'] == 'JOB') {
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__otdetalle_otdetalle__["a" /* OtdetallePage */], {
                                            data: item,
                                            r5personel: self.itemR5Personel,
                                            username: self.auth.getUserInfo().name.toString()
                                        });
                                    }
                                    if (item['tipootdb'] == 'PPM') {
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__otdetallepreventiva_otdetallepreventiva__["a" /* OtdetallepreventivaPage */], {
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
                                handler: function (data) {
                                    _this.showLoading();
                                    if (item['tipootdb'] == 'JOB') {
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
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
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
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
                    prompt_1.setMode('md');
                    prompt_1.present();
                }
                if (item['flagActIniciada'] == 'Pausada') {
                    var prompt_2 = this.alertCtrl.create({
                        message: "<font size=3 color=black>¿Desea Iniciar el trabajo para la OT <b>" + item['numerost'] + "</b>?</font>",
                        cssClass: 'buttonCss',
                        buttons: [
                            {
                                text: 'No',
                                handler: function (data) {
                                },
                                cssClass: 'no-button'
                            },
                            {
                                text: 'Si',
                                handler: function (data) {
                                    _this.showLoading();
                                    if (item['tipootdb'] == 'JOB') {
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
                                        self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                                            self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                                                self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                                                    self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                                                        self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__otdetalle_otdetalle__["a" /* OtdetallePage */], {
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
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
                                        self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                                            self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                                                self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                                                    self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                                                        self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__otdetallepreventiva_otdetallepreventiva__["a" /* OtdetallepreventivaPage */], {
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
                    prompt_2.setMode('md');
                    prompt_2.present();
                }
            }
            if (item['estado'] == 'OTEP') {
                if (item['flagActIniciada'] == 'Iniciada') {
                    var prompt_3 = this.alertCtrl.create({
                        message: "<font size=3 color=black>¿Desea pausar la OT <b>" + item['numerost'] + "</b>?</font>",
                        cssClass: 'buttonCss',
                        buttons: [
                            {
                                text: 'No',
                                handler: function (data) {
                                    if (item['tipootdb'] == 'JOB') {
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__otdetalle_otdetalle__["a" /* OtdetallePage */], {
                                            data: item,
                                            r5personel: self.itemR5Personel,
                                            username: self.auth.getUserInfo().name.toString()
                                        });
                                    }
                                    if (item['tipootdb'] == 'PPM') {
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__otdetallepreventiva_otdetallepreventiva__["a" /* OtdetallepreventivaPage */], {
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
                                handler: function (data) {
                                    _this.showLoading();
                                    if (item['tipootdb'] == 'JOB') {
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
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
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
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
                    prompt_3.setMode('md');
                    prompt_3.present();
                }
                if (item['flagActIniciada'] == 'Pausada') {
                    var prompt_4 = this.alertCtrl.create({
                        message: "<font size=3 color=black>¿Desea volver a iniciar la OT <b>" + item['numerost'] + "</b>?</font>",
                        cssClass: 'buttonCss',
                        buttons: [
                            {
                                text: 'No',
                                handler: function (data) {
                                },
                                cssClass: 'no-button'
                            },
                            {
                                text: 'Si',
                                handler: function (data) {
                                    _this.showLoading();
                                    if (item['tipootdb'] == 'JOB') {
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
                                        self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                                            self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                                                self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad Iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                                                    self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                                                        self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__otdetalle_otdetalle__["a" /* OtdetallePage */], {
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
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
                                        self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                                            self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                                                self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                                                    self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                                                        self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__otdetallepreventiva_otdetallepreventiva__["a" /* OtdetallepreventivaPage */], {
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
                    prompt_4.setMode('md');
                    prompt_4.present();
                }
            }
            if (item['estado'] == 'OTPL') {
                if (item['flagActIniciada'] == 'Iniciada') {
                    var prompt_5 = this.alertCtrl.create({
                        message: "<font size=3 color=black>¿Desea pausar la OT <b>" + item['numerost'] + "</b>?</font>",
                        cssClass: 'buttonCss',
                        buttons: [
                            {
                                text: 'No',
                                handler: function (data) {
                                    if (item['tipootdb'] == 'JOB') {
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__otdetalle_otdetalle__["a" /* OtdetallePage */], {
                                            data: item,
                                            r5personel: self.itemR5Personel,
                                            username: self.auth.getUserInfo().name.toString()
                                        });
                                    }
                                    if (item['tipootdb'] == 'PPM') {
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__otdetallepreventiva_otdetallepreventiva__["a" /* OtdetallepreventivaPage */], {
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
                                handler: function (data) {
                                    _this.showLoading();
                                    if (item['tipootdb'] == 'JOB') {
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
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
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
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
                    prompt_5.setMode('md');
                    prompt_5.present();
                }
                if (item['flagActIniciada'] == 'Pausada') {
                    var prompt_6 = this.alertCtrl.create({
                        message: "<font size=3 color=black>¿Desea volver a iniciar la OT <b>" + item['numerost'] + "</b>?</font>",
                        cssClass: 'buttonCss',
                        buttons: [
                            {
                                text: 'No',
                                handler: function (data) {
                                },
                                cssClass: 'no-button'
                            },
                            {
                                text: 'Si',
                                handler: function (data) {
                                    _this.showLoading();
                                    if (item['tipootdb'] == 'JOB') {
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
                                        self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                                            self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                                                self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad Iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                                                    self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                                                        self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__otdetalle_otdetalle__["a" /* OtdetallePage */], {
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
                                        _this.fechaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format('DD-MMM-YYYY').toUpperCase();
                                        _this.horaInicioOt = __WEBPACK_IMPORTED_MODULE_7_moment___default()(new Date().toISOString()).format("HH:mm");
                                        _this.fechaGeoRef = _this.fechaInicioOt + ' ' + _this.horaInicioOt;
                                        self.dataService.soapinvokeR5countaddetails(item['numerost']).then(function (countComents) {
                                            self.cargarGeolocalizacion().then(function (valueGeoLoc) {
                                                self.dataService.soapinvokeR5addetailsinterface(item['numerost'], 'Actividad iniciada. Fecha: ' + self.fechaGeoRef + ' ,GeoRef: ' + valueGeoLoc, self.auth.getUserInfo().name.toString(), countComents).then(function (valueR5addetailsinterface) {
                                                    self.dataService.soapinvokeR5actudfchar01Iniciar(item['numerost'], item['actividad']).then(function (valueR5actudfchar01Iniciar) {
                                                        self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__otdetallepreventiva_otdetallepreventiva__["a" /* OtdetallepreventivaPage */], {
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
                    prompt_6.setMode('md');
                    prompt_6.present();
                }
            }
        }
    };
    MainPage.prototype.logout = function () {
        this.auth.logout();
        this.itemR5Personel = [];
        this.items = [];
        this.dataService.clearArrays();
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    MainPage.prototype.cargarGeolocalizacion = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            var options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };
            self.geolocation.getCurrentPosition(options).then(function (position) {
                self.longitud = position.coords.longitude;
                self.latitud = position.coords.latitude;
                resolve('Latitud: ' + self.latitud + ' ,' + 'Longitud: ' + self.longitud);
            }, function (err) {
                reject(new Error(err));
            });
        });
    };
    MainPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    MainPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    MainPage.prototype.doRefresh = function (refresher) {
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
    };
    MainPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-main',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/main/main.html"*/'<!--\n  Generated template for the MainPage page.\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="liberty" align-title="left">\n    <ion-title>\n      <font size="3">Órdenes de Trabajo - {{itemOtCount}}</font>\n    </ion-title>\n    <ion-buttons right>\n      <button ion-button outline class="logout" (click)="logout()">Salir</button>\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Actualizar" refreshingSpinner="circles"\n      refreshingText="Actualizando..."></ion-refresher-content>\n  </ion-refresher>\n  <ion-list>\n    <ion-row>\n      <button ion-item class="itemLista"\n        [color]="item.prioridad == \'baja\'? \'green\' : item.prioridad == \'media\'? \'medium\': item.prioridad == \'alta\'? \'redalert\' : \'green\'"\n        *ngFor="let item of items" (click)="goToOtDetalle(item)">\n        <div class="CustomColour">\n          <ion-row>\n            <ion-col col-11 text-wrap>\n              <ion-row>\n                <ion-col col-5 text-wrap>\n                  <h3>\n                    <font size="2" color="black"><b>Nº OT:</b> {{item.numerost}}</font>\n                  </h3>\n                </ion-col>\n                <ion-col col-4 text-wrap>\n                  <h3>\n                    <font size="2" color="black"><b>Actividad:</b> {{item.actividad}}</font>\n                  </h3>\n                </ion-col>\n                <ion-col col-3 text-wrap>\n                  <h3>\n                    <font size="2" color="black"><b>Estado de Avance:</b> {{item.avance}}</font>\n                  </h3>\n                </ion-col>\n              </ion-row>\n              <ion-row class="ionrowclass">\n                <ion-col col-5 text-wrap>\n                  <h3>\n                    <font size="2" color="black"><b>Equipo:</b> {{item.nombreactivo}}</font>\n                  </h3>\n                </ion-col>\n                <ion-col col-5 text-wrap>\n                  <h3>\n                    <font size="2" color="black"><b>Estado:</b> {{item.estado}}</font>\n                  </h3>\n                </ion-col>\n              </ion-row>\n              <ion-row class="ionrowclass">\n                <ion-col col-5 text-wrap>\n                  <h3>\n                    <font size="2" color="black"><b>Tipo:</b> {{item.tipoot}}</font>\n                  </h3>\n                </ion-col>\n                <ion-col col-5 text-wrap>\n                  <h3>\n                    <font size="2" color="black"><b>Fecha Crea:</b> {{item.fecha}}</font>\n                  </h3>\n                </ion-col>\n              </ion-row>\n              <ion-row class="ionrowclass">\n                <ion-col col-12 text-wrap>\n                  <h3>\n                    <font size="2" color="black"><b>Descripción OT:</b> {{item.descripcion}}</font>\n                  </h3>\n                </ion-col>\n              </ion-row>\n              <ion-row class="ionrowclass">\n                <ion-col col-5 text-wrap>\n                  <h3>\n                    <font size="2" color="black"><b>Tarea:</b> {{item.tarea}}</font>\n                  </h3>\n                </ion-col>\n                <ion-col col-5 text-wrap>\n                  <h3>\n                    <font size="2" color="black"><b>Des. Tarea:</b> {{item.desctarea}}</font>\n                  </h3>\n                </ion-col>\n              </ion-row>\n            </ion-col>\n            <ion-col col-1 text-wrap\n              [class]="item.flagActIniciada == \'Pausada\' && item.prioridad == \'SI\' ? \'colorBloqueo\' : item.flagActIniciada == \'Pausada\' && item.prioridad == \'\'? \'colorPausa\' : item.flagActIniciada == \'Iniciada\' && item.prioridad == \'SI\'? \'colorBloqueo\' : item.flagActIniciada == \'Iniciada\' && item.prioridad == \'\'? \'colorReanudar\' :\'colorReanudar\'">\n            </ion-col>\n          </ion-row>\n        </div>\n      </button>\n    </ion-row>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/main/main.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_main_data_main_data__["a" /* MainDataProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_10__providers_database_database__["a" /* DatabaseProvider */]])
    ], MainPage);
    return MainPage;
}());

//# sourceMappingURL=main.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



__WEBPACK_IMPORTED_MODULE_2_moment___default.a.locale('es-CL');
/*
  Generated class for the MainDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MainDataProvider = /** @class */ (function () {
    function MainDataProvider(http) {
        this.http = http;
        this.items = [];
        this.r5personel = [];
    }
    MainDataProvider.prototype.soapinvokeR5Personel = function (username) {
        var self = this;
        this.r5personel = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerDescTecnico?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerDescTecnico/LOGEMPObtenerDescTecnicoPortType/LOGEMPObtenerDescTecnicoOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerDescTecnico\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                     <obt:obtenerDescTecnicoRequest>\n                        <obt:codigoTecnico>" + username + "</obt:codigoTecnico>\n                     </obt:obtenerDescTecnicoRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var codTecnico = void 0;
                        var responseLenght = void 0;
                        var descTecnico = void 0;
                        var claseTecnico = void 0;
                        var deptTecnico = void 0;
                        var codigoOcupTecnico = void 0;
                        var codigoOrgTecnico = void 0;
                        var numTelefonicoTecnico = void 0;
                        var rutTecnico = void 0;
                        var almacenTecnico = void 0;
                        var codTecnicoArr = void 0;
                        var descTecnicoArr = void 0;
                        var claseTecnicoArr = void 0;
                        var deptTecnicoArr = void 0;
                        var codigoOcupTecnicoArr = void 0;
                        var codigoOrgTecnicoArr = void 0;
                        var numTelefonicoTecnicoArr = void 0;
                        var rutTecnicoArr = void 0;
                        var almacenTecnicoArr = void 0;
                        var i = 0;
                        codTecnico = xml.getElementsByTagName("obt:codigoTecnico");
                        descTecnico = xml.getElementsByTagName("obt:descripcionTecnico");
                        claseTecnico = xml.getElementsByTagName("obt:claseTecnico");
                        deptTecnico = xml.getElementsByTagName("obt:departamentoTecnico");
                        codigoOcupTecnico = xml.getElementsByTagName("obt:codigoOcupacionTecnico");
                        codigoOrgTecnico = xml.getElementsByTagName("obt:codigoOrganizacionTecnico");
                        numTelefonicoTecnico = xml.getElementsByTagName("obt:numeroTelefonicoTecnico");
                        rutTecnico = xml.getElementsByTagName("obt:rutTecnico");
                        almacenTecnico = xml.getElementsByTagName("obt:almacenTecnico");
                        responseLenght = xml.getElementsByTagName("obt:detalles")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codTecnico[i].childNodes[0]) {
                            }
                            else {
                                if (codTecnico[i].childNodes[0]) {
                                    codTecnicoArr = codTecnico[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codTecnicoArr = '';
                                }
                                if (descTecnico[i].childNodes[0]) {
                                    descTecnicoArr = descTecnico[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descTecnicoArr = '';
                                }
                                if (claseTecnico[i].childNodes[0]) {
                                    claseTecnicoArr = claseTecnico[i].childNodes[0].nodeValue;
                                }
                                else {
                                    claseTecnicoArr = '';
                                }
                                if (deptTecnico[i].childNodes[0]) {
                                    deptTecnicoArr = deptTecnico[i].childNodes[0].nodeValue;
                                }
                                else {
                                    deptTecnicoArr = '';
                                }
                                if (codigoOcupTecnico[i].childNodes[0]) {
                                    codigoOcupTecnicoArr = codigoOcupTecnico[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codigoOcupTecnicoArr = '';
                                }
                                if (codigoOrgTecnico[i].childNodes[0]) {
                                    codigoOrgTecnicoArr = codigoOrgTecnico[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codigoOrgTecnicoArr = '';
                                }
                                if (numTelefonicoTecnico[i].childNodes[0]) {
                                    numTelefonicoTecnicoArr = numTelefonicoTecnico[i].childNodes[0].nodeValue;
                                }
                                else {
                                    numTelefonicoTecnicoArr = '';
                                }
                                if (rutTecnico[i].childNodes[0]) {
                                    rutTecnicoArr = rutTecnico[i].childNodes[0].nodeValue;
                                }
                                else {
                                    rutTecnicoArr = '';
                                }
                                if (almacenTecnico[i].childNodes[0]) {
                                    almacenTecnicoArr = almacenTecnico[i].childNodes[0].nodeValue;
                                }
                                else {
                                    almacenTecnicoArr = '';
                                }
                                self.r5personel.push({
                                    codigoTecnico: codTecnicoArr,
                                    descTecnico: descTecnicoArr,
                                    claseTecnico: claseTecnicoArr,
                                    deptTecnico: deptTecnicoArr,
                                    codigoOcupTecnico: codigoOcupTecnicoArr,
                                    codigoOrgTecnico: codigoOrgTecnicoArr,
                                    numTelefonicoTecnico: numTelefonicoTecnicoArr,
                                    rutTecnico: rutTecnicoArr,
                                    almacenTecnico: almacenTecnicoArr,
                                });
                            }
                        }
                        resolve(self.r5personel);
                    }
                    else {
                        reject(new Error('Error en invocacion')); //
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion')); //
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    MainDataProvider.prototype.soapinvokeR5actudfchar01Pausar = function (codOt, codAct) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/pausarOT?wsdl', true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/pausarOT/LOGEMPPausarOTPortType/LOGEMPPausarOTOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:paus=\"http://osbcorp.vtr.cl/LOG/EMP/pausarOT\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <paus:pausarOTRequest>\n                      <paus:codigoOt>" + codOt + "</paus:codigoOt>\n                      <paus:codigoActividad>" + codAct + "</paus:codigoActividad>\n                      <paus:flagPausarOt>+</paus:flagPausarOt>\n                  </paus:pausarOTRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    MainDataProvider.prototype.soapinvokeR5countaddetails = function (codOt) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/contadorComentarios?wsdl', true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/contadorComentarios/LOGEMPContadorComentariosPortType/LOGEMPContadorComentariosOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:con=\"http://osbcorp.vtr.cl/LOG/EMP/contadorComentarios\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <con:contadorComentariosRequest>\n                    <con:codigoEntidad>EVNT</con:codigoEntidad>\n                    <con:codigoOT>" + codOt + "</con:codigoOT>\n                 </con:contadorComentariosRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        var resultCheck = void 0;
                        var resultCount = void 0;
                        resultCheck = xml.getElementsByTagName("res:codigoError");
                        resultCount = xml.getElementsByTagName("con:cantidadComentarios");
                        if (resultCount.length > 0) {
                            result = parseInt(resultCount[0].childNodes[0].nodeValue);
                            result++;
                        }
                        else {
                            result = 0;
                            result++;
                        }
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    MainDataProvider.prototype.soapinvokeR5actudfchar01Iniciar = function (codOt, codAct) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/pausarOT?wsdl', true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/pausarOT/LOGEMPPausarOTPortType/LOGEMPPausarOTOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:paus=\"http://osbcorp.vtr.cl/LOG/EMP/pausarOT\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <paus:pausarOTRequest>\n                      <paus:codigoOt>" + codOt + "</paus:codigoOt>\n                      <paus:codigoActividad>" + codAct + "</paus:codigoActividad>\n                      <paus:flagPausarOt>-</paus:flagPausarOt>\n                  </paus:pausarOTRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    MainDataProvider.prototype.soapinvokeR5addetailsinterface = function (codOt, comentario, usuario, linea) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/ingresarComentario?wsdl', true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/ingresarComentario/LOGEMPIngresarComentarioPortType/LOGEMPIngresarComentarioOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:ing=\"http://osbcorp.vtr.cl/LOG/EMP/ingresarComentario\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <ing:ingresarComentarioRequest>\n                    <ing:sistemaSatelite>SEAM</ing:sistemaSatelite>\n                    <ing:codigoSatelite>" + codOt + "</ing:codigoSatelite>\n                    <ing:idOrganizacion></ing:idOrganizacion>\n                    <ing:grupo></ing:grupo>\n                    <ing:codigoTransaccion></ing:codigoTransaccion>\n                    <ing:tipo>A</ing:tipo>\n                    <ing:numeroSesion></ing:numeroSesion>\n                    <ing:idUsuario>" + usuario + "</ing:idUsuario>\n                    <ing:codigoOrganizacion>VTR</ing:codigoOrganizacion>\n                    <ing:codigoOt>" + codOt + "</ing:codigoOt>\n                    <ing:entidad>EVNT</ing:entidad>\n                    <ing:tipoOt>*</ing:tipoOt>\n                    <ing:lenguaje>ES</ing:lenguaje>\n                    <ing:linea>" + linea + "</ing:linea>\n                    <ing:comentario>" + comentario + "</ing:comentario>\n                    <ing:codigoAdi></ing:codigoAdi>\n                    <ing:organizacionAdi></ing:organizacionAdi>\n                    <ing:codigoEv>" + codOt + "</ing:codigoEv>\n                  </ing:ingresarComentarioRequest>\n\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    MainDataProvider.prototype.soapinvokeR5ListaAct = function (username) {
        var self = this;
        this.items = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerListadoActividades?wsdl', true);
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListadoActividades/LOGEMPObtenerListadoActividadesPortType/LOGEMPObtenerListadoActividadesOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerListadoActividades\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                    <obt:obtenerListadoActividadesRequest>\n                          <obt:codigoTecnico>" + username + "</obt:codigoTecnico>\n                    </obt:obtenerListadoActividadesRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codOT = void 0;
                        var codEquipo = void 0;
                        var codTipo = void 0;
                        var descOt = void 0;
                        var codTarea = void 0;
                        var flagCompletado = void 0;
                        var codEstadoOt = void 0;
                        var codAct = void 0;
                        var dateOt = void 0;
                        var descTarea = void 0;
                        var tipoOt = void 0;
                        var codDepto = void 0;
                        var claseSistema = void 0;
                        var direccionEquipoOt = void 0;
                        var codOTArr = void 0;
                        var flagActIniciada = void 0;
                        var descActividad = void 0;
                        var prioridadAct = void 0;
                        var codEquipoArr = void 0;
                        var codTipoArr = void 0;
                        var descOtArr = void 0;
                        var codTareaArr = void 0;
                        var codDeptoArr = void 0;
                        var claseSistemaArr = void 0;
                        var flagCompletadoArr = void 0;
                        var codEstadoOtArr = void 0;
                        var codActArr = void 0;
                        var dateOtArr = void 0;
                        var descTareaArr = void 0;
                        var tipoOtArr = void 0;
                        var direccionEquipoOtArr = void 0;
                        var flagActIniciadaArr = void 0;
                        var descActividadArr = void 0;
                        var prioridadArr = void 0;
                        var i = 0;
                        codOT = xml.getElementsByTagName("obt:codigoOT");
                        codEquipo = xml.getElementsByTagName("obt:codigoEquipo");
                        codTipo = xml.getElementsByTagName("obt:codigoTipo");
                        descOt = xml.getElementsByTagName("obt:descripcionOt");
                        codTarea = xml.getElementsByTagName("obt:codigoTarea");
                        flagCompletado = xml.getElementsByTagName("obt:flagCompletado");
                        codEstadoOt = xml.getElementsByTagName("obt:codigoEstadoOt");
                        codAct = xml.getElementsByTagName("obt:codigoActividad");
                        descActividad = xml.getElementsByTagName("obt:descripcionActividad");
                        dateOt = xml.getElementsByTagName("obt:fechaOt");
                        descTarea = xml.getElementsByTagName("obt:descripcionTarea");
                        tipoOt = xml.getElementsByTagName("obt:tipoOt");
                        direccionEquipoOt = xml.getElementsByTagName("obt:direccionEquipoOt");
                        flagActIniciada = xml.getElementsByTagName("obt:flagActividadIniciada");
                        codDepto = xml.getElementsByTagName("obt:codigoDepartamento");
                        claseSistema = xml.getElementsByTagName("obt:claseSistema");
                        prioridadAct = xml.getElementsByTagName("obt:prioridad");
                        responseLenght = xml.getElementsByTagName("obt:actividades")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codOT[i].childNodes[0]) {
                            }
                            else {
                                if (codOT[i].childNodes[0]) {
                                    codOTArr = codOT[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codOTArr = '';
                                }
                                if (codEquipo[i].childNodes[0]) {
                                    codEquipoArr = codEquipo[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codEquipoArr = '';
                                }
                                if (codTipo[i].childNodes[0]) {
                                    codTipoArr = codTipo[i].childNodes[0].nodeValue; //
                                }
                                else {
                                    codTipoArr = '';
                                }
                                if (descOt[i].childNodes[0]) {
                                    descOtArr = descOt[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descOtArr = '';
                                }
                                if (codTarea[i].childNodes[0]) {
                                    codTareaArr = codTarea[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codTareaArr = '';
                                }
                                if (flagCompletado[i].childNodes[0]) {
                                    if (flagCompletado[i].childNodes[0].nodeValue === '+') {
                                        flagCompletadoArr = 'Completado';
                                    }
                                    else {
                                        flagCompletadoArr = 'Incompleto';
                                    }
                                }
                                else {
                                    flagCompletadoArr = '';
                                }
                                if (codEstadoOt[i].childNodes[0]) {
                                    codEstadoOtArr = codEstadoOt[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codEstadoOtArr = '';
                                }
                                if (codAct[i].childNodes[0]) {
                                    codActArr = codAct[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codActArr = '';
                                }
                                if (descActividad[i].childNodes[0]) {
                                    descActividadArr = descActividad[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descActividadArr = '';
                                }
                                if (dateOt[i].childNodes[0]) {
                                    dateOtArr = dateOt[i].childNodes[0].nodeValue;
                                }
                                else {
                                    dateOtArr = '';
                                }
                                if (descTarea[i].childNodes[0]) {
                                    descTareaArr = descTarea[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descTareaArr = '';
                                }
                                if (tipoOt[i].childNodes[0]) {
                                    tipoOtArr = tipoOt[i].childNodes[0].nodeValue;
                                }
                                else {
                                    tipoOtArr = '';
                                }
                                if (codDepto[i].childNodes[0]) {
                                    codDeptoArr = codDepto[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codDeptoArr = '';
                                }
                                if (claseSistema[i].childNodes[0]) {
                                    claseSistemaArr = claseSistema[i].childNodes[0].nodeValue;
                                }
                                else {
                                    claseSistemaArr = '';
                                }
                                if (direccionEquipoOt[i].childNodes[0]) {
                                    direccionEquipoOtArr = direccionEquipoOt[i].childNodes[0].nodeValue;
                                }
                                else {
                                    direccionEquipoOtArr = '';
                                }
                                if (prioridadAct[i].childNodes[0]) {
                                    prioridadArr = prioridadAct[i].childNodes[0].nodeValue;
                                }
                                else {
                                    prioridadArr = '';
                                }
                                if (flagActIniciada[i].childNodes[0]) {
                                    if (flagActIniciada[i].childNodes[0].nodeValue === '+') {
                                        flagActIniciadaArr = 'Iniciada';
                                    }
                                    else {
                                        flagActIniciadaArr = 'Pausada';
                                    }
                                }
                                else {
                                    flagActIniciadaArr = '';
                                }
                                self.items.push({
                                    numerost: codOTArr,
                                    idst: '',
                                    nombreactivo: codEquipoArr,
                                    descripcion: descOtArr,
                                    estado: codEstadoOtArr,
                                    tarea: codTareaArr,
                                    prioridad: prioridadArr,
                                    fecha: dateOtArr,
                                    tipoot: codTipoArr,
                                    tipootdb: tipoOtArr,
                                    descactividad: descActividadArr,
                                    actividad: codActArr,
                                    desctarea: descTareaArr,
                                    avance: flagCompletadoArr,
                                    direccion: direccionEquipoOtArr,
                                    flagActIniciada: flagActIniciadaArr,
                                    codDepto: codDeptoArr,
                                    claseSistema: claseSistemaArr
                                });
                            }
                        }
                        resolve(self.items);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion')); //
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    MainDataProvider.prototype.filterItemsFechaDesde = function (fechaDesdeParam) {
        return this.items.filter(function (item) {
            return __WEBPACK_IMPORTED_MODULE_2_moment___default()(item.fecha, "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate() >= __WEBPACK_IMPORTED_MODULE_2_moment___default()(fechaDesdeParam, "YYYY-MM-DD 0:00:00").locale('es-CL').toDate();
        });
    };
    MainDataProvider.prototype.filterItemsFechaFin = function (fechaFinParam) {
        return this.items.filter(function (item) {
            return __WEBPACK_IMPORTED_MODULE_2_moment___default()(item.fecha, "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate() <= __WEBPACK_IMPORTED_MODULE_2_moment___default()(fechaFinParam + " " + "23:59", "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate();
        });
    };
    MainDataProvider.prototype.filterItemsFechaDesdeFechaFin = function (fechaDesdeParam, fechaFinParam) {
        return this.items.filter(function (item) {
            return __WEBPACK_IMPORTED_MODULE_2_moment___default()(item.fecha, "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate() >= __WEBPACK_IMPORTED_MODULE_2_moment___default()(fechaDesdeParam, "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate() &&
                __WEBPACK_IMPORTED_MODULE_2_moment___default()(item.fecha, "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate() <= __WEBPACK_IMPORTED_MODULE_2_moment___default()(fechaFinParam + " " + "23:59", "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate();
        });
    };
    MainDataProvider.prototype.getItems = function () {
        return this.items;
    };
    MainDataProvider.prototype.clearArrays = function () {
        this.r5personel = [];
        this.items = [];
    };
    MainDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], MainDataProvider);
    return MainDataProvider;
}());

//# sourceMappingURL=main-data.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComentariosDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the ComentariosDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ComentariosDataProvider = /** @class */ (function () {
    function ComentariosDataProvider(http) {
        this.http = http;
        this.itemsComentarios = [];
    }
    ComentariosDataProvider.prototype.soapinvokeR5countaddetails = function (codOt) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/contadorComentarios?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/contadorComentarios/LOGEMPContadorComentariosPortType/LOGEMPContadorComentariosOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:con=\"http://osbcorp.vtr.cl/LOG/EMP/contadorComentarios\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <con:contadorComentariosRequest>\n                    <con:codigoEntidad>EVNT</con:codigoEntidad>\n                    <con:codigoOT>" + codOt + "</con:codigoOT>\n                 </con:contadorComentariosRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        var resultCheck = void 0;
                        var resultCount = void 0;
                        resultCheck = xml.getElementsByTagName("res:codigoError");
                        resultCount = xml.getElementsByTagName("con:cantidadComentarios");
                        if (resultCount.length > 0) {
                            result = parseInt(resultCount[0].childNodes[0].nodeValue);
                            result++;
                        }
                        else {
                            result = 0;
                            result++;
                        }
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    ComentariosDataProvider.prototype.soapinvokeR5addetailsinterface = function (codOt, comentario, usuario, linea) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/ingresarComentario?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/STLN/EMP/ingresarComentario/STLNEMPIngresarComentarioPortType/STLNEMPIngresarComentarioOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:ing=\"http://osbcorp.vtr.cl/LOG/EMP/ingresarComentario\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <ing:ingresarComentarioRequest>\n                    <ing:sistemaSatelite>SEAM</ing:sistemaSatelite>\n                    <ing:codigoSatelite>" + codOt + "</ing:codigoSatelite>\n                    <ing:idOrganizacion></ing:idOrganizacion>\n                    <ing:grupo></ing:grupo>\n                    <ing:codigoTransaccion></ing:codigoTransaccion>\n                    <ing:tipo>A</ing:tipo>\n                    <ing:numeroSesion></ing:numeroSesion>\n                    <ing:idUsuario>" + usuario + "</ing:idUsuario>\n                    <ing:codigoOrganizacion>VTR</ing:codigoOrganizacion>\n                    <ing:codigoOt>" + codOt + "</ing:codigoOt>\n                    <ing:entidad>EVNT</ing:entidad>\n                    <ing:tipoOt>*</ing:tipoOt>\n                    <ing:lenguaje>ES</ing:lenguaje>\n                    <ing:linea>" + linea + "</ing:linea>\n                    <ing:comentario>" + comentario + "</ing:comentario>\n                    <ing:codigoAdi></ing:codigoAdi>\n                    <ing:organizacionAdi></ing:organizacionAdi>\n                    <ing:codigoEv>" + codOt + "</ing:codigoEv>\n                  </ing:ingresarComentarioRequest>\n\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    ComentariosDataProvider.prototype.soapinvokeR5ObtenerComentarios = function (codOt) {
        var self = this;
        this.itemsComentarios = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerListadoComentarios?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListadoComentarios/LOGEMPObtenerListadoComentariosPortType/LOGEMPObtenerListadoComentariosOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerListadoComentarios\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerListadoComentariosRequest>\n                      <obt:codigoOT>" + codOt + "</obt:codigoOT>\n                  </obt:obtenerListadoComentariosRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var linea = void 0;
                        var texto = void 0;
                        var username = void 0;
                        var fechaComentario = void 0;
                        var lineaArr = void 0;
                        var textoArr = void 0;
                        var usernameArr = void 0;
                        var fechaComentarioArr = void 0;
                        var i = 0;
                        linea = xml.getElementsByTagName("obt:linea");
                        texto = xml.getElementsByTagName("obt:texto");
                        username = xml.getElementsByTagName("obt:username");
                        fechaComentario = xml.getElementsByTagName("obt:fechaComentario");
                        responseLenght = xml.getElementsByTagName("obt:comentarios")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!linea[i].childNodes[0]) {
                            }
                            else {
                                if (linea[i].childNodes[0]) {
                                    lineaArr = linea[i].childNodes[0].nodeValue;
                                }
                                else {
                                    lineaArr = '';
                                }
                                if (texto[i].childNodes[0]) {
                                    textoArr = texto[i].childNodes[0].nodeValue;
                                }
                                else {
                                    textoArr = '';
                                }
                                if (username[i].childNodes[0]) {
                                    usernameArr = username[i].childNodes[0].nodeValue;
                                }
                                else {
                                    usernameArr = '';
                                }
                                if (fechaComentario[i].childNodes[0]) {
                                    fechaComentarioArr = fechaComentario[i].childNodes[0].nodeValue;
                                }
                                self.itemsComentarios.push({
                                    comentario: fechaComentarioArr + ' - ' + lineaArr + ' - ' + textoArr + ' - ' + usernameArr
                                });
                            }
                        }
                        resolve(self.itemsComentarios);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    ComentariosDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ComentariosDataProvider);
    return ComentariosDataProvider;
}());

//# sourceMappingURL=comentarios-data.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtdetallePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__otcrearactividades_otcrearactividades__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comentarios_comentarios__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__otrotaciones_otrotaciones__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_comentarios_data_comentarios_data__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_barcode_scanner__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__otcrearmateriales_otcrearmateriales__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_detalle_ot_programada_data_detalle_ot_programada_data__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_base64__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_dropbox_dropbox__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_network__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_database_database__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















/**
 * Generated class for the OtdetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtdetallePage = /** @class */ (function () {
    function OtdetallePage(navCtrl, navParams, formBuilder, geolocation, loadingCtrl, camera, dataService, scanner, detalleOtProgDataService, alertCtrl, database, network, dropbox, base64) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.camera = camera;
        this.dataService = dataService;
        this.scanner = scanner;
        this.detalleOtProgDataService = detalleOtProgDataService;
        this.alertCtrl = alertCtrl;
        this.database = database;
        this.network = network;
        this.dropbox = dropbox;
        this.base64 = base64;
        this.valorOT = '';
        this.tipoOT = '';
        this.scannedData = {};
        this.actividad = '';
        this.descactividad = '';
        this.estadoLista = [];
        this.itemsUrl = [];
        this.itemsUpload = [];
        this.items = navParams.get('data');
        this.r5personel = navParams.get('r5personel');
        this.userTecnico = navParams.get('username');
        this.itemsEquipos = [
            { equipo: this.items.nombreactivo, }
        ];
        this.myForm = this.createMyForm();
        this.myForm.controls['sistema'].disable();
        this.myForm.controls['departamento'].disable();
        this.myForm.controls['direccion'].disable();
        this.myForm.controls['nombreactivo'].disable();
        this.myForm.controls['estado'].disable();
    }
    OtdetallePage.prototype.saveData = function () {
        var networkType = this.network.type;
        if (networkType === 'none') {
            this.showLoading();
            var self = this;
            self.database.addActualizarOtProgramada(this.valorOT, this.descripcion, this.tipoTrabajo, this.depto, this.clase, this.etapa, this.causa, this.accion).then(function (value) {
                var alert = self.alertCtrl.create({
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
                var alert = self.alertCtrl.create({
                    message: '<font size=3 color=black>La actividad se ha actualizado correctamente.</font>',
                    cssClass: 'buttonCss',
                    buttons: [{
                            text: 'Ok',
                            cssClass: 'ok-button'
                        }]
                });
                alert.present();
            }, function (reason) {
                self.showError("Error al ejecutar servicio para actualizar OT");
            });
            this.loading.dismiss();
        }
    };
    OtdetallePage.prototype.ionViewDidLoad = function () {
        this.dropbox.setAccessToken("heBg2DZjZxAAAAAAAAAAEJKGasOnhHn8ZJXnndvnRKg8ip7EDLZpERfK41a8UVww");
    };
    OtdetallePage.prototype.ionViewWillEnter = function () {
        this.valorOT = this.items.numerost;
        this.tipoOT = this.items.tipoot;
        this.tipoTrabajo = this.items.tipootdb;
        this.descOt = this.items.descripcion;
        this.actividad = this.items.actividad;
        this.descripcionActividad = this.items.descactividad;
        this.codTarea = this.items.codTarea;
        this.descactividad = this.items.desctarea;
        this.rutTecnico = this.r5personel[0].rutTecnico;
        this.almacen = this.r5personel[0].almacenTecnico;
        this.estadoOT = this.items.estado;
        this.claseSistema = this.items.claseSistema;
        this.depto = this.items.codDepto;
        this.equipo = this.items.equipo;
        this.codTarea = this.items.tarea;
        this.descTarea = this.items.desctarea;
        this.showLoading();
        var self = this;
        this.detalleOtProgDataService.soapinvokeR5countaddetails(this.valorOT).then(function (CountComment) {
            self.itemComentarioCount = parseInt(CountComment.toString());
            self.detalleOtProgDataService.soapinvokeR5authEstados(self.userTecnico, self.estadoOT).then(function (valueR5Auth) {
                self.itemsEstados = valueR5Auth;
                self.estadoLista = self.itemsEstados[0].estado;
                self.myForm.get('estado').setValue(self.estadoLista);
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
    };
    OtdetallePage.prototype.getBlob = function (b64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        b64Data = b64Data.toString().replace(/^[^,]+,/, '');
        b64Data = b64Data.toString().replace(/\s/g, '');
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    OtdetallePage.prototype.createMyForm = function () {
        return this.formBuilder.group({
            numerost: [this.items.numerost],
            idst: [this.items.idst],
            nombreactivo: [this.items.nombreactivo],
            tipoot: [this.items.tipoot],
            prioridad: [''],
            localidad: [''],
            departamento: [this.items.codDepto],
            sistema: [this.items.claseSistema],
            direccion: [this.items.direccion],
            impacto: [''],
            activoafectado: [''],
            comuna: [''],
            nodo: [''],
            cuadrante: [''],
            estado: [''],
            etapa: [''],
            causa: [''],
            accion: [''],
        });
    };
    OtdetallePage.prototype.goToOtMateriales = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__otcrearmateriales_otcrearmateriales__["a" /* OtcrearmaterialesPage */], {
            data: this.valorOT,
            actividad: this.actividad,
            descactividad: this.descactividad,
            rutTecnico: this.rutTecnico,
            almacen: this.almacen
        });
    };
    OtdetallePage.prototype.goToOtActividades = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__otcrearactividades_otcrearactividades__["a" /* OtcrearactividadesPage */], {
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
    };
    OtdetallePage.prototype.goToOtComentarios = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__comentarios_comentarios__["a" /* ComentariosPage */], {
            data: this.valorOT,
            username: this.userTecnico
        });
    };
    OtdetallePage.prototype.goToOtRotaciones = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__otrotaciones_otrotaciones__["a" /* OtrotacionesPage */], {
            data: this.valorOT,
            almacenParam: this.almacen,
            rutTecParam: this.rutTecnico
        });
    };
    OtdetallePage.prototype.cargarGeolocalizacion = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.longitud = position.coords.longitude;
            _this.latitud = position.coords.latitude;
        }, function (err) {
        });
    };
    OtdetallePage.prototype.getPicture = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this
            .camera
            .getPicture(options)
            .then(function (imageData) {
            var self = _this;
            self.showLoading();
            self.base64Image = imageData;
            self.base64.encodeFile(self.base64Image).then(function (base64File) {
                var imageBlob = self.getBlob(base64File, "Content-Type: image/jpeg");
                var rand = Math.floor(Math.random() * 2000000000000) + 1;
                var nombreArchivo = rand + '.jpg';
                self.dropbox.uploadFile(imageBlob, nombreArchivo).then(function (data) {
                    self.dropbox.getPublicUrl(nombreArchivo).then(function (dataDos) {
                        self.itemsUpload = dataDos;
                        self.itemsUrl = JSON.parse(self.itemsUpload);
                        self.dataService.soapinvokeR5countaddetails(self.valorOT).then(function (countComents) {
                            self.dataService.soapinvokeR5addetailsinterface(self.valorOT, 'Link Foto: ' + self.itemsUrl.url, self.userTecnico, countComents).then(function (valueR5addetailsinterface) {
                                self.loading.dismiss();
                                var alert = self.alertCtrl.create({
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
            }, function (err) {
            });
        }, function (err) {
        });
    };
    OtdetallePage.prototype.scan = function () {
        var _this = this;
        this.options = {
            prompt: 'Escanear QR Equipo'
        };
        this.scanner.scan(this.options).then(function (data) {
            _this.scannedData = data;
            _this.myForm.get('activoafectado').setValue(_this.scannedData.text);
        }, function (err) {
            _this.scanData = err;
        });
    };
    OtdetallePage.prototype.checkform = function () {
    };
    OtdetallePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    OtdetallePage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    OtdetallePage.prototype.obtenerEtapa = function () {
        this.showLoading();
        var self = this;
        this.detalleOtProgDataService.soapinvokeR5CierreCorrectivoEtapa(this.nombreactivo).then(function (valorEtapa) {
            self.itemsEtapa = valorEtapa;
        }, function (reason) {
            self.showError("Error al ejecutar servicio Obtener Etapa");
        });
        this.loading.dismiss();
    };
    OtdetallePage.prototype.obtenerCausa = function () {
        this.showLoading();
        var self = this;
        this.detalleOtProgDataService.soapinvokeR5CierreCorrectivoCausa(this.nombreactivo, this.etapa).then(function (valorCausa) {
            self.itemsCausa = valorCausa;
        }, function (reason) {
            self.showError("Error al ejecutar servicio Obtener Etapa");
        });
        this.loading.dismiss();
    };
    OtdetallePage.prototype.obtenerAccion = function () {
        this.showLoading();
        var self = this;
        this.detalleOtProgDataService.soapinvokeR5CierreCorrectivoAccion(this.nombreactivo, this.etapa, this.causa).then(function (valorAccion) {
            self.itemsAccion = valorAccion;
        }, function (reason) {
            self.showError("Error al ejecutar servicio Obtener Etapa");
        });
        this.loading.dismiss();
    };
    OtdetallePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-otdetalle',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otdetalle/otdetalle.html"*/'<!--\n  Generated template for the OtdetallePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="liberty">\n    <ion-title text-right>\n      <font size="2">Tipo OT: {{tipoOT}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; OT {{valorOT}}</font>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <form [formGroup]="myForm" (ngSubmit)="saveData()">\n    <ion-grid>\n      <ion-row>\n        <ion-col col-12>\n            <ion-item no-lines>\n                <ion-label color="dark" stacked>Equipo:</ion-label>\n                <ion-input text-center formControlName="nombreactivo"></ion-input>\n              </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n          <ion-col col-12>\n              <ion-item no-lines>\n                  <ion-label color="dark" stacked>Estado:</ion-label>\n                  <ion-input text-center formControlName="estado"></ion-input>\n                </ion-item>\n          </ion-col>\n        </ion-row>\n      <ion-row>\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Departamento:</ion-label>\n            <ion-input text-center formControlName="departamento"></ion-input>\n          </ion-item>\n        </ion-col>\n        <ion-col col-12>\n          <ion-item no-lines>\n            <ion-label color="dark" stacked>Dirección:</ion-label>\n            <ion-input text-center formControlName="direccion"></ion-input>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-12>\n            <ion-item no-lines>\n                <ion-label color="dark" stacked>Sistema:</ion-label>\n                <ion-input text-center formControlName="sistema"></ion-input>\n              </ion-item>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <ion-grid>\n      <ion-row class="rowcorrectivobotonsup">\n        <ion-col col-6>\n          <div padding>\n            <button ion-button type="button" class="radius" color="dark" block\n              (click)="goToOtMateriales()">Materiales</button>\n          </div>\n        </ion-col>\n        <ion-col col-6>\n          <div padding>\n            <button ion-button type="button" class="radius" color="dark" block\n              (click)="goToOtActividades()">Actividades</button>\n          </div>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivoboton">\n        <ion-col col-6>\n          <div padding>\n            <button ion-button type="button" class="radiusbottom" color="dark" block (click)="goToOtComentarios()">\n              Comentarios\n              <ion-badge complete *ngIf="itemComentarioCount" color="accent">{{ itemComentarioCount }}</ion-badge>\n            </button>\n          </div>\n        </ion-col>\n        <ion-col col-6>\n          <div padding>\n            <button ion-button type="button" class="radiusbottom" color="dark" block\n              (click)="getPicture()">Fotos</button>\n          </div>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivoboton">\n          <ion-col col-6>\n              <div padding>\n                <button ion-button type="button" color="dark" class="radius" block\n                  (click)="goToOtRotaciones()">Rotación</button>\n              </div>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otdetalle/otdetalle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_8__providers_comentarios_data_comentarios_data__["a" /* ComentariosDataProvider */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_11__providers_detalle_ot_programada_data_detalle_ot_programada_data__["a" /* DetalleOtProgramadaDataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_15__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_13__providers_dropbox_dropbox__["a" /* DropboxProvider */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_base64__["a" /* Base64 */]])
    ], OtdetallePage);
    return OtdetallePage;
}());

//# sourceMappingURL=otdetalle.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtagregarcomentarioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_comentarios_data_comentarios_data__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_speech_recognition__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_database_database__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







/**
 * Generated class for the OtagregarcomentarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtagregarcomentarioPage = /** @class */ (function () {
    function OtagregarcomentarioPage(speech, platform, navCtrl, navParams, formBuilder, dataService, alertCtrl, toast, loadingCtrl, database, network) {
        this.speech = speech;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.alertCtrl = alertCtrl;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
        this.database = database;
        this.network = network;
        this.valorOT = '';
        this.act = '';
        this.comentario = '';
        this.speechList = [];
        this.isRecording = false;
        this.leftCharacters = 200;
        this.valorOT = navParams.get('data');
        this.username = navParams.get('username');
        this.act = "1";
        this.myForm = this.createMyForm();
    }
    OtagregarcomentarioPage.prototype.ionViewDidLoad = function () {
    };
    OtagregarcomentarioPage.prototype.ionViewWillEnter = function () {
    };
    OtagregarcomentarioPage.prototype.isIos = function () {
        return this.platform.is('ios');
    };
    OtagregarcomentarioPage.prototype.changed = function () {
        this.leftCharacters = 200 - this.comentario.length;
    };
    OtagregarcomentarioPage.prototype.stopListening = function () {
        var _this = this;
        this.speech.stopListening().then(function () {
            _this.isRecording = false;
        });
    };
    OtagregarcomentarioPage.prototype.saveData = function () {
        console.log(this.myForm.value);
    };
    OtagregarcomentarioPage.prototype.createMyForm = function () {
        return this.formBuilder.group({
            comentario: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
        });
    };
    OtagregarcomentarioPage.prototype.enviarComentario = function () {
        var networkType = this.network.type;
        if (networkType === 'none') {
            this.showLoading();
            var self = this;
            self.database.addCommentario(self.valorOT, self.comentario.toString(), self.username, '1').then(function (value) {
                self.navCtrl.pop();
                var alert = self.alertCtrl.create({
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
                    var alert = self.alertCtrl.create({
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
    };
    OtagregarcomentarioPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    OtagregarcomentarioPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    OtagregarcomentarioPage.prototype.initSpeech = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var isAvailable, hasPermissions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.speech.isRecognitionAvailable()];
                    case 1:
                        isAvailable = _a.sent();
                        if (!(isAvailable == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.speech.hasPermission()];
                    case 2:
                        hasPermissions = _a.sent();
                        if (hasPermissions == false) {
                            this.speech.requestPermission().then(function () { return console.log('Granted'); }, function () { return console.log('Denied'); });
                        }
                        else if (hasPermissions == true) {
                            this.androidOptions = {
                                prompt: 'Indique su comentario',
                                language: 'es-CL'
                            };
                            this.iosOptions = {
                                language: 'es-CL'
                            };
                            if (this.platform.is('android')) {
                                this.isRecording = true;
                                this.speech.startListening(this.androidOptions)
                                    .subscribe(function (data) { return _this.myForm.get('comentario').setValue(data[0]); }, function (error) { return console.log(error); });
                                this.isRecording = false;
                            }
                            else if (this.platform.is('ios')) {
                                this.isRecording = true;
                                this.speech.startListening(this.iosOptions)
                                    .subscribe(function (data) { return _this.myForm.get('comentario').setValue(data[0]); }, function (error) { return console.log(error); });
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        this.toast.create({
                            message: "Su equipo no soporta funciones de reconocimiento de voz"
                        }).present();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OtagregarcomentarioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-otagregarcomentario',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otagregarcomentario/otagregarcomentario.html"*/'<!--\n  Generated template for the OtagregarcomentarioPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="liberty">\n    <ion-title text-right text-wrap>\n      <font size="2">Comentarios OT {{valorOT}}&emsp;&emsp;&emsp;Actividad {{act}}</font>\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content>\n  <form [formGroup]="myForm" (ngSubmit)="saveData()">\n    <ion-row>\n      <ion-col col-12>\n        <ion-item no-lines>\n          <ion-label color="dark" stacked>Comentario:</ion-label>\n          <ion-textarea formControlName="comentario" [(ngModel)]="comentario" (keypress)="changed()"\n            (keyup)="changed()"></ion-textarea>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-12>\n        <ion-item no-lines>\n          <ion-label color="dark" stacked>Quedan {{leftCharacters}} de 200 caracteres</ion-label>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-4>\n      </ion-col>\n      <ion-col col-4>\n        <button item-right class="botonguardar" type="button" ion-button [color]="isRecording ? \'danger\' : \'dark\'"\n          *ngIf=\'(isRecording == false)\' (click)="initSpeech()" rounded>\n          <ion-icon ios="ios-mic-outline" md="ios-mic-outline"></ion-icon>\n        </button>\n        <button item-right class="botonguardar" type="button" ion-button [color]="isRecording ? \'danger\' : \'dark\'"\n          *ngIf=\'(isRecording == true && isIos())\' (click)="stopListening()" rounded>\n          <ion-icon ios="ios-mic-outline" md="ios-mic-outline"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-4>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-4>\n      </ion-col>\n      <ion-col col-4>\n        <button class="botonguardar" ion-button color="dark" (click)="enviarComentario()" rounded>Enviar</button>\n      </ion-col>\n      <ion-col col-4>\n      </ion-col>\n    </ion-row>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otagregarcomentario/otagregarcomentario.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_speech_recognition__["a" /* SpeechRecognition */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2__providers_comentarios_data_comentarios_data__["a" /* ComentariosDataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_6__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */]])
    ], OtagregarcomentarioPage);
    return OtagregarcomentarioPage;
}());

//# sourceMappingURL=otagregarcomentario.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtdetallepreventivaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__otrotaciones_otrotaciones__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__otinspecciones_otinspecciones__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__otcrearactividades_otcrearactividades__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__comentarios_comentarios__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_comentarios_data_comentarios_data__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__otcrearmateriales_otcrearmateriales__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_detalle_ot_preventiva_data_detalle_ot_preventiva_data__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_base64__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_dropbox_dropbox__ = __webpack_require__(71);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














/**
 * Generated class for the OtdetallepreventivaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtdetallepreventivaPage = /** @class */ (function () {
    function OtdetallepreventivaPage(navCtrl, navParams, formBuilder, loadingCtrl, geolocation, camera, dataService, detalleOtPrevDataService, alertCtrl, dropbox, base64) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.camera = camera;
        this.dataService = dataService;
        this.detalleOtPrevDataService = detalleOtPrevDataService;
        this.alertCtrl = alertCtrl;
        this.dropbox = dropbox;
        this.base64 = base64;
        this.valorOT = '';
        this.tipoOT = '';
        this.estadoLista = [];
        this.actividad = '';
        this.descactividad = '';
        this.itemsUrl = [];
        this.itemsUpload = [];
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
    OtdetallepreventivaPage.prototype.saveData = function () {
    };
    OtdetallepreventivaPage.prototype.ionViewDidLoad = function () {
        this.dropbox.setAccessToken("heBg2DZjZxAAAAAAAAAAEJKGasOnhHn8ZJXnndvnRKg8ip7EDLZpERfK41a8UVww");
    };
    OtdetallepreventivaPage.prototype.ionViewWillEnter = function () {
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
    };
    OtdetallepreventivaPage.prototype.createMyForm = function () {
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
    };
    OtdetallepreventivaPage.prototype.getPicture = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this
            .camera
            .getPicture(options)
            .then(function (imageData) {
            var self = _this;
            self.showLoading();
            self.base64Image = imageData;
            self.base64.encodeFile(self.base64Image).then(function (base64File) {
                var imageBlob = self.getBlob(base64File, "Content-Type: image/jpeg");
                var rand = Math.floor(Math.random() * 2000000000000) + 1;
                var nombreArchivo = rand + '.jpg';
                self.dropbox.uploadFile(imageBlob, nombreArchivo).then(function (data) {
                    self.dropbox.getPublicUrl(nombreArchivo).then(function (dataDos) {
                        self.itemsUpload = dataDos;
                        self.itemsUrl = JSON.parse(self.itemsUpload);
                        self.dataService.soapinvokeR5countaddetails(self.valorOT).then(function (countComents) {
                            self.dataService.soapinvokeR5addetailsinterface(self.valorOT, 'Link Foto: ' + self.itemsUrl.url, self.userTecnico, countComents).then(function (valueR5addetailsinterface) {
                                self.loading.dismiss();
                                var alert = self.alertCtrl.create({
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
            }, function (err) {
            });
        }, function (err) {
        });
    };
    OtdetallepreventivaPage.prototype.getBlob = function (b64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 512;
        b64Data = b64Data.toString().replace(/^[^,]+,/, '');
        b64Data = b64Data.toString().replace(/\s/g, '');
        var byteCharacters = window.atob(b64Data);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    OtdetallepreventivaPage.prototype.goToOtComentarios = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__comentarios_comentarios__["a" /* ComentariosPage */], {
            data: this.valorOT,
            username: this.userTecnico
        });
    };
    OtdetallepreventivaPage.prototype.goToOtActividades = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__otcrearactividades_otcrearactividades__["a" /* OtcrearactividadesPage */], {
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
    };
    OtdetallepreventivaPage.prototype.goToOtMateriales = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__otcrearmateriales_otcrearmateriales__["a" /* OtcrearmaterialesPage */], {
            data: this.valorOT,
            actividad: this.actividad,
            descactividad: this.descactividad,
            rutTecnico: this.rutTecnico,
            almacen: this.almacen
        });
    };
    OtdetallepreventivaPage.prototype.goToOtInspecciones = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__otinspecciones_otinspecciones__["a" /* OtinspeccionesPage */], {
            data: this.valorOT,
            equipo: this.items.nombreactivo,
            username: this.userTecnico,
            actividad: this.actividad,
            estadoOt: this.items.estado,
            tipoOt: this.tipoOT,
            descOt: this.descOt,
            tipoTrabajo: this.tipoTrabajo
        });
    };
    OtdetallepreventivaPage.prototype.goToOtRotaciones = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__otrotaciones_otrotaciones__["a" /* OtrotacionesPage */], {
            data: this.valorOT,
            almacenParam: this.almacen,
            rutTecParam: this.rutTecnico
        });
    };
    OtdetallepreventivaPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    OtdetallepreventivaPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    OtdetallepreventivaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-otdetallepreventiva',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otdetallepreventiva/otdetallepreventiva.html"*/'<!--\n  Generated template for the OtdetallepreventivaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="liberty" class="force-back-button">\n    <ion-title text-right>\n      <font size="2">Tipo OT: {{tipoOT}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; OT {{valorOT}}</font>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <form [formGroup]="myForm" (ngSubmit)="saveData()">\n    <ion-item no-lines>\n      <ion-label color="dark" stacked>Equipo:</ion-label>\n      <ion-input text-center formControlName="nombreactivo"></ion-input>\n    </ion-item>\n    <ion-item no-lines>\n      <ion-label color="dark" stacked>Estado:</ion-label>\n      <ion-input text-center formControlName="estado"></ion-input>\n    </ion-item>\n    <ion-item no-lines>\n      <ion-label color="dark" stacked>Dirección:</ion-label>\n      <ion-input text-center formControlName="direccion"></ion-input>\n    </ion-item>\n    <ion-item no-lines>\n      <ion-label color="dark" stacked>Sistema:</ion-label>\n      <ion-input text-center formControlName="sistema"></ion-input>\n    </ion-item>\n    <ion-grid>\n      <ion-row class="rowcorrectivo">\n        <ion-col col-6>\n          <div padding>\n            <button ion-button type="button" color="dark" class="radius" block\n              (click)="goToOtInspecciones()">Inspecciones</button>\n          </div>\n        </ion-col>\n        <ion-col col-6>\n          <div padding>\n            <button ion-button type="button" color="dark" class="radius" block\n              (click)="goToOtRotaciones()">Rotación</button>\n          </div>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivoboton">\n        <ion-col col-6>\n          <div padding>\n            <button ion-button type="button" color="dark" class="radiusbottom" block\n              (click)="goToOtMateriales()">Materiales</button>\n          </div>\n        </ion-col>\n        <ion-col col-6>\n          <div padding>\n            <button ion-button type="button" color="dark" class="radiusbottom" block\n              (click)="goToOtActividades()">Actividades</button>\n          </div>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivoboton">\n        <ion-col col-6>\n          <div padding>\n            <button ion-button type="button" color="dark" class="radiusbottom" block (click)="goToOtComentarios()">\n              Comentarios\n              <ion-badge item-end *ngIf="itemComentarioCount" color="accent">{{ itemComentarioCount }}</ion-badge>\n            </button>\n          </div>\n        </ion-col>\n        <ion-col col-6>\n          <div padding>\n            <button ion-button type="button" color="dark" class="radiusbottom" block\n              (click)="getPicture()">Fotos</button>\n          </div>\n        </ion-col>\n      </ion-row>\n      <ion-row class="rowcorrectivoboton">\n        <ion-col col-4>\n        </ion-col>\n        <ion-col col-4>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otdetallepreventiva/otdetallepreventiva.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_9__providers_comentarios_data_comentarios_data__["a" /* ComentariosDataProvider */], __WEBPACK_IMPORTED_MODULE_11__providers_detalle_ot_preventiva_data_detalle_ot_preventiva_data__["a" /* DetalleOtPreventivaDataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_13__providers_dropbox_dropbox__["a" /* DropboxProvider */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_base64__["a" /* Base64 */]])
    ], OtdetallepreventivaPage);
    return OtdetallepreventivaPage;
}());

//# sourceMappingURL=otdetallepreventiva.js.map

/***/ }),

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtinspeccionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_inspecciones_data_inspecciones_data__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__otcrearactividadnueva_otcrearactividadnueva__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_database_database__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the OtinspeccionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OtinspeccionesPage = /** @class */ (function () {
    function OtinspeccionesPage(navCtrl, navParams, dataService, loadingCtrl, alertCtrl, database, network) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataService = dataService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.database = database;
        this.network = network;
        this.almacen = '';
        this.tipoOT = '';
        this.almacen = navParams.get('data');
        this.username = navParams.get('username');
        this.equipo = navParams.get('equipo');
        this.numActividad = navParams.get('actividad');
        this.estadoOt = navParams.get('estadoOt');
        this.tipoOT = navParams.get('tipoOt');
        this.descOt = navParams.get('descOt');
        this.tipoTrabajo = navParams.get('tipoTrabajo');
    }
    OtinspeccionesPage.prototype.showPrompt = function (descripcion, objeto, item) {
        if (this.tipoTrabajo === 'PPM' && this.tipoOT === 'PMPE01') {
            this.showPromptPMPE01(descripcion, objeto, item);
        }
        else {
            this.showPromptPPM(descripcion, objeto, item);
        }
    };
    OtinspeccionesPage.prototype.showPromptPPM = function (descripcion, objeto, item) {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__otcrearactividadnueva_otcrearactividadnueva__["a" /* OtcrearactividadnuevaPage */], {
                            data: _this.almacen,
                            equipo: _this.equipo,
                            username: _this.username,
                            actividad: _this.numActividad,
                            estadoOt: _this.estadoOt,
                            tipoOt: _this.tipoOT,
                            descOt: _this.descOt
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    cssClass: 'cancel-button',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Enviar',
                    cssClass: 'send-button',
                    handler: function (data) {
                        _this.validateNumberType = _this.validateNumericType(Number(data.valorinspeccion));
                        if (_this.validateNumberType == false) {
                            prompt.setMessage("<font size=2>Valor no es de tipo numérico</font>");
                            return false;
                        }
                        else {
                            _this.validateNumber = _this.validateInspNumber(Number(data.valorinspeccion));
                            if (_this.validateNumber == false) {
                                prompt.setMessage("<font size=2>Rango numérico debe ser de 0 a 1200</font>");
                                return false;
                            }
                            else {
                                var self = _this;
                                var networkType = _this.network.type;
                                if (networkType === 'none') {
                                    self.database.addInspeccion(_this.almacen, objeto, data.valorinspeccion, _this.username, item.obTypeArr, item.obrTypeArr, item.pointArr, item.pointTypeArr, item.metodo, item.aspecto).then(function (value) {
                                        var alert = self.alertCtrl.create({
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
                                    self.dataService.soapinvokeR5InsertarInspecciones(_this.almacen, objeto, data.valorinspeccion, _this.username, item.obTypeArr, item.obrTypeArr, item.pointArr, item.pointTypeArr, item.metodo, item.aspecto).then(function (R5InspeccionesValue) {
                                        var alert = self.alertCtrl.create({
                                            message: '<font size=3 color=black>Inspección ha sido enviada correctamente</font>',
                                            cssClass: 'buttonCss',
                                            buttons: [{
                                                    text: 'Ok',
                                                    cssClass: 'ok-button'
                                                }]
                                        });
                                        alert.setMode('md');
                                        alert.present();
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
    };
    OtinspeccionesPage.prototype.showPromptPMPE01 = function (descripcion, objeto, item) {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__otcrearactividadnueva_otcrearactividadnueva__["a" /* OtcrearactividadnuevaPage */], {
                            data: _this.almacen,
                            equipo: _this.equipo,
                            username: _this.username,
                            actividad: _this.numActividad,
                            estadoOt: _this.estadoOt,
                            tipoOt: _this.tipoOT,
                            descOt: _this.descOt
                        });
                    }
                },
                {
                    text: 'Cancelar',
                    cssClass: 'cancel-button',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Enviar',
                    cssClass: 'send-button',
                    handler: function (data) {
                        if (data.valorinspeccioncoti === '' && data.valorinspeccionreti != '') {
                            _this.validateNumberTypeReti = _this.validateNumericType(Number(data.valorinspeccionreti));
                            if (_this.validateNumberTypeReti == false) {
                                prompt.setMessage("<font size=2>Valor RETI no es de tipo numérico</font>");
                                return false;
                            }
                            else {
                                _this.validateNumber = _this.validateInspNumber(Number(data.valorinspeccionreti));
                                if (_this.validateNumber == false) {
                                    prompt.setMessage("<font size=2>Rango numérico debe ser de 0 a 1200</font>");
                                    return false;
                                }
                                else {
                                    var self = _this;
                                    var networkType = _this.network.type;
                                    if (networkType === 'none') {
                                        self.database.addInspeccionReti(_this.almacen, objeto, data.valorinspeccionreti, _this.username).then(function (value) {
                                            var alert = self.alertCtrl.create({
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
                                        self.dataService.soapinvokeR5InsertarInspeccionesPMPE01RETI(_this.almacen, objeto, data.valorinspeccionreti, _this.username).then(function (R5InspeccionesRetiValue) {
                                            var alert = self.alertCtrl.create({
                                                message: '<font size=3 color=black>Inspección ha sido enviada correctamente</font>',
                                                cssClass: 'buttonCss',
                                                buttons: [{
                                                        text: 'Ok',
                                                        cssClass: 'ok-button'
                                                    }]
                                            });
                                            alert.setMode('md');
                                            alert.present();
                                            return true;
                                        }, function (reason) {
                                            self.showError("Error al ejecutar servicio de inserción valor RETI");
                                        });
                                    }
                                }
                            }
                        }
                        if (data.valorinspeccioncoti != '' && data.valorinspeccionreti === '') {
                            _this.validateNumberTypeCoti = _this.validateNumericType(Number(data.valorinspeccioncoti));
                            if (_this.validateNumberTypeCoti == false) {
                                prompt.setMessage("<font size=2>Valor COTI no es de tipo numérico</font>");
                                return false;
                            }
                            else {
                                _this.validateNumber = _this.validateInspNumber(Number(data.valorinspeccioncoti));
                                if (_this.validateNumber == false) {
                                    prompt.setMessage("<font size=2>Rango numérico debe ser de 0 a 1200</font>");
                                    return false;
                                }
                                else {
                                    var self = _this;
                                    var networkType = _this.network.type;
                                    if (networkType === 'none') {
                                        self.database.addInspeccionCoti(_this.almacen, objeto, data.valorinspeccioncoti, _this.username).then(function (value) {
                                            var alert = self.alertCtrl.create({
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
                                        self.dataService.soapinvokeR5InsertarInspeccionesPMPE01Coti(_this.almacen, objeto, data.valorinspeccioncoti, _this.username).then(function (R5InspeccionesCotiValue) {
                                            var alert = self.alertCtrl.create({
                                                message: '<font size=3 color=black>Inspección ha sido enviada correctamente</font>',
                                                cssClass: 'buttonCss',
                                                buttons: [{
                                                        text: 'Ok',
                                                        cssClass: 'ok-button'
                                                    }]
                                            });
                                            alert.setMode('md');
                                            alert.present();
                                            return true;
                                        }, function (reason) {
                                            self.showError("Error al ejecutar servicio inserción valor COTI");
                                        });
                                    }
                                }
                            }
                        }
                        if (data.valorinspeccioncoti != '' && data.valorinspeccionreti != '') {
                            _this.validateNumberTypeCoti = _this.validateNumericType(Number(data.valorinspeccioncoti));
                            _this.validateNumberTypeReti = _this.validateNumericType(Number(data.valorinspeccionreti));
                            if (_this.validateNumberTypeCoti == false || _this.validateNumberTypeReti == false) {
                                prompt.setMessage("<font size=2>Valor no es de tipo numérico</font>");
                                return false;
                            }
                            else {
                                _this.validateNumberCoti = _this.validateInspNumber(Number(data.valorinspeccioncoti));
                                _this.validateNumberReti = _this.validateInspNumber(Number(data.valorinspeccionreti));
                                if (_this.validateNumberCoti == false || _this.validateNumberReti == false) {
                                    prompt.setMessage("<font size=2>Rango numérico debe ser de 0 a 1200</font>");
                                    return false;
                                }
                                else {
                                    var self = _this;
                                    var networkType = _this.network.type;
                                    if (networkType === 'none') {
                                        self.database.addInspeccionCoti(self.almacen, objeto, data.valorinspeccioncoti, self.username).then(function (value) {
                                            self.database.addInspeccionReti(self.almacen, objeto, data.valorinspeccionreti, self.username).then(function (value) {
                                                var alert = self.alertCtrl.create({
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
                                                var alert = self.alertCtrl.create({
                                                    message: '<font size=3 color=black>Inspección ha sido enviada correctamente</font>',
                                                    cssClass: 'buttonCss',
                                                    buttons: [{
                                                            text: 'Ok',
                                                            cssClass: 'ok-button'
                                                        }]
                                                });
                                                alert.setMode('md');
                                                alert.present();
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
    };
    OtinspeccionesPage.prototype.ionViewDidLoad = function () {
    };
    OtinspeccionesPage.prototype.ionViewWillEnter = function () {
        this.showLoading();
        var self = this;
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
    };
    OtinspeccionesPage.prototype.validateInspNumber = function (data) {
        if (parseFloat(data) >= 0.00 && parseFloat(data) <= 1200.00) {
            return true;
        }
        else {
            return false;
        }
    };
    OtinspeccionesPage.prototype.validateNumericType = function (data) {
        return !isNaN(Number(data.toString()));
    };
    OtinspeccionesPage.prototype.enviarInspecciones = function () {
        this.navCtrl.pop();
        var alert = this.alertCtrl.create({
            message: '<font size=3 color=black>Las inspecciones se han enviado correctamente</font>',
            cssClass: 'buttonCss',
            buttons: [{
                    text: 'Ok',
                    cssClass: 'ok-button'
                }]
        });
        alert.setMode('md');
        alert.present();
    };
    OtinspeccionesPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Espere',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    OtinspeccionesPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    OtinspeccionesPage.prototype.doRefresh = function (refresher) {
        var self = this;
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
    };
    OtinspeccionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-otinspecciones',template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otinspecciones/otinspecciones.html"*/'<!--\n  Generated template for the OtinspeccionesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="liberty">\n    <ion-title text-right>\n      <font size="3">Inspecciones Tipo OT: {{tipoOT}}&nbsp;&nbsp;&nbsp;OT {{almacen}}</font>\n    </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="Actualizar" refreshingSpinner="circles"\n      refreshingText="Actualizando..."></ion-refresher-content>\n  </ion-refresher>\n  <ion-list>\n    <ion-row>\n      <button ion-item [color]="item.valorinspeccion == \'\'? \'redalert\' : \'green\'"\n        *ngFor="let item of itemsInspecciones ; let even = even"\n        (click)="showPrompt(item.descripcion,item.objeto, item,i)">\n        <div class="CustomColour">\n          <ion-row>\n            <ion-col col-6 text-wrap>\n              <h3>\n                <font size="2" color="black"><b>Objeto:</b>{{item.objeto}}</font>\n              </h3>\n            </ion-col>\n            <ion-col col-6 text-wrap>\n              <h3>\n                <font size="2" color="black"><b>Categoría:</b>{{item.categoria}}</font>\n              </h3>\n            </ion-col>\n          </ion-row>\n          <ion-row class="ionrowclass">\n            <ion-col col-6 text-wrap>\n              <h3>\n                <font size="2" color="black"><b>Descripción Obj:</b>{{item.descripcion}}</font>\n              </h3>\n            </ion-col>\n            <ion-col col-6 text-wrap>\n              <h3>\n                <font size="2" color="black"><b>Desc. Aspecto:</b>{{item.descaspecto}}</font>\n              </h3>\n            </ion-col>\n          </ion-row>\n          <ion-row class="ionrowclass">\n            <ion-col col-6 text-wrap>\n              <h3>\n                <font size="2" color="black"><b>Método:</b>{{item.metodo}}</font>\n              </h3>\n            </ion-col>\n            <ion-col col-6 text-wrap>\n              <h3>\n                <font size="2" color="black"><b>Dirección:</b>{{item.direccion}}</font>\n              </h3>\n            </ion-col>\n          </ion-row>\n          <ion-row class="ionrowclass">\n            <ion-col col-6 text-wrap>\n              <h3>\n                <font size="2" color="black"><b>Valor Ingresado:</b>{{item.valorinspeccion}}</font>\n              </h3>\n            </ion-col>\n          </ion-row>\n        </div>\n      </button>\n    </ion-row>\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/pages/otinspecciones/otinspecciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__providers_inspecciones_data_inspecciones_data__["a" /* InspeccionesDataProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_5__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]])
    ], OtinspeccionesPage);
    return OtinspeccionesPage;
}());

//# sourceMappingURL=otinspecciones.js.map

/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(508);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_location_accuracy__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_login_login__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_main_data_main_data__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_select_searchable__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ionic_select_searchable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_ionic_select_searchable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_main_main__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_otdetalle_otdetalle__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_materiales_data_materiales_data__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_otdetallepreventiva_otdetallepreventiva__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_otcrearactividadnueva_otcrearactividadnueva__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_otcrearmateriales_otcrearmateriales__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_inspecciones_data_inspecciones_data__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_otinspecciones_otinspecciones__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_otcrearactividades_otcrearactividades__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_actividades_data_actividades_data__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__providers_rotacion_data_rotacion_data__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_otrotaciones_otrotaciones__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_otagregarcomentario_otagregarcomentario__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_comentarios_comentarios__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_comentarios_data_comentarios_data__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_camera__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_barcode_scanner__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_speech_recognition__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_detalle_ot_preventiva_data_detalle_ot_preventiva_data__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__angular_platform_browser_animations__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__providers_detalle_ot_programada_data_detalle_ot_programada_data__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_ms_adal__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__providers_database_database__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_storage__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_sqlite_porter__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_sqlite__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__providers_dropbox_dropbox__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__ionic_native_base64__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44_ionic_selectable__ = __webpack_require__(839);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_main_main__["a" /* MainPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_otdetalle_otdetalle__["a" /* OtdetallePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_otcrearmateriales_otcrearmateriales__["a" /* OtcrearmaterialesPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_otinspecciones_otinspecciones__["a" /* OtinspeccionesPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_otcrearactividades_otcrearactividades__["a" /* OtcrearactividadesPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_otrotaciones_otrotaciones__["a" /* OtrotacionesPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_otdetallepreventiva_otdetallepreventiva__["a" /* OtdetallepreventivaPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_comentarios_comentarios__["a" /* ComentariosPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_otcrearactividadnueva_otcrearactividadnueva__["a" /* OtcrearactividadnuevaPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_otagregarcomentario_otagregarcomentario__["a" /* OtagregarcomentarioPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_35__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_15_ionic_select_searchable__["SelectSearchableModule"],
                __WEBPACK_IMPORTED_MODULE_44_ionic_selectable__["a" /* IonicSelectableModule */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], { mode: 'md' }, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicApp"]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_main_main__["a" /* MainPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_otdetalle_otdetalle__["a" /* OtdetallePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_otcrearmateriales_otcrearmateriales__["a" /* OtcrearmaterialesPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_otinspecciones_otinspecciones__["a" /* OtinspeccionesPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_otcrearactividades_otcrearactividades__["a" /* OtcrearactividadesPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_otrotaciones_otrotaciones__["a" /* OtrotacionesPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_otdetallepreventiva_otdetallepreventiva__["a" /* OtdetallepreventivaPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_comentarios_comentarios__["a" /* ComentariosPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_otcrearactividadnueva_otcrearactividadnueva__["a" /* OtcrearactividadnuevaPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_otagregarcomentario_otagregarcomentario__["a" /* OtagregarcomentarioPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["IonicErrorHandler"] },
                __WEBPACK_IMPORTED_MODULE_0__providers_auth_service_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_14__providers_main_data_main_data__["a" /* MainDataProvider */],
                __WEBPACK_IMPORTED_MODULE_18__providers_materiales_data_materiales_data__["a" /* MaterialesDataProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_22__providers_inspecciones_data_inspecciones_data__["a" /* InspeccionesDataProvider */],
                __WEBPACK_IMPORTED_MODULE_25__providers_actividades_data_actividades_data__["a" /* ActividadesDataProvider */],
                __WEBPACK_IMPORTED_MODULE_26__providers_rotacion_data_rotacion_data__["a" /* RotacionDataProvider */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_30__providers_comentarios_data_comentarios_data__["a" /* ComentariosDataProvider */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_speech_recognition__["a" /* SpeechRecognition */],
                __WEBPACK_IMPORTED_MODULE_34__providers_detalle_ot_preventiva_data_detalle_ot_preventiva_data__["a" /* DetalleOtPreventivaDataProvider */],
                __WEBPACK_IMPORTED_MODULE_36__providers_detalle_ot_programada_data_detalle_ot_programada_data__["a" /* DetalleOtProgramadaDataProvider */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_ms_adal__["a" /* MSAdal */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_38__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_sqlite_porter__["a" /* SQLitePorter */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_42__providers_dropbox_dropbox__["a" /* DropboxProvider */],
                __WEBPACK_IMPORTED_MODULE_43__ionic_native_base64__["a" /* Base64 */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(148);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/devuser/IonicProjects/StreamlinedMantenimientoVTR_PROD/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropboxProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the DropboxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DropboxProvider = /** @class */ (function () {
    function DropboxProvider(http) {
        this.http = http;
        this.folderHistory = [];
        this.items = [];
    }
    DropboxProvider.prototype.setAccessToken = function (token) {
        this.accessToken = token;
    };
    DropboxProvider.prototype.getUserInfo = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/json');
        return this.http.post('https://api.dropboxapi.com/2-beta-2/users/get_current_account', "null", { headers: headers })
            .map(function (res) { return res.blob(); });
    };
    DropboxProvider.prototype.uploadFile = function (data, nombreArchivo) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/octet-stream');
        headers.append('Dropbox-API-Arg', '{"path":"/SEAM/' + nombreArchivo + '"}');
        return new Promise(function (resolve) {
            _this.http.post('https://content.dropboxapi.com/2/files/upload', data, { headers: headers }).subscribe(function (data) {
                resolve(JSON.stringify(data));
            }, function (error) {
            });
        });
    };
    DropboxProvider.prototype.getPublicUrl = function (nombreArchivo) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var data;
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/json');
        data = { "path": "/SEAM/" + nombreArchivo + "", "settings": { "requested_visibility": "public" } };
        return new Promise(function (resolve) {
            _this.http.post('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', data, { headers: headers }).subscribe(function (datos) {
                resolve(datos['_body']);
            }, function (error) {
            });
        });
    };
    DropboxProvider.prototype.getFolders = function (path) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Authorization', 'Bearer ' + this.accessToken);
        headers.append('Content-Type', 'application/json');
        var folderPath;
        if (typeof (path) == "undefined" || !path) {
            folderPath = {
                path: ""
            };
        }
        else {
            folderPath = {
                path: path
            };
            if (this.folderHistory[this.folderHistory.length - 1] != path) {
                this.folderHistory.push(path);
            }
        }
        return this.http.post('https://api.dropboxapi.com/2-beta-2/files/list_folder', JSON.stringify(folderPath), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DropboxProvider.prototype.goBackFolder = function () {
        if (this.folderHistory.length > 0) {
            this.folderHistory.pop();
            var path = this.folderHistory[this.folderHistory.length - 1];
            return this.getFolders(path);
        }
        else {
            return this.getFolders();
        }
    };
    DropboxProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], DropboxProvider);
    return DropboxProvider;
}());

//# sourceMappingURL=dropbox.js.map

/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 375,
	"./af.js": 375,
	"./ar": 376,
	"./ar-dz": 377,
	"./ar-dz.js": 377,
	"./ar-kw": 378,
	"./ar-kw.js": 378,
	"./ar-ly": 379,
	"./ar-ly.js": 379,
	"./ar-ma": 380,
	"./ar-ma.js": 380,
	"./ar-sa": 381,
	"./ar-sa.js": 381,
	"./ar-tn": 382,
	"./ar-tn.js": 382,
	"./ar.js": 376,
	"./az": 383,
	"./az.js": 383,
	"./be": 384,
	"./be.js": 384,
	"./bg": 385,
	"./bg.js": 385,
	"./bm": 386,
	"./bm.js": 386,
	"./bn": 387,
	"./bn.js": 387,
	"./bo": 388,
	"./bo.js": 388,
	"./br": 389,
	"./br.js": 389,
	"./bs": 390,
	"./bs.js": 390,
	"./ca": 391,
	"./ca.js": 391,
	"./cs": 392,
	"./cs.js": 392,
	"./cv": 393,
	"./cv.js": 393,
	"./cy": 394,
	"./cy.js": 394,
	"./da": 395,
	"./da.js": 395,
	"./de": 396,
	"./de-at": 397,
	"./de-at.js": 397,
	"./de-ch": 398,
	"./de-ch.js": 398,
	"./de.js": 396,
	"./dv": 399,
	"./dv.js": 399,
	"./el": 400,
	"./el.js": 400,
	"./en-au": 401,
	"./en-au.js": 401,
	"./en-ca": 402,
	"./en-ca.js": 402,
	"./en-gb": 403,
	"./en-gb.js": 403,
	"./en-ie": 404,
	"./en-ie.js": 404,
	"./en-il": 405,
	"./en-il.js": 405,
	"./en-nz": 406,
	"./en-nz.js": 406,
	"./eo": 407,
	"./eo.js": 407,
	"./es": 408,
	"./es-do": 409,
	"./es-do.js": 409,
	"./es-us": 410,
	"./es-us.js": 410,
	"./es.js": 408,
	"./et": 411,
	"./et.js": 411,
	"./eu": 412,
	"./eu.js": 412,
	"./fa": 413,
	"./fa.js": 413,
	"./fi": 414,
	"./fi.js": 414,
	"./fo": 415,
	"./fo.js": 415,
	"./fr": 416,
	"./fr-ca": 417,
	"./fr-ca.js": 417,
	"./fr-ch": 418,
	"./fr-ch.js": 418,
	"./fr.js": 416,
	"./fy": 419,
	"./fy.js": 419,
	"./gd": 420,
	"./gd.js": 420,
	"./gl": 421,
	"./gl.js": 421,
	"./gom-latn": 422,
	"./gom-latn.js": 422,
	"./gu": 423,
	"./gu.js": 423,
	"./he": 424,
	"./he.js": 424,
	"./hi": 425,
	"./hi.js": 425,
	"./hr": 426,
	"./hr.js": 426,
	"./hu": 427,
	"./hu.js": 427,
	"./hy-am": 428,
	"./hy-am.js": 428,
	"./id": 429,
	"./id.js": 429,
	"./is": 430,
	"./is.js": 430,
	"./it": 431,
	"./it.js": 431,
	"./ja": 432,
	"./ja.js": 432,
	"./jv": 433,
	"./jv.js": 433,
	"./ka": 434,
	"./ka.js": 434,
	"./kk": 435,
	"./kk.js": 435,
	"./km": 436,
	"./km.js": 436,
	"./kn": 437,
	"./kn.js": 437,
	"./ko": 438,
	"./ko.js": 438,
	"./ky": 439,
	"./ky.js": 439,
	"./lb": 440,
	"./lb.js": 440,
	"./lo": 441,
	"./lo.js": 441,
	"./lt": 442,
	"./lt.js": 442,
	"./lv": 443,
	"./lv.js": 443,
	"./me": 444,
	"./me.js": 444,
	"./mi": 445,
	"./mi.js": 445,
	"./mk": 446,
	"./mk.js": 446,
	"./ml": 447,
	"./ml.js": 447,
	"./mn": 448,
	"./mn.js": 448,
	"./mr": 449,
	"./mr.js": 449,
	"./ms": 450,
	"./ms-my": 451,
	"./ms-my.js": 451,
	"./ms.js": 450,
	"./mt": 452,
	"./mt.js": 452,
	"./my": 453,
	"./my.js": 453,
	"./nb": 454,
	"./nb.js": 454,
	"./ne": 455,
	"./ne.js": 455,
	"./nl": 456,
	"./nl-be": 457,
	"./nl-be.js": 457,
	"./nl.js": 456,
	"./nn": 458,
	"./nn.js": 458,
	"./pa-in": 459,
	"./pa-in.js": 459,
	"./pl": 460,
	"./pl.js": 460,
	"./pt": 461,
	"./pt-br": 462,
	"./pt-br.js": 462,
	"./pt.js": 461,
	"./ro": 463,
	"./ro.js": 463,
	"./ru": 464,
	"./ru.js": 464,
	"./sd": 465,
	"./sd.js": 465,
	"./se": 466,
	"./se.js": 466,
	"./si": 467,
	"./si.js": 467,
	"./sk": 468,
	"./sk.js": 468,
	"./sl": 469,
	"./sl.js": 469,
	"./sq": 470,
	"./sq.js": 470,
	"./sr": 471,
	"./sr-cyrl": 472,
	"./sr-cyrl.js": 472,
	"./sr.js": 471,
	"./ss": 473,
	"./ss.js": 473,
	"./sv": 474,
	"./sv.js": 474,
	"./sw": 475,
	"./sw.js": 475,
	"./ta": 476,
	"./ta.js": 476,
	"./te": 477,
	"./te.js": 477,
	"./tet": 478,
	"./tet.js": 478,
	"./tg": 479,
	"./tg.js": 479,
	"./th": 480,
	"./th.js": 480,
	"./tl-ph": 481,
	"./tl-ph.js": 481,
	"./tlh": 482,
	"./tlh.js": 482,
	"./tr": 483,
	"./tr.js": 483,
	"./tzl": 484,
	"./tzl.js": 484,
	"./tzm": 485,
	"./tzm-latn": 486,
	"./tzm-latn.js": 486,
	"./tzm.js": 485,
	"./ug-cn": 487,
	"./ug-cn.js": 487,
	"./uk": 488,
	"./uk.js": 488,
	"./ur": 489,
	"./ur.js": 489,
	"./uz": 490,
	"./uz-latn": 491,
	"./uz-latn.js": 491,
	"./uz.js": 490,
	"./vi": 492,
	"./vi.js": 492,
	"./x-pseudo": 493,
	"./x-pseudo.js": 493,
	"./yo": 494,
	"./yo.js": 494,
	"./zh-cn": 495,
	"./zh-cn.js": 495,
	"./zh-hk": 496,
	"./zh-hk.js": 496,
	"./zh-tw": 497,
	"./zh-tw.js": 497
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 834;

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActividadesDataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the ActividadesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ActividadesDataProvider = /** @class */ (function () {
    function ActividadesDataProvider(http) {
        this.http = http;
        this.itemsActividades = [];
        this.itemsTareas = [];
        this.itemsTecnicos = [];
        this.itemsMotivoReparacion = [];
    }
    ActividadesDataProvider.prototype.soapinvokeR5ucodesTareas = function () {
        var self = this;
        this.itemsTareas = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerListaSistemas?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas/LOGEMPObtenerListaSistemasPortType/LOGEMPObtenerListaSistemasOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerListaSistemasRequest>\n                      <obt:codigoParametro>TASK</obt:codigoParametro>\n                  </obt:obtenerListaSistemasRequest>         \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codSistemas = void 0;
                        var descSistemas = void 0;
                        var codSistemasArr = void 0;
                        var descSistemasArr = void 0;
                        var i = 0;
                        codSistemas = xml.getElementsByTagName("obt:codigoParametro");
                        descSistemas = xml.getElementsByTagName("obt:descripcionParametro");
                        responseLenght = xml.getElementsByTagName("obt:listas")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codSistemas[i].childNodes[0]) {
                            }
                            else {
                                if (codSistemas[i].childNodes[0]) {
                                    codSistemasArr = codSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codSistemasArr = '';
                                }
                                if (descSistemas[i].childNodes[0]) {
                                    descSistemasArr = descSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descSistemasArr = '';
                                }
                                self.itemsTareas.push({
                                    tareaDesc: descSistemasArr,
                                    tareaItem: codSistemasArr,
                                    comptarea: codSistemasArr + ' - ' + descSistemasArr,
                                });
                            }
                        }
                        resolve(self.itemsTareas);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    ActividadesDataProvider.prototype.soapinvokeR5ucodesTecnicos = function (deptTecnico) {
        var self = this;
        this.itemsTecnicos = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerListaSistemas?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas/LOGEMPObtenerListaSistemasPortType/LOGEMPObtenerListaSistemasOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerListaSistemasRequest>\n                      <obt:codigoParametro>TEC-" + deptTecnico + "</obt:codigoParametro>\n                  </obt:obtenerListaSistemasRequest>         \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codSistemas = void 0;
                        var descSistemas = void 0;
                        var codSistemasArr = void 0;
                        var descSistemasArr = void 0;
                        var i = 0;
                        codSistemas = xml.getElementsByTagName("obt:codigoParametro");
                        descSistemas = xml.getElementsByTagName("obt:descripcionParametro");
                        responseLenght = xml.getElementsByTagName("obt:listas")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codSistemas[i].childNodes[0]) {
                            }
                            else {
                                if (codSistemas[i].childNodes[0]) {
                                    codSistemasArr = codSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codSistemasArr = '';
                                }
                                if (descSistemas[i].childNodes[0]) {
                                    descSistemasArr = descSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descSistemasArr = '';
                                }
                                self.itemsTecnicos.push({
                                    tecnicoDesc: descSistemasArr,
                                    tecnicoItem: codSistemasArr,
                                    comptecnico: codSistemasArr + ' - ' + descSistemasArr,
                                });
                            }
                        }
                        resolve(self.itemsTecnicos);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    ActividadesDataProvider.prototype.soapinvokeR5EventInterfacePpmUpdate = function (codOt, estadoOt, notas, codUsuario, tareas, actComplete, codActividad, horasEstimadas, equipo, tipoOt, descOt, motivorep) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/crearActividadPpm?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/crearActividadPpm/LOGEMPCrearActividadPpmPortType/LOGEMPCrearActividadPpmOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:cre=\"http://osbcorp.vtr.cl/LOG/EMP/crearActividadPpm\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <cre:crearActividadPpmRequest>\n                  <cre:codigoSistemaSatelite>SEAM</cre:codigoSistemaSatelite>\n                  <cre:codigoOt>" + codOt + "</cre:codigoOt>\n                  <cre:descripcionOt>" + descOt + "</cre:descripcionOt>\n                  <cre:tipoTransaccion>U</cre:tipoTransaccion>\n                  <cre:tipo>" + tipoOt + "</cre:tipo>\n                  <cre:centroCosto>213</cre:centroCosto>\n                  <cre:equipo>" + equipo + "</cre:equipo>\n                  <cre:estadoOt>" + estadoOt + "</cre:estadoOt>\n                  <cre:notas>" + notas + "</cre:notas>\n                  <cre:codigoUsuario>" + codUsuario + "</cre:codigoUsuario>\n                  <cre:tareas>" + tareas + '-' + motivorep + "</cre:tareas>\n                  <cre:flagActividadCompletada>" + actComplete + "</cre:flagActividadCompletada>\n                  <cre:codigoActividad>" + codActividad + "</cre:codigoActividad>\n                  <cre:horasEstimadas>" + horasEstimadas + "</cre:horasEstimadas>\n                </cre:crearActividadPpmRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    ActividadesDataProvider.prototype.soapinvokeR5EventInterfacePpmCreate = function (codOt, estadoOt, notas, codUsuario, tareas, actComplete, horasEstimadas, numActividadInc, equipo, tipoOt, descOt, motivorep) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/crearActividadPpm?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/crearActividadPpm/LOGEMPCrearActividadPpmPortType/LOGEMPCrearActividadPpmOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:cre=\"http://osbcorp.vtr.cl/LOG/EMP/crearActividadPpm\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                 <cre:crearActividadPpmRequest>\n                    <cre:codigoSistemaSatelite>SEAM</cre:codigoSistemaSatelite>\n                    <cre:codigoOt>" + codOt + "</cre:codigoOt>\n                    <cre:descripcionOt>" + descOt + "</cre:descripcionOt>\n                    <cre:tipoTransaccion>U</cre:tipoTransaccion>\n                    <cre:tipo>" + tipoOt + "</cre:tipo>\n                    <cre:centroCosto>213</cre:centroCosto> \n                    <cre:equipo>" + equipo + "</cre:equipo>\n                    <cre:estadoOt>" + estadoOt + "</cre:estadoOt>\n                    <cre:notas>" + notas + "</cre:notas>\n                    <cre:codigoUsuario>" + codUsuario + "</cre:codigoUsuario>\n                    <cre:tareas>" + tareas + '-' + motivorep + "</cre:tareas>\n                    <cre:flagActividadCompletada>" + actComplete + "</cre:flagActividadCompletada>\n                    <cre:codigoActividad></cre:codigoActividad>\n                    <cre:horasEstimadas>" + horasEstimadas + "</cre:horasEstimadas>\n                  </cre:crearActividadPpmRequest>\n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var result = void 0;
                        result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
                        resolve(result);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    ActividadesDataProvider.prototype.soapinvokeR5ucodesMotivoRep = function () {
        var self = this;
        this.itemsMotivoReparacion = [];
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://seam.vtr.cl/obtenerListaSistemas?wsdl', true);
            xmlhttp.withCredentials = true;
            xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "https://seam.vtr.cl");
            xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xmlhttp.setRequestHeader("Access-Control-Allow-Methods", "GET, POST");
            xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "Origin,Content-Type,Accept");
            xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
            xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas/LOGEMPObtenerListaSistemasPortType/LOGEMPObtenerListaSistemasOperationRequest");
            var sr = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:head=\"http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest\" xmlns:obt=\"http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas\">\n                  <soap:Header>\n                     <head:HeaderRequest>\n                        <head:Username>STLN</head:Username>\n                        <head:Company>STLN</head:Company>\n                        <head:AppName>SEAM</head:AppName>\n                        <head:IdClient>STLN</head:IdClient>\n                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>\n                     </head:HeaderRequest>\n                  </soap:Header>\n                  <soap:Body>\n                  <obt:obtenerListaSistemasRequest>\n                      <obt:codigoParametro>REPC</obt:codigoParametro>\n                  </obt:obtenerListaSistemasRequest>         \n                  </soap:Body>\n               </soap:Envelope>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var responseLenght = void 0;
                        var codSistemas = void 0;
                        var descSistemas = void 0;
                        var codSistemasArr = void 0;
                        var descSistemasArr = void 0;
                        var i = 0;
                        codSistemas = xml.getElementsByTagName("obt:codigoParametro");
                        descSistemas = xml.getElementsByTagName("obt:descripcionParametro");
                        responseLenght = xml.getElementsByTagName("obt:listas")[0].childNodes.length;
                        for (i = 0; i < responseLenght; i++) {
                            if (!codSistemas[i].childNodes[0]) {
                            }
                            else {
                                if (codSistemas[i].childNodes[0]) {
                                    codSistemasArr = codSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    codSistemasArr = '';
                                }
                                if (descSistemas[i].childNodes[0]) {
                                    descSistemasArr = descSistemas[i].childNodes[0].nodeValue;
                                }
                                else {
                                    descSistemasArr = '';
                                }
                                self.itemsMotivoReparacion.push({
                                    motivoRepDesc: descSistemasArr,
                                    motivoRep: codSistemasArr,
                                    compmotivo: codSistemasArr + ' - ' + descSistemasArr,
                                });
                            }
                        }
                        resolve(self.itemsMotivoReparacion);
                    }
                    else {
                        reject(new Error('Error en invocacion'));
                    }
                }
            };
            xmlhttp.onerror = function () {
                reject(new Error('Error en invocacion'));
            };
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
        });
    };
    ;
    ActividadesDataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ActividadesDataProvider);
    return ActividadesDataProvider;
}());

//# sourceMappingURL=actividades-data.js.map

/***/ })

},[503]);
//# sourceMappingURL=main.js.map