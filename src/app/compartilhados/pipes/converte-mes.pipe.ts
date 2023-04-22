import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'converteMes'
})
export class ConverteMesPipe implements PipeTransform{

    transform(mes:number | undefined) {

        if(mes == undefined) return;

        let mesNome = "";

        switch(mes){
            case 1:
                mesNome = "Janeiro";
                break;
            case 2:
                mesNome = "Fevereiro";
                break;
            case 3:
                mesNome = "Março";
                break;
            case 4:
                mesNome = "Abril";
                break;
            case 5:
                mesNome = "Maio";
                break;
            case 6:
                mesNome = "Junho";
                break;
            case 7:
                mesNome = "Julho";
                break;
            case 8:
                mesNome = "Agosto";
                break;
            case 9:
                mesNome = "Setembro";
                break;
            case 10:
                mesNome = "Outubro";
                break;
            case 11:
                mesNome = "Novembro";
                break;
            case 12:
                mesNome = "Dezembro";
                break;
            default:
                mesNome = "Indefinido";
        }

        return mesNome;
    }

}
