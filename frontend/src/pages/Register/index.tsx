import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { clientSchema } from "../../validators/client";
import { IClient, useClientContext } from "../../contexts/ClientContext";

import ContainerMotion from "../../components/Animation";
import {
  AppBar,
  Button,
  CardContent,
  Container,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

const Register = () => {
  const { registerClient } = useClientContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClient>({
    resolver: yupResolver(clientSchema),
  });

  return (
    <ContainerMotion>
      <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kenzie Contacts
          </Typography>
          <Button
            onClick={() => navigate("/login", { replace: true })}
            color="inherit"
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "5rem",
        }}
      >
        <Paper elevation={12} sx={{ maxWidth: 450, padding: "20px 5px" }}>
          <CardContent>
            <Typography
              variant="h2"
              sx={{ textAlign: "center", marginBottom: "2rem" }}
            >
              Crie sua conta
            </Typography>
            <form onSubmit={handleSubmit(registerClient)}>
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
                    type={"text"}
                    label="Email *"
                    {...register("email")}
                    fullWidth
                  />
                  <FormHelperText error>{errors.email?.message}</FormHelperText>
                </Grid>
                <Grid xs={12} item>
                  <TextField
                    id="password"
                    type={"password"}
                    label="Senha *"
                    {...register("password")}
                    fullWidth
                  />
                  <FormHelperText error>
                    {errors.password?.message}
                  </FormHelperText>
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
                    Cadastrar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Paper>
      </Container>
    </ContainerMotion>
  );
};

export default Register;
