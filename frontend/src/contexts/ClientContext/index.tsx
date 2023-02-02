import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import {
  loginRequest,
  registerClientRequest,
} from "../../services/clientRequests";
import { IContact } from "../ContactContext";

export interface IClient {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  date_joined: string;
}

interface IClientProviderProps {
  children: ReactNode;
}

interface IClientContext {
  client: IClient | null;
  setClient: Dispatch<SetStateAction<IClient | null>>;
  contacts?: IContact[];
  loading: boolean;
  registerClient: (data: IClient) => Promise<void>;
  loginClient: (data: IClient) => Promise<void>;
}

const ClientContext = createContext<IClientContext>({} as IClientContext);

export const ClientProvider = ({ children }: IClientProviderProps) => {
  const [client, setClient] = useState<IClient | null>(null);
  const [contacts, setContacts] = useState<IContact[] | undefined>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const registerClient = async (data: IClient) => {
    try {
      await registerClientRequest(data);

      toast.success("Conta criada com sucesso!");

      navigate("", { replace: true });
    } catch {
      toast.error("Ops! Username já cadastrado");
    }
  };

  const loginClient = async (data: IClient) => {
    try {
      const response = await loginRequest(data);

      const { access } = response;

      api.defaults.headers.common["Authorization"] = `Bearer ${access}`;

      const { data: clientData } = await api.get("clients/");

      setClient(clientData[0]);
      setContacts(clientData[0].contacts);

      localStorage.clear();
      localStorage.setItem("@client:token", access);
      localStorage.setItem("@client:clientId", clientData[0].id);

      toast.success("Login efetuado com sucesso!");

      navigate("dashboard/", { replace: true });
    } catch {
      toast.error("Ops! Username e/ou senha incorretos");
    }
  };

  useEffect(() => {
    const loadClient = async () => {
      const token = localStorage.getItem("@client:token");
      const id = localStorage.getItem("@client:clientId");

      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const { data } = await api.get(`clients/${id}/`);

          setClient(data);
          setContacts(data.contacts);
        } catch {
          localStorage.clear();
        }
      }
      setLoading(false);
    };

    loadClient();
  }, [contacts]);

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        contacts,
        loading,
        registerClient,
        loginClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
