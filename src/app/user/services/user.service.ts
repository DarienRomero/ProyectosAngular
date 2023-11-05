import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private dbPath = '/user';
    
    public loadingUsers = false;
    public errorUsers = false;
    public users: User[] = [];

    usersRef: AngularFirestoreCollection<User>;

    constructor(private db: AngularFirestore) {
        this.usersRef = db.collection(this.dbPath);
        this.getUsers()
    }
    
    getUsers(){
        this.loadingUsers = true;
        this.errorUsers = false;
        this.usersRef.valueChanges().subscribe(data => {
            this.errorUsers = false;
            this.loadingUsers = false;
            this.users = data as User[];
            console.log("Data", data)
        }, error => {
            this.errorUsers = true;
            this.loadingUsers = false;
        });
    }
    updateUser(user: User){
        return this.usersRef.doc(user.id).update(user);
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