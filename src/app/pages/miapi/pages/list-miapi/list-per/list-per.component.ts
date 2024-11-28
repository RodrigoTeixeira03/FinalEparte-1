import { Component, Input, ViewChild } from '@angular/core';
import { Personajes } from '../interface/personajes';
import { NgFor, NgIf } from '@angular/common';
import { PersonajesService } from '../services/personajes.service';
import { ModalCrearComponent } from '../modal-crear/modal-crear.component';
import { ModalEditarComponent } from "../modal-editar/modal-editar.component";

@Component({
  selector: 'app-list-per',
  standalone: true,
  imports: [NgFor, NgIf, ModalCrearComponent, ModalEditarComponent],
  templateUrl: './list-per.component.html',
  styleUrl: './list-per.component.css'
})
export class ListPerComponent {
  @Input() personajeAll: Personajes | undefined;
  @ViewChild(ModalCrearComponent) public modal!: ModalCrearComponent
  @ViewChild(ModalEditarComponent) public modal2!: ModalEditarComponent
  constructor(private _srvPersonaje:PersonajesService){}

  actualizarElemento(){
    this._srvPersonaje.getPersonajes().subscribe(per => {this.personajeAll = per})
  }

  eliminarElemeto(id:string){
    this._srvPersonaje.deletePersonaje(id).subscribe({next:ne=>{this.actualizarElemento()}})
  }

}
