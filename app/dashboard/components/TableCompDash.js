"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination, CircularProgress, Chip, Box } from "@mui/material";
import { useSelector } from "react-redux";

export default function TableCompDash() {
  const [pg, setpg] = React.useState(0);
  const [rpg, setrpg] = React.useState(5);

  const modelPredictionsState = useSelector((state) => state.modelPredictions);
  const selectedModelName = useSelector(
    (state) => state.selectedModelName.name
  );

  const pythonNameToDisplayNameMap = {
    xgboost: "XGBoost",
    random_forest: "Random Forest",
  };

  const handleChangePage = (event, newpage) => {
    setpg(newpage);
  };

  function handleChangeRowsPerPage(event) {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center">Rank</TableCell>
            <TableCell align="center">Stock</TableCell>
            <TableCell align="center">Model</TableCell>
            <TableCell align="center">Prediction Today</TableCell>
            <TableCell align="center">Prediction Last Day</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modelPredictionsState.loading ? (
            <Box></Box>
          ) : (
            modelPredictionsState.data[selectedModelName]
              .slice(pg * rpg, pg * rpg + rpg)
              .map((row, index) => {
                return (
                  <TableRow key={row.ticker}>
                    <TableCell component="th" scope="row" align="center">
                      {pg != 1 ? index + 1 : index + 6}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.ticker}
                    </TableCell>
                    <TableCell align="center">
                      {pythonNameToDisplayNameMap[selectedModelName]}
                    </TableCell>
                    <TableCell align="center">
                      {row.prediction === 1 ? (
                        <Chip label="Buy" color="success" />
                      ) : (
                        <Chip label="Don't buy" color="warning" />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.prev_weekday_prediction === 1 ? (
                        <Chip label="Buy" color="success" />
                      ) : row.prev_weekday_prediction === 0 ? (
                        <Chip label="Don't buy" color="warning" />
                      ) : (
                        <Chip label="No Prediction" color="info" />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
          )}
        </TableBody>
      </Table>
      {modelPredictionsState.loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress></CircularProgress>
        </Box>
      ) : (
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={modelPredictionsState.data[selectedModelName].length}
          rowsPerPage={rpg}
          page={pg}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </TableContainer>
  );
}
