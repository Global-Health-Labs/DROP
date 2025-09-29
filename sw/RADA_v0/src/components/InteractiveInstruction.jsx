import React, { Component } from "react";
import { Stage, Layer, Rect, Group, Text } from 'react-konva';
import { Snackbar, Alert, Checkbox, Table, TableBody, TableContainer, TableHead, TableCell, TableRow, Grid, Stack, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import Header from "./PageHeader";
import UploadIcon from '@mui/icons-material/Upload';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Link } from 'react-router-dom';

import { LOCAL_KEY_STORAGE, SPECIAL_CHAR_FILE } from "../config/Configurations";

import { getInstructionData } from "./GenerateInstructionData";

// Deck layout coordinates
const LAYOUT_CONTAINER_WIDTH = window.innerWidth * 2/3 - 100;
const LAYOUT_CONTAINER_HEIGHT = window.innerHeight / 3 + 50;

const OFFSET = 100;
const LAYOUT_WIDTH = LAYOUT_CONTAINER_WIDTH - OFFSET;
const LAYOUT_HEIGHT = LAYOUT_CONTAINER_HEIGHT - 10;
const START_X_LAYOUT = OFFSET / 2;

const TIP_START_Y = 55;
const TIP_START_X = START_X_LAYOUT + 30;
const TIP_HEIGHT = LAYOUT_HEIGHT - TIP_START_Y - 20;
const TIP_WIDTH = (LAYOUT_WIDTH / 6) - 65;
const PLATE_TIP_WIDTH = TIP_WIDTH + 80;
const PLATE_HEIGHT = (TIP_HEIGHT / 5) - 8;

const PLATE_COLOR = '#FFF';

