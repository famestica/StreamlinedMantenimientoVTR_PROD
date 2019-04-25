import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MaterialesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MaterialesDataProvider {

  items: any = [];
  listadoAlmacen: any = [];
  tipotransaccion: any;
  constructor(public http: HttpClient) {


    this.tipotransaccion = [
      { tipotransaccion: 'DESPACHO' },
      { tipotransaccion: 'DEVOLUCION' }]
  }
  filterItemsOt(OtParam) {
    return this.items.filter((item) => {
      return item.almacen.toLowerCase().
        indexOf(OtParam.toLowerCase()) > -1
    });
  }

  soapinvokeR5ObtenerMateriales(rutTecnico, almacen) {

    var self = this;
    this.items = [];
    return new Promise(function (resolve, reject) {

      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://172.17.226.23:8000/obtenerMaterial?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/obtenerMaterial/LOGEMPObtenerMaterialPortType/LOGEMPObtenerMaterialOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:obt="http://osbcorp.vtr.cl/LOG/EMP/obtenerMaterial">
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
                  <obt:obtenerMaterialRequest>
                    <obt:codigoTecnico>`+ rutTecnico + `</obt:codigoTecnico>
                  </obt:obtenerMaterialRequest>
                  </soap:Body>
               </soap:Envelope>`;

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            var xml = xmlhttp.responseXML;

            let responseLenght;
            let codigoPieza;
            let stockPieza;
            let materialFull;
            let descPiezaArr;
            let codigoPiezaArr;
            let stockPiezaArr;
            var i = 0;
            codigoPieza = xml.getElementsByTagName("obt:codigoPieza");
            stockPieza = xml.getElementsByTagName("obt:stockPieza");

            responseLenght = xml.getElementsByTagName("obt:materiales")[0].childNodes.length;

            for (i = 0; i < responseLenght; i++) {

              if (!codigoPieza[i].childNodes[0]) {
                console.log('No se inserta nodo por estar vacio');
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
      }
      xmlhttp.onerror = function () {
        reject(new Error('Error en invocacion'));
      };

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);


    });
  };

  public soapinvokeR5IngresarMateriales(tipoTrx, almacen, codOt, codAct, codPieza, rutTecnico, cantidad) {
    return new Promise(function (resolve, reject) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'http://172.17.226.23:8000/instalarMateriales?wsdl', true);
      xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
      xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
      xmlhttp.setRequestHeader("Access-Control-Allow-Headers", "...All Headers...");
      xmlhttp.setRequestHeader('Content-Type', 'text/xml charset=UTF-8');
      xmlhttp.setRequestHeader("SOAPAction", "http://osbcorp.vtr.cl/LOG/EMP/instalarMateriales/LOGEMPInstalarMaterialesPortType/LOGEMPInstalarMaterialesOperationRequest");


      var sr =
        `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:head="http://osbcorp.vtr.cl/GLOBAL/EMP/HeaderRequest" xmlns:ins="http://osbcorp.vtr.cl/LOG/EMP/instalarMateriales">
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
                      <ins:instalarMaterialesRequest>
                      <ins:tipoTransaccion>` + tipoTrx + `</ins:tipoTransaccion>
                      <ins:almacen>` + almacen + `</ins:almacen>
                      <ins:codigoOT>` + codOt + `</ins:codigoOT>
                      <ins:pieza>` + codPieza + `</ins:pieza>
                      <ins:codigoActividad>` + codAct + `</ins:codigoActividad>
                      <ins:rut>` + rutTecnico + `</ins:rut>
                      <ins:cantidad>` + cantidad + `</ins:cantidad>
                  </ins:instalarMaterialesRequest>
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

  filterAlmacen() {
    return this.listadoAlmacen;
  }

  filterTipoTransaccion() {
    return this.tipotransaccion;
  }

  filterMatByAlmacen(almacen) {
    return this.items.filter((item) => {
      return item.almacen.toLowerCase().
        indexOf(almacen.toLowerCase()) > -1
    });
  }

  filterMatByPieza(pieza) {
    return this.items.filter((item) => {
      return item.pieza.toLowerCase().
        indexOf(pieza.toLowerCase()) > -1
    });
  }
}
