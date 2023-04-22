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

    public usuario: Usuario | null = null;

    public exibeMenuLancamento:boolean = false;

    public exibeMenuLancamentoFixo:boolean = false;

    public exibeMenuAnotacoes:boolean = false;

    public exibeMenuParcelados:boolean = false;

    public idCategoria:number=0;

    constructor(
        private usuarioLogadoservice: UsuarioLogadoService,
        private router: Router
    ){}

    ngOnInit(): void {
        this.usuarioLogadoservice.recuperarUsuario().subscribe({
            next:  usu => {
                this.usuario = usu;
            }
        });

        let url = window.sessionStorage.getItem("rota");
        let path = url;

        if(url && url.includes("?")){
            let urlPartes = url.split("?");
            path = urlPartes[0];
            if(path.match("/")){
                path = "/" + path.split("/")[1];
            }
        }

        if(url != null && path === '/lancamentos'){
            this.exibeMenuLancamento = true;
            let partes = url.split('?');
            partes = partes[1].split('=');
            this.idCategoria = parseInt(partes[1]);
        }

        if(url != null && path === '/lancamentos-fixos'){
            this.exibeMenuLancamentoFixo = true;
            let partes = url.split('?');
            partes = partes[1].split('=');
            this.idCategoria = parseInt(partes[1]);
        }

        if(url != null && path === '/anotacoes'){
            this.exibeMenuAnotacoes = true;
            let partes = url.split('?');
            partes = partes[1].split('=');
            this.idCategoria = parseInt(partes[1]);
        }

        if(url != null && path === '/parcelados'){
            this.exibeMenuParcelados = true;
            let partes = url.split('?');
            partes = partes[1].split('=');
            this.idCategoria = parseInt(partes[1]);
        }

    }

    public logout(){
        this.usuarioLogadoservice.deslogarUsuario();
        window.sessionStorage.removeItem("rota");
        this.usuario = null;
        this.router.navigate(['/']);
    }

}
