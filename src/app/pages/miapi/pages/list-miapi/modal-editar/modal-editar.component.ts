import { Component, ElementRef, EventEmitter, Inject, Input, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { Personaje } from '../interface/personajes';
import { PersonajesService } from '../services/personajes.service';
import { isPlatformBrowser } from '@angular/common';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-modal-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-editar.component.html',
  styleUrl: './modal-editar.component.css'
})
export class ModalEditarComponent {
  @Output() eventActualizar = new EventEmitter<Personaje>()
  @ViewChild('modalElement') public modal!: ElementRef;
  @Input() personajeToEdit:Personaje = {
    nombre: '',
    rol: '',
    dificultad: '',
    habilidades: {
      pasiva: '',
      q: '',
      w: '',
      e: '',
      r: ''
    }
  };
  private bootstrapModal: any;
  constructor(private _srvPer: PersonajesService, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeModal();
    }
  }

  initializeModal(): void {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement);
    });
  }

  open(per:Personaje): void {
    this.personajeToEdit = per
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.initializeModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  close(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      } else {
        this.initializeModal();  
        setTimeout(() => {
          this.bootstrapModal.hide(); 
        }, 0);
      }
    }
  }

  saveChanges(){
    this._srvPer.updatePersonaje(this.personajeToEdit._id!, this.personajeToEdit).subscribe({
      next: ne => {
        this.eventActualizar.emit()
        this.close()
      }
    })
  }
}
