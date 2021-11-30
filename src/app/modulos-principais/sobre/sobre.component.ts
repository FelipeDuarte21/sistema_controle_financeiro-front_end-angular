import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'sobre',
    templateUrl: './sobre.component.html',
    styleUrls: ['./sobre.component.css']
})
export class SobreComponent implements OnInit{

    public data: Date;

    ngOnInit(): void {
        this.data = new Date();
    }

    public getAno():number{
        return this.data.getFullYear();
    }

}