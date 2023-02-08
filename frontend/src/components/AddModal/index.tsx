import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { contactSchema } from "../../validators/contact";
import { IContact, useContactContext } from "../../contexts/ContactContext";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@material-ui/icons/Close";

const AddModal = () => {
  const { createContact, addModal, setAddModal } = useContactContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContact>({
    resolver: yupResolver(contactSchema),
  });

  return (
    <Dialog open={addModal}>
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Adicionar Contato
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => setAddModal(false)}
          >
            <CloseIcon fontSize="small" />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(createContact)}>
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <TextField
                id="name"
                type={"text"}
                label="Nome Completo *"
                {...register("name")}
                fullWidth
              />
              <FormHelperText error>{errors.name?.message}</FormHelperText>
            </Grid>
            <Grid xs={12} item>
              <TextField
                id="email"
                type={"email"}
                label="Email *"
                {...register("email")}
                fullWidth
              />
              <FormHelperText error>{errors.email?.message}</FormHelperText>
            </Grid>
            <Grid xs={12} item>
              <TextField
                id="phone"
                type={"tel"}
                label="Telefone *"
                placeholder="(00) 0000-0000"
                {...register("phone")}
                fullWidth
              />
              <FormHelperText error>{errors.phone?.message}</FormHelperText>
            </Grid>
            <Grid xs={4} margin={"0 auto"} item>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                ADICIONAR
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
