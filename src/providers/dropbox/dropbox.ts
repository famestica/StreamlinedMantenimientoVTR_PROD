import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DropboxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DropboxProvider {

  accessToken: any;
  folderHistory: any = [];
  items: any = [];


  constructor(public http: Http) {
  }

  setAccessToken(token) {
    this.accessToken = token;
  }

  getUserInfo() {

    let headers = new Headers();

    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.post('https://api.dropboxapi.com/2-beta-2/users/get_current_account', "null", { headers: headers })
      .map(res => res.blob());


  }

  uploadFile(data, nombreArchivo) {

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/octet-stream');
    headers.append('Dropbox-API-Arg', '{"path":"/SEAM/' + nombreArchivo + '"}');


    return new Promise(resolve => {
      this.http.post('https://content.dropboxapi.com/2/files/upload', data, { headers: headers }).subscribe(data => {
        resolve(JSON.stringify(data));
      },
        error => {
        }
      );
    });
  }

  getPublicUrl(nombreArchivo) {
    let headers = new Headers();
    let data: any;
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json');
    data = { "path": "/SEAM/" + nombreArchivo + "", "settings": { "requested_visibility": "public" } }

    return new Promise(resolve => {
      this.http.post('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', data, { headers: headers }).subscribe(datos => {
        resolve(datos['_body']);
      },
        error => {
        }
      );
    });

  }

  getFolders(path?) {

    let headers = new Headers();

    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json');

    let folderPath;

    if (typeof (path) == "undefined" || !path) {

      folderPath = {
        path: ""
      };

    } else {

      folderPath = {
        path: path
      };

      if (this.folderHistory[this.folderHistory.length - 1] != path) {
        this.folderHistory.push(path);
      }

    }

    return this.http.post('https://api.dropboxapi.com/2-beta-2/files/list_folder', JSON.stringify(folderPath), { headers: headers })
      .map(res => res.json());

  }

  goBackFolder() {
    if (this.folderHistory.length > 0) {

      this.folderHistory.pop();
      let path = this.folderHistory[this.folderHistory.length - 1];

      return this.getFolders(path);
    }
    else {
      return this.getFolders();
    }

  }

}
