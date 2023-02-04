import { useContactContext } from "../../contexts/ContactContext";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

const DeleteModal = () => {
  const { deleteModal, setDeleteModal, deleteContact } = useContactContext();

  return (
    <Dialog open={deleteModal}>
      <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton disableRipple>
          <NotListedLocationIcon
            sx={{ fontSize: "8rem", cursor: "default", color: "#f73748" }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" textAlign="center">
          Tem certeza que deseja deletar esse contato?
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
          onClick={() => setDeleteModal(false)}
        >
          Não
        </Button>
        <Button variant="contained" color="error" onClick={deleteContact}>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
