import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import moment from 'moment';
moment.locale('es-CL');

/*
  Generated class for the MainDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainDataProvider {

  items: any = [];
  r5personel: any = [];
  constructor(public http: HttpClient) {

  }

  soapinvokeR5Personel(username) {

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


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:obt="http://osbcorp.vtr.cl/LOG/EMP/obtenerDescTecnico">
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
                     <obt:obtenerDescTecnicoRequest>
                        <obt:codigoTecnico>` + username + `</obt:codigoTecnico>
                     </obt:obtenerDescTecnicoRequest>
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let codTecnico;
            let responseLenght;
            let descTecnico;
            let claseTecnico;
            let deptTecnico;
            let codigoOcupTecnico;
            let codigoOrgTecnico;
            let numTelefonicoTecnico;
            let rutTecnico;
            let almacenTecnico;
            let codTecnicoArr;
            let descTecnicoArr;
            let claseTecnicoArr;
            let deptTecnicoArr;
            let codigoOcupTecnicoArr;
            let codigoOrgTecnicoArr;
            let numTelefonicoTecnicoArr;
            let rutTecnicoArr;
            let almacenTecnicoArr;
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
            reject(new Error('Error en invocacion'));//
          }
        }
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));//
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  public soapinvokeR5actudfchar01Pausar(codOt, codAct) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://seam.vtr.cl/pausarOT?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/pausarOT/LOGEMPPausarOTPortType/LOGEMPPausarOTOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:paus="http://osbcorp.vtr.cl/LOG/EMP/pausarOT">
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
                  <paus:pausarOTRequest>
                      <paus:codigoOt>` + codOt + `</paus:codigoOt>
                      <paus:codigoActividad>` + codAct + `</paus:codigoActividad>
                      <paus:flagPausarOt>+</paus:flagPausarOt>
                  </paus:pausarOTRequest>
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

  public soapinvokeR5countaddetails(codOt) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://seam.vtr.cl/contadorComentarios?wsdl', true);
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

  public soapinvokeR5actudfchar01Iniciar(codOt, codAct) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://seam.vtr.cl/pausarOT?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/pausarOT/LOGEMPPausarOTPortType/LOGEMPPausarOTOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:paus="http://osbcorp.vtr.cl/LOG/EMP/pausarOT">
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
                  <paus:pausarOTRequest>
                      <paus:codigoOt>` + codOt + `</paus:codigoOt>
                      <paus:codigoActividad>` + codAct + `</paus:codigoActividad>
                      <paus:flagPausarOt>-</paus:flagPausarOt>
                  </paus:pausarOTRequest>
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

  public soapinvokeR5addetailsinterface(codOt, comentario, usuario, linea) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://seam.vtr.cl/ingresarComentario?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/ingresarComentario/LOGEMPIngresarComentarioPortType/LOGEMPIngresarComentarioOperationRequest");


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

  soapinvokeR5ListaAct(username) {

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


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:obt="http://osbcorp.vtr.cl/LOG/EMP/obtenerListadoActividades">
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
                    <obt:obtenerListadoActividadesRequest>
                          <obt:codigoTecnico>` + username + `</obt:codigoTecnico>
                    </obt:obtenerListadoActividadesRequest>
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let codOT;
            let codEquipo;
            let codTipo;
            let descOt;
            let codTarea;
            let flagCompletado;
            let codEstadoOt;
            let codAct;
            let dateOt;
            let descTarea;
            let tipoOt;
            let codDepto;
            let claseSistema;
            let direccionEquipoOt;
            let codOTArr;
            let flagActIniciada;
            let descActividad;
            let prioridadAct;
            let codEquipoArr;
            let codTipoArr;
            let descOtArr;
            let codTareaArr;
            let codDeptoArr;
            let claseSistemaArr;
            let flagCompletadoArr;
            let codEstadoOtArr;
            let codActArr;
            let dateOtArr;
            let descTareaArr;
            let tipoOtArr;
            let direccionEquipoOtArr;
            let flagActIniciadaArr;
            let descActividadArr;
            let prioridadArr;
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
                  codTipoArr = codTipo[i].childNodes[0].nodeValue;//
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
                    flagCompletadoArr = 'Completado'
                  }
                  else {
                    flagCompletadoArr = 'Incompleto'
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
                    flagActIniciadaArr = 'Iniciada'
                  }
                  else {
                    flagActIniciadaArr = 'Pausada'
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));//
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };


  filterItemsFechaDesde(fechaDesdeParam) {
    return this.items.filter((item) => {
      return moment(item.fecha, "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate() >= moment(fechaDesdeParam, "YYYY-MM-DD 0:00:00").locale('es-CL').toDate();
    });

  }

  filterItemsFechaFin(fechaFinParam) {
    return this.items.filter((item) => {
      return moment(item.fecha, "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate() <= moment(fechaFinParam + " " + "23:59", "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate();
    });

  }

  filterItemsFechaDesdeFechaFin(fechaDesdeParam, fechaFinParam) {

    return this.items.filter((item) => {
      return moment(item.fecha, "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate() >= moment(fechaDesdeParam, "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate() &&
        moment(item.fecha, "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate() <= moment(fechaFinParam + " " + "23:59", "YYYY-MM-DD HH:mm:ss").locale('es-CL').toDate();
    });

  }

  getItems() {
    return this.items;

  }

  clearArrays() {
    this.r5personel = [];
    this.items = [];
  }

}
