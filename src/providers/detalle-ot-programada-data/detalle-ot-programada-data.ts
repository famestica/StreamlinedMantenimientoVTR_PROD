import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DetalleOtProgramadaDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DetalleOtProgramadaDataProvider {

  sistemaItems: any = [];
  estadoItems: any = [];
  etapaItems: any = [];
  causaItems: any = [];
  accionItems: any = [];

  constructor(public http: HttpClient) {


  }

  soapinvokeR5ucodesSistemas() {

    var self = this;
    this.sistemaItems = [];
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
                      <obt:codigoParametro>VTRSIS</obt:codigoParametro>
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  soapinvokeR5CierreCorrectivoEtapa(equipo) {

    var self = this;
    this.etapaItems = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/listaValoresCierre?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/listaValoresCierre/LOGEMPListaValoresCierrePortType/LOGEMPListaValoresCierreOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:lis="http://osbcorp.vtr.cl/LOG/EMP/listaValoresCierre">
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
                  <lis:listaValoresCierreRequest>
                    <lis:metodo>ETAPA</lis:metodo>
                    <lis:equipo>`+ equipo + `</lis:equipo>
                    <lis:etapa></lis:etapa>
                    <lis:causa></lis:causa>
                  </lis:listaValoresCierreRequest>      
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let valoresLenght;
            let valorLista;
            let valorListaArr;
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  soapinvokeR5CierreCorrectivoAccion(equipo, etapa, causa) {

    var self = this;
    this.etapaItems = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/listaValoresCierre?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/listaValoresCierre/LOGEMPListaValoresCierrePortType/LOGEMPListaValoresCierreOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:real="http://osbcorp.vtr.cl/STLN/EMP/realizarCierreCorrOt">
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
                  <lis:listaValoresCierreRequest>
                    <lis:metodo>ACCION</lis:metodo>
                    <lis:equipo>`+ equipo + `</lis:equipo>
                    <lis:etapa>`+ etapa + `</lis:etapa>
                    <lis:causa>`+ causa + `</lis:causa>
                  </lis:listaValoresCierreRequest>      
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let valorLista;
            let valoresLenght;
            let valorListaArr;
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  soapinvokeR5CierreCorrectivoCausa(equipo, etapa) {

    var self = this;
    this.etapaItems = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/listaValoresCierre?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/listaValoresCierre/LOGEMPListaValoresCierrePortType/LOGEMPListaValoresCierreOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:real="http://osbcorp.vtr.cl/STLN/EMP/realizarCierreCorrOt">
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
                  <lis:listaValoresCierreRequest>
                    <lis:metodo>CAUSA</lis:metodo>
                    <lis:equipo>`+ equipo + `</lis:equipo>
                    <lis:etapa>`+ etapa + `</lis:etapa>
                    <lis:causa></lis:causa>
                  </lis:listaValoresCierreRequest>      
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let valorLista;
            let valorListaArr;
            let valoresLenght;
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };



  soapinvokeR5authEstados(usuario, estado) {

    var self = this;
    this.estadoItems = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/obtenerAutorizacionEstado?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/authUsers/LOGEMPAuthUsersPortType/LOGEMPAuthUsersOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:aut="http://osbcorp.vtr.cl/LOG/EMP/authUsers">
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
                  <aut:authUsersRequest>
                    <aut:codigoUsuario>` + usuario + `</aut:codigoUsuario>
                    <aut:codigoEstado>` + estado + `</aut:codigoEstado>
                  </aut:authUsersRequest>         
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let codEstado;
            let descEstado;
            let codEstadoArr;
            let descEstadoArr;
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  public soapinvokeR5CrearActividad(codOt, descOt, tipo, depto, codClase, falla, causa, accion) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://osbcorpib.vtr.cl:8000/crearActividad?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/cerrarActividadCorrectiva/LOGEMPCerrarActividadCorrectivaPortType/LOGEMPCerrarActividadCorrectivaOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:cer="http://osbcorp.vtr.cl/LOG/EMP/cerrarActividadCorrectiva">
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
                  <cer:cerrarActividadCorrectivaRequest>
                      <cer:codigoOT>` + codOt + `</cer:codigoOT>
                      <cer:descripcionOT>` + descOt + `</cer:descripcionOT>
                      <cer:tipoActividad>` + tipo + `</cer:tipoActividad>
                      <cer:codigoDepartamento>` + depto + `</cer:codigoDepartamento>
                      <cer:centroCosto>213</cer:centroCosto>
                      <cer:codigoClase>` + codClase + `</cer:codigoClase>
                      <cer:falla>` + falla + `</cer:falla>
                      <cer:causa>` + causa + `</cer:causa>
                      <cer:accion>` + accion + `</cer:accion>
                 </cer:cerrarActividadCorrectivaRequest>
                  </soap:Body>
               </soap:Envelope>`;


      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let result;
            result = parseInt(xml.getElementsByTagName("res:codigoError")[0].childNodes[0].nodeValue);
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
