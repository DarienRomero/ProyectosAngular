import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from "rxjs";
import { AppApp } from "../interfaces/app.interface";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private dbPath = '/app';
    
    public loadingApps = false;
    public errorApps = false;
    public apps: AppApp[] = [];

    public appsStream: Subscription | undefined;

    appsRef: AngularFirestoreCollection<AppApp>;

    public database: AngularFirestore;

    constructor(private db: AngularFirestore) {
        this.database = db;
        this.appsRef = db.collection(this.dbPath);
        this.getApps()
    }

    getApps(){
        this.loadingApps = true;
        this.errorApps = false;
        const query = this.appsRef;
        this.appsStream?.unsubscribe();
        this.appsStream = query.valueChanges().subscribe(data => {
            this.errorApps = false;
            this.loadingApps = false;
            this.apps = data as AppApp[];
        }, error => {
            this.errorApps = true;
            this.loadingApps = false;
        });
    }
    updateApp(app: AppApp){
        return this.appsRef.doc(app.id).update(app);
    }

    deleteApp(app: AppApp){
        return this.appsRef.doc(app.id).delete();
    }
    
}