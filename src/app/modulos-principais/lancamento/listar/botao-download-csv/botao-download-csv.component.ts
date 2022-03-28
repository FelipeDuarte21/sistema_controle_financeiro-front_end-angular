import { Component, Input } from "@angular/core";
import { LancamentoService } from "src/app/servicos/http/lancamento.service";

@Component({
    selector: 'btn-download-csv',
    templateUrl: './botao-download-csv.component.html',
    styleUrls: ['.//botao-download-csv.component.css']
})
export class BotaoDownloadCsvComponent{

    @Input() idBalanco:number = 0;
    @Input() idCategoria:number = 0;

    constructor(
        private lancamentoService: LancamentoService
    ){}

    public baixarArquivoCSV(){

        this.lancamentoService.buscarArquivoCSV(this.idCategoria,this.idBalanco).subscribe(
            data => {

                let file = new Blob([data.body],{type: data.type});

                let objDownload = window.URL.createObjectURL(file);

                let link = document.createElement('a');

                link.href= objDownload;

                link.download = data.headers.get("file_name");

                link.click();
               
                window.URL.revokeObjectURL(objDownload);
                link.remove();

            }
        );

    }

}