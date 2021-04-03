import { Telefone } from "./telefone";

export class User {
     id: Number;
     login: String;
     nome: String;
     senha: String
     cpf: String;
     dataNascimento: string = null;
     telefones: Array<Telefone>;
}
