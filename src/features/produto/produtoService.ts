import { api } from "../../services/api";
import { Produto } from "./types";

export async function getAll(): Promise<Produto[] | any> {
  return api.get("/produtos/");
}

export async function createProduto(data: Partial<Produto>) {
  return api.post("/produtos/", data);
}

export async function updateProduto(id: number, data: Partial<Produto>) {
  return api.put(`/produtos/${id}/`, data);
}

export async function deleteProduto(id: number) {
  return api.delete(`/produtos/${id}/`);
}
