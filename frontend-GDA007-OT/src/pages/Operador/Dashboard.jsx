// import React from "react";
// import { Button, Typography, Box } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";

// const Dashboard = () => {
//   const { user, logout } = useAuth();

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h5">Bienvenido, {user?.email}</Typography>
//       <Button onClick={logout} variant="outlined" sx={{ mt: 2 }}>
//         Cerrar Sesión
//       </Button>
//     </Box>
//   );
// };

// export default Dashboard;

// src/pages/Operator/Dashboard.jsx
import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import OperatorLayout from "../../layouts/OperadorLayout";

const Dashboard = () => {
  const orders = [
    { id: 1, client: "Juan Pérez", total: "$350", status: "Pendiente" },
    { id: 2, client: "María Gómez", total: "$120", status: "Pendiente" },
  ];

  return (
    <OperatorLayout>
      <Typography variant="h4" gutterBottom>
        Resumen del Sistema
      </Typography>

      {/* Estadísticas */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Pedidos Pendientes</Typography>
            <Typography variant="h4">15</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Productos Activos</Typography>
            <Typography variant="h4">120</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Clientes Registrados</Typography>
            <Typography variant="h4">350</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Pedidos recientes */}
      <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
        Pedidos Recientes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell># Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.client}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success">
                    Autorizar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </OperatorLayout>
  );
};

export default Dashboard;
