import { IContact } from "./contact.interface";

export interface IClientRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IClient {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  date_joined: Date;
  isActive: boolean;
  contacts?: IContact[];
}

export interface IClientLogin {
  email: string;
  password: string;
}

export interface IClientLoginToken {
  token: string;
  client: IClient;
}

export interface IClientUpdate {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}
