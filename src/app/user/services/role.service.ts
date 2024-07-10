import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { RoleModel } from "../interfaces/role.interface";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    public database: AngularFirestore;

    constructor(
        private db: AngularFirestore,
    ){
        this.database = db;
    }

    public loadingRoles = false;
    public errorRoles = false;
    public roles: RoleModel[] = [];
    public rolesSubscription?: Subscription;

    getRoles(){
        if(this.rolesSubscription) return;
        this.loadingRoles = true;
        this.errorRoles = false;
        this.rolesSubscription = this.database.collection<RoleModel[]>('roles').valueChanges().subscribe({
            next: (data) => {
                this.loadingRoles = false;
                this.errorRoles = false;
                // @ts-ignore:next-line
                this.roles = data
            },
            error: (error) => {
                this.loadingRoles = false;
                this.errorRoles = true;
            }
        });
    }

    clean(){
        this.rolesSubscription?.unsubscribe();
        this.rolesSubscription = undefined;
    }

}