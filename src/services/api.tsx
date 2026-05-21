const BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8000').replace(/\/$/, '') + '/api';

function authHeaders() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("token");
  if (token) headers["Authorization"] = `Token ${token}`;
  return headers;
}

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const error: any = new Error(response.statusText || "Request failed");
    error.response = { status: response.status, data };
    throw error;
  }
  return { data };
}

export const api = {
  get: (path: string) => fetch(`${BASE_URL}${path}`, { headers: authHeaders(), credentials: "include" }).then(handleResponse),
  post: (path: string, body?: any) =>
    fetch(`${BASE_URL}${path}`, { method: "POST", headers: authHeaders(), body: body ? JSON.stringify(body) : undefined, credentials: "include" }).then(handleResponse),
  put: (path: string, body?: any) =>
    fetch(`${BASE_URL}${path}`, { method: "PUT", headers: authHeaders(), body: body ? JSON.stringify(body) : undefined, credentials: "include" }).then(handleResponse),
  delete: (path: string) => fetch(`${BASE_URL}${path}`, { method: "DELETE", headers: authHeaders(), credentials: "include" }).then(handleResponse),
};

export function setAuthToken(token?: string) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

