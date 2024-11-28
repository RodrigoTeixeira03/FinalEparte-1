import { Component, OnInit } from '@angular/core';
import { Personajes } from './interface/personajes';
import { PersonajesService } from './services/personajes.service';
import { ListPerComponent } from "./list-per/list-per.component";

@Component({
  selector: 'miapi-list-miapi',
  standalone: true,
  imports: [ListPerComponent],
  templateUrl: './list-miapi.component.html',
  styleUrl: './list-miapi.component.css'
})
export class ListMiapiComponent  implements OnInit{
  personajes: Personajes | undefined

  constructor(private _srvPer:PersonajesService){}

  ngOnInit(): void {
    this._srvPer.getPersonajes().subscribe(pers => {
      this.personajes = pers
    })
  }
}
