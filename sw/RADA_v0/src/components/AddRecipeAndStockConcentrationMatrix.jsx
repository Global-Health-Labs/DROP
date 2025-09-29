import { useState } from "react"
import { Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Paper, TextField, MenuItem } from '@mui/material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { DROPDOWN_OPTIONS } from "../config/FormInputValues";

// Hard-coded column name
const columnHeader = ['Source', 'Concentration Unit', 'Final Concentration', 'Stock Concentration', 'Tip Washing', 'Liquid Type', 'Dispense Type'];

/**
 * This class renders the component where users can input final concentration matrix.
 */
export default function AddFinalConcentrationMatrix(props) {

  const [rowsData, setRowsData] = useState(props.data);
 
  /** Insert new row in the table */
  const insertNewRow = () => {

    const rowsInput = {
      finalSource:'',
      unit: '',
      finalConcentration: -1,
      tipWashing: '',
      stockConcentration: -1,
      liquidType: '',
      dispenseType: ''
    }

    const updateRow = [
      // copy the current row state
      ...rowsData,
      // add new object to array
      rowsInput
    ]
    setRowsData(updateRow);
  }

  /** Delete the specific row in the table based on the provided index */
  const deleteTableRows = (index) => {

    if (rowsData.length === 1) {
      // If there's one row, disable row deletion; just clear the value in the form
      const emptyRowInput = {
        finalSource:'',
        unit: '',
        finalConcentration: -1,
        tipWashing: '',
        stockConcentration: -1,
        liquidType: '',
        dispenseType: ''
      }
      const rows = [emptyRowInput];
      setRowsData(rows);

    } else {
      const rows = [...rowsData];
      rows.splice(index, 1);
      setRowsData(rows);

      // Updated list to be saved to app cache
      props.setRow(rows);
    }
  }
 
  /** Handle the action when the value is changing in the table */
  const handleChange = (index, evnt, value) => {
    const { name } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);

    // List to be saved to app cache
    props.setRow(rowsInput);
  }
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper} sx={{maxHeight: 400}}>

        <Table stickyHeader aria-label="data table">

          {/** Construct table header */}
          <TableHead>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              {columnHeader.map((label, index) => (
                <TableCell style={{fontWeight: 'bold', textAlign: 'left'}} key={index}>{label}</TableCell>
              ))}

              <TableCell><AddBoxRoundedIcon onClick={insertNewRow} sx={{color: 'green'}}/></TableCell>
            </TableRow>
          </TableHead>

          {/** Construct table body */}
          <TableBody>

            {rowsData.map((data, index)=> {
              
              const {finalSource, unit, finalConcentration, tipWashing, stockConcentration, 
                liquidType, dispenseType} = data;

              return(
                <TableRow key={index} hover={true}>
                  
                  <TableCell size='small'>
                    <TextField
                      required size="small" hiddenLabel
                      name='finalSource'
                      value={finalSource}
                      type='text'
                      error={finalSource.length === 0}
                      helperText={((finalSource.length > 0) || !props.showHelperText) ? "" : "Source must not be empty"}
                      onChange={(evnt)=> {
                        (handleChange(index, evnt, evnt.target.value));
                      }}
                    />
                  </TableCell>

                  <TableCell size='small'>
                    <TextField
                      name='unit'
                      value={unit === undefined ? '' : unit}
                      select fullWidth
                      required size="small" hiddenLabel
                      error={(unit === undefined || unit === "")}
                      helperText={((unit === undefined || unit === "") && (props.showHelperText)) ? "Please Choose" : ""}
                      onChange={(evnt)=>(handleChange(index, evnt, evnt.target.value))}
                    >
                      {DROPDOWN_OPTIONS.UNITS.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell size='small'>
                    <TextField
                      required size="small" hiddenLabel
                      name='finalConcentration'
                      type='Number'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Number(finalConcentration) <= 0}
                      helperText={(Number(finalConcentration) <= 0 && props.showHelperText) ? "Value must be greater than 0" : ""}
                      value={Number(finalConcentration) === -1 ? 0 : Number(finalConcentration)}   
                      onChange={(evnt)=>(handleChange(index, evnt, Number(evnt.target.value)))}
                    />
                  </TableCell>

                  <TableCell size='small'>
                    <TextField
                      required size="small" hiddenLabel
                      name='stockConcentration'
                      type='Number'
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={Number(stockConcentration) <= 0}
                      helperText={(Number(stockConcentration) <= 0 && props.showHelperText) ? "Value must be greater than 0" : ""}
                      value={Number(stockConcentration) === -1 ? 0 : Number(stockConcentration)}        
                      onChange={(evnt)=>(handleChange(index, evnt, Number(evnt.target.value)))}
                    />
                  </TableCell>

                  <TableCell size='small'>
                    <TextField
                      name='tipWashing'
                      value={tipWashing === undefined ? '' : tipWashing}
                      select fullWidth
                      required size="small" hiddenLabel
                      error={(tipWashing === undefined || tipWashing === "")}
                      helperText={((tipWashing === undefined || tipWashing === "") && (props.showHelperText)) ? "Please Choose" : ""}
                      onChange={(evnt)=>(handleChange(index, evnt, evnt.target.value))}
                    >
                      {DROPDOWN_OPTIONS.TIP_WASHING.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell size='small'>
                    <TextField
                      name='liquidType'
                      value={liquidType === undefined ? '' : liquidType}
                      select
                      required size="small" hiddenLabel fullWidth
                      error={(liquidType === undefined || liquidType === "")}
                      helperText={((liquidType === undefined || liquidType === "") && (props.showHelperText)) ? "Please Choose" : ""}
                      onChange={(evnt)=>(handleChange(index, evnt, evnt.target.value))}
                    >
                      {DROPDOWN_OPTIONS.LIQUID_TYPE.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell size='small'>
                    <TextField
                      name='dispenseType'
                      value={dispenseType === undefined ? '' : dispenseType}
                      select
                      required size="small" hiddenLabel fullWidth
                      error={(dispenseType === undefined || dispenseType === "")}
                      helperText={((dispenseType === undefined || dispenseType === "") && (props.showHelperText)) ? "Please Choose" : ""}
                      onChange={(evnt)=>(handleChange(index, evnt, evnt.target.value))}
                    >
                      {DROPDOWN_OPTIONS.DISPENSE_TYPE.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  
                  {
                    rowsData.length > 1 &&
                      <TableCell size="small"><DeleteForeverRoundedIcon sx={{color: 'red'}} onClick={()=>(deleteTableRows(index))}/></TableCell>
                  }

                </TableRow>
              )
            })}

          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  )

}
