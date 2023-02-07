import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { clientSchema } from "../../validators/client";
import { IClient, useClientContext } from "../../contexts/ClientContext";

import CloseIcon from "@material-ui/icons/Close";
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

const EditClient = () => {
  const { editClientModal, setEditClientModal, updateClient, client } =
    useClientContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClient>({
    resolver: yupResolver(clientSchema),
  });

  return (
    <Dialog open={editClientModal}>
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Sua conta
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => setEditClientModal(false)}
          >
            <CloseIcon fontSize="small" />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(updateClient)}>
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <TextField
                type={"text"}
                label="Nome Completo *"
                defaultValue={client?.name}
                {...register("name")}
                fullWidth
              />
              <FormHelperText error>{errors.name?.message}</FormHelperText>
            </Grid>
            <Grid xs={12} item>
              <TextField
                type={"email"}
                label="Email *"
                defaultValue={client?.email}
                {...register("email")}
                fullWidth
              />
              <FormHelperText error>{errors.email?.message}</FormHelperText>
            </Grid>
            <Grid xs={12} item>
              <TextField
                type={"password"}
                label="Senha *"
                {...register("password")}
                fullWidth
              />
              <FormHelperText error>{errors.password?.message}</FormHelperText>
            </Grid>
            <Grid xs={12} item>
              <TextField
                type={"tel"}
                label="Telefone *"
                defaultValue={client?.phone}
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
                Salvar
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClient;
