import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ActividadesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActividadesDataProvider {

  itemsActividades: any = [];
  itemsTareas: any = [];
  itemsMotivoReparacion: any = [];

  constructor(public http: HttpClient) {


  }

  soapinvokeR5ucodesTareas() {

    var self = this;
    this.itemsTareas = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/obtenerListaSistemas?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas/LOGEMPObtenerListaSistemasPortType/LOGEMPObtenerListaSistemasOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:obt="http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas">
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
                  <obt:obtenerListaSistemasRequest>
                      <obt:codigoParametro>TASK</obt:codigoParametro>
                  </obt:obtenerListaSistemasRequest>         
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let codSistemas;
            let descSistemas;
            let codSistemasArr;
            let descSistemasArr;
            var i = 0;
            codSistemas = xml.getElementsByTagName("obt:codigoParametro");
            descSistemas = xml.getElementsByTagName("obt:descripcionParametro");

            responseLenght = xml.getElementsByTagName("obt:listas")[0].childNodes.length;

            for (i = 0; i < responseLenght; i++) {

              if (!codSistemas[i].childNodes[0]) {
                console.log('No se inserta nodo por estar vacio');
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  public soapinvokeR5EventInterfacePpmUpdate(codOt, estadoOt, notas, codUsuario, tareas, actComplete, codActividad, horasEstimadas, equipo, tipoOt, descOt) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/crearActividadPpm?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/crearActividadPpm/LOGEMPCrearActividadPpmPortType/LOGEMPCrearActividadPpmOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:cre="http://osbcorp.vtr.cl/LOG/EMP/crearActividadPpm">
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
                  <cre:crearActividadPpmRequest>
                  <cre:codigoSistemaSatelite>SEAM</cre:codigoSistemaSatelite>
                  <cre:codigoOt>` + codOt + `</cre:codigoOt>
                  <cre:descripcionOt>` + descOt + `</cre:descripcionOt>
                  <cre:tipoTransaccion>U</cre:tipoTransaccion>
                  <cre:tipo>` + tipoOt + `</cre:tipo>
                  <cre:centroCosto>213</cre:centroCosto>
                  <cre:equipo>` + equipo + `</cre:equipo>
                  <cre:estadoOt>` + estadoOt + `</cre:estadoOt>
                  <cre:notas>` + notas + `</cre:notas>
                  <cre:codigoUsuario>` + codUsuario + `</cre:codigoUsuario>
                  <cre:tareas>` + tareas + `</cre:tareas>
                  <cre:flagActividadCompletada>` + actComplete + `</cre:flagActividadCompletada>
                  <cre:codigoActividad>` + codActividad + `</cre:codigoActividad>
                  <cre:horasEstimadas>` + horasEstimadas + `</cre:horasEstimadas>
                </cre:crearActividadPpmRequest>
                  </soap:Body>
               </soap:Envelope>`;

      console.log(sr);

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let result;
            result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
            resolve(result);

          }
          else {
            reject(new Error('Error en invocacion'));
          }
        }
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);

    });
  };

  public soapinvokeR5EventInterfacePpmCreate(codOt, estadoOt, notas, codUsuario, tareas, actComplete, horasEstimadas, numActividadInc, equipo, tipoOt, descOt) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/crearActividadPpm?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/crearActividadPpm/LOGEMPCrearActividadPpmPortType/LOGEMPCrearActividadPpmOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:cre="http://osbcorp.vtr.cl/LOG/EMP/crearActividadPpm">
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
                 <cre:crearActividadPpmRequest>
                    <cre:codigoSistemaSatelite>SEAM</cre:codigoSistemaSatelite>
                    <cre:codigoOt>` + codOt + `</cre:codigoOt>
                    <cre:descripcionOt>` + descOt + `</cre:descripcionOt>
                    <cre:tipoTransaccion>A</cre:tipoTransaccion>
                    <cre:tipo>` + tipoOt + `</cre:tipo>
                    <cre:centroCosto>213</cre:centroCosto>
                    <cre:equipo>` + equipo + `</cre:equipo>
                    <cre:estadoOt>` + estadoOt + `</cre:estadoOt>
                    <cre:notas>` + notas + `</cre:notas>
                    <cre:codigoUsuario>` + codUsuario + `</cre:codigoUsuario>
                    <cre:tareas>` + tareas + `</cre:tareas>
                    <cre:flagActividadCompletada>` + actComplete + `</cre:flagActividadCompletada>
                    <cre:codigoActividad></cre:codigoActividad>
                    <cre:horasEstimadas>` + horasEstimadas + `</cre:horasEstimadas>
                  </cre:crearActividadPpmRequest>
                  </soap:Body>
               </soap:Envelope>`;

      console.log(sr);

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let result;
            result = xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue;
            resolve(result);

          }
          else {
            reject(new Error('Error en invocacion'));
          }
        }
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };


  soapinvokeR5ucodesMotivoRep() {

    var self = this;
    this.itemsMotivoReparacion = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/obtenerListaSistemas?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas/LOGEMPObtenerListaSistemasPortType/LOGEMPObtenerListaSistemasOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:obt="http://osbcorp.vtr.cl/LOG/EMP/obtenerListaSistemas">
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
                  <obt:obtenerListaSistemasRequest>
                      <obt:codigoParametro>REPC</obt:codigoParametro>
                  </obt:obtenerListaSistemasRequest>         
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let codSistemas;
            let descSistemas;
            let codSistemasArr;
            let descSistemasArr;
            var i = 0;
            codSistemas = xml.getElementsByTagName("obt:codigoParametro");
            descSistemas = xml.getElementsByTagName("obt:descripcionParametro");

            responseLenght = xml.getElementsByTagName("obt:listas")[0].childNodes.length;

            for (i = 0; i < responseLenght; i++) {

              if (!codSistemas[i].childNodes[0]) {
                console.log('No se inserta nodo por estar vacio');
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };



}
