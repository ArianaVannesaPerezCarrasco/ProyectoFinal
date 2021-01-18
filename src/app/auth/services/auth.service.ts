import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import 'firebase/auth';
import { User } from  'firebase-tools';
import {first} from 'rxjs/operators';



@Injectable()
export class AuthService {
    public user:User;

  constructor(public afAuth: AngularFireAuth) { }

  async login(email: string, password: string){
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch(error){
      console.log(error);
    }
  }
 
  
  async register(email: string, password: string){
    try{
      const result= await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch(error){
      console.log(error);
    }
  }
    

  async logout(){
    try{
    await this.afAuth.signOut();
    } catch(error){
      console.log(error);
    }
  }
}
