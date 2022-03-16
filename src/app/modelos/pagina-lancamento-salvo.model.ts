import { LancamentoSalvo } from "./lancamento-salvo.model";

export interface PaginaLancamentoSalvo {
    content: LancamentoSalvo[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}