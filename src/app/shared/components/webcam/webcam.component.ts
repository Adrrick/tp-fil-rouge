import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {
  WebcamImage,
  WebcamInitError,
  WebcamModule,
  WebcamUtil,
} from 'ngx-webcam';
import { getFileFromBase64 } from '../../function/get-file-from-b64.function';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'tp-fil-rouge-webcam',
  standalone: true,
  imports: [CommonModule, FormsModule, WebcamModule, MatDialogModule, MatIconModule],
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
})
export class WebcamComponent {
  // toggle webcam on/off
  public showWebcam = true;

  public allowCameraSwitch = true;

  public multipleWebcamsAvailable = false;

  public deviceId!: string;

  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 1024 },
    height: { ideal: 576 },
  };

  public errors: WebcamInitError[] = [];

  public photoURL!: string;

  public file?: File;

  public webcamImage?: WebcamImage;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
    this.photoURL = '';
    if(this.webcamImage) {
      delete this.webcamImage;
    }
    if(this.file) {
      delete this.file;
    }
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  async handleImage(webcamImage: WebcamImage) {

    this.webcamImage = webcamImage;
    this.file = await getFileFromBase64(webcamImage.imageAsDataUrl, 'image/jpeg');
    console.log('f', this.file);
    

    const reader = new FileReader();

    reader.onload = () => {
      this.photoURL = reader.result as string;
    };

    reader.readAsDataURL(this.file);
    return this.showWebcam = false;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
