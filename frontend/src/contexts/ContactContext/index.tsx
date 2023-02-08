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
import { useClientContext } from "../ClientContext";

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
  deleteContact: (e: { preventDefault: () => void }) => Promise<void>;
}

const ContactContext = createContext<IContactContext>({} as IContactContext);

export const ContactProvider = ({ children }: IContactProviderProps) => {
  const [contactId, setContactId] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { contacts, setContacts } = useClientContext();

  const createContact = async (data: IContact) => {
    try {
      const { data: contactData } = await api.post("/contacts", data);

      setContacts([...contacts!, contactData]);

      setAddModal(false);
      toast.success("Contato adicionado!");
    } catch {
      toast.error("Ops! Um contato com esse número já existe!");
    }
  };

  const updateContact = async (data: IUpdatedContact) => {
    const { data: contactData } = await api.patch(
      `/contacts/${contactId}`,
      data
    );

    const findContact = contacts?.find((contact) => contact.id === contactId);
    const contactIndex = contacts?.indexOf(findContact!);

    contacts?.splice(contactIndex!, 1, contactData);

    setUpdateModal(false);
    toast.success("Contato atualizado!");
  };

  const deleteContact = async () => {
    await api.delete(`/contacts/${contactId}`);

    const findContact = contacts?.find((contact) => contact.id === contactId);
    const contactIndex = contacts?.indexOf(findContact!);

    contacts?.splice(contactIndex!, 1);

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
