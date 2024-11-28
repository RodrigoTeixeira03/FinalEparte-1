export interface Personajes {
    personajes: Personaje[];
}

export interface Personaje {
    habilidades: Habilidades;
    _id?:         string;
    nombre:      string;
    rol:         string;
    dificultad:  string;
}

export interface Habilidades {
    pasiva: string;
    q:      string;
    w:      string;
    e:      string;
    r:      string;
}