import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from "rxjs";
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

    public perPage = 8;
    public page = 1;
    public pageChangeSubject: Subject<number> = new Subject<number>();
    public startAfterList: DocumentSnapshot<AppApp>[] = [];
    public snapshotSubscription?: Subscription;

    constructor(private db: AngularFirestore) {
        this.database = db;
        this.startAfterList = [];
        this.appsRef = db.collection(this.dbPath);
        this.pageChangeSubject.subscribe(page => {
            this.page = page;
            this.getApps(this.perPage);
        })
    }

    onReset(){
        this.startAfterList = []
        this.page = 1;
    }

    onStart(){
        this.getApps(this.perPage)
    }

    getApps(perPage: number){
        this.loadingApps = true;
        this.errorApps = false;
        const query = this.database.collection(this.dbPath, ref => {
            let q = ref.orderBy('name').limit(perPage)
            const lastStartAfter = this.startAfterList.at(-1);
            if(lastStartAfter){
                q = q.startAfter(lastStartAfter)
            }
            return q;
        })
        this.appsStream?.unsubscribe();
        this.appsStream = query.valueChanges().subscribe({
            next: (data) => {
                this.apps = data as AppApp[];
                if(this.apps.length > 0){
                    this.snapshotSubscription = this.appsRef.doc(this.apps[this.apps.length - 1].id).get().subscribe({
                        next: (data) => {
                            // @ts-ignore:next-line
                            this.errorApps = false;
                            this.loadingApps = false;
                            if(!this.startAfterList.at(this.page - 1)){
                                // @ts-ignore:next-line
                                this.startAfterList.push(data);
                            }
                            this.snapshotSubscription?.unsubscribe();
                        }
                    })
                }else{
                    this.errorApps = false;
                    this.loadingApps = false;
                    this.snapshotSubscription?.unsubscribe();
                }
            },
            error: (e) => {
                this.errorApps = true;
                this.loadingApps = false;
            },
            complete: () => console.info('complete') 
        })
    }

    /************ READ ALL APPS********/

    public allAppsLoading = false;
    public allAppsError = false;
    public allApps: AppApp[] = [];
    public allAppsSubscription?: Subscription;
    readAllApps(){
        if(this.allAppsSubscription) return;
        this.allAppsError = false;
        this.allAppsLoading = true;
        this.allAppsSubscription = this.database.collection<AppApp[]>(this.dbPath).valueChanges().subscribe({
            next: (values) => {
                this.allAppsError = false;
                this.allAppsLoading = false;
                // @ts-ignore:next-line
                this.allApps = values
            },
            error: (error) => {
                this.allAppsError = true;
                this.allAppsLoading = false;
            }
        }); 
    }

    getAppObs(appId: string) {
        return this.appsRef.doc(appId).get();
    }

    updateApp(app: AppApp){
        return this.appsRef.doc(app.id).update({
            ...app,
            updated_at: new Date()
        });
    }
    
    async createApp(app: AppApp): Promise<string>{
        try{
            const respAddApp = await this.appsRef.add(app);
            await this.appsRef.doc(respAddApp.id).update({
                ...app,
                id: respAddApp.id,
                updated_at: new Date()
            });
            return respAddApp.id
        }catch(error){
            return ""
        }
    }

    deleteApp(app: AppApp){
        return this.appsRef.doc(app.id).delete();
    }

    onNextPage(){
        this.pageChangeSubject.next(this.page + 1)
    }
    onPreviousPage(){
        if(this.startAfterList.length > 0){
            this.startAfterList.pop();
        }
        if(this.startAfterList.length > 0){
            this.startAfterList.pop();
        }
        if(this.page == 1) return;
        this.pageChangeSubject.next(this.page - 1)
    }

    clean(){
        this.allAppsSubscription?.unsubscribe();
        this.allAppsSubscription = undefined;
    }
    
}