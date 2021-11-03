import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: 'grid-switch',
    templateUrl: './grid-switch.component.html',
    styleUrls: ['./grid-switch.component.css']
})
export class GridSwitchComponent implements OnInit{
    
    @Input() escolhaGrid:object;
    @Output() toogle: EventEmitter<object> = new EventEmitter();

    public gridCard:boolean;
    public gridTabela:boolean;

    ngOnInit(): void {
        this.gridCard = this.escolhaGrid['gridCard'];
        this.gridTabela = this.escolhaGrid['gridTabela'];
    }

    public onGridCard(){
        this.gridCard = true;
        this.gridTabela = false;
        this.toogle.emit({gridCard:true,gridTabela:false});
    }

    public onGridTabela(){
        this.gridTabela = true;
        this.gridCard = false;
        this.toogle.emit({gridCard:false,gridTabela:true});
    }

}