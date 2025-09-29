import React, { Component } from "react";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { LOCAL_KEY_STORAGE, SPECIAL_CHAR_FILE } from "../config/Configurations";
import AddNewStep from "./AddNewStep";
import ViewAllSteps from "./ViewAllSteps";
import ViewExperimentalPlanTable from "./ViewExperimentalPlanTable";
import Header from "./PageHeader";
import CreateNewExperiment from "./CreateNewExperiment";

/**
 * This class renders the main component where user has the ability to create worklist
 * and view/delete existing steps.
 */
export default class MainWorkListPage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, // flag to track if the webpage is still loading
      listOfRecipeSteps: JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.RECIPE_STEPS)) || [],
      experimentalPlanData: JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.COMMON_EXPERIMENTAL_PLAN_FIELDS)) || [],
      
      // State to handle mastermix form
      openInputForm: false,
      activeStep: 0,
      createNewWorkList: false,
      isAddedNewMastermixSucceed: false,
      isMastermixDeleted: false,
      isEditForm: false,

      // State to handle experimental plan form
      openExperimentalPlanForm: false,
      isAddedNewExperimentalPlanSucceed: false,
      isExperimentalPlanDeleted: false,
      isEditExperimentalPlanForm: false,

      rowId: 0,
      nameOfMastermix: '',
      recipeForEachMasterMix: [{
        finalSource:'',
        unit: '',
        finalConcentration: -1,
        tipWashing: '',
        stockConcentration: -1,
        liquidType: '',
        dispenseType: ''
      }],
      nameOfExperimentalPlan: '',
      masterMixVolumnPerReaction: -1,
      sampleVolumnPerReaction: -1,
      numOfSampleConcentrations: -1,
      numOfTechnicalReplicates: -1,
      pcrPlateSize: ''
    }
  }

  /** Update the state when "Add New Step" button is clicked in order to display the form */
  handleAddNewStepForm = () => {
    this.clearState();
    this.setState({openInputForm: true});
  };

  /** Update the state when add new experimental plan button is clicked in order to display the form */
  handleAddNewExperimentalPlanForm = () => {
    this.clearState();
    this.setState({openExperimentalPlanForm: true});
  };

  /** Update the state to close the experimental plan form */
  handleCloseExperimentalForm = (event, reason) => {

    // Pressing 'Esc' or clicking on the backdrop won't close the form
    if(reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      this.setState({openExperimentalPlanForm: false});
    } 
  };

  /** Handle the action when user attempts to add new experimental plan  */
  handleFinishExperimentalPlanForm = () => {
    this.setState({
      openExperimentalPlanForm: false,
      isAddedNewExperimentalPlanSucceed: true,
      experimentalPlanData: JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.COMMON_EXPERIMENTAL_PLAN_FIELDS))
    });
    this.clearState();
    
    // Reload the browser
    window.location.reload();
  }

  /** Update the state to close the form */
  handleCloseForm = (event, reason) => {

    // Pressing 'Esc' or clicking on the backdrop won't close the form
    if(reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      this.setState({openInputForm: false});

      // Clear the form
      this.handleReset();
    } 
  };

  /** Handle the action when navigating to the next step of the form */
  handleNext = () => {
    this.setState(prevState => {
      return {activeStep: prevState.activeStep + 1}
    });
  };

  /** Handle the action when navigating to the previous step of the form */
  handleBack = () => {
    this.setState(prevState => {
      return {activeStep: prevState.activeStep - 1}
    });
  };

  /** Navigate to the specified step */
  goToStep = (step) => {
    this.setState({activeStep: step});
  }

  /** Handle the action when reset/clear the form */
  handleReset = () => {
    this.setState({activeStep: 0});
  };

  /** Handle the action when user attempts to add new mastermix */
  handleFinishForm = () => {
    this.setState({activeStep: 0, 
      openInputForm: false,
      isAddedNewMastermixSucceed: true,
      listOfRecipeSteps: JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.RECIPE_STEPS))
    });
    this.clearState();
  }

  clearState = () => {
    this.setState({
      // Clear state
      nameOfMastermix: '',
      recipeForEachMasterMix: [{
        finalSource:'',
        unit: '',
        finalConcentration: -1,
        tipWashing: '',
        stockConcentration: -1,
        liquidType: '',
        dispenseType: ''
      }],
      nameOfExperimentalPlan: '',
      masterMixVolumnPerReaction: -1,
      sampleVolumnPerReaction: -1,
      numOfSampleConcentrations: -1,
      numOfTechnicalReplicates: -1,
      pcrPlateSize: '',
      isEditForm: false,
      isEditExperimentalPlanForm: false,
      rowId: 0
    })
  }

  /** Clean up existing data in app cache and display dialog form */
  handleCreateNewWorkList = () => {

    this.handleStartOver();

    // Display the dialog form for user to enter experimental data
    this.setState({openExperimentalPlanForm: true});
  }

  handleStartOver = () => {
    // Remove all localstorage key from app cache
    localStorage.removeItem(LOCAL_KEY_STORAGE.RECIPE_STEPS);
    localStorage.removeItem(LOCAL_KEY_STORAGE.EXPERIMENTAL_PLAN);
    localStorage.removeItem(LOCAL_KEY_STORAGE.COMMON_EXPERIMENTAL_PLAN_FIELDS);
    
    // Display the dialog form for user to enter experimental data
    this.setState({createNewWorkList: false, experimentalPlanData: []});
  }
  
  /** Update the state to close the alert dialog form */
  closeAlertWorklist = (event, reason) => {

    // Pressing 'Esc' or clicking on the backdrop won't close the form
    if(reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      this.setState({createNewWorkList: false});
    } 
  };

  /** Update the state if the new mastermix is successfully added */
  closeSuccessDialog = () => {
    this.setState({isAddedNewMastermixSucceed: false});
  }

  closeSuccessExperimentalPlanDialog = () => {
    this.setState({isAddedNewExperimentalPlanSucceed: false});
  }

  /** Handle the action when user attempts to edit each mastermix */
  handleEditExperimentalPlan = (rowId) => {
    //console.log('Attempt to edit row Id', rowId);
    this.setState({openExperimentalPlanForm: true, isEditExperimentalPlanForm: true, rowId: rowId});

    const data = [...this.state.experimentalPlanData]; // copy the current list
    var index = data.findIndex((row) => row.experimentalPlanID === rowId); // find matching row ID to update
    //console.log('data found', data, index);

    this.setState({
      nameOfExperimentalPlan: data[index].nameOfExperimentalPlan,
      masterMixVolumnPerReaction: data[index].masterMixVolumnPerReaction,
      sampleVolumnPerReaction: data[index].sampleVolumnPerReaction,
      numOfSampleConcentrations: data[index].numOfSampleConcentrations,
      numOfTechnicalReplicates: data[index].numOfTechnicalReplicates,
      pcrPlateSize: data[index].pcrPlateSize
    });
  }

  /** Update the state after user successfully edits the experimental plan */
  saveEditedExperimentalPlan = () => {

    this.setState({
      openExperimentalPlanForm: false,
      isAddedNewExperimentalPlanSucceed: true,
      experimentalPlanData: JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.COMMON_EXPERIMENTAL_PLAN_FIELDS)),

      // Clear state
      nameOfExperimentalPlan: '',
      masterMixVolumnPerReaction: -1,
      sampleVolumnPerReaction: -1,
      numOfSampleConcentrations: -1,
      numOfTechnicalReplicates: -1,
      pcrPlateSize: '',
      rowId: 0
    });
  }

  /** Handle the action when user attempts to edit each mastermix */
  handleEditMasterMix = (rowId) => {
    //console.log('Attempt to edit row Id', rowId);
    this.setState({openInputForm: true, isEditForm: true, rowId: rowId});

    const data = [...this.state.listOfRecipeSteps]; // copy the current list
    var index = data.findIndex((row) => row.id === rowId); // find matching row ID to update

    this.setState({
      nameOfMastermix: data[index].nameOfMasterMix,
      recipeForEachMasterMix: data[index].recipeForEachMasterMix
    });
  }

  /** Update the state after user successfully edits the mastermix */
  saveEditedForm = () => {

    this.setState({activeStep: 0, 
      openInputForm: false,
      isAddedNewMastermixSucceed: true,
      listOfRecipeSteps: JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.RECIPE_STEPS)),

      // Clear state
      nameOfMastermix: '',
      recipeForEachMasterMix: [{
        finalSource:'',
        unit: '',
        finalConcentration: -1,
        tipWashing: '',
        stockConcentration: -1,
        liquidType: '',
        dispenseType: ''
      }],
      masterMixVolumnPerReaction: -1,
      sampleVolumnPerReaction: -1,
      numOfSampleConcentrations: -1,
      numOfTechnicalReplicates: -1,
      pcrPlateSize: '',
      rowId: 0
    });
  }

  /** 
   * Handle the action when user attempts to copy mastermix. 
   * The newly copy mastermix will be added to the end of the list.
   */
  handleCopyMasterMix = (rowId) => {
    // Copy the current row states
    const data = [...this.state.listOfRecipeSteps]; // copy the current list
    var index = data.findIndex((row) => row.id === rowId); // find matching row ID to copy

    // Build the new object to push into array
    const dataToCopy = {
      id: uuidv4(), // Example output: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      nameOfMasterMix: data[index].nameOfMasterMix + '(copy)',
      recipeForEachMasterMix: data[index].recipeForEachMasterMix
    };

    data.splice(this.state.listOfRecipeSteps.length, 0, dataToCopy);
    this.setState({listOfRecipeSteps: data});

    // Updated list to be saved to browser cache
    localStorage.setItem(LOCAL_KEY_STORAGE.RECIPE_STEPS, JSON.stringify(data));
  }

  /** Handle the action when user attempts to delete mastermix */
  handleDeleteMasterMix = (rowId) => {

    // Copy the current row states
    const rows = [...this.state.listOfRecipeSteps];

    // Remove the element at specific index and update the state
    var index = rows.findIndex((row) => row.id === rowId); // find matching row ID to delete
    rows.splice(index, 1);
    this.setState({listOfRecipeSteps: rows});
    
    // Updated list to be saved to browser cache
    localStorage.setItem(LOCAL_KEY_STORAGE.RECIPE_STEPS, JSON.stringify(rows));

    // Display delete toast message
    this.setState({isMastermixDeleted: true});
  }

  /** Handle the action to import text file that contains data to be populated to the table */
  importTableFile = async (e) => {
    e.preventDefault()
    const fileReader = new FileReader();
    fileReader.onload = async (e) => { 

      const inputData = (e.target.result);
      const splitData = inputData.split(SPECIAL_CHAR_FILE);
      //console.log(splitData[1].replace(/[\n\r]/g,''));
      //console.log(splitData[2].replace(/[\n\r]/g,''));

      // Parse experimental plan data
      var experimentalData = JSON.parse(splitData[1].replace(/[\n\r]/g,''));

      // Parse mastermix data
      var mastermixData = JSON.parse(splitData[2].replace(/[\n\r]/g,''));

      // Updated list to be saved to browser cache
      localStorage.setItem(LOCAL_KEY_STORAGE.COMMON_EXPERIMENTAL_PLAN_FIELDS, JSON.stringify(experimentalData));
      localStorage.setItem(LOCAL_KEY_STORAGE.RECIPE_STEPS, JSON.stringify(mastermixData));
      this.setState({listOfRecipeSteps: mastermixData, experimentalPlanData: experimentalData});

    };
    fileReader.readAsText(e.target.files[0]);

    // Reload the browser
    window.location.reload();
  }

  render() {

    return (
      
      <div style={styles.container}>

        <Header />

        {
          Array.isArray(this.state.experimentalPlanData) && this.state.experimentalPlanData.length > 0 ?

          <div>
            {/*Display the experimental plan in tabular format*/}
            <div style={styles.tableContainer}>
              <ViewExperimentalPlanTable 
                data={this.state.experimentalPlanData}
                handleEditExperimentalPlan={this.handleEditExperimentalPlan} />
            </div>

            {/** Add new step and newly added step will be populated to the table below */}
            <div style={styles.addMastermixButton}>
              <Button variant="contained" size="medium" startIcon={<AddCircleRoundedIcon/>} onClick={this.handleAddNewStepForm}>
                {'Add New Mastermix'}
              </Button>
            </div>

          </div>

          :

          <div style={styles.centerButton}>
            <Button variant="contained" size="large" sx={{width: 400}} startIcon={<AddCircleRoundedIcon/>} onClick={this.handleCreateNewWorkList}>
              Create New Experimental Plan
            </Button>
            <div style={{marginTop: 30}}>
              <Button variant="contained" color="success" size="large" sx={{width: 400}} component="label" startIcon={<UploadIcon />}>
                Import Existing Experimental Plan
                <input hidden accept=".txt" multiple type="file" onChange={(e) => this.importTableFile(e)}  />
              </Button>                
              <div style={{textAlign: 'right', fontStyle: 'italic', color: 'red'}}>(*experimental-plan-RoboNAAT.txt)</div>

            </div>
          </div>
        }

        {(Array.isArray(this.state.listOfRecipeSteps) && this.state.listOfRecipeSteps.length > 0) &&
          <div>
            {/** Display list of recipe step in tabular format */}
            <div style={styles.tableContainer}>
              <ViewAllSteps 
                data={this.state.listOfRecipeSteps}
                handleEditMasterMix={this.handleEditMasterMix}
                handleDeleteMasterMix={this.handleDeleteMasterMix}
                handleCopyMasterMix={this.handleCopyMasterMix} />
            </div>

            {/** Display other buttons */}
            <div style={styles.buttonContainer}>
              <div>
                <Button variant="contained" color="success" size="medium" startIcon={<DownloadIcon/>} 
                  component={Link} to="/result">
                  {'Generate Worklist Files'}
                </Button>
              </div>
            </div>
          </div>
        }

        {/** Render the option to start over (clear browser cache) */}
        {Array.isArray(this.state.experimentalPlanData) && this.state.experimentalPlanData.length > 0 && 
        <div style={styles.addMastermixButton}>
          <Button variant="contained" color='error' size="medium" startIcon={<RestartAltIcon/>} 
            onClick={() => {this.setState({createNewWorkList: true}); }}>Start Over
          </Button>

          {/** Alert dialog to be displayed when users click on "Start Over" button */}
          <Dialog
            open={this.state.createNewWorkList}
            onClose={this.closeAlertWorklist}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title" style={styles.dialogTitle}>
              Are you sure you want to start over?
            </DialogTitle>
            <DialogContent style={{paddingTop: 20}}>
              <DialogContentText id="alert-dialog-description" style={{fontSize: 14}}>
                If you start over, all progresses will be lost and you will be prompted to add new list of mastermixes.
              </DialogContentText>
            </DialogContent>
            <DialogActions>

              <Button style={{textDecorationLine: 'underline', fontSize: 13}} onClick={this.closeAlertWorklist} autoFocus>
                Cancel
              </Button>

              <Button style={{backgroundColor: '#084c9e', color: '#FFF', fontSize: 13}} onClick={() => {
                this.setState({listOfRecipeSteps: []});
                this.setState({experimentalPlanData: []});
                this.handleStartOver();
              }}>Yes, Start Over</Button>

            </DialogActions>
          </Dialog>
        </div>}

        {/** Display dialog form that allows user to input experimental data */}
        {this.state.openExperimentalPlanForm && <CreateNewExperiment 
          openExperimentalPlanForm={this.state.openExperimentalPlanForm} 
          handleCloseExperimentalForm={this.handleCloseExperimentalForm}
          handleFinishExperimentalPlanForm={this.handleFinishExperimentalPlanForm}
          isEditForm={this.state.isEditExperimentalPlanForm}
          saveEditedForm={this.saveEditedExperimentalPlan}
          nameOfExperimentalPlan={this.state.nameOfExperimentalPlan}
          numOfSampleConcentration={this.state.numOfSampleConcentrations}
          numOfTechnicalReplicate={this.state.numOfTechnicalReplicates}
          mastermixVolPerReaction={this.state.masterMixVolumnPerReaction}
          sampleVolPerReaction={this.state.sampleVolumnPerReaction}
          pcrPlateSize={this.state.pcrPlateSize}
          rowId={this.state.rowId}
        />}

        {/** Display dialog form that allows user to input mastermix data */}
        {this.state.openInputForm && <AddNewStep 
          openInputForm={this.state.openInputForm} 
          handleCloseForm={this.handleCloseForm}
          handleNext={this.handleNext}
          handleBack={this.handleBack}
          handleReset={this.handleReset}
          handleFinishForm={this.handleFinishForm}
          activeStep={this.state.activeStep}
          goToStep={this.goToStep}
          isEditForm={this.state.isEditForm}
          saveEditedForm={this.saveEditedForm}
          nameOfMastermix={this.state.nameOfMastermix}
          recipeForEachMasterMix={this.state.recipeForEachMasterMix}
          rowId={this.state.rowId}
        />}

        {
          <Snackbar open={this.state.isAddedNewExperimentalPlanSucceed} onClose={this.closeSuccessExperimentalPlanDialog} 
            autoHideDuration={3000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
            <Alert onClose={this.closeSuccessExperimentalPlanDialog} severity="success" variant="filled" sx={{ width: '100%' }}>
              {this.state.isEditExperimentalPlanForm ? 'Experimental plan is successfully updated!' : 'New experimental plan is successfully added!'}
            </Alert>
          </Snackbar>
        }

        {
          <Snackbar open={this.state.isAddedNewMastermixSucceed} onClose={this.closeSuccessDialog} 
            autoHideDuration={3000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
            <Alert onClose={this.closeSuccessDialog} severity="success" variant="filled" sx={{ width: '100%' }}>
              {this.state.isEditForm ? 'Mastermix is successfully updated!' : 'New mastermix is successfully added!'}
            </Alert>
          </Snackbar>
        }

        {
          <Snackbar open={this.state.isMastermixDeleted} onClose={() => (this.setState({isMastermixDeleted: false}))} 
            autoHideDuration={3000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
            <Alert onClose={() => (this.setState({isMastermixDeleted: false}))} severity="success" variant="filled" sx={{ width: '100%' }}>
              Mastermix has been deleted!
            </Alert>
          </Snackbar>
        }

      </div>
    );
  }
}

/** Styling for elements render in this component */
const styles = {
  container: {
    justifyContent: 'center', alignItems:'center'
  },
  centerButton: {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)'
  },
  addMastermixButton: {
    justifyContent: 'flex-end', display: 'flex', width: '95%', marginTop: '2vh'
  },
  tableContainer: {
    display: 'flex', justifyContent: 'center', alignItems:'center', 
    width: '100%', marginTop: '2vh', marginBottom: '5vh'
  },
  buttonContainer: {
    display: 'flex', justifyContent: 'flex-end', width: '95%'
  },
  dialogTitle: {
    backgroundColor: '#084c9e', color: '#FFF', fontSize: 16, textAlign: 'center'
  }
}