import { Component, Input } from "@angular/core";
import { FolhaService } from "src/app/servicos/http/folha.service";

@Component({
    selector: 'btn-download-csv',
    templateUrl: './botao-download-csv.component.html',
    styleUrls: ['.//botao-download-csv.component.css']
})
export class BotaoDownloadCsvComponent{

    @Input() idFolha:number | undefined = 0;

    constructor(
        private folhaService: FolhaService
    ){}

    public baixarArquivoCSV(){

        this.idFolha = this.idFolha as number;

        this.folhaService.buscarArquivoCSV(this.idFolha).subscribe({
            next: data => {

                let file = new Blob([data.body],{type: data.type});

                let objDownload = window.URL.createObjectURL(file);

                let link = document.createElement('a');

                link.href= objDownload;

                link.download = data.headers.get("file_name");

                link.click();

                window.URL.revokeObjectURL(objDownload);
                link.remove();

            }
        });

    }

}
