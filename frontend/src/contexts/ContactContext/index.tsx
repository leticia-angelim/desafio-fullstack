import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import api from "../../services/api";

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  date_joined: string;
}

interface IUpdatedContact {
  name: string;
  email: string;
  phone: string;
}

interface IContactProviderProps {
  children: ReactNode;
}

interface IContactContext {
  setContactId: Dispatch<SetStateAction<string>>;
  addModal: boolean;
  setAddModal: Dispatch<SetStateAction<boolean>>;
  updateModal: boolean;
  setUpdateModal: Dispatch<SetStateAction<boolean>>;
  deleteModal: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  createContact: (data: IContact) => Promise<void>;
  updateContact: (data: IUpdatedContact) => Promise<void>;
  deleteContact: () => Promise<void>;
}

const ContactContext = createContext<IContactContext>({} as IContactContext);

export const ContactProvider = ({ children }: IContactProviderProps) => {
  const [contactId, setContactId] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const createContact = async (data: IContact) => {
    try {
      await api.post("contacts/", data);

      setAddModal(false);
      toast.success("Contato adicionado!");
    } catch {
      toast.error("Ops! Um contato com esse número já existe!");
    }
  };

  const updateContact = async (data: IUpdatedContact) => {
    await api.patch(`contacts/${contactId}/`, data);

    setUpdateModal(false);
    toast.success("Contato atualizado!");
  };

  const deleteContact = async () => {
    await api.delete(`contacts/${contactId}/`);

    setDeleteModal(false);
    toast.success("Contato excluído!");
  };

  return (
    <ContactContext.Provider
      value={{
        setContactId,
        addModal,
        setAddModal,
        updateModal,
        setUpdateModal,
        deleteModal,
        setDeleteModal,
        createContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContactContext = () => useContext(ContactContext);
