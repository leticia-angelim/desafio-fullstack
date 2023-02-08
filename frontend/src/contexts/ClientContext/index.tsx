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
  email: string;
  password: string;
  phone: string;
  date_joined: string;
  contacts?: IContact[];
}

interface IUpdatedClient {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface IClientProviderProps {
  children: ReactNode;
}

interface IClientContext {
  client: IClient | null;
  setClient: Dispatch<SetStateAction<IClient | null>>;
  contacts: IContact[] | undefined;
  setContacts: Dispatch<SetStateAction<IContact[] | undefined>>;
  loading: boolean;
  editClientModal: boolean;
  setEditClientModal: Dispatch<SetStateAction<boolean>>;
  deleteClientModal: boolean;
  setDeleteClientModal: Dispatch<SetStateAction<boolean>>;
  registerClient: (data: IClient) => Promise<void>;
  loginClient: (data: IClient) => Promise<void>;
  updateClient: (data: IUpdatedClient) => Promise<void>;
  deleteClient: () => Promise<void>;
}

const ClientContext = createContext<IClientContext>({} as IClientContext);

export const ClientProvider = ({ children }: IClientProviderProps) => {
  const [client, setClient] = useState<IClient | null>(null);
  const [contacts, setContacts] = useState<IContact[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const [editClientModal, setEditClientModal] = useState(false);
  const [deleteClientModal, setDeleteClientModal] = useState(false);

  const navigate = useNavigate();

  const registerClient = async (data: IClient) => {
    try {
      await registerClientRequest(data);

      toast.success("Conta criada com sucesso!");

      navigate("/login", { replace: true });
    } catch {
      toast.error("Ops! Email já cadastrado");
    }
  };

  const loginClient = async (data: IClient) => {
    try {
      const { token } = await loginRequest(data);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      getProfile();

      localStorage.clear();
      localStorage.setItem("@client:token", token);

      toast.success("Login efetuado com sucesso!");

      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Ops! Email e/ou senha incorretos");
    }
  };

  const getProfile = async () => {
    const { data } = await api.get<IClient>("/clients/profile");
    setClient(data);
    setContacts(data.contacts);

    localStorage.setItem("@client:id", data.id);
    localStorage.setItem("@client:name", data.name);
  };

  const updateClient = async (data: IUpdatedClient) => {
    try {
      const id = localStorage.getItem("@client:id");

      const { data: clientData } = await api.patch<IClient>(
        `/clients/${id}`,
        data
      );

      localStorage.setItem("@client:name", clientData.name);
      setEditClientModal(false);
      toast.success("Conta atualizada!");
    } catch {
      toast.error("Ops! Este email já está cadastrado em outra conta");
    }
  };

  const deleteClient = async () => {
    const id = localStorage.getItem("@client:id");

    await api.delete(`/clients/${id}`);

    setDeleteClientModal(false);
    toast.success("Conta excluída!");

    localStorage.clear();
    setClient(null);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const loadClient = async () => {
      const token = localStorage.getItem("@client:token");

      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          getProfile();
        } catch {
          localStorage.clear();
        }
      }
      setLoading(false);
    };

    loadClient();
  }, []);

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        contacts,
        setContacts,
        loading,
        registerClient,
        loginClient,
        editClientModal,
        setEditClientModal,
        deleteClientModal,
        setDeleteClientModal,
        updateClient,
        deleteClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => useContext(ClientContext);
