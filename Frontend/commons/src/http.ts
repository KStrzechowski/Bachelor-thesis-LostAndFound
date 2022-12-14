import { webAPIUrl } from "./AppSettings";

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
}

export const http = async <RESB = undefined, REQB = undefined>(
  config: HttpRequest<REQB>
): Promise<HttpResponse<RESB>> => {
  console.log(`${config.method} ${webAPIUrl}${config.path}`);
  const request = new Request(`${webAPIUrl}${config.path}`, {
    method: config.method || "get",
    headers: {
      "Content-Type": config.contentType
        ? config.contentType
        : "application/json",
    },
    body: config.body ? JSON.stringify(config.body) : undefined,
  });
  if (config.accessToken) {
    request.headers.set("Authorization", `Bearer ${config.accessToken}`);
  }

  console.log(request);
  const response = await fetch(request);
  if (response.ok) {
    console.log("Status: OK");
    const body = await response.json();
    return { ok: response.ok, body };
  } else {
    logError(request, response);
    return { ok: response.ok };
  }
};

export const multipartFormDataHttp = async <RESB = undefined, REQB = undefined>(
  config: HttpRequest<REQB>,
  requestData: FormData
): Promise<HttpResponse<RESB>> => {
  console.log(`${config.method} ${webAPIUrl}${config.path}`);

  const request = new Request(`${webAPIUrl}${config.path}`, {
    method: config.method || "get",
    body: requestData,
  });
  if (config.accessToken) {
    request.headers.set("Authorization", `Bearer ${config.accessToken}`);
  }

  console.log(request);
  const response = await fetch(request);
  if (response.ok) {
    console.log("Status: OK");
    const body = await response.json();
    return { ok: response.ok, body };
  } else {
    logError(request, response);
    return { ok: response.ok };
  }
};

const logError = async (request: Request, response: Response) => {
  const contentType = response.headers.get("content-type");
  let body: any;
  if (contentType && contentType.indexOf("application/json") !== -1) {
    body = await response.json();
  } else {
    body = await response.text();
  }
  console.error(`Error reqesting ${request.method} ${request.url}`, body);
};
