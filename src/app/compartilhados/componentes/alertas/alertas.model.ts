import { TipoAlerta } from "./alertas.enum";

export interface AlertasModel{
    tipo: TipoAlerta,
    mensagem: string
    ativo: boolean
}