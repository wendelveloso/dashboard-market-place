import api from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function makeRequest(url: string, method: string, data?: object) {
  try {
    const token = localStorage.getItem("token");
    const response = await api({
      url,
      method,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data || "Erro ao fazer a requisição";
    toast(errorMessage, { type: "error", position: "bottom-center" });
    throw new Error(errorMessage);
  }
}
