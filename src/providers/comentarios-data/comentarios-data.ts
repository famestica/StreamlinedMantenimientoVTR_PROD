import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ComentariosDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ComentariosDataProvider {

  itemsComentarios: any = [];

  constructor(public http: HttpClient) {

  }



  public soapinvokeR5countaddetails(codOt) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/contadorComentarios?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/contadorComentarios/LOGEMPContadorComentariosPortType/LOGEMPContadorComentariosOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:con="http://osbcorp.vtr.cl/LOG/EMP/contadorComentarios">
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
                  <con:contadorComentariosRequest>
                    <con:codigoEntidad>EVNT</con:codigoEntidad>
                    <con:codigoOT>` + codOt + `</con:codigoOT>
                 </con:contadorComentariosRequest>
                  </soap:Body>
               </soap:Envelope>`;

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let result;
            let resultCheck;
            let resultCount;
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  public soapinvokeR5addetailsinterface(codOt, comentario, usuario, linea) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/ingresarComentario?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/STLN/EMP/ingresarComentario/STLNEMPIngresarComentarioPortType/STLNEMPIngresarComentarioOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:ing="http://osbcorp.vtr.cl/LOG/EMP/ingresarComentario">
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
                  <ing:ingresarComentarioRequest>
                    <ing:sistemaSatelite>SEAM</ing:sistemaSatelite>
                    <ing:codigoSatelite>` + codOt + `</ing:codigoSatelite>
                    <ing:idOrganizacion></ing:idOrganizacion>
                    <ing:grupo></ing:grupo>
                    <ing:codigoTransaccion></ing:codigoTransaccion>
                    <ing:tipo>A</ing:tipo>
                    <ing:numeroSesion></ing:numeroSesion>
                    <ing:idUsuario>` + usuario + `</ing:idUsuario>
                    <ing:codigoOrganizacion>VTR</ing:codigoOrganizacion>
                    <ing:codigoOt>` + codOt + `</ing:codigoOt>
                    <ing:entidad>EVNT</ing:entidad>
                    <ing:tipoOt>*</ing:tipoOt>
                    <ing:lenguaje>ES</ing:lenguaje>
                    <ing:linea>` + linea + `</ing:linea>
                    <ing:comentario>` + comentario + `</ing:comentario>
                    <ing:codigoAdi></ing:codigoAdi>
                    <ing:organizacionAdi></ing:organizacionAdi>
                    <ing:codigoEv>` + codOt + `</ing:codigoEv>
                  </ing:ingresarComentarioRequest>

                  </soap:Body>
               </soap:Envelope>`;


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

  soapinvokeR5ObtenerComentarios(codOt) {

    var self = this;
    this.itemsComentarios = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/obtenerListadoComentarios?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerListadoComentarios/LOGEMPObtenerListadoComentariosPortType/LOGEMPObtenerListadoComentariosOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:obt="http://osbcorp.vtr.cl/LOG/EMP/obtenerListadoComentarios">
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
                  <obt:obtenerListadoComentariosRequest>
                      <obt:codigoOT>`+ codOt + `</obt:codigoOT>
                  </obt:obtenerListadoComentariosRequest>
                  </soap:Body>
               </soap:Envelope>`;

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let linea;
            let texto;
            let username;
            let fechaComentario;
            let lineaArr;
            let textoArr;
            let usernameArr;
            let fechaComentarioArr;

            var i = 0;
            linea = xml.getElementsByTagName("obt:linea");
            texto = xml.getElementsByTagName("obt:texto");
            username = xml.getElementsByTagName("obt:username");
            fechaComentario = xml.getElementsByTagName("obt:fechaComentario");

            responseLenght = xml.getElementsByTagName("obt:comentarios")[0].childNodes.length;

            for (i = 0; i < responseLenght; i++) {

              if (!linea[i].childNodes[0]) {
                console.log('No se inserta nodo por estar vacio');
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };


}
