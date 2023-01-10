export interface HttpRequest<REQB> {
    path: string;
    method?: string;
    body?: REQB;
    accessToken?: string;
    contentType?: string;
}
export interface HttpResponse<RESB> {
    ok: boolean;
    body?: RESB;
    headers?: Headers;
}
export interface PaginationMetadata {
    TotalItemCount: number;
    TotalPageCount: number;
    PageSize: number;
    CurrentPage: number;
    NextPageLink?: string;
    PreviousPageLink?: string;
}
export declare const http: <RESB = undefined, REQB = undefined>(config: HttpRequest<REQB>) => Promise<HttpResponse<RESB>>;
export declare const multipartFormDataHttp: <RESB = undefined, REQB = undefined>(config: HttpRequest<REQB>, requestData: FormData) => Promise<HttpResponse<RESB>>;
