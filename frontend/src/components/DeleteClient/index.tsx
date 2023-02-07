import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useClientContext } from "../../contexts/ClientContext";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

const DeleteClient = () => {
  const { deleteClientModal, setDeleteClientModal, deleteClient } =
    useClientContext();

  return (
    <Dialog open={deleteClientModal}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton disableRipple>
          <NotListedLocationIcon
            sx={{ fontSize: "8rem", cursor: "default", color: "#f73748" }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" textAlign="center">
          Tem certeza que deseja deletar sua conta?
        </Typography>
        <Typography textAlign="center">
          Essa ação não pode ser desfeita
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setDeleteClientModal(false)}
        >
          Não
        </Button>
        <Button variant="contained" color="error" onClick={deleteClient}>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteClient;
