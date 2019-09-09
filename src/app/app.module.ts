import { AuthService } from '../providers/auth-service/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MainDataProvider } from '../providers/main-data/main-data';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { MainPage } from '../pages/main/main';
import { OtdetallePage } from '../pages/otdetalle/otdetalle';
import { MaterialesDataProvider } from '../providers/materiales-data/materiales-data';
import { OtdetallepreventivaPage } from '../pages/otdetallepreventiva/otdetallepreventiva';
import { OtcrearactividadnuevaPage } from '../pages/otcrearactividadnueva/otcrearactividadnueva';
import { OtcrearmaterialesPage } from '../pages/otcrearmateriales/otcrearmateriales';
import { InspeccionesDataProvider } from '../providers/inspecciones-data/inspecciones-data';
import { OtinspeccionesPage } from '../pages/otinspecciones/otinspecciones';
import { OtcrearactividadesPage } from '../pages/otcrearactividades/otcrearactividades';
import { ActividadesDataProvider } from '../providers/actividades-data/actividades-data';
import { RotacionDataProvider } from '../providers/rotacion-data/rotacion-data';
import { OtrotacionesPage } from '../pages/otrotaciones/otrotaciones';
import { OtagregarcomentarioPage } from '../pages/otagregarcomentario/otagregarcomentario';
import { ComentariosPage } from '../pages/comentarios/comentarios';
import { ComentariosDataProvider } from '../providers/comentarios-data/comentarios-data';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { DetalleOtPreventivaDataProvider } from '../providers/detalle-ot-preventiva-data/detalle-ot-preventiva-data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetalleOtProgramadaDataProvider } from '../providers/detalle-ot-programada-data/detalle-ot-programada-data';
import { MSAdal } from '@ionic-native/ms-adal';
import { DatabaseProvider } from '../providers/database/database';
import { IonicStorageModule } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite } from '@ionic-native/sqlite';
import { DropboxProvider } from '../providers/dropbox/dropbox';
import { Base64 } from '@ionic-native/base64';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MainPage,
    OtdetallePage,
    OtcrearmaterialesPage,
    OtinspeccionesPage,
    OtcrearactividadesPage,
    OtrotacionesPage,
    OtdetallepreventivaPage,
    ComentariosPage,
    OtcrearactividadnuevaPage,
    OtagregarcomentarioPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpModule,
    SelectSearchableModule,
    IonicSelectableModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, { mode: 'md' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MainPage,
    OtdetallePage,
    OtcrearmaterialesPage,
    OtinspeccionesPage,
    OtcrearactividadesPage,
    OtrotacionesPage,
    OtdetallepreventivaPage,
    ComentariosPage,
    OtcrearactividadnuevaPage,
    OtagregarcomentarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    MainDataProvider,
    MaterialesDataProvider,
    LocationAccuracy,
    Diagnostic,
    Geolocation,
    InspeccionesDataProvider,
    ActividadesDataProvider,
    RotacionDataProvider,
    Camera,
    BarcodeScanner,
    ComentariosDataProvider,
    SpeechRecognition,
    DetalleOtPreventivaDataProvider,
    DetalleOtProgramadaDataProvider,
    MSAdal,
    Network,
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    DropboxProvider,
    Base64
  ]
})
export class AppModule {}
