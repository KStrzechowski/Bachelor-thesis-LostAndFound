import { webAPIUrl } from "./AppSettings";
export const http = async (config) => {
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
export const multipartFormDataHttp = async (config, requestData) => {
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
const logError = async (request, response) => {
  const contentType = response.headers.get("content-type");
  let body;
  if (contentType && contentType.indexOf("application/json") !== -1) {
    body = await response.json();
  } else {
    body = await response.text();
  }
  console.error(`Error reqesting ${request.method} ${request.url}`, body);
};
