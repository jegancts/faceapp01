import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { DialogExample1Component } from '../dialog-example1/dialog-example1.component';

@Component({
  selector: 'app-exampage',
  templateUrl: './exampage.component.html',
  styleUrls: ['./exampage.component.scss']
})
export class ExampageComponent implements OnInit {
  public socket: any
  public statuserr : any
  public pictureTaken = new EventEmitter<WebcamImage>();
  public imagestr: any;
  public showWebcam = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public returnval: string;
  public intervalHandle: any;
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 160 },
    height: { ideal: 120 }
  };
  public width: number = 100;
  public displayname : any;
  public dialogRef : any;
  public dialogRef1 : any;
  public contrl : any;
  public height: number = 100;
  public errors: WebcamInitError[] = [];
  public webcamImage: WebcamImage = null;
  public outimg: string = '';
  private trigger: Subject<void> = new Subject<void>();
  loginResponse: string;

  constructor(private router: Router, private http: HttpClient , public dialog: MatDialog) {
    this.socket = io('http://localhost:5000', { transports: ['polling'] });
  }
  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }).then(() => {
        this.socketcontinue();
        this.postcontinue();
      });
  };
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  };
  public socketcontinue(): void {
    // this.socket.on('image_out', (message) => {
    //   this.outimg = "data:image/png;base64," + message;
    // })
    this.socket.on('freezeMsg', (message) => {
      //console.log('freezeMsg');
      console.log(message);
      console.log("passed the details")

      // alert(message);
      if (message == "freeze") { 
        console.log("passed the detail - freeze");
        
        this.displayname = true;
         document.addEventListener('DOMContentLoaded', function () {
          document.querySelector('button').addEventListener('click', int);      
          });
          function int() {
              document.getElementById('myCheck1').click;
          }
        document.getElementById('myCheck1').click();
        this.dialogRef = this.dialog.open(DialogExampleComponent,{
          width: '500px', height: '150px',
          panelClass: 'custom-modalbox'
         

        });
      
      }

      if (message == "unfreeze") { 
        this.displayname = false;
        if (this.contrl == "automatic") {this.dialogRef1.close();
          this.contrl ="notautomatic";
         }
        else { this.dialogRef.close(); }
        console.log("passed the detail - unfreeze");
       // this.dialogRef.close();
       
       // this.dialog.open(DialogExample1Component);
       
        document.addEventListener('DOMContentLoaded', function () {
          document.querySelector('button').addEventListener('click', int);      
          });
          function int() {
              document.getElementById('myCheck2').click;
          }

        document.getElementById('myCheck2').click();
        // this.dialog.close(DialogExampleComponent);
      } 
    })
    this.intervalHandle = setInterval(() => {
      this.trigger.next();
      this.socket.emit('image', this.webcamImage.imageAsBase64);
    }, 40);
  };
  public postcontinue(): void {
    this.intervalHandle =
      setInterval(() => {
        this.trigger.next();
        let headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
        this.http.post("http://localhost:5000/videoRecording", { img: this.webcamImage.imageAsBase64 }, { headers }).subscribe((res: any) => {
          console.log(res);
          
          if (res.error == "NoPerson") { 
            
          console.log("no person detected");
          this.displayname = true;
          document.addEventListener('DOMContentLoaded', function () {
           document.querySelector('button').addEventListener('click', int);      
           });
           function int() {
               document.getElementById('myCheck1').click;
           }
         document.getElementById('myCheck1').click();
         this.contrl ="notautomatic";
          this.dialogRef1 = this.dialog.open(DialogExampleComponent);
          this.contrl ="automatic";
         // alert("no person detected");
        }
          if (res.error == "ManyPerson") { console.log("Many person detected");
          alert("many person detected");}
          
        })
      }, 125); // currently interval is set for every 5 seconds.
  };
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  };
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  };
  completeExam() {
    console.log('in the complete')
    clearInterval(this.intervalHandle);
    this.trigger.next();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post("http://localhost:5000/videoRecordingClose", { img: this.webcamImage.imageAsBase64 }, {headers }).subscribe((res:any) => {
    this.loginResponse = JSON.stringify(res)
    //alert(this.loginResponse);
    console.log(res);
    });

    this.socket.emit('disconnect');
    this.socket.disconnect();

    this.router.navigate(['examcomplete']);
  };

}
