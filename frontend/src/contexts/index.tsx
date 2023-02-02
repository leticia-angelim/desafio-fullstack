import { ReactNode } from "react";
import { ClientProvider } from "./ClientContext";
import { ContactProvider } from "./ContactContext";

interface IProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
  return (
    <ClientProvider>
      <ContactProvider>{children}</ContactProvider>
    </ClientProvider>
  );
};

export default Providers;
