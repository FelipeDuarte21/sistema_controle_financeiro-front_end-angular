import { Component, Input } from "@angular/core";

@Component({
    selector: 'titulo-pagina',
    templateUrl: './titulo-pagina.component.html',
    styleUrls: ['./titulo-pagina.component.css']
})
export class TituloPaginaComponent{

    @Input() titulo:string = "";
    @Input() subtitulo:string = "";
    @Input() icone:string = "";

}