export default class InteractiveInstruction extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, // flag to track if the webpage is still loading
      experimentalPlanData: JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.COMMON_EXPERIMENTAL_PLAN_FIELDS)) || [],
      listOfMastermixes: JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.RECIPE_STEPS)) || [],
      listOfExperimentalPlan: JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.EXPERIMENTAL_PLAN)) || [],
      currentPlateWell: 96, // 96 or 384
      plate_1_A: PLATE_COLOR,
      selectedDeck: '',
      currentInstruction: '',
      isUploadedFile: false,
      selectedRowId: '',

      // Used for building instruction
      selectedSolution: '',
      selectedVolume: 0,
      selectedWellId: 0,
      selectedWellLabel: '',
      selectedPlate: ''

    }
  }

  componentDidMount() {
    if (this.state.experimentalPlanData.length > 0) {
      // Generate instruction
      const instructionData = getInstructionData(this.state.listOfMastermixes, this.state.experimentalPlanData);
      //console.log('Instruction', instructionData);

      // Updated list to be saved to browser cache
      localStorage.setItem(LOCAL_KEY_STORAGE.EXPERIMENTAL_PLAN, JSON.stringify(instructionData));
      this.setState({listOfExperimentalPlan: instructionData});
    }
  }

  closeSuccessDialog = () => {
    this.setState({isUploadedFile: false});
  }

  renderDeckLayout = () => {

    var plate_sealer_X = TIP_START_X + 220 + (4 * (TIP_WIDTH + 22));
    var waste_X = TIP_START_X + 220 + (5 * (TIP_WIDTH + 22));

    return (
      <Group>

        <Text x={TIP_START_X} y={20} text={'Tip\nLocations'} align={'center'} fontStyle='bold' />
        <Rect
          x={TIP_START_X}
          y={TIP_START_Y}
          width={TIP_WIDTH}
          height={TIP_HEIGHT}
          fill={PLATE_COLOR}
          stroke={'black'}
          shadowBlur={5}
          onClick={() => {
            //console.log('Click Tip Location');
          }}
        />

        <Text x={TIP_START_X + TIP_WIDTH} y={20} text={'Plate Locations\nOn Deck'} align={'center'} width={PLATE_TIP_WIDTH * 3 + 80} fontStyle='bold' />
        
        {this.renderPlateLocation(TIP_START_X + TIP_WIDTH + 20, [
          PLATE_LAYOUT_NAME.IVL_96_FLAT_01, 
          PLATE_LAYOUT_NAME.IVL_96_FLAT_02,
          PLATE_LAYOUT_NAME.IVL_96_DW_01,
          PLATE_LAYOUT_NAME.IVL_96_DW_02,
          PLATE_LAYOUT_NAME.IVL_96_FLAT_03])}

        {this.renderPlateLocation(TIP_START_X + 70 + (2 * (TIP_WIDTH + 20)), [
          PLATE_LAYOUT_NAME.PCR_COOLER_01,
          PLATE_LAYOUT_NAME.PCR_COOLER_02,
          PLATE_LAYOUT_NAME.PCR_COOLER_03,
          PLATE_LAYOUT_NAME.IVL_384_FLAT_01,
          PLATE_LAYOUT_NAME.IVL_384_FLAT_02])}

        {this.renderPlateLocation(TIP_START_X + 150 + (3 * (TIP_WIDTH + 20)), [
          PLATE_LAYOUT_NAME.IVL_96_TEMPLATE_01,
          PLATE_LAYOUT_NAME.PCR_COOLER_04,
          PLATE_LAYOUT_NAME.PCR_COOLER_05,
          PLATE_LAYOUT_NAME.PCR_COOLER_06,
          PLATE_LAYOUT_NAME.PCR_COOLER_07])}

        <Text x={plate_sealer_X} y={20} text={'Plate\nSealer'} align={'center'} fontStyle='bold' />
        <Rect
          x={plate_sealer_X}
          y={TIP_START_Y}
          width={TIP_WIDTH}
          height={TIP_HEIGHT}
          fill={PLATE_COLOR}
          stroke={'black'}
          shadowBlur={5}
          onClick={() => {
            //console.log('Click Plate Sealer');
          }}
        />

        <Text x={waste_X} y={20}  text="Waste" fontStyle='bold' />
        <Rect
          x={waste_X}
          y={TIP_START_Y + (TIP_HEIGHT / 5)}
          width={TIP_WIDTH}
          height={TIP_HEIGHT / 1.5}
          fill={PLATE_COLOR}
          stroke={'black'}
          shadowBlur={5}
          onClick={() => {
            //console.log('Click Waste');
          }}
        />

      </Group>
    )
  }

  renderPlateLocation = (start_x_location, textList) => {

    var screenWidth = window.screen.width;
    var fontSize = screenWidth < 1500 ? 11 : 14;
    var plateList = [];
    var start_y_location = TIP_START_Y;

    for (var i = 0; i < 5; i++) {
      plateList.push(
        <Group key={i}>
          <Rect
            id={i + ' - ' + textList[i]}
            x={start_x_location}
            y={start_y_location}
            width={PLATE_TIP_WIDTH}
            height={PLATE_HEIGHT}
            fill={this.state.selectedPlate === textList[i] ? 'red' : this.state.plate_1_A}
            stroke={'black'}
            shadowBlur={2}
            onClick={(event) => {
              //console.log('Click ', event.target.attrs.id);
            }}
          />
          <Text x={start_x_location} y={start_y_location} height={PLATE_HEIGHT} verticalAlign='middle' align='center' width={PLATE_TIP_WIDTH} text={textList[i]} fontSize={fontSize}
            fill={this.state.selectedPlate === textList[i] ? 'white' : 'black'} />
        </Group>
      );

      start_y_location = TIP_START_Y + ((i+1) * (PLATE_HEIGHT + 10));
    }

    return (
      <Group>
        {plateList}
      </Group>
    );
  }

  handleButtonClick = () => {
    this.setState({plate_1_A: 'red'});
  }

  renderPlateTableLayout = () => {

    var tableWidth = '70vh';

    var horizontalHeader = [];
    var maxColumn = this.state.currentPlateWell === 96 ? 12 : 24;
    var maxRow = this.state.currentPlateWell === 96 ? 8 : 16;
    var cellWidth = 70 / (maxColumn + 1);

    for (var i = 1; i <= maxColumn; i++) {
      horizontalHeader.push(
        <TableCell key={i} align="center" style={{ minWidth: cellWidth, maxWidth: cellWidth }}>
          {i}
        </TableCell>
      );
    }

    // Draw square for each row
    var currentChar = 'A';
    var rowList = [];

    for (var j = 1; j <= maxRow; j++) {

      // Draw empty 12 columns
      const squareList = [];
      for (var k = 1; k <= maxColumn; k++) {
        var currentCell = maxRow * (k - 1) + j;
        squareList.push(
          <TableCell key={k} style={{border: '1px solid #022e3e', 
            backgroundColor: this.state.selectedWellId === currentCell ? 'red' : '#FFF'}}>
          </TableCell>
        );
      }

      rowList.push(
        <TableRow key={j} hover={true}>
          <TableCell key={j} align="center" style={{ minWidth: cellWidth, maxWidth: cellWidth }}>{currentChar}</TableCell>
          {squareList}
        </TableRow>
      )

      currentChar = String.fromCharCode(currentChar.charCodeAt(0) + 1);
    }

    return (
      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table stickyHeader sx={{ maxWidth: tableWidth, height: '35vh' }} padding="none" aria-label="data table"
          style={{border: '2px solid black'}}>
          
          {/** Construct table header */}
          <TableHead>
            {/** Numeric table header */}
            <TableRow>
              <TableCell></TableCell>
              {horizontalHeader}
            </TableRow>
          </TableHead>

          {/** Construct table body */}
          <TableBody>
            {rowList}

            <TableRow>
              <TableCell />
            </TableRow>
          </TableBody>
          </Table>
      </TableContainer>
    );
  }

  renderSolutionTable = () => {

    return (
      <TableContainer sx={{marginBottom: 5, marginLeft: 3}}>
        <Table stickyHeader sx={{maxHeight: '40vh' }} padding="none" aria-label="data table"
          style={{border: '2px solid black'}}>
          
          {/** Construct table header */}
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ borderRight: 1 }}>Solution</StyledTableCell>
              <StyledTableCell sx={{ borderRight: 1 }}>Plate</StyledTableCell>
              <StyledTableCell sx={{ borderRight: 1, paddingLeft: 1, paddingRight: 1 }}>Well</StyledTableCell>
              <StyledTableCell>Done</StyledTableCell>
            </TableRow>
          </TableHead>

          {/** Construct table body */}
          <TableBody>
            {this.state.listOfExperimentalPlan.map((row, i) => {
              return (
                <StyledTableRow key={i} onClick={() => {
                  //console.log('Click', row);

                  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
                  var label = (row.well % 8 === 0 ? 'H' : alphabet[(row.well % 8) - 1]) + Math.ceil(row.well / 8);

                  this.setState({
                    selectedSolution: row.source,
                    selectedVolume: row.totalSourceVolumes,
                    selectedWellId: row.well,
                    selectedPlate: row.plate,
                    selectedWellLabel: label,
                    selectedRowId: row.id
                  });

                  if ((row.plate.trim() === PLATE_LAYOUT_NAME.IVL_384_FLAT_01) || row.plate.trim() === PLATE_LAYOUT_NAME.IVL_384_FLAT_02) {
                    this.setState({currentPlateWell: 384});
                  } else {
                    this.setState({currentPlateWell: 96});
                  }

                }}>
                  <StyledTableCell style={{color: this.state.selectedRowId === row.id ? 'white' : row.isDone ? 'gray' : 'black', fontWeight: row.isDone ? 'normal' : 'bold', backgroundColor: this.state.selectedRowId === row.id ? 'red' : '#FFF'}}>{row.source}</StyledTableCell>
                  <StyledTableCell style={{color:this.state.selectedRowId === row.id ? 'white' : row.isDone ? 'gray'  : 'black', backgroundColor: this.state.selectedRowId === row.id ? 'red' : '#FFF'}}>{row.plate}</StyledTableCell>
                  <StyledTableCell style={{color: this.state.selectedRowId === row.id ? 'white' : row.isDone ? 'gray'  : 'black', backgroundColor: this.state.selectedRowId === row.id ? 'red' : '#FFF', textAlign: 'center'}}>{row.well}</StyledTableCell>
                  <StyledTableCell style={{textAlign: 'center', backgroundColor: this.state.selectedRowId === row.id ? 'red' : '#FFF'}}>
                    <Checkbox sx={{color: this.state.selectedRowId === row.id ? 'white' : 'black'}} checked={row.isDone} inputProps={{ 'aria-label': 'controlled' }} onClick ={() => {
                      const copyList = [...this.state.listOfExperimentalPlan];
                      var index = copyList.findIndex((editedRow) => editedRow.id === row.id);

                      copyList[index].isDone = !row.isDone;
                      localStorage.setItem(LOCAL_KEY_STORAGE.EXPERIMENTAL_PLAN, JSON.stringify(copyList));
                      this.setState({listOfExperimentalPlan: copyList});
                    }}/>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })

            }
            
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  /** Handle the action to import text file that contains data to be populated to the table */
  importTableFile = async (e) => {
    e.preventDefault()
    const fileReader = new FileReader();
    fileReader.onload = async (e) => { 
      const inputData = (e.target.result)
      const splitData = inputData.split(SPECIAL_CHAR_FILE);

      // Parse experimental plan data
      var experimentalData = JSON.parse(splitData[1].replace(/[\n\r]/g,''));

      // Parse mastermix data
      var mastermixData = JSON.parse(splitData[2].replace(/[\n\r]/g,''));

      // Updated list to be saved to browser cache
      try {
        localStorage.removeItem(LOCAL_KEY_STORAGE.RECIPE_STEPS);
        localStorage.removeItem(LOCAL_KEY_STORAGE.EXPERIMENTAL_PLAN);

        // Updated list to be saved to browser cache
        localStorage.setItem(LOCAL_KEY_STORAGE.COMMON_EXPERIMENTAL_PLAN_FIELDS, JSON.stringify(experimentalData));
        localStorage.setItem(LOCAL_KEY_STORAGE.RECIPE_STEPS, JSON.stringify(mastermixData));
        
        // Reassign new uploaded value
        this.setState({isUploadedFile: true, 
          listOfMastermixes: mastermixData, 
          listOfExperimentalPlan: [],
          experimentalPlanData: experimentalData,
          selectedSolution: '',
          selectedVolume: 0,
          selectedWellId: 0,
          selectedWellLabel: '',
          selectedPlate: ''}, () => {
          // Generate instruction
          const instructionData = getInstructionData(this.state.listOfMastermixes, this.state.experimentalPlanData);

          // Updated list to be saved to browser cache
          localStorage.setItem(LOCAL_KEY_STORAGE.EXPERIMENTAL_PLAN, JSON.stringify(instructionData));
          this.setState({listOfExperimentalPlan: instructionData});
        });
      } catch (error) {
        //
      }
    };
    fileReader.readAsText(e.target.files[0]);
  }

  render() {

    return (
      <div style={styles.container}>

        <Header title={'RoboNAAT Worklist Viewer'}/>

        {/** Section to display file uploading (above the solution table) */}
        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
          <Paper elevation={3} sx={{marginLeft: 5, marginRight: 10, marginTop: 5, width: '100vh'}}>

            <div style={{textAlign: 'left', padding: 5}}>
              To use the interactive experimental plan, please upload the existing mastermix table file <span style={{fontStyle: 'italic', color: 'red'}}>(*experimental-plan-RoboNAAT.txt)</span> or create a new mastermix experiment.
            </div>
            
            <div style={{padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <Button variant="contained" color="success" size="medium" sx={{width: '40vh'}} component="label" startIcon={<UploadIcon />}>
                Upload Existing Experimental Plan
                <input hidden accept=".txt" multiple type="file" onChange={(e) => this.importTableFile(e)}  />
              </Button>
              <div style={{padding: 5}} />
              <Button variant="contained" size="medium" sx={{width: '40vh'}} startIcon={<AddCircleRoundedIcon/>} 
                component={Link} to="/">
                Create New Mastermix Experiment
              </Button>
            </div>
          </Paper>
        </div>

        <div style={{justifyContent: 'center', alignItems: 'center', paddingTop: 10, display: 'flex', paddingBottom: 20}}>
          This web app interactively guides the loading of reagents for an automatically generated experiment on a RoboNAAT capable robot.
        </div>

        <hr style={{color: 'red', backgroundColor: tableHeaderColor, height: 5}} />

        <div style={{marginTop: 50}} />

        <Grid container spacing={1}>

          {/** Left side of the page */}
          <Grid item xs={4}>
            <div>
              {this.renderSolutionTable()}
            </div>
          </Grid>

          {/** Right side of the page */}
          <Grid item xs={8}>
            <div style={{height: '95vh', marginLeft: '10vh'}}>
              
              {/** Section for Plate Layout and Instruction */}
              <Stack spacing={1}>

                <div style={{display: 'flex', flexDirection: 'row'}}>

                  <div style={{display: 'flex', flexDirection: 'column', width: '70vh'}}>
                    {/** Section for plate layout view */}
                    <Paper elevation={5} sx={{paddingTop: 2, paddingBottom: 2, paddingLeft: 3, paddingRight: 3, height: '45vh'}}>
                      <div style={{fontWeight: 'bold', paddingBottom: 10, color: 'brown'}}>Plate Layout</div>
                      {this.renderPlateTableLayout()}
                    </Paper>
                  </div>
                  
                  {/** Section for experimental instruction */}
                  <div style={{display: 'flex'}}>
                    <Paper elevation={5} sx={{paddingTop: 2, paddingBottom: 2, marginLeft: 5, marginRight: 3, height: '45vh' }}>
                      <div style={{fontWeight: 'bold', textAlign: 'center', paddingBottom: 10, color: 'brown'}}>Instruction</div>
                      {
                        this.state.selectedVolume !== 0 ?
                        <div style={{marginTop: 20, paddingLeft: 5, paddingRight: 5, width: '30vh'}}>
                          Load 
                          <span style={{color: 'red', fontWeight: 'bold' }}> {this.state.selectedVolume} uL</span> of reagent
                          <span style={{color: 'red', fontWeight: 'bold' }}> {this.state.selectedSolution}</span> into well
                          <span style={{color: 'red', fontWeight: 'bold', fontStyle: 'italic' }}> {this.state.selectedWellLabel}</span> in plate at location
                          <span style={{color: 'red', fontWeight: 'bold' }}> {this.state.selectedPlate}</span> on the deck
                        </div> 
                        
                        : 
                        
                        this.state.listOfExperimentalPlan.length > 0 ?
                        <div style={{marginTop: 20, paddingLeft: 5, paddingRight: 5, width: '30vh'}}>
                          Click each row in the solution table to see the instruction on how to load the experiment.
                        </div>

                        :

                        <div style={{marginTop: 20, paddingLeft: 5, paddingRight: 5, width: '30vh'}}>
                          Import existing experimental plan or create a new one to see the instruction.
                        </div>
                      }
                    </Paper>
                  </div>
                </div>

              </Stack>

              {/** Section for Deck Layout */}
              <Stack spacing={1} paddingTop={5}>

                <Paper elevation={5} sx={{paddingTop: 2, paddingBottom: 2, marginRight: 3}}>

                  <div style={{fontWeight: 'bold', paddingBottom: 10, color: 'brown'}}>Deck Layout</div>

                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>

                    {/* <div style={{transform: [{ rotate: '90deg' }]}}>Left of Machine</div> */}
                  
                    <Stage width={LAYOUT_CONTAINER_WIDTH} height={LAYOUT_CONTAINER_HEIGHT}>
                      <Layer>
                        <Rect
                          x={START_X_LAYOUT}
                          y={0}
                          width={LAYOUT_WIDTH}
                          height={LAYOUT_HEIGHT}
                          cornerRadius={20}
                          stroke={'black'}
                          fill={'white'}
                          shadowBlur={5}
                          shadowOffsetX={10}
                          shadowOffsetY={5}
                          shadowOpacity={0.5}
                        />

                        {this.renderDeckLayout()}
                      </Layer>
                    </Stage>
                
                  </div>

                  <div style={{fontWeight: 'bold', paddingTop: 5}}>Front of Machine</div>

                </Paper>
              </Stack>

            </div>
          </Grid>

        </Grid>

        {
          <Snackbar open={this.state.isUploadedFile} onClose={this.closeSuccessDialog} 
            autoHideDuration={3000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
            <Alert onClose={this.closeSuccessDialog} severity="success" variant="filled" sx={{ width: '100%' }}>
              {'Experimental plan is successfully uploaded'}
            </Alert>
          </Snackbar>
        }

      </div>
    )
  }
}


/** Styling for elements render in this component */
const styles = {
  container: {
    //height:'90vh',  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
  },
  tableContainer: {
    maxHeight: '50vh'
  },
}

/** List of plate name located on the robot */
const PLATE_LAYOUT_NAME = {

  // First section of plate locations
  IVL_96_FLAT_01: 'ivl_96_flat_v1_0001',
  IVL_96_FLAT_02: 'ivl_96_flat_v1_0002',
  IVL_96_DW_01: 'ivl_96_dw_v1_0001', 
  IVL_96_DW_02: 'ivl_96_dw_v1_0002', 
  IVL_96_FLAT_03: 'ivl_96_flat_v1_0003',

  // Second section of plate locations
  PCR_COOLER_01: 'PCR_onCooler_0001', 
  PCR_COOLER_02: 'PCR_onCooler_0002', 
  PCR_COOLER_03: 'PCR_onCooler_0003', 
  IVL_384_FLAT_01: 'ivl_384_flat_v1_0001', 
  IVL_384_FLAT_02: 'ivl_384_flat_v1_0002',

  // Third section of plate locations
  IVL_96_TEMPLATE_01: 'ivl_96_template_v1_0001',
  PCR_COOLER_04: 'PCR_onCooler_0004', 
  PCR_COOLER_05: 'PCR_onCooler_0005', 
  PCR_COOLER_06: 'PCR_onCooler_0006', 
  PCR_COOLER_07: 'PCR_onCooler_0007'
}

/**  Add styling to the table cell */
const tableHeaderColor = '#022e3e';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: tableHeaderColor,
    color: theme.palette.common.white,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    textAlign: 'left',
    paddingLeft: 2,
    borderRight: 1
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    //backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

