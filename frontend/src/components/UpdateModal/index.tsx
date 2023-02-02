import { useContactContext } from "../../contexts/ContactContext";
import CloseIcon from "@material-ui/icons/Close";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

interface IUpdateModalProps {
  name: string;
  email: string;
  phone: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

const UpdateModal = ({
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone,
}: IUpdateModalProps) => {
  const { updateContact, setUpdateModal, updateModal } = useContactContext();

  const contactData = { name, email, phone };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateContact(contactData);
  };

  return (
    <Dialog open={updateModal}>
      <DialogTitle>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Contato
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => setUpdateModal(false)}
          >
            <CloseIcon fontSize="small" />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <TextField
                type={"text"}
                label="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                type={"email"}
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid xs={12} item>
              <TextField
                type={"tel"}
                label="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid xs={4} margin={"0 auto"} item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
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

export default UpdateModal;
