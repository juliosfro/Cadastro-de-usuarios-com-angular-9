
export class AppConstants {

    public static get baseServidor(): String {
        return "http://localhost:8080/";
    }

    public static get baseLogin(): String {
        return this.baseServidor + "cursospringrestapi/login";
    }

    public static get baseUrl(): String {
        return this.baseServidor + "cursospringrestapi/usuario/";
    }
}
