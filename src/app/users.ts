export class Users {

    public UsuarioID: number;
    public nombreUsuario: string;
    public correoElectronico: string;
    public Password: string;
    public ClaveDeRegistro: string;

    constructor(UsuarioID:number,nombreUsuario:string, correoElectronico:string,Password:string, ClaveDeRegistro:string){
        this.UsuarioID = UsuarioID;
        this.nombreUsuario = nombreUsuario;
        this.correoElectronico = correoElectronico;
        this.Password = Password;
        this.ClaveDeRegistro = ClaveDeRegistro;
    }
}