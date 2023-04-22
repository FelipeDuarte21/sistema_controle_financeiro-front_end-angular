import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SpinnerComponent } from "./spinner.component";
import { SpinnerService } from "./spinner.service";

@NgModule({
    declarations: [
        SpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SpinnerComponent
    ],
    providers: [
        SpinnerService
    ]
})
export class SpinnerModule{

}