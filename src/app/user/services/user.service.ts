import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/compat/firestore';
import { Subject, Subscription } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AppUser } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private dbPath = '/user';
    
    public loadingUsers = false;
    public errorUsers = false;
    public users: AppUser[] = [];

    public usersStream: Subscription | undefined;
    public userStream: Subscription | undefined;

    public onlyActiveUsers = false;

    public usersRef: AngularFirestoreCollection<AppUser>;

    public database: AngularFirestore;

    public perPage = 5;
    public page = 1;
    public pageChangeSubject: Subject<number> = new Subject<number>();
    public startAfter?: DocumentSnapshot<AppUser>;
    public startAfterSubject: Subject<number> = new Subject<number>();
    public snapshotSubscription?: Subscription;

    constructor(
        private db: AngularFirestore,
        private afAuth: AngularFireAuth,
    ) {
        this.database = db;
        this.usersRef = db.collection(this.dbPath);
        this.getUsers(this.perPage, this.startAfter)
        this.pageChangeSubject.subscribe(page => {
            this.page = page;
            this.getUsers(this.perPage, this.startAfter);
        })
    }

    onChangeOnlyActiveUsers(){
        this.onlyActiveUsers = !this.onlyActiveUsers;
        this.onReset();
    }

    onNextPage(){
        this.pageChangeSubject.next(this.page + 1)
    }
    onPreviousPage(){
        if(this.page == 1) return;
        this.pageChangeSubject.next(this.page - 1)
    }
    onReset(){
        this.startAfter = undefined;
        this.pageChangeSubject.next(1)
    }
    
    getUsers(perPage: number, startAfter?: any){
        this.loadingUsers = true;
        this.errorUsers = false;
        const query = this.database.collection(this.dbPath, ref => {
            let q;
            if(this.onlyActiveUsers){
                q = ref.where('enabled', '==', true).orderBy('username').limit(perPage)
            }else{
                q = ref.orderBy('username').limit(perPage)
            }
            if(startAfter){
                q = q.startAfter(startAfter)
            }
            return q;
        })
        this.usersStream?.unsubscribe();
        this.usersStream = query.valueChanges().subscribe({
            next: (data) => {
                this.users = data as AppUser[];
                if(this.users.length > 0){
                    this.snapshotSubscription = this.usersRef.doc(this.users[this.users.length - 1].id).get().subscribe({
                        next: (data) => {
                            // @ts-ignore:next-line
                            this.startAfter = data;
                            this.errorUsers = false;
                            this.loadingUsers = false;
                            this.snapshotSubscription?.unsubscribe();
                        }
                    })
                }else{
                    this.startAfter = undefined;
                    this.errorUsers = false;
                    this.loadingUsers = false;
                    this.snapshotSubscription?.unsubscribe();
                }
            },
            error: (e) => {
                this.errorUsers = true;
                this.loadingUsers = false;
            },
            complete: () => console.info('complete') 
        })
    }

    getUserObs(userId: string) {
        this.userStream?.unsubscribe();
        return this.usersRef.doc(userId).get();
    }

    updateUser(user: AppUser){
        return this.usersRef.doc(user.id).update(user);
    }

    deleteUser(user: AppUser){
        return this.usersRef.doc(user.id).delete();
    }

    async createUser(newUser: AppUser, password: string): Promise<AppUser> {
        try {
          const userCredential = await this.afAuth.createUserWithEmailAndPassword(
            newUser.email,
            password
          )
          if(!userCredential.user){
            throw "No user created";
          }
          const user: AppUser = {
            id: userCredential.user.uid,
            email: newUser.email,
            apps_enabled: newUser.apps_enabled,
            enabled: newUser.enabled,
            username: newUser.username
          };
          await this.usersRef.doc(user.id).set(user);
          await this.afAuth.sendPasswordResetEmail(newUser.email);
          return user;
        } catch (error) {
          console.error('Error registering user:', error);
          throw error;
        }
      }
    async changePassword(email: string){
        try{
            await this.afAuth.sendPasswordResetEmail(email);
        }catch(error){

        }
    } 
}