import React, { Component } from "react";
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';

// Column headers
const columnHeaders = [
  'Name of Experimental Plan',
  'Number of Samples',
  'Number of Technical Replicates',
  'Mastermix Volume Per Reaction (uL)',
  'Sample Volume Per Reaction (uL)',
  'PCR Plate Size',
  'Edit'
];

/**
 * This class renders the component to display input experimental data from users in the tabular format.
 */
export default class ViewExperimentalPlanTable extends Component {

  /** Call the parent component to edit row based on the specified row ID */
  editRow = (rowId) => {
    this.props.handleEditExperimentalPlan(rowId);
  }

  render() {

    return (
      <Paper elevation={2} sx={styles.paperContainer}>

        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table stickyHeader sx={{ minWidth: 500}} padding="none" aria-label="data table">
            
            {/** Construct table header */}
            <TableHead sx={{height: 50}}>
              <TableRow>
                {columnHeaders.map((label, index) => (
                  <StyledTableCell sx={{ borderRight: 1 }} key={index}>{label}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>

            {/** Construct table body */}
            <TableBody>
              
              {/** Loop through experimental plan object */}
              {this.props.data.map((row, i) => {

                // Note that there should only be one entry of experimental plan
                return (

                  // Populate each cell with the input data from users retrieve from browser cache
                  <TableRow hover={true} key={i}>

                    <StyledTableCell sx={{...styles.tableCell, fontWeight: 'bold'}}>{row.nameOfExperimentalPlan}</StyledTableCell>
                    <StyledTableCell sx={styles.tableCell}>{row.numOfSampleConcentrations}</StyledTableCell>
                    <StyledTableCell sx={styles.tableCell}>{row.numOfTechnicalReplicates}</StyledTableCell>
                    <StyledTableCell sx={styles.tableCell}>{row.masterMixVolumnPerReaction}</StyledTableCell>
                    <StyledTableCell sx={styles.tableCell}>{row.sampleVolumnPerReaction}</StyledTableCell>
                    <StyledTableCell sx={styles.tableCell}>{row.pcrPlateSize}</StyledTableCell>

                    {/** Add button to edit the record of the specified row */}
                    <StyledTableCell size="small">
                      <ModeEditOutlineRoundedIcon sx={{color: '#1183ca'}} onClick={()=>(this.editRow(row.experimentalPlanID))}/>
                    </StyledTableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}

/**  Add styling to the table cell */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#022e3e',
    color: theme.palette.common.white,
    padding: 3,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: 'center'
  },
}));

/** Styling for elements render in this component */
const styles = {
  paperContainer: {
    justifyContent: 'center', width: '95%', overflow: 'auto'
  },
  tableContainer: {
    maxHeight: '60vh'
  },
  tableCell: {
    borderRight: 1, borderBottom: "2px solid rgb(212, 212, 212)" 
  }
}