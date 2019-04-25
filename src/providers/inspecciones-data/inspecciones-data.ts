import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the InspeccionesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InspeccionesDataProvider {

  itemsInspecciones: any = [];
  selectedCategory: any;
  valor: number;
  constructor(public http: HttpClient) {

  }


  //Llamar listado de inspecciones para OTs distintas a PMPE01


  soapinvokeR5ObtenerInspecciones(codOt) {

    var self = this;
    this.itemsInspecciones = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/obtenerInspeccionPpm?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerInspeccionPpm/LOGEMPObtenerInspeccionPpmPortType/LOGEMPObtenerInspeccionPpmOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:obt="http://osbcorp.vtr.cl/LOG/EMP/obtenerInspeccionPpm">
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
                  <obt:obtenerInspeccionPpmRequest>
                    <obt:codigoOT>`+ codOt + `</obt:codigoOT>
                  </obt:obtenerInspeccionPpmRequest>
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;


            let responseLenght;
            let codOT;
            let aspecto;
            let direccion;
            let codEquipo;
            let categoriaEquipo;
            let descEquipo;
            let departamento;
            let metodo;
            let valor;
            let obType;
            let obrType;
            let point;
            let pointType;
            let codOTArr;
            let aspectoArr;
            let direccionArr;
            let codEquipoArr;
            let categoriaEquipoArr;
            let descEquipoArr;
            let departamentoArr;
            let metodoArr;
            let valorArr;
            let obTypeArr;
            let obrTypeArr;
            let pointArr;
            let pointTypeArr;
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
                  aspectoArr = aspecto[i].childNodes[0].nodeValue;
                }
                else {
                  aspectoArr = '';
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };


  //Llamar listado de inspecciones para OTs PMPE01


  soapinvokeR5ObtenerInspeccionesPMPE01(codOt) {

    var self = this;
    this.itemsInspecciones = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/obtenerInspeccionPmpe01?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerInspeccionPmpe01/LOGEMPObtenerInspeccionPmpe01PortType/LOGEMPObtenerInspeccionPmpe01OperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:obt="http://osbcorp.vtr.cl/LOG/EMP/obtenerInspeccionPmpe01">
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
                    <obt:obtenerInspeccionPmpe01Request>
                        <obt:codigoOT>`+ codOt + `</obt:codigoOT>
                    </obt:obtenerInspeccionPmpe01Request>
                    </soap:Body>
                 </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let codOT;
            let organizacion;
            let direccion;
            let codEquipo;
            let categoriaEquipo;
            let descEquipo;
            let departamento;
            let metodo;
            let valor;
            let codOTArr;
            let organizacionArr;
            let direccionArr;
            let codEquipoArr;
            let categoriaEquipoArr;
            let descEquipoArr;
            let departamentoArr;
            let metodoArr;
            let valorArr;
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  soapinvokeR5InsertarInspeccionesPMPE01Coti(codOt, codEquipo, valorMedicion, codTecnico) {

    var self = this;
    this.itemsInspecciones = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/ingresarInspeccion?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion/LOGEMPIngresarInspeccionPortType/LOGEMPIngresarInspeccionOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:ing="http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion">
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
                          <ing:ingresarInspeccionRequest>
                          <ing:codigoSistemaSatelite>SEAM</ing:codigoSistemaSatelite>
                          <ing:codigoOT>`+ codOt + `</ing:codigoOT>
                          <ing:codigoEquipo>`+ codEquipo + `</ing:codigoEquipo>
                          <ing:tipoEquipo>P</ing:tipoEquipo>
                          <ing:tipoEquipoSecundario>P</ing:tipoEquipoSecundario>
                          <ing:puntoInspeccion>1</ing:puntoInspeccion>
                          <ing:tipoInspeccion>METI</ing:tipoInspeccion>
                          <ing:codigoAspecto>COTI</ing:codigoAspecto>
                          <ing:metodo>PMPE01TI</ing:metodo>
                          <ing:valorInspeccion>`+ valorMedicion + `</ing:valorInspeccion>
                          <ing:codigoTecnico>`+ codTecnico + `</ing:codigoTecnico>
                      </ing:ingresarInspeccionRequest>
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

  soapinvokeR5InsertarInspeccionesPMPE01RETI(codOt, codEquipo, valorMedicion, codTecnico) {

    var self = this;
    this.itemsInspecciones = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/ingresarInspeccion?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion/LOGEMPIngresarInspeccionPortType/LOGEMPIngresarInspeccionOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:ing="http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion">
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
                        <ing:ingresarInspeccionRequest>
                          <ing:codigoSistemaSatelite>SEAM</ing:codigoSistemaSatelite>
                          <ing:codigoOT>`+ codOt + `</ing:codigoOT>
                          <ing:codigoEquipo>`+ codEquipo + `</ing:codigoEquipo>
                          <ing:tipoEquipo>P</ing:tipoEquipo>
                          <ing:tipoEquipoSecundario>P</ing:tipoEquipoSecundario>
                          <ing:puntoInspeccion>1</ing:puntoInspeccion>
                          <ing:tipoInspeccion>METI</ing:tipoInspeccion>
                          <ing:codigoAspecto>RETI</ing:codigoAspecto>
                          <ing:metodo>PMPE01TI</ing:metodo>
                          <ing:valorInspeccion>`+ valorMedicion + `</ing:valorInspeccion>
                          <ing:codigoTecnico>`+ codTecnico + `</ing:codigoTecnico>
                      </ing:ingresarInspeccionRequest>
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

  soapinvokeR5InsertarInspecciones(codOt, codEquipo, valorMedicion, codTecnico, obType, obrType, point, pointType, method, aspecto) {

    var self = this;
    this.itemsInspecciones = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/ingresarInspeccion?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion/LOGEMPIngresarInspeccionPortType/LOGEMPIngresarInspeccionOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:ing="http://osbcorp.vtr.cl/LOG/EMP/ingresarInspeccion">
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
                          <ing:ingresarInspeccionRequest>
                          <ing:codigoSistemaSatelite>SEAM</ing:codigoSistemaSatelite>
                          <ing:codigoOT>`+ codOt + `</ing:codigoOT>
                          <ing:codigoEquipo>`+ codEquipo + `</ing:codigoEquipo>
                          <ing:tipoEquipo>`+ obType + `</ing:tipoEquipo>
                          <ing:tipoEquipoSecundario>`+ obrType + `</ing:tipoEquipoSecundario>
                          <ing:puntoInspeccion>`+ point + `</ing:puntoInspeccion>
                          <ing:tipoInspeccion>`+ pointType + `</ing:tipoInspeccion>
                          <ing:codigoAspecto>`+ aspecto + `</ing:codigoAspecto>
                          <ing:metodo>`+ method + `</ing:metodo>
                          <ing:valorInspeccion>`+ valorMedicion + `</ing:valorInspeccion>
                          <ing:codigoTecnico>`+ codTecnico + `</ing:codigoTecnico>
                      </ing:ingresarInspeccionRequest>
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


}
