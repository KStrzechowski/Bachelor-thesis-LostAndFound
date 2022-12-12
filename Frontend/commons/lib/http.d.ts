export interface HttpRequest<REQB> {
    path: string;
    method?: string;
    body?: REQB;
    accessToken?: string;
}
export interface HttpResponse<RESB> {
    ok: boolean;
    body?: RESB;
}
export declare const http: <RESB = undefined, REQB = undefined>(config: HttpRequest<REQB>) => Promise<HttpResponse<RESB>>;
