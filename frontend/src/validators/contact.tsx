import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  phone: yup.string().required("Campo obrigatório"),
});
