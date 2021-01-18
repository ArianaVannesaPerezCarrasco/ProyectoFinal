import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(
    private firestore:AngularFirestore
  ) { }


  getProducto(){
  return this.firestore.collection("productos").snapshotChanges();
}
 createProducto(producto:any){
  return this.firestore.collection("productos").add(producto);
 } 

 updateProducto(id:any, producto:any){
  return this.firestore.collection("productos").doc(id).update(producto);
 }

 deleteProducto(id:any){
  return this.firestore.collection("productos").doc(id).delete();
 }
 

}
