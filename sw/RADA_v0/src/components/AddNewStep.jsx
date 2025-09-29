import React, { Component } from "react";
import { TextField, Alert, AlertTitle, Button, Dialog, DialogContent, DialogContentText, DialogTitle,
  Stepper, Step, Stack, StepLabel, Box} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import AddFinalConcentrationMatrix from "./AddRecipeAndStockConcentrationMatrix";

import { LOCAL_KEY_STORAGE } from "../config/Configurations";

// Place holders for the list of matrix objects
let recipeMatrixList = {};

const stepLabel = [
  'Detail of mastermix', 
  'Recipe for each mastermix and stock concentration for each source in mastermix recipes'
];

/**
 * This class renders the component to display the form where users
 * can input the experimental data.
 */
export default class AddNewStep extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, // flag to track if the webpage is still loading

      // states represent input value in the form
      nameOfMasterMix: this.props.nameOfMastermix ?? '',
      recipeForEachMasterMix: this.props.recipeForEachMasterMix ?? [{
        finalSource:'',
        unit: '',
        finalConcentration: -1,
        tipWashing: '',
        stockConcentration: -1,
        liquidType: '',
        dispenseType: ''
      }],

      // states for validation
      isUserTyping: false,
      errorMessage: '',
      showAlertMessage: false,
      alertTitle: '',
      showHelperText: false,
      showPCRsizeErrorMessage: false
    }

    // List of recipe steps entered by user. Assign to empty array if no step found in app cache
    this.listOfRecipeSteps = JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.RECIPE_STEPS)) || [];
  }

  /** Handle the action when user clicks "Next" button to proceed to next step */
  handleNextStep = () => {

    if (this.state.nameOfMasterMix.length === 0) {
      this.setState({errorMessage: 'Please provide the name of mastermix.', showAlertMessage: true, isUserTyping: true});
      return;
    }

    // Navigate to the next step
    this.props.handleNext();
  }

  /** Handle the action when user clicks "Back" button to proceed to previous step */
  handlePreviousStep = () => {
    this.setState({showAlertMessage: false});
    // Navigate the form to previous step
    this.props.handleBack();
  }

  closeErrorMessage = () => {
    this.setState({showAlertMessage: false});
  }

  /** Handle the action when user clicks "Add New Step" button at the very last step */
  handleAddNewStep = () => {
    
    var containInvalid = false;
    
    // Validate data on Step 2
    this.state.recipeForEachMasterMix.map((value) => {
      if ((value.finalSource.length === 0)
        || ((Number(value.finalConcentration) === -1) || (Number(value.finalConcentration) === 0))
        || ((Number(value.stockConcentration) === -1) || (Number(value.stockConcentration) === 0))
        || (value.dispenseType === "" || value.liquidType === "" || value.tipWashing === "" || value.unit === "")
      ) {
        // Navigate to Step 2
        this.props.goToStep(1);
        this.setState({showHelperText: true});
        containInvalid = true;
        return true;
      }
      return null;
    });

    if (!containInvalid) {
      this.updatedLocalStage();
    }
  }

  /** Handle the action when user attempts to save the form that has just been edited */
  handleEditForm = () => {

    //console.log('Attempt to save edited form');
    var containInvalid = false;

    // Validate data on Step 2
    this.state.recipeForEachMasterMix.map((value) => {
      if ((value.finalSource.length === 0)
        || ((Number(value.finalConcentration) === -1) || (Number(value.finalConcentration) === 0))
        || ((Number(value.stockConcentration) === -1) || (Number(value.stockConcentration) === 0))
        || (value.liquidType === "" || value.dispenseType === "" || value.tipWashing === "" || value.unit === "")
      ) {
        // Navigate to Step 2
        this.props.goToStep(1);
        this.setState({showHelperText: true});
        containInvalid = true;
        return true;
      }
      return null;
    });

    if (!containInvalid) {
      const copyList = [...this.listOfRecipeSteps];
      var index = copyList.findIndex((row) => row.id === this.props.rowId);
      //console.log('Updated!', index, copyList[index].nameOfMasterMix);

      copyList[index].nameOfMasterMix = this.state.nameOfMasterMix;
      copyList[index].recipeForEachMasterMix = this.state.recipeForEachMasterMix;

      localStorage.setItem(LOCAL_KEY_STORAGE.RECIPE_STEPS, JSON.stringify(copyList));

      // Clear the existing input values
      this.clearForm();

      // Update states
      this.props.saveEditedForm();
    }
  }
  
  /** Save input values to browser cache */
  updatedLocalStage = () => {

    // Save input value temporary to website cache
    const data = {
      id: uuidv4(), // Example output: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      nameOfMasterMix: this.state.nameOfMasterMix,
      recipeForEachMasterMix: this.state.recipeForEachMasterMix
    }
    this.listOfRecipeSteps.push(data);
    localStorage.setItem(LOCAL_KEY_STORAGE.RECIPE_STEPS, JSON.stringify(this.listOfRecipeSteps));
    
    // Clear the existing input values
    this.clearForm();

    // Update states
    this.props.handleFinishForm();
  }

  /** Clear all the existing input values from the form and navigate back to the beginning of the form */
  handleResetForm = () => {

    this.setState({showAlertMessage: false});

    // Clear the existing input values
    this.clearForm();

    // Go back to the very first step (page) of the form
    this.props.handleReset();
  }

  /** Clear all existing input values from the app and close the form dialog */
  handleCancelForm = () => {

    // Clear the existing input values
    this.clearForm();

    // Close the dialog form
    this.props.handleCloseForm();

    // Reload the browser
    window.location.reload();
  }

  /** Clear existing values from the form (revert back to its initial state) */
  clearForm = () => {
    this.setState({
      nameOfMasterMix: '',
      recipeForEachMasterMix: [{
        finalSource:'',
        unit: '',
        finalConcentration: -1,
        tipWashing: '',
        stockConcentration: -1,
        liquidType: '',
        dispenseType: ''
      }],

      // state for validation
      isUserTyping: false,
      showAlertMessage: false,
      showPCRsizeErrorMessage: false,
      alertTitle: '',
      errorMessage: ''
    })
  }

  /** Value in the matrix that will be saved to app cache */
  updateRecipeMatrixData = (params) => {
    recipeMatrixList = [...params];
    this.setState({recipeForEachMasterMix: recipeMatrixList});
  }

  /** Render the content inside each step of the form */
  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Stack spacing={2} paddingTop={2}>
            <TextField
              required
              id="nameOfMastermix"
              label="Name of Mastermix"
              type='text'
              margin="dense"
              error={this.state.isUserTyping && this.state.nameOfMasterMix.length === 0}
              helperText={(!this.state.isUserTyping || this.state.nameOfMasterMix.length > 0) ? "" : "Name of mastermix must not be empty"}
              value={this.state.nameOfMasterMix}
              onChange={(event) => {
                this.setState({isUserTyping: true, nameOfMasterMix: (event.target.value), showAlertMessage: false});
              }}
            />
          </Stack>
        );
      case 1:
        return (
          <div style={{paddingTop: 20}}>
            <AddFinalConcentrationMatrix 
              setRow={this.updateRecipeMatrixData} 
              data={this.state.recipeForEachMasterMix}
              showHelperText={this.state.showHelperText} />
          </div>
        );
      default:
        return 'Unknown Step';
    }
  }

  render() {

    return (
      <div>

        <Dialog open={this.props.openInputForm} onClose={this.props.handleCloseForm} disableEscapeKeyDown={true} maxWidth="xl" fullWidth={true}>

        {this.state.showAlertMessage && 
          <Alert onClose={this.closeErrorMessage} severity="error" variant="filled" >
            {this.state.alertTitle.length > 0 && <AlertTitle>{this.state.alertTitle}</AlertTitle>}
            {this.state.errorMessage}
          </Alert>
        }

          <DialogTitle>{this.props.isEditForm ? 'Edit Mastermix' : 'New Mastermix'}</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Please fill out the form to {this.props.isEditForm ? 'edit' : 'add a new'} mastermix.
            </DialogContentText>

            {/** The following are the required user input */}
            <div style={{paddingTop: 20}}>

              {/** Display the horizontal stepper */}
              <Stepper alternativeLabel activeStep={this.props.activeStep}>
                {stepLabel.map((label, index) => (
                  <Step key={index}>
                    <StepLabel key={index}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <div>
                {/** Handle action when navigating to different step */}
                <div>
                  {this.getStepContent(this.props.activeStep)}

                  <div style={{paddingTop: 30}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

                      {/** Button to be displayed on the left side */}
                      <Button variant="contained" disabled={this.props.activeStep === 0} onClick={this.handlePreviousStep}>
                        Back
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />

                      {/** Buttons to be displayed on the right side */}
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={this.handleResetForm}>Reset</Button>
                      </Box>
                      
                      {
                        this.props.activeStep < stepLabel.length - 1 ?
                          <Button variant="contained" color="primary" onClick={this.handleNextStep}>
                            Next
                          </Button>
                          : 
                          <Button variant="contained" color="primary" onClick={this.props.isEditForm ? this.handleEditForm : this.handleAddNewStep}>
                            {this.props.isEditForm ? 'Save Changes' : 'Add Mastermix'}
                          </Button>
                      }
                      <div style={{marginLeft: '.5rem'}}>{' '}</div>

                      <Button variant="contained" color="error" onClick={this.handleCancelForm}>
                        Cancel
                      </Button>
                    </Box>

                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}