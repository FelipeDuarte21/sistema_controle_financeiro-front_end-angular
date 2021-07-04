import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { CategoriaComponent } from "./categoria.component";

@NgModule({
    declarations: [
        CategoriaComponent
    ],
    imports: [
        CommonModule,
        CategoriaRoutingModule
    ],
    exports: [
        CategoriaComponent
    ]
})
export class CategoriaModule{

}