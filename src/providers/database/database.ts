import { Http } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { ActividadesDataProvider } from '../../providers/actividades-data/actividades-data';
import { ComentariosDataProvider } from '../../providers/comentarios-data/comentarios-data';
import { DetalleOtPreventivaDataProvider } from '../../providers/detalle-ot-preventiva-data/detalle-ot-preventiva-data';
import { DetalleOtProgramadaDataProvider } from '../../providers/detalle-ot-programada-data/detalle-ot-programada-data';
import { InspeccionesDataProvider } from '../../providers/inspecciones-data/inspecciones-data';
import { MaterialesDataProvider } from '../../providers/materiales-data/materiales-data';
import { RotacionDataProvider } from '../../providers/rotacion-data/rotacion-data';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;
  itemsComentarios: any;
  itemsActualizarActividad: any;
  itemsCrearActividad: any;
  itemsOtProgramada: any;
  itemsInspeccionesCoti: any;
  itemsInspeccionesReti: any;
  itemsInspecciones: any;
  itemsCambiarEstadoOt: any;
  itemsMateriales: any;
  itemsRotaciones: any;

  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: Http
    , public actividadesProv: ActividadesDataProvider, public comentariosProv: ComentariosDataProvider, public detalleOtPreventivaProv: DetalleOtPreventivaDataProvider
    , public detalleOtProgramadaProv: DetalleOtProgramadaDataProvider, public inspeccionesProv: InspeccionesDataProvider, public materialesProv: MaterialesDataProvider, public rotacionProv: RotacionDataProvider) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'streamlined.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.storage.get('database_filled').then(val => {
            if (val) {
              this.databaseReady.next(true);
            } else {
              this.createTables();
            }
          });
        });
    });
  }

  addCommentario(codOt, comentario, usuario, linea) {
    let data = [codOt, comentario, usuario, linea]
    return this.database.executeSql("INSERT INTO comentarios (codOt,comentario, usuario, linea) VALUES (?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  addActualizarActividad(codOt, estadoOt, notas, codUsuario, tareas, actComplete, codActividad, horasEstimadas, equipo, tipoOt, descOT) {
    let data = [codOt, estadoOt, notas, codUsuario, tareas, actComplete, codActividad, horasEstimadas, equipo, tipoOt, descOT]
    return this.database.executeSql("INSERT INTO actualizarActividad (codOt,estadoOt, notas, codUsuario, tareas, actComplete, codActividad, horasEstimadas, equipo, tipoOt, descOT) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  addCrearActividad(codOt, estadoOt, notas, codUsuario, tareas, actComplete, horasEstimadas, numActividad, equipo, tipoOt, descOt) {
    let data = [codOt, estadoOt, notas, codUsuario, tareas, actComplete, horasEstimadas, numActividad, equipo, tipoOt, descOt]
    return this.database.executeSql("INSERT INTO crearActividad (codOt,estadoOt, notas, codUsuario, tareas, actComplete, horasEstimadas, numActividad, equipo, tipoOt, descOt) VALUES (?, ?, ?,?,?,?,?,?,?,?,?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  addActualizarOtProgramada(codOt, descOt, tipo, depto, codClase, falla, causa, accion) {
    let data = [codOt, descOt, tipo, depto, codClase, falla, causa, accion]
    return this.database.executeSql("INSERT INTO OtProgramada (codOt,descOt, tipo, depto, codClase, falla, causa, accion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  addInspeccionCoti(codOt, codEquipo, valorMedicion, codTecnico) {
    let data = [codOt, codEquipo, valorMedicion, codTecnico]
    return this.database.executeSql("INSERT INTO inspeccionesCoti (codOt, codEquipo, valorMedicion, codTecnico) VALUES (?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  addInspeccionReti(codOt, codEquipo, valorMedicion, codTecnico) {
    let data = [codOt, codEquipo, valorMedicion, codTecnico]
    return this.database.executeSql("INSERT INTO inspeccionesReti (codOt, codEquipo, valorMedicion, codTecnico) VALUES (?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  addInspeccion(codOt, codEquipo, valorMedicion, codTecnico, obType, obrType, point, pointType, method, aspecto) {
    let data = [codOt, codEquipo, valorMedicion, codTecnico, obType, obrType, point, pointType, method, aspecto]
    return this.database.executeSql("INSERT INTO inspecciones (codOt, codEquipo, valorMedicion, codTecnico, obType, obrType, point, pointType, method, aspecto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  addCambiarEstadoOt(codOt, codAct, estado) {
    let data = [codOt, codAct, estado]
    return this.database.executeSql("INSERT INTO estadosOt (codOt,codAct, estado) VALUES (?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      return err;
    });
  }

  addInsertarMateriales(tipoTrx, almacen, codOt, codAct, codPieza, rutTecnico, cantidad) {
    let data = [tipoTrx, almacen, codOt, codAct, codPieza, rutTecnico, cantidad]
    return this.database.executeSql("INSERT INTO materiales (tipoTrx, almacen, codOt, codAct, codPieza, rutTecnico, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  addInsertarRotacion(equipoNuevo, equipoAntiguo, codOt, estadoEquipo, rutTecnico, descripcion) {
    let data = [equipoNuevo, equipoAntiguo, codOt, estadoEquipo, rutTecnico, descripcion]
    return this.database.executeSql("INSERT INTO rotaciones (equipoNuevo, equipoAntiguo, codOt, estadoEquipo, rutTecnico, descripcion) VALUES (?, ?, ?, ?, ?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getComentarios() {
    return this.database.executeSql("SELECT * FROM comentarios", []).then((data) => {
      let comentarios = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {//ok
          comentarios.push({ codOt: data.rows.item(i).codOt, comentario: data.rows.item(i).comentario, usuario: data.rows.item(i).usuario, linea: data.rows.item(i).linea });
        }
      }
      return comentarios;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getActualizarActividad() {
    return this.database.executeSql("SELECT * FROM actualizarActividad", []).then((data) => {
      let actualizarActividad = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          actualizarActividad.push({ codOt: data.rows.item(i).codOt, estadoOt: data.rows.item(i).estadoOt, notas: data.rows.item(i).notas, codUsuario: data.rows.item(i).codUsuario, tareas: data.rows.item(i).tareas, actComplete: data.rows.item(i).actComplete, codActividad: data.rows.item(i).codActividad, horasEstimadas: data.rows.item(i).horasEstimadas, equipo: data.rows.item(i).equipo, tipoOt: data.rows.item(i).tipoOt, descOT: data.rows.item(i).descOT });
        }
      }
      return actualizarActividad;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getCrearActividad() {
    return this.database.executeSql("SELECT * FROM crearActividad", []).then((data) => {
      let crearActividad = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          crearActividad.push({ codOt: data.rows.item(i).codOt, estadoOt: data.rows.item(i).estadoOt, notas: data.rows.item(i).notas, codUsuario: data.rows.item(i).codUsuario, tareas: data.rows.item(i).tareas, actComplete: data.rows.item(i).actComplete, horasEstimadas: data.rows.item(i).horasEstimadas, numActividad: data.rows.item(i).numActividad, equipo: data.rows.item(i).equipo, tipoOt: data.rows.item(i).tipoOt, descOT: data.rows.item(i).descOT });
        }
      }
      return crearActividad;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getOtProgramada() {
    return this.database.executeSql("SELECT * FROM OtProgramada", []).then((data) => {
      let otProgramada = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          otProgramada.push({ codOt: data.rows.item(i).codOt, descOt: data.rows.item(i).descOt, tipo: data.rows.item(i).tipo, depto: data.rows.item(i).depto, codClase: data.rows.item(i).codClase, falla: data.rows.item(i).falla, causa: data.rows.item(i).causa, accion: data.rows.item(i).accion });
        }
      }
      return otProgramada;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getInspeccionesCoti() {
    return this.database.executeSql("SELECT * FROM inspeccionesCoti", []).then((data) => {
      let inspeccionesCoti = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          inspeccionesCoti.push({ codOt: data.rows.item(i).codOt, codEquipo: data.rows.item(i).codEquipo, valorMedicion: data.rows.item(i).valorMedicion, codTecnico: data.rows.item(i).codTecnico });
        }
      }
      return inspeccionesCoti;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getInspeccionesReti() {
    return this.database.executeSql("SELECT * FROM inspeccionesReti", []).then((data) => {
      let inspeccionesReti = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          inspeccionesReti.push({ codOt: data.rows.item(i).codOt, codEquipo: data.rows.item(i).codEquipo, valorMedicion: data.rows.item(i).valorMedicion, codTecnico: data.rows.item(i).codTecnico });
        }
      }
      return inspeccionesReti;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getInspecciones() {
    return this.database.executeSql("SELECT * FROM inspecciones", []).then((data) => {
      let inspecciones = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          inspecciones.push({ codOt: data.rows.item(i).codOt, codEquipo: data.rows.item(i).codEquipo, valorMedicion: data.rows.item(i).valorMedicion, codTecnico: data.rows.item(i).codTecnico, obType: data.rows.item(i).obType, obrType: data.rows.item(i).obrType, point: data.rows.item(i).point, pointType: data.rows.item(i).pointType, method: data.rows.item(i).method, aspecto: data.rows.item(i).aspecto });
        }
      }
      return inspecciones;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getEstadosOt() {
    return this.database.executeSql("SELECT * FROM estadosOt", []).then((data) => {
      let estadosOt = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          estadosOt.push({ codOt: data.rows.item(i).codOt, codAct: data.rows.item(i).codAct, estado: data.rows.item(i).estado });
        }
      }
      return estadosOt;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getMateriales() {
    return this.database.executeSql("SELECT * FROM materiales", []).then((data) => {
      let materiales = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          materiales.push({ tipoTrx: data.rows.item(i).tipoTrx, almacen: data.rows.item(i).almacen, codOt: data.rows.item(i).codOt, codAct: data.rows.item(i).codAct, codPieza: data.rows.item(i).codPieza, rutTecnico: data.rows.item(i).rutTecnico, cantidad: data.rows.item(i).cantidad });
        }
      }
      return materiales;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getRotaciones() {
    return this.database.executeSql("SELECT * FROM rotaciones", []).then((data) => {
      let rotaciones = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          rotaciones.push({ equipoNuevo: data.rows.item(i).equipoNuevo, equipoAntiguo: data.rows.item(i).equipoAntiguo, codOt: data.rows.item(i).codOt, estadoEquipo: data.rows.item(i).estadoEquipo, rutTecnico: data.rows.item(i).rutTecnico, descripcion: data.rows.item(i).descripcion });
        }
      }
      return rotaciones;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  deleteComentarios() {
    return this.database.executeSql("DELETE FROM comentarios").then(data => {
      console.log('valores de tabla comentarios borrados')
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return err;
    });
  }

  deleteActualizarActividad() {
    return this.database.executeSql("DELETE FROM actualizarActividad").then(data => {
      console.log('valores de tabla actualizarActividad borrados')
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return err;
    });
  }

  deleteCrearActividad() {
    return this.database.executeSql("DELETE FROM crearActividad").then(data => {
      console.log('valores de tabla crearActividad borrados')
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return err;
    });
  }

  deleteOtProgramada() {
    return this.database.executeSql("DELETE FROM OtProgramada").then(data => {
      console.log('valores de tabla OtProgramada borrados')
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return err;
    });
  }

  deleteInspeccionesCoti() {
    return this.database.executeSql("DELETE FROM inspeccionesCoti").then(data => {
      console.log('valores de tabla inspeccionesCoti borrados')
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return err;
    });
  }

  deleteInspeccionesReti() {
    return this.database.executeSql("DELETE FROM inspeccionesReti").then(data => {
      console.log('valores de tabla inspeccionesReti borrados')
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return err;
    });
  }

  deleteInspecciones() {
    return this.database.executeSql("DELETE FROM inspecciones").then(data => {
      console.log('valores de tabla inspecciones borrados')
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return err;
    });
  }

  deleteEstadosOt() {
    return this.database.executeSql("DELETE FROM estadosOt").then(data => {
      console.log('valores de tabla estadosOt borrados')
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return err;
    });
  }

  deleteMateriales() {
    return this.database.executeSql("DELETE FROM materiales").then(data => {
      console.log('valores de tabla materiales borrados')
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return err;
    });
  }

  deleteRotaciones() {
    return this.database.executeSql("DELETE FROM rotaciones").then(data => {
      console.log('valores de tabla rotaciones borrados')
    }, err => {
      console.log('Error: ', JSON.stringify(err));
      return err;
    });
  }



  private createTables() {
    console.log('Creando tabla comentarios');
    return this.database.executeSql(
      'CREATE TABLE IF NOT EXISTS comentarios (id INTEGER PRIMARY KEY AUTOINCREMENT,codOt TEXT,comentario TEXT,usuario TEXT,linea INTEGER);', <any>{}
    )
      .then(() => {
        console.log('Creando tabla actualizarActividad');
        return this.database.executeSql(
          `CREATE TABLE IF NOT EXISTS actualizarActividad (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codOt TEXT,
      estadoOt TEXT,
      notas TEXT,
      codUsuario TEXT,
      tareas TEXT,
      actComplete TEXT,
      codActividad TEXT,
      horasEstimadas TEXT,
      equipo TEXT,
      tipoOt TEXT,
      descOT TEXT
      );` , <any>{})
          .then(() => {
            console.log('Creando tabla crearActividad');
            return this.database.executeSql(
              `CREATE TABLE IF NOT EXISTS crearActividad (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          codOt TEXT,
          estadoOt TEXT,
          notas TEXT,
          codUsuario TEXT,
          tareas TEXT,
          actComplete TEXT,
          horasEstimadas TEXT,
          numActividad TEXT,
          equipo TEXT,
          tipoOt TEXT,
          descOt TEXT
          );` , <any>{})
              .then(() => {
                console.log('Creando tabla OtProgramada');
                return this.database.executeSql(
                  `CREATE TABLE IF NOT EXISTS OtProgramada (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              codOt TEXT,
              descOt TEXT,
              tipo TEXT,
              depto TEXT,
              codClase TEXT,
              falla TEXT,
              causa TEXT,
              accion TEXT
              );` , <any>{})
                  .then(() => {
                    console.log('Creando tabla inspeccionesCoti');
                    return this.database.executeSql(
                      `CREATE TABLE IF NOT EXISTS inspeccionesCoti (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  codOt TEXT,
                  codEquipo TEXT,
                  valorMedicion TEXT,
                  codTecnico TEXT
                  );` , <any>{})
                      .then(() => {
                        console.log('Creando tabla inspeccionesReti');
                        return this.database.executeSql(
                          `CREATE TABLE IF NOT EXISTS inspeccionesReti (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      codOt TEXT,
                      codEquipo TEXT,
                      valorMedicion TEXT,
                      codTecnico TEXT
                      );` , <any>{})
                          .then(() => {
                            console.log('Creando tabla inspecciones');
                            return this.database.executeSql(
                              `CREATE TABLE IF NOT EXISTS inspecciones (
                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                          codOt TEXT,
                          codEquipo TEXT,
                          valorMedicion TEXT,
                          codTecnico TEXT,
                          obType TEXT,
                          obrType TEXT,
                          point TEXT,
                          pointType TEXT,
                          method TEXT,
                          aspecto TEXT
                          );` , <any>{})
                              .then(() => {
                                console.log('Creando tabla estadosOt');
                                return this.database.executeSql(
                                  `CREATE TABLE IF NOT EXISTS estadosOt (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              codOt TEXT,
                              codAct TEXT,
                              estado TEXT
                              );` , <any>{})
                                  .then(() => {
                                    console.log('Creando tabla materiales');
                                    return this.database.executeSql(
                                      `CREATE TABLE IF NOT EXISTS materiales (
                                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                                  tipoTrx TEXT,
                                  almacen TEXT,
                                  codOt TEXT,
                                  codAct TEXT,
                                  codPieza TEXT,
                                  rutTecnico TEXT,
                                  cantidad TEXT
                                  );` , <any>{})
                                      .then(() => {
                                        console.log('Creando tabla rotaciones');
                                        return this.database.executeSql(
                                          `CREATE TABLE IF NOT EXISTS rotaciones (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      equipoNuevo TEXT,
                                      equipoAntiguo TEXT,
                                      codOt TEXT, 
                                      estadoEquipo TEXT,
                                      rutTecnico TEXT, 
                                      descripcion TEXT
                                      );` , <any>{})
                                      }).catch((err) => console.log("Error al crear tabla rotaciones", err.toString()));
                                  }).catch((err) => console.log("Error al crear tabla materiales", err.toString()));
                              }).catch((err) => console.log("Error al crear tabla estadosOt", err.toString()));
                          }).catch((err) => console.log("Error al crear tabla inspecciones", err.toString()));
                      }).catch((err) => console.log("Error al crear tabla inspeccionesReti", err.toString()));
                  }).catch((err) => console.log("Error al crear tabla inspeccionesCoti", err.toString()));
              }).catch((err) => console.log("Error al crear tabla OtProgramada", err.toString()));
          }).catch((err) => console.log("Error al crear tabla crearActividad", err.toString()));
      }).catch((err) => console.log("Error al crear tabla actualizarActividad", err.toString()));
  }


  syncDatabaseToWebServices() {
    console.log('Se sincronizan datos de tabla comentarios a webservice de comentarios');
    var self = this;
    self.getComentarios().then(function (valueComentarios) {
      console.log('Cantidad de valores obtenidos comentarios: ' + valueComentarios.length);
      self.itemsComentarios = valueComentarios;

      if (self.itemsComentarios.length > 0) {
        for (var i = 0; i < self.itemsComentarios.length; i++) {
          console.log('Ejecución de servicio Nro: ' + i);
          self.comentariosProv.soapinvokeR5addetailsinterface(self.itemsComentarios[i].codOt, self.itemsComentarios[i].comentario, self.itemsComentarios[i].usuario, self.itemsComentarios[i].linea);
        }

        console.log('Se procede a borrar tabla comentarios ');
        self.deleteComentarios().then(function (valueComentarios) {


        }, function (reason) {


        });

      }
      //2do servicio
      self.getActualizarActividad().then(function (valueActActividad) {
        console.log('Cantidad de valores obtenidos actualizarActividad: ' + valueActActividad.length);
        self.itemsActualizarActividad = valueActActividad;

        if (self.itemsActualizarActividad.length > 0) {
          for (var i = 0; i < self.itemsActualizarActividad.length; i++) {
            console.log('Ejecución de servicio Nro: ' + i);
            self.actividadesProv.soapinvokeR5EventInterfacePpmUpdate(self.itemsActualizarActividad[i].codOt, self.itemsActualizarActividad[i].estadoOt, self.itemsActualizarActividad[i].notas, self.itemsActualizarActividad[i].codUsuario, self.itemsActualizarActividad[i].tareas, self.itemsActualizarActividad[i].actComplete, self.itemsActualizarActividad[i].codActividad, self.itemsActualizarActividad[i].horasEstimadas, self.itemsActualizarActividad[i].equipo, self.itemsActualizarActividad[i].tipoOt, self.itemsActualizarActividad[i].descOT);
          }

          console.log('Se procede a borrar tabla actualizarActividad ');
          self.deleteActualizarActividad().then(function (valueActActividad) {





          }, function (reason) {


          });

        }
        //3 servicio
        self.getCrearActividad().then(function (valueCrearActividad) {
          console.log('Cantidad de valores obtenidos crearActividad: ' + valueCrearActividad.length);
          self.itemsCrearActividad = valueCrearActividad;

          if (self.itemsCrearActividad.length > 0) {
            for (var i = 0; i < self.itemsCrearActividad.length; i++) {
              console.log('Ejecución de servicio Nro: ' + i);
              self.actividadesProv.soapinvokeR5EventInterfacePpmCreate(self.itemsCrearActividad[i].codOt, self.itemsCrearActividad[i].estadoOt, self.itemsCrearActividad[i].notas, self.itemsCrearActividad[i].codUsuario, self.itemsCrearActividad[i].tareas, self.itemsCrearActividad[i].actComplete, self.itemsCrearActividad[i].horasEstimadas, self.itemsCrearActividad[i].numActividad, self.itemsCrearActividad[i].equipo, self.itemsCrearActividad[i].tipoOt, self.itemsCrearActividad[i].descOT);
            }

            console.log('Se procede a borrar tabla crearActividad ');
            self.deleteCrearActividad().then(function (valueCrearActividad) {






            }, function (reason) {


            });

          }
          //4 servicio
          self.getOtProgramada().then(function (valueOtProgramada) {
            console.log('Cantidad de valores obtenidos OtProgramada: ' + valueOtProgramada.length);
            self.itemsOtProgramada = valueOtProgramada;

            if (self.itemsOtProgramada.length > 0) {
              for (var i = 0; i < self.itemsOtProgramada.length; i++) {
                console.log('Ejecución de servicio Nro: ' + i);
                self.detalleOtProgramadaProv.soapinvokeR5CrearActividad(self.itemsOtProgramada[i].codOt, self.itemsOtProgramada[i].descOt, self.itemsOtProgramada[i].tipo, self.itemsOtProgramada[i].depto, self.itemsOtProgramada[i].codClase, self.itemsOtProgramada[i].falla, self.itemsOtProgramada[i].causa, self.itemsOtProgramada[i].accion);
              }

              console.log('Se procede a borrar tabla OtProgramada ');
              self.deleteOtProgramada().then(function (valueOtProgramada) {





              }, function (reason) {


              });

            }
            //5 servicio
            self.getInspeccionesCoti().then(function (valueInsCoti) {
              console.log('Cantidad de valores obtenidos InspeccionCoti: ' + valueInsCoti.length);
              self.itemsInspeccionesCoti = valueInsCoti;

              if (self.itemsInspeccionesCoti.length > 0) {
                for (var i = 0; i < self.itemsInspeccionesCoti.length; i++) {
                  console.log('Ejecución de servicio Nro: ' + i);
                  self.inspeccionesProv.soapinvokeR5InsertarInspeccionesPMPE01Coti(self.itemsInspeccionesCoti[i].codOt, self.itemsInspeccionesCoti[i].codEquipo, self.itemsInspeccionesCoti[i].valorMedicion, self.itemsInspeccionesCoti[i].codTecnico);
                }

                console.log('Se procede a borrar tabla InspeccionCoti ');
                self.deleteInspeccionesCoti().then(function (valueInsCoti) {





                }, function (reason) {


                });

              }
              //6 servicio
              self.getInspeccionesReti().then(function (valueInsReti) {
                console.log('Cantidad de valores obtenidos InspeccionReti: ' + valueInsReti.length);
                self.itemsInspeccionesReti = valueInsReti;

                if (self.itemsInspeccionesReti.length > 0) {
                  for (var i = 0; i < self.itemsInspeccionesReti.length; i++) {
                    console.log('Ejecución de servicio Nro: ' + i);
                    self.inspeccionesProv.soapinvokeR5InsertarInspeccionesPMPE01RETI(self.itemsInspeccionesReti[i].codOt, self.itemsInspeccionesReti[i].codEquipo, self.itemsInspeccionesReti[i].valorMedicion, self.itemsInspeccionesReti[i].codTecnico);
                  }

                  console.log('Se procede a borrar tabla InspeccionReti ');
                  self.deleteInspeccionesReti().then(function (valueInsReti) {






                  }, function (reason) {


                  });

                }
                //7 servicio
                self.getInspecciones().then(function (valueInspeccion) {
                  console.log('Cantidad de valores obtenidos Inspeccion: ' + valueInspeccion.length);
                  self.itemsInspecciones = valueInspeccion;

                  if (self.itemsInspecciones.length > 0) {
                    for (var i = 0; i < self.itemsInspecciones.length; i++) {
                      console.log('Ejecución de servicio Nro: ' + i);
                      self.inspeccionesProv.soapinvokeR5InsertarInspecciones(self.itemsInspecciones[i].codOt, self.itemsInspecciones[i].codEquipo, self.itemsInspecciones[i].valorMedicion, self.itemsInspecciones[i].codTecnico, self.itemsInspecciones[i].obType, self.itemsInspecciones[i].obrType, self.itemsInspecciones[i].point, self.itemsInspecciones[i].pointType, self.itemsInspecciones[i].method, self.itemsInspecciones[i].aspecto);
                    }

                    console.log('Se procede a borrar tabla Inspeccion ');
                    self.deleteInspecciones().then(function (valueInspeccion) {





                    }, function (reason) {


                    });

                  }
                  //8 servicio
                  self.getEstadosOt().then(function (valueEstadosOt) {
                    console.log('Cantidad de valores obtenidos estadosOt: ' + valueEstadosOt.length);
                    self.itemsCambiarEstadoOt = valueEstadosOt;

                    if (self.itemsCambiarEstadoOt.length > 0) {
                      for (var i = 0; i < self.itemsCambiarEstadoOt.length; i++) {
                        console.log('Ejecución de servicio Nro: ' + i);
                        //   self. .comentariosProv.soapinvokeR5addetailsinterface(self.itemsComentarios[i].codOt,self.itemsComentarios[i].comentario,self.itemsComentarios[i].usuario,self.itemsComentarios[i].linea);
                      }

                      console.log('Se procede a borrar tabla estadosOt ');
                      self.deleteEstadosOt().then(function (valueEstadosOt) {





                      }, function (reason) {


                      });

                    }
                    //9 servicio
                    self.getMateriales().then(function (valueMateriales) {
                      console.log('Cantidad de valores obtenidos materiales: ' + valueMateriales.length);
                      self.itemsMateriales = valueMateriales;

                      if (self.itemsMateriales.length > 0) {
                        for (var i = 0; i < self.itemsMateriales.length; i++) {
                          console.log('Ejecución de servicio Nro: ' + i);
                          self.materialesProv.soapinvokeR5IngresarMateriales(self.itemsMateriales[i].tipoTrx, self.itemsMateriales[i].almacen, self.itemsMateriales[i].codOt, self.itemsMateriales[i].codAct, self.itemsMateriales[i].codPieza, self.itemsMateriales[i].rutTecnico, self.itemsMateriales[i].cantidad);
                        }

                        console.log('Se procede a borrar tabla materiales ');
                        self.deleteMateriales().then(function (valueMateriales) {





                        }, function (reason) {


                        });

                      }
                      //10 servicio
                      self.getRotaciones().then(function (valueRotacion) {
                        console.log('Cantidad de valores obtenidos rotacion: ' + valueRotacion.length);
                        self.itemsRotaciones = valueRotacion;

                        if (self.itemsRotaciones.length > 0) {
                          for (var i = 0; i < self.itemsRotaciones.length; i++) {
                            console.log('Ejecución de servicio Nro: ' + i);
                            self.rotacionProv.soapinvokeR5IngresarRotacion(self.itemsRotaciones[i].equipoNuevo, self.itemsRotaciones[i].equipoAntiguo, self.itemsRotaciones[i].codOt, self.itemsRotaciones[i].estadoEquipo, self.itemsRotaciones[i].rutTecnico, self.itemsRotaciones[i].descripcion);
                          }

                          console.log('Se procede a borrar tabla rotacion ');
                          self.deleteRotaciones().then(function (valueRotacion) {
                            console.log('Tabla borrada correctamente');


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


  }

}
