import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Imagefile} from "../../models/Imagefile";
import { MediaProvider} from "../../providers/media/media";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginPage} from "../login/login";
import {UploadPage} from "../upload/upload";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imagefile: Imagefile = {
    file_id: 0,
    filename: '',
    filesize: 0,
    title: '',
    description: '',
    user_id: 0,
    media_type: '',
    mime_type: '',
    time_added: ''
  };

  imagefiles: any;
  baseurl = ' http://media.mw.metropolia.fi/wbma/uploads/';
  srcforimage = this.baseurl;

  constructor(public navCtrl: NavController, public mediaProvider: MediaProvider) {

  }

  ngOnInit() {
    if (localStorage.getItem('token') !== null) {
      this.mediaProvider.getUserData().subscribe(response => {
        console.log('Welcome ' + response ['full_name']);
        this.mediaProvider.getNewMediaFiles(0, 10).subscribe(response2 => {
          console.log(response2);
          if (response2 !== undefined || response2 !== null) {
            this.imagefiles = response2;
            /*
            if (this.imagefiles !== null) {
              this.arrayLength = this.imagefiles.length;
              let i = 0;
              for (i = 0; (i < this.arrayLength) && (i < 10); ++i) {
                this.textToPrint += this.imagefiles[i].time_added + ',\n';
              }
              console.log('i: ' + i);
            }*/
          } else if (response2 === null) {
            console.log('null');
          } else {
            console.log('undefined');
          }
        });
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.navCtrl.push(LoginPage);
      });
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  loggingout(){

    localStorage.removeItem('token');
    this.navCtrl.push(LoginPage);
  }

  toUppload(){
    this.navCtrl.push(UploadPage);
  }
}
