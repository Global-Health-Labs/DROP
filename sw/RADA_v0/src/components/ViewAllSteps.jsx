import React, { Component } from "react";
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Group column header (first row)
const columnHeaderFirstRow = [
  {
    label: 'Recipe For Each Mastermix',
    colSpan: 2
  }, 
  {
    label: 'Stock Concentration For Each Source In Mastermix Recipe',
    colSpan: 3
  }
];

// Column header (second row)
const columnHeaderSecondRow = [
  'Name of Mastermix',
  'Source', 'Final Concentration', 'Tip Washing',
  'Stock Concentration', 'Liquid Type', 'Dispense Type'
];

/**
 * This class renders the component to display all input experimental data from users in the tabular format.
 */
export default class ViewAllSteps extends Component {

  /** Call the parent component to edit row based on the specified row ID */
  editRow = (rowId) => {
    this.props.handleEditMasterMix(rowId);
  }

  /** Call the parent component to copy row based on the specified row ID */
  copyRow = (rowId) => {
    this.props.handleCopyMasterMix(rowId);
  }

  /** Call the parent component to delete row based on the specified row ID */
  deleteRow = (rowId) => {
    this.props.handleDeleteMasterMix(rowId);
  }

  render() {

    return (
      <Paper elevation={2} sx={styles.paperContainer}>

        <TableContainer component={Paper} sx={styles.tableContainer}>
          <Table stickyHeader sx={{ minWidth: 500}} padding="none" aria-label="data table">
            
            {/** Construct table header */}
            <TableHead>
              
              {/** First row of table header (group header) */}
              <TableRow>
                <StyledTableCell sx={{ borderRight: 1 }} colSpan={2}/>

                {columnHeaderFirstRow.map((val, index) => (
                  <StyledTableCell colSpan={val.colSpan} key={index} sx={{ borderRight: 1 }} >
                    {val.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell colSpan={7}/>
              </TableRow>

              {/** Second row of table header */}
              <TableRow>
                {columnHeaderSecondRow.map((label, index) => (
                  <StyledTableCell sx={{ borderRight: 1 }} key={index}>{label}</StyledTableCell>
                ))}
                <StyledTableCell colSpan={3}>Actions</StyledTableCell>
              </TableRow>

            </TableHead>

            {/** Construct table body */}
            <TableBody>
              
              {/** Loop through each mastermix object */}
              {this.props.data.map((row) => {

                // Loop through each entry of recipe for each mastermix
                return (
                  row.recipeForEachMasterMix.map((recipe, i) => (

                    // Populate each cell with the input data from users retrieve from browser cache
                    <StyledTableRow hover={true} key={i}>

                      {i === 0 && BodyCell(row.nameOfMasterMix, row)}

                      {BodyCellMultiRow(recipe.finalSource)}
                      {BodyCellMultiRow(recipe.finalConcentration + (recipe.unit ? (" " + recipe.unit) : ""))}
                      {BodyCellMultiRow(recipe.tipWashing)}
                      {BodyCellMultiRow(recipe.stockConcentration + (recipe.unit ? (" " + recipe.unit) : ""))}
                      {BodyCellMultiRow(recipe.liquidType)}
                      {BodyCellMultiRow(recipe.dispenseType)}

                      {/** Add button to edit the record of the specified row */}
                      {i === 0 && 
                      <StyledTableCell rowSpan={row.recipeForEachMasterMix.length} size="small" sx={styles.tableCell}>
                        <ModeEditOutlineRoundedIcon sx={{color: '#1183ca'}} onClick={()=>(this.editRow(row.id))}/>
                      </StyledTableCell>}

                      {/** Add button to copy the record of the specified row */}
                      {i === 0 && 
                      <StyledTableCell rowSpan={row.recipeForEachMasterMix.length} size="small" sx={{...styles.tableCell}}>
                        <ContentCopyIcon sx={{color: '#1183ca'}} onClick={()=>(this.copyRow(row.id))}/>
                      </StyledTableCell>}

                      {/** Add button to de;ete the record of the specified row */}
                      {i === 0 && 
                      <StyledTableCell rowSpan={row.recipeForEachMasterMix.length} size="small" sx={{...styles.tableCell, borderRight: 0}}>
                        <DeleteForeverRoundedIcon sx={{color: 'red'}} onClick={()=>(this.deleteRow(row.id))}/>
                      </StyledTableCell>}

                    </StyledTableRow>
                  ))
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

/** Add styling to the table rows */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(even)': {
  //   backgroundColor: theme.palette.action.hover,
  // }
}));

/** Cell component with regular one line record */
const BodyCell = (label, row) => (
  <StyledTableCell rowSpan={row.recipeForEachMasterMix.length} sx={styles.tableCell}>
    {label}
  </StyledTableCell>
);

/** Cell component with multi-row record */
const BodyCellMultiRow = (label) => (
  <StyledTableCell sx={styles.tableCell}>
    {label}
  </StyledTableCell>
);

/** Styling for elements render in this component */
const styles = {
  paperContainer: {
    justifyContent: 'center', width: '95%', overflow: 'auto'
  },
  tableContainer: {
    maxHeight: '55vh'
  },
  tableCell: {
    borderRight: 1, borderBottom: "2px solid rgb(212, 212, 212)" 
  }
}