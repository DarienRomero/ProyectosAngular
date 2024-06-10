import { Component } from '@angular/core';
import { AppApp } from '../../interfaces/app.interface';
import { AppService } from '../../services/app.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotifService } from 'src/app/shared/services/notif.service';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent {
  public appToEdit: AppApp = {
    id: "",
    last_version_link: "",
    last_version_number: 0,
    last_version_string: "",
    logo: "",
    name: "",
    package_name: ""
  };
  public file?: File
  public oldApp: AppApp = {
    id: "",
    last_version_link: "",
    last_version_number: 0,
    last_version_string: "",
    logo: "",
    name: "",
    package_name: ""
  };
  public editing = false;
  constructor(
    private readonly appService: AppService,
    private notifService: NotifService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fileUploadService: FileUploadService
  ){

  }

  ngOnInit(): void {
    this.readCurrentApp();
  }

  readCurrentApp(){
    let id = "";
    this.activatedRoute.params.forEach((params: Params)=>{
      id = params['id']
    });
    if(!Boolean(id.length)){
      this.router.navigateByUrl('');
    }
    this.appService.getAppObs(id).subscribe(data => {
      this.oldApp = data.data() as AppApp;
      this.appToEdit = data.data() as AppApp;
    }, error => {

    })
  }

  onFileSelected(event: Event): void {
    console.log("onFileSelected", event)
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log("file selected", file)
      this.file = file;
      // Handle the file as needed, e.g., upload it to a server, read its content, etc.
    }
  }

  editApp(){
    this.onUploadFile()
  }
  onSendNotification(){
    if(this.appToEdit.last_version_number > this.oldApp.last_version_number){
      this.notifService.sendNotificationToTopic(this.appToEdit);
    }
    this.notifService.sendNotificationToTopic(this.appToEdit);
  }
  onUploadFile(){
    this.editing = true;
    console.log("Start uplading file...", this.file);
    if(this.file){
      this.fileUploadService.uploadFile(this.file, this.appToEdit.id).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              if (event.total) {
                const progress = Math.round((100 * event.loaded) / event.total);
                console.log(`File is ${progress}% uploaded.`);
              }
              break;
            case HttpEventType.Response:
              console.log('File successfully uploaded!', event.body);
              this.appToEdit.last_version_link = event.body.url;
              console.log("this.appToEdit", this.appToEdit, "event.body.url", event.body.url)
              this.onUpdateApp()
              break;
            default:
              console.log('Unhandled event:', event.type);
          }
        },
        (error) => {
          this.editing = false;
          Swal.fire({
            title: 'Ocurrió un error!',
            text: 'El archivo no se pudo subir',
            icon: 'error',
            confirmButtonText: 'Cool'
          })          
          console.error('File upload failed:', error);
        }
      );
    }else{
      console.log("No hay archivo para subir")
      this.onUpdateApp()
    }
  }
  onUpdateApp(){
    this.appService.updateApp(this.appToEdit).then((result) => {
      this.editing = false;
      this.onSendNotification()
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Se actualizó correctamente',
        showConfirmButton: false,
        timer: 5000
      });
      this.router.navigateByUrl("/apps")
    }).catch((err) => {
      
    });
  }
}
