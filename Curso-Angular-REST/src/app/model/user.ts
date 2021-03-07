export class User {

    public id: Number;
    public login: String;
    public nome: String;
    public senha: String
    public cpf: String;

    public getId(): Number {
        return this.id;
    }

    public setId(id: Number) {
        this.id = id;
    } 

    public getLogin(): String {
        return this.login;
    }

    public setLogin(login: String) {
        this.login = login;
    } 

    public getNome(): String {
        return this.nome;
    }

    public setNome(nome: String) {
        this.nome = nome;
    } 

    public getSenha(): String {
        return this.senha;
    }

    public setSenha(senha: String) {
        this.senha = this.senha;
    } 

    public getCpf(): String {
        return this.cpf;
    }

    public setCpf(cpf: String) {
        this.cpf = cpf;
    } 
}
