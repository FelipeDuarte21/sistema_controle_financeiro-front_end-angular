import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "src/app/modelos/usuario.model";
import { UsuarioLogadoService } from "src/app/servicos/internos/usuario-logado.service";

@Component({
    selector: 'cabecalho',
    templateUrl: './cabecalho.component.html',
    styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit{

    public usuario: Usuario;

    constructor(
        private usuarioLogadoservice: UsuarioLogadoService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.usuarioLogadoservice.recuperarUsuario().subscribe(
            usu => {
                this.usuario = usu;
            }
        );
    }

    public logout(){
        this.usuarioLogadoservice.deslogarUsuario();
        this.router.navigate(['/']);
    }

}