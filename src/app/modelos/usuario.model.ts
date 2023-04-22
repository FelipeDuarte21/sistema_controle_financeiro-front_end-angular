import { Conta } from "./conta.model";

export interface Usuario{
    id: number,
    nome:string,
    email:string,
    conta: Conta
}
