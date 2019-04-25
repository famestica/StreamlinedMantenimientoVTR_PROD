import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RotacionDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RotacionDataProvider {

  itemsEquipoNuevo: any = [];
  itemsEquipoAntiguo: any = [];
  estadosEquipo: any;

  constructor(public http: HttpClient) {

    this.estadosEquipo = [
      { estadoequipo: 'BUENO' },
      { estadoequipo: 'DANADO' },
      { estadoequipo: 'PERDIDO' }]

  }

  public soapinvokeR5IngresarRotacion(equipoAntiguo, equipoNuevo, codOt, estadoEquipo, rutTecnico, descripcion) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://172.17.226.23:8000/ingresarRotacion?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/ingresarRotacion/LOGEMPIngresarRotacionPortType/LOGEMPIngresarRotacionOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:ing="http://osbcorp.vtr.cl/LOG/EMP/ingresarRotacion">
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
                  <ing:ingresarRotacionRequest>
                    <ing:codigoEquipoNuevo>` + equipoNuevo + `</ing:codigoEquipoNuevo>
                    <ing:codigoOt>` + codOt + `</ing:codigoOt>
                    <ing:codigoEquipoAntiguo>` + equipoAntiguo + `</ing:codigoEquipoAntiguo>
                    <ing:estadoEquipo>` + estadoEquipo + `</ing:estadoEquipo>
                    <ing:rutTecnico>` + rutTecnico + `</ing:rutTecnico>
                    <ing:descripcion>` + descripcion + `</ing:descripcion>
                  </ing:ingresarRotacionRequest>
                  </soap:Body>
               </soap:Envelope>`;

      console.log(sr);


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;
            console.log(xml);
            let result;
            result = xml.getElementsByTagName("res:mensaje")[0].childNodes[0].nodeValue;
            console.log(result);
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

  soapinvokeR5ObjAntiguo(codOt) {

    var self = this;
    this.itemsEquipoAntiguo = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://172.17.226.23:8000/obtenerObjetoOriginal?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerObjetoOriginal/LOGEMPObtenerObjetoOriginalPortType/LOGEMPObtenerObjetoOriginalOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:obt="http://osbcorp.vtr.cl/LOG/EMP/obtenerObjetoOriginal">
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
                  <obt:obtenerObjetoOriginalRequest>
                      <obt:codigoOT>` + codOt + `</obt:codigoOT>
                  </obt:obtenerObjetoOriginalRequest>
                  </soap:Body>
               </soap:Envelope>`;

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let codEquipo;
            let descEquipo;
            let claseEquipo;
            let catEquipo;
            let codEquipoArr;
            let descEquipoArr;
            let claseEquipoArr;
            let catEquipoArr;
            var i = 0;
            codEquipo = xml.getElementsByTagName("obt:codigoEquipo");
            descEquipo = xml.getElementsByTagName("obt:descripcionEquipo");
            claseEquipo = xml.getElementsByTagName("obt:claseEquipo");
            catEquipo = xml.getElementsByTagName("obt:categoriaEquipo");

            responseLenght = xml.getElementsByTagName("obt:equipos")[0].childNodes.length;

            for (i = 0; i < responseLenght; i++) {

              if (!codEquipo[i].childNodes[0]) {
                console.log('No se inserta nodo por estar vacio');
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  soapinvokeR5ObjNuevo(ruttecnico, almacen) {

    var self = this;
    this.itemsEquipoNuevo = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://172.17.226.23:8000/obtenerObjetoNuevo?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerObjetoNuevo/LOGEMPObtenerObjetoNuevoPortType/LOGEMPObtenerObjetoNuevoOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:obt="http://osbcorp.vtr.cl/LOG/EMP/obtenerObjetoNuevo">
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
                  <obt:obtenerObjetoNuevoRequest>
                      <obt:codigoAlmacen>` + almacen + `</obt:codigoAlmacen>
                      <obt:codigoTecnico>` + ruttecnico + `</obt:codigoTecnico>
                  </obt:obtenerObjetoNuevoRequest>
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let codTecnico;
            let codSeriado;
            let codEquipo;
            let descEquipo;
            let codTecnicoArr;
            let codSeriadoArr;
            let codEquipoArr;
            let descEquipoArr;
            var i = 0;
            codTecnico = xml.getElementsByTagName("obt:codigoTecnico");
            codSeriado = xml.getElementsByTagName("obt:codigoSeriado");
            codEquipo = xml.getElementsByTagName("obt:codigoEquipo");
            descEquipo = xml.getElementsByTagName("obt:descripcionEquipo");

            responseLenght = xml.getElementsByTagName("obt:equipos")[0].childNodes.length;

            for (i = 0; i < responseLenght; i++) {

              if (!codTecnico[i].childNodes[0]) {
                console.log('No se inserta nodo por estar vacio');
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  filterEstadosEquipo() {
    return this.estadosEquipo;
  }

}
