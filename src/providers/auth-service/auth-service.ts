import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  name: string;


  constructor(name: string) {
    this.name = name;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;
  loginStatus: any;
  access: boolean;
  observerExec: any;
  username: string;

  public login(value, usuario) {
    if (value === false) {
      return Observable.throw("Credencial Incorrecta");
    } else {
      return Observable.create(observer => {
        //Se realiza chequeo del servicio de acceso, si devuelve true, hay que asignar true a la variable access, de lo contrario, asignar false
        let access = (value === "true");
        this.currentUser = new User(usuario);
        observer.next(access);
        observer.complete();
      });
    }
  }



  public soapinvoke(credentials) {
    return new Promise(function (resolve, reject) {
      if (credentials.usuario === null || credentials.password === null) {
      } else {
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

        var sr =
          `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:log="http://osbcorp.vtr.cl/LOG/EMP/loginUser">
                  <soap:Header>
                     <head:HeaderRequest>
                        <head:Username>STLN</head:Username>
                        <head:Company>STLN</head:Company>
                        <head:AppName>SEAM</head:AppName>
                        <head:IdClient>STLN</head:IdClient>
                        <head:ReqDate>2018-09-15T00:00:00</head:ReqDate>
                     </head:HeaderRequest>
                  </soap:Header>
                  <soap:Body>
                     <log:loginUserRequest>
                        <log:codigoUsuario>` + credentials.usuario + `</log:codigoUsuario>
                        <log:passwordUsuario>` + credentials.password + `</log:passwordUsuario>
                     </log:loginUserRequest>
                  </soap:Body>
               </soap:Envelope>`;


        xmlhttp.onreadystatechange = () => {
          if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
              var xml = xmlhttp.responseXML;

              if (credentials.usuario === null || credentials.password === null || credentials.usuario === '' || credentials.password === '') {

                reject(new Error('Ingrese todos los datos requeridos'));

              }
              else {
                let loginvalue;
                loginvalue = xml.getElementsByTagName("log:estadoAutenticacion")[0].childNodes[0].nodeValue;
                resolve(loginvalue);

              }

            }
            else {
              reject(new Error('HTTPStatus: ' + xmlhttp.status + ' Error en invocacion'));
            }
          }
        }
        xmlhttp.onerror = function () {
          reject(new Error('Error en invocacion (ReadyStateOfChange)'));

        };

        xmlhttp.responseType = "document";
        xmlhttp.send(sr);

      }
    });
  };


  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}