import { Profissao } from './profissao';
import { Telefone } from "./telefone";

export class User {
     id: Number;
     login: String;
     nome: String;
     senha: String
     cpf: String;
     dataNascimento: string = null;
     profissao: Profissao = new Profissao();
     telefones: Array<Telefone>;
     salario: DoubleRange;
}
