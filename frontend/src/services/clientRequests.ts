import { IClient } from "../contexts/ClientContext";
import api from "./api";

interface ILoginResponse {
  token: string;
  client: IClient;
}

export const registerClientRequest = async (
  clientData: IClient
): Promise<IClient> => {
  const { data } = await api.post<IClient>("/clients", clientData);

  return data;
};

export const loginRequest = async (
  clientData: IClient
): Promise<ILoginResponse> => {
  const { data } = await api.post<ILoginResponse>("/login", clientData);

  return data;
};
