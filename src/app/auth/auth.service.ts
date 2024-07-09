import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseAuthError } from './interfaces/firebase-auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {

  }
  async login(email: string, password: string) {
    try{
      const resp = await this.afAuth.signInWithEmailAndPassword(email, password);
    }catch(error: unknown){
      var errorCode = (error as any).code;
      if (errorCode === 'auth/wrong-password') {
        throw Error('Contraseña incorrecta');
      }if (errorCode === 'auth/invalid-email') {
        throw Error('Correo electrónico inválido');
      }else{
        throw Error('Error desconocido');
      }
    }
  }

  logout() {
    return this.afAuth.signOut();
  }

  getUser() {
    return this.afAuth.authState;
  }
}
