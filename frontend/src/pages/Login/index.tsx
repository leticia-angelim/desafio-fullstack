import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../../validators/client";
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

const Login = () => {
  const { loginClient } = useClientContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IClient>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <ContainerMotion>
      <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kenzie Contacts
          </Typography>
          <Button
            onClick={() => navigate("/register", { replace: true })}
            color="inherit"
          >
            Cadastre-se
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={12} sx={{ maxWidth: 450, padding: "20px 5px" }}>
          <CardContent>
            <Typography
              variant="h2"
              sx={{ textAlign: "center", marginBottom: "2rem" }}
            >
              Login
            </Typography>
            <form onSubmit={handleSubmit(loginClient)}>
              <Grid container spacing={3}>
                <Grid xs={12} item>
                  <TextField
                    type={"text"}
                    label="Email *"
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
                  <FormHelperText error>
                    {errors.password?.message}
                  </FormHelperText>
                </Grid>
                <Grid xs={4} margin={"0 auto"} item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Entrar
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

export default Login;
