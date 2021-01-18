import { Component, OnInit } from '@angular/core';
import {analyzeAndValidateNgModules} from '@angular/compiler';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FirebaseServiceService} from '../../services/firebase-service.service';
import  {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { isNullOrUndefined } from 'util';
@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss']
})
export class FarmComponent implements OnInit {

  closeResult = '';

  productoForm: FormGroup;

  idFirebaseActualizar: string;

  actualizar: boolean;

  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private firebaseServiceService: FirebaseServiceService
    ) {}

  config: any;
  collection ={ count: 5, data: [] }

  ngOnInit(): void {
    this.idFirebaseActualizar=" ";
    this.actualizar= false;

    this.config = {
      itemsPerPage: 5,
      CurrentPage: 1,
      totalItems: this.collection.count
    };
    
    this.productoForm=this.fb.group({
      id: ['', Validators.required],
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.firebaseServiceService.getProducto().subscribe(resp=>{
      this.collection.data=resp.map((e:any)=>{
        return{
          id: e.payload.doc.data().id,
          producto: e.payload.doc.data().producto,
          descripcion: e.payload.doc.data().descripcion,
          idFirebase:   e.payload.doc.id
          
        }
      })
    },
    error=>{
      console.error(error);
    }
  );
}
  pageChanged(event){
    this.config.currentPage= event;
  }
  eliminar(item: any):void{
    this.firebaseServiceService.deleteProducto(item.idFirebase);
    
  }

  guardarProducto():void{

    this.firebaseServiceService.createProducto(this.productoForm.value).then(resp=>{
      this.productoForm.reset();
      this.modalService.dismissAll();
    }).catch(error=>{
      console.error(error)

    })
    

  }

  actualizarProducto(){
    if(!isNullOrUndefined(this.idFirebaseActualizar)){
    this.firebaseServiceService.updateProducto(this.idFirebaseActualizar , this.productoForm.value).then(resp=>{
      this.productoForm.reset();
      this.modalService.dismissAll();

    }).catch(error=>{
      console.error(error);
    });
   }
  }
  openEditar(content,item:any) {
    this.productoForm.setValue({
      id: item.id,
      producto: item.producto,
      descripcion: item.descripcion,
    });
    this.idFirebaseActualizar= item.idFirebase;
    this.actualizar=true;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) {
    this.actualizar=false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}