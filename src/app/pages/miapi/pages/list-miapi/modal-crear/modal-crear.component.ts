import { Component, ElementRef, EventEmitter, Inject, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Personaje } from '../interface/personajes';
import { PersonajesService } from '../services/personajes.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal-crear',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-crear.component.html',
  styleUrl: './modal-crear.component.css'
})
export class ModalCrearComponent {
  @Output() eventActualizar = new EventEmitter<Personaje>()
  @ViewChild('modalElement') public modal!: ElementRef;
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

  open(): void {
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


  nuevoPersonaje: Personaje = {
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

  agregar() {
    this._srvPer.addPersonaje(this.nuevoPersonaje).subscribe({
      next: ne => {
        this.eventActualizar.emit();
        this.close()
      }
    })
  }
}
