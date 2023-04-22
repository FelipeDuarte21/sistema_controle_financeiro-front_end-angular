import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertasComponent } from "./alertas.component";
import { AlertasService } from "./alertas.service";

@NgModule({
    declarations: [
        AlertasComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertasComponent
    ],
    providers: [
        AlertasService
    ]
})
export class AlertasModule{

}