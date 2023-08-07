import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(stock, model, prediction) {
  return { stock: stock, model: model, prediction: prediction };
}

const rows = [
  createData("GameStop", "LSTM", "Buy"),
  createData("AAPL", "LSTM", "Buy"),
  createData("AMC", "LSTM", "Sell"),
  createData("TSLA", "LSTM", "Buy"),
  createData("GME", "LSTM", "Buy"),
];

export default function TableCompHome() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Stock</TableCell>
            <TableCell align="center">Model</TableCell>
            <TableCell align="center">Prediction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.stock}>
              <TableCell component="th" scope="row" align="center">
                {row.stock}
              </TableCell>
              <TableCell align="center">{row.model}</TableCell>
              <TableCell align="center">{row.prediction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
