import { Component } from '@angular/core';
import { AppApp } from '../../interfaces/app.interface';
import { AppService } from '../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.css']
})
export class CreateAppComponent {
  public appToCreate: AppApp = {
    id: "",
    last_version_link: "",
    last_version_number: 0,
    last_version_string: "",
    logo: "",
    name: "",
    package_name: ""
  };
  public password = "";
  public creating = false
  public uploadingFile = false
  public file?: File
  constructor(
    private readonly appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fileUploadService: FileUploadService
  ){

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.file = file;
      // Handle the file as needed, e.g., upload it to a server, read its content, etc.
    }
  }

  onUploadFile(appId: string){
    this.uploadingFile = true;
    this.fileUploadService.uploadFile(this.file!, appId).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              const progress = Math.round((100 * event.loaded) / event.total);
            }
            break;
          case HttpEventType.Response:
            this.appToCreate.last_version_link = event.body.url;
            this.onUpdateApp()
            break;
          default:
        }
      },
      (error) => {
        this.creating = false;
        this.uploadingFile = false
        Swal.fire({
          title: 'Ocurrió un error!',
          text: 'El archivo no se pudo subir, pero el app se subió correctamente. Para subir el archivo, vaya a editar app',
          icon: 'error',
          confirmButtonText: 'Cool',
          timer: 10000
        })          
        this.router.navigateByUrl("/apps")
      }
    );
  }

  async onCreateApp() {
    try {
      this.creating = true
      const newAppId = await this.appService.createApp(this.appToCreate);
      this.appToCreate.id = newAppId;
      this.onUploadFile(newAppId);
    } catch (error) {
      this.creating = false
      Swal.fire({
        title: 'Ocurrió un error!',
        text: 'La aplicación no pudo ser creada',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      this.router.navigateByUrl("/apps")
    }
  }

  onUpdateApp(){
    this.uploadingFile = false
    this.appService.updateApp(this.appToCreate).then((result) => {
      this.creating = false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        text: 'Se creó correctamente',
        showConfirmButton: false,
        timer: 5000
      });
      this.router.navigateByUrl("/apps")
    }).catch((err) => {
      
    });
  }

}
