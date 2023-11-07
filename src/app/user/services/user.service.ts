import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Subscription } from "rxjs";
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

    usersRef: AngularFirestoreCollection<AppUser>;

    public database: AngularFirestore;

    constructor(
        private db: AngularFirestore,
        private afAuth: AngularFireAuth,
    ) {
        this.database = db;
        this.usersRef = db.collection(this.dbPath);
        this.getUsers()
    }

    onChangeOnlyActiveUsers(){
        this.onlyActiveUsers = !this.onlyActiveUsers;
        this.getUsers();
    }
    
    getUsers(){
        this.loadingUsers = true;
        this.errorUsers = false;
        const query = this.onlyActiveUsers ? 
            this.database.collection(this.dbPath, ref => ref.where('enabled', '==', true)) : 
            this.usersRef;
        this.usersStream?.unsubscribe();
        this.usersStream = query.valueChanges().subscribe(data => {
            this.errorUsers = false;
            this.loadingUsers = false;
            this.users = data as AppUser[];
        }, error => {
            this.errorUsers = true;
            this.loadingUsers = false;
        });
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

    /* getAll(): AngularFirestoreCollection<Tutorial> {
        return this.tutorialsRef;
    }

    create(tutorial: Tutorial): any {
        return this.tutorialsRef.add({ ...tutorial });
    }

    update(id: string, data: any): Promise<void> {
        return this.tutorialsRef.doc(id).update(data);
    }

    delete(id: string): Promise<void> {
        return this.tutorialsRef.doc(id).delete();
    } */

    
}