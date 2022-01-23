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

    public usuario: Usuario = null;

    public exibeMenuLancamento:boolean = false;
    public idCategoria:number=0;

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

        let url = window.sessionStorage.getItem("rota");

        if(url != null && url.match('/lancamento')){
            this.exibeMenuLancamento = true;
            let partes = url.split('?');
            partes = partes[1].split('=');
            this.idCategoria = parseInt(partes[1]);
        }

    }

    public logout(){
        this.usuarioLogadoservice.deslogarUsuario();
        window.sessionStorage.removeItem("rota");
        this.router.navigate(['/']);
    }

}