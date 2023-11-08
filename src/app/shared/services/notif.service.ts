import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AppApp } from "src/app/app/interfaces/app.interface";

@Injectable({
    providedIn: "root"
})
export class NotifService {
    private fcmApi: string = "https://fcm.googleapis.com/fcm/send";
    private fcmToken: string = "AAAAUvAG2l0:APA91bEOur1aMLbxT2XZkiWrw0UUTvqoJdyZc71T1hd_Yhiara23x20ROF6DBgUYdTuPTtS06HsgpVsi2efZGoUBLgp01uPzGoJGyVF9jQfc4Jp1csLlaJgMHL-9psA427X_IrXVsKnU";

    constructor(
        private http: HttpClient
    ) {
        
    }
    sendNotificationToTopic(app: AppApp){
        this.http.post(`${ this.fcmApi}`, { 
            "priority": "high",
            "notification": {
                "title": "Estimado usuario",
                "body": `Hay una nueva versión de ${app.name}: ${app.last_version_string}`
            },
            "to": `/topics/${app.id}`
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `key=${this.fcmToken}`
            }
        }).subscribe( resp => {
            console.log("Message sent", resp)
        }, error => {
            console.log("Notification error")
        });
    }
}