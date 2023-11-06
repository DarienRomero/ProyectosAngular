import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from "../interfaces/user.interface";
import { Observable, Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private dbPath = '/user';
    
    public loadingUsers = false;
    public errorUsers = false;
    public users: User[] = [];

    public usersStream: Subscription | undefined;
    public userStream: Subscription | undefined;

    public onlyActiveUsers = false;

    usersRef: AngularFirestoreCollection<User>;

    public database: AngularFirestore;

    constructor(private db: AngularFirestore) {
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
            this.users = data as User[];
        }, error => {
            this.errorUsers = true;
            this.loadingUsers = false;
        });
    }
    public loadingToEditUser = false;
    public errorToEditUser = false;
    public userToEdit: User = {
        email:        "",
        enabled:      false,
        id:           "",
        username:     "",
        apps_enabled: []
    };

    getUser(userId: string) {
        this.loadingToEditUser = true;
        this.errorToEditUser = false;
        this.userStream?.unsubscribe();
        this.userStream = this.usersRef.doc(userId).get().subscribe(data => {
            this.errorToEditUser = false;
            this.loadingToEditUser = false;
            this.userToEdit = data.data() as User;
            console.log("GEt user resp", this.userToEdit)
        }, error => {
            console.log('GEt user error')
            this.errorToEditUser = true;
            this.loadingToEditUser = false;
        });
        return undefined;
    }
    updateUser(user: User){
        return this.usersRef.doc(user.id).update(user);
    }

    deleteUser(user: User){
        return this.usersRef.doc(user.id).delete();
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