import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginacaoComponent } from "./paginacao.component";

@NgModule({
    declarations: [
        PaginacaoComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PaginacaoComponent
    ]
})
export class PaginacaoModule{

}