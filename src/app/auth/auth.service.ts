import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AppUser } from '../user/interfaces/user.interface';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public database: AngularFirestore;
  private dbPath = '/user';
  public usersRef: AngularFirestoreCollection<AppUser>;

  public newUserSubject: Subject<AppUser> = new Subject<AppUser>();
  public accessSubject: Subject<boolean> = new Subject<boolean>();
  public userSubs?: Subscription;
  public loginUserSubs?: Subscription;

  public loadingLogin: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) {
    this.database = db
    this.usersRef = db.collection(this.dbPath);
  }
  async login(email: string, password: string) {
    let resp;
    this.loadingLogin = true;
    try{
      resp = await this.afAuth.signInWithEmailAndPassword(email, password);
    }catch(error: unknown){
      this.loadingLogin = false;
      var errorCode = (error as any).code;
      if (errorCode === 'auth/wrong-password') {
        throw Error('Contraseña incorrecta');
      }if (errorCode === 'auth/invalid-email') {
        throw Error('Correo electrónico inválido');
      }else if (errorCode === 'auth/invalid-login-credentials') {
        throw Error('El usuario o contraseña son incorrectos');
      }else{
        throw Error('Error desconocido');
      }
    }
    const data = resp.user?.uid;
    if(!data){
      throw Error('Usuario no encontrado');
    }
    this.loginUserSubs = this.usersRef.doc(data).get().subscribe((snapshot) => {
      const user = snapshot.data();
      if(user){
        this.loadingLogin = false
        this.newUserSubject.next(user)
      }
      this.loginUserSubs?.unsubscribe();
      
    });
  }

  subscribeUserById(uuid: string){
    this.userSubs = this.usersRef.doc(uuid).valueChanges().subscribe((user) => {
      if(user){
        if(user.role !== 'admin'){
          this.accessSubject.next(false);
        }
      }
    });
  }

  signOut() {
    this.cleanSubjects();
    return this.afAuth.signOut();
  }

  cleanSubjects(){
    this.userSubs?.unsubscribe();
    this.userSubs  = undefined;
  }

  getUser() {
    return this.afAuth.authState;
  }
}
