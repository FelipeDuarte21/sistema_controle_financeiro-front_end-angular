import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertasService } from "src/app/compartilhados/componentes/alertas/alertas.service";
import { SpinnerService } from "src/app/compartilhados/componentes/spinners/spinner.service";
import { Categoria } from "src/app/modelos/categoria.model";
import { Transferencia } from "src/app/modelos/transferencia.model";
import { CategoriaService } from "src/app/servicos/http/categoria.service";
import { FolhaService } from "src/app/servicos/http/folha.service";

@Component({
    selector: 'transferencia',
    templateUrl: './transferencia.component.html',
    styleUrls: ['./transferencia.component.css'],
    providers: [DatePipe]
})
export class TransferenciaComponent{

    public idCategoria: number = 0;
    private idFolha: number = 0;

    public formTransferir: FormGroup = new FormGroup({});

    public desativaBotaoTransferir:boolean = false;

    public categorias: Array<Categoria> = [];

    constructor(
        private formBuilder: FormBuilder,
        private categoriaService: CategoriaService,
        private folhaService: FolhaService,
        private router: Router,
        private activedRoute: ActivatedRoute,
        private spinnerService: SpinnerService,
        private alertaService: AlertasService,
        private formatadorData: DatePipe
    ) { }

    ngOnInit(): void {

        this.spinnerService.ativarSpinner();

        this.activedRoute.queryParams.subscribe(
            queryParams => {
                this.idCategoria = queryParams?.['categoria'];
                this.idFolha = queryParams?.['balanco'];
                this.spinnerService.desativarSpinner();
            }
        );

        this.spinnerService.ativarSpinner();

        let idConta = parseInt(window.sessionStorage.getItem("idConta") as string);

        this.categoriaService.listar(idConta).subscribe({
            next: categorias => {
                this.categorias = categorias;
                this.spinnerService.desativarSpinner();
            },
            error: error => {console.log(error);this.spinnerService.desativarSpinner();}
        });

        this.formTransferir = this.formBuilder.group({
            categoriaDestino: ['', [Validators.required]],
            titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
            descricao: ['', [Validators.maxLength(255)]],
            valor: ['', [Validators.required, Validators.min(0)]],
            data: [this.formatadorData.transform(new Date(),'yyyy-MM-dd'),[Validators.required]]
        });

    }

    public verificaCampo(campo: string): boolean | null | undefined {
        return this.formTransferir.get(campo)?.errors && this.formTransferir.get(campo)?.touched;
    }

    public tamanhoCampo(campo: string): number {
        let valor = this.formTransferir.get(campo)?.value as string;
        if (valor == null) {
            return 0;
        }
        return valor.length;
    }

    public transferir() {

        this.spinnerService.ativarSpinner();

        let transferencia = this.formTransferir.getRawValue() as Transferencia;

        transferencia.categoriaOrigem = this.idCategoria;

        this.desativaBotaoTransferir = true;

        this.folhaService.fazerTransferencia(transferencia).subscribe({
            next: resp => {
                this.formTransferir.reset();
                this.desativaBotaoTransferir = false;
                this.spinnerService.desativarSpinner();
                this.alertaService.alertaSucesso("Transferência realizada com sucesso!");
                this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
            },
            error: error => {
                this.spinnerService.desativarSpinner();
                this.desativaBotaoTransferir = false;
                this.alertaService.alertaErro("Erro ao realizar transferência!",false);
                if (error.error.code == 403) {
                    this.router.navigate(['/lancamentos'], { queryParams: { categoria: this.idCategoria } });
                }
            }
        });

    }

}
