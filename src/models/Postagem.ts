import type Tema from "./Tema";
import type Usuario from "./Usuario";

export default interface Postagem {

    id: number;
    titulo: string;
    texto: string;
    data: string; // em string pq vai só receber a informação
    tema: Tema | null; 
    usuario: Usuario | null;
    
}