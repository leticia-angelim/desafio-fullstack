import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EditMenu from "../../components/Menu";
import AddModal from "../../components/AddModal";
import EditClient from "../../components/EditClient";
import UpdateModal from "../../components/UpdateModal";
import DeleteModal from "../../components/DeleteModal";
import DeleteClient from "../../components/DeleteClient";
import ContainerMotion from "../../components/Animation";

import { useClientContext } from "../../contexts/ClientContext";
import { useContactContext } from "../../contexts/ContactContext";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {
  AppBar,
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";

const Dashboard = () => {
  const clientName = localStorage.getItem("@client:name");

  const { setClient, contacts } = useClientContext();
  const { setAddModal, setUpdateModal, setDeleteModal, setContactId } =
    useContactContext();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleClick = () => {
    localStorage.clear();
    setClient(null);
    navigate("/login", { replace: true });
  };

  return (
    <ContainerMotion>
      <AppBar color="primary">
        <Toolbar>
          <EditMenu />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: "1rem" }}
          >
            Olá, {clientName}!
          </Typography>
          <Button onClick={handleClick} color="inherit">
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ height: "100vh", margin: "5rem" }}>
        <Box
          sx={{
            padding: "1rem",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h2">Seus Contatos</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setAddModal(true)}
          >
            Novo Contato
            <AddIcon />
          </Button>
        </Box>
        <Paper elevation={12}>
          <Table>
            <TableHead sx={{ backgroundColor: "#2f4670" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Nome</TableCell>
                <TableCell sx={{ color: "white" }}>Email</TableCell>
                <TableCell sx={{ color: "white" }}>Telefone</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts?.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setContactId(contact.id);
                        setName(contact.name);
                        setEmail(contact.email);
                        setPhone(contact.phone);
                        setUpdateModal(true);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Button>
                    <Button
                      color="error"
                      onClick={() => {
                        setContactId(contact.id);
                        setDeleteModal(true);
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <AddModal />
        <UpdateModal
          name={name}
          email={email}
          phone={phone}
          setName={setName}
          setEmail={setEmail}
          setPhone={setPhone}
        />
        <DeleteModal />
        <EditClient />
        <DeleteClient />
      </Container>
    </ContainerMotion>
  );
};

export default Dashboard;
