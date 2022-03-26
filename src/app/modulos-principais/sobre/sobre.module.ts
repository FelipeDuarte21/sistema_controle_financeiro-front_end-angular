import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { BtnVoltarComponent } from "src/app/compartilhados/componentes/btns/btn-voltar/btn-voltar.component";
import { BtnsModule } from "src/app/compartilhados/componentes/btns/btns.module";
import { LayoutModule } from "src/app/compartilhados/componentes/layout/layout.module";
import { TituloPaginaModule } from "src/app/compartilhados/componentes/titulo-pagina/titulo.component.module";
import { SobreRoutingModule } from "./sobre-routing.module";
import { SobreComponent } from "./sobre.component";

@NgModule({
    declarations: [
        SobreComponent
    ],
    imports: [
        CommonModule,
        SobreRoutingModule,
        CabecalhoModule,
        BtnsModule,
        LayoutModule,
        TituloPaginaModule
    ],
    exports: [
        SobreComponent
    ]
})
export class SobreModule{

}