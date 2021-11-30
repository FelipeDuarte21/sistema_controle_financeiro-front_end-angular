import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CabecalhoModule } from "src/app/compartilhados/cabecalho/cabecalho.module";
import { BtnVoltarComponent } from "src/app/compartilhados/componentes/btns/btn-voltar/btn-voltar.component";
import { BtnsModule } from "src/app/compartilhados/componentes/btns/btns.module";
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
        BtnsModule
    ],
    exports: [
        SobreComponent
    ]
})
export class SobreModule{

}