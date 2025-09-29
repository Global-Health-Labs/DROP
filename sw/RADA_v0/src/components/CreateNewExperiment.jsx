import React, { Component } from "react";
import { TextField, Button, MenuItem, InputAdornment, Dialog, DialogContent, DialogContentText, DialogTitle,
  Stack, Box, Grid, Alert, AlertTitle} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { LOCAL_KEY_STORAGE } from "../config/Configurations";
import { DROPDOWN_OPTIONS } from "../config/FormInputValues";

/**
 * This class renders the component to display input form for entering new experimental plan.
 */
export default class CreateNewExperiment extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,

      nameOfExperimentalPlan: this.props.nameOfExperimentalPlan ?? '',
      numOfSampleConcentration: this.props.numOfSampleConcentration ?? -1,
      numOfTechnicalReplicate: this.props.numOfTechnicalReplicate ?? -1,
      mastermixVolPerReaction: this.props.mastermixVolPerReaction ?? -1,
      sampleVolPerReaction: this.props.sampleVolPerReaction ?? -1,
      pcrPlateSize: this.props.pcrPlateSize ?? '',

      // states for validation
      isUserTyping: false,
      errorMessage: '',
      showAlertMessage: false,
      alertTitle: '',
      showHelperText: false,
      showPCRsizeErrorMessage: false
    }

    // List of recipe steps entered by user. Assign to empty array if no step found in app cache
    this.experimentalPlanData = JSON.parse(localStorage.getItem(LOCAL_KEY_STORAGE.COMMON_EXPERIMENTAL_PLAN_FIELDS)) || [];
  }

  /** Render the content inside the form */
  renderFormContent() {
    return (
      <Stack spacing={2} paddingTop={2}>

        <Grid container spacing={1}>

          <Grid item xs={12}>
            <TextField
              required size="small" fullWidth
              id="nameOfExperimentalPlan"
              label="Name of The Experimental Plan"
              type='text'
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              error={this.state.isUserTyping && this.state.nameOfExperimentalPlan.length === 0}
              helperText={(!this.state.isUserTyping || this.state.nameOfExperimentalPlan.length > 0) ? "" : "Please provide the name of the experimental plan"}
              value={this.state.nameOfExperimentalPlan}
              onChange={(event) => {
                this.setState({isUserTyping: true, nameOfExperimentalPlan: (event.target.value), showAlertMessage: false});
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required size="small" fullWidth
              id="numSampleConcentration"
              label="Number of Samples"
              type='Number'
              margin="dense"
              error={this.state.numOfSampleConcentration === 0}
              helperText={this.state.numOfSampleConcentration === 0 ? "Value must be greater than 0" : ""}
              InputLabelProps={{
                shrink: true,
              }}
              value={Number(this.state.numOfSampleConcentration) === -1 ? 0 : Number(this.state.numOfSampleConcentration)}
              onChange={(event) => {
                this.setState({numOfSampleConcentration: Number(event.target.value), showAlertMessage: false});
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required size="small" fullWidth
              id="numTechnicalRep"
              label="Number of Technical Replicates"
              type='Number'
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              error={this.state.numOfTechnicalReplicate === 0}
              helperText={this.state.numOfTechnicalReplicate === 0 ? "Value must be greater than 0" : ""}
              value={Number(this.state.numOfTechnicalReplicate) === -1 ? 0 : Number(this.state.numOfTechnicalReplicate)}
              onChange={(event) => {
                this.setState({numOfTechnicalReplicate: Number(event.target.value), showAlertMessage: false});
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required size="small" fullWidth
              id="masterMixVolPerReaction"
              label="Mastermix Volume Per Reaction"
              type='Number'
              margin="dense"
              InputProps={{
                startAdornment: <InputAdornment position="start">uL</InputAdornment>,
              }}
              error={this.state.mastermixVolPerReaction === 0}
              helperText={this.state.mastermixVolPerReaction === 0 ? "Value must be greater than 0" : ""}
              value={Number(this.state.mastermixVolPerReaction) === -1 ? 0 : Number(this.state.mastermixVolPerReaction)}
              onChange={(event) => {
                this.setState({mastermixVolPerReaction: Number(event.target.value), showAlertMessage: false});
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required size="small" fullWidth
              id="sampleVolPerReaction"
              label="Sample Volume Per Reaction"
              type='Number'
              margin="dense"
              InputProps={{
                startAdornment: <InputAdornment position="start">uL</InputAdornment>,
              }}
              error={this.state.sampleVolPerReaction === 0}
              helperText={this.state.sampleVolPerReaction === 0 ? "Value must be greater than 0" : ""}
              value={Number(this.state.sampleVolPerReaction) === -1 ? 0 : Number(this.state.sampleVolPerReaction)}
              onChange={(event) => {
                this.setState({sampleVolPerReaction: Number(event.target.value), showAlertMessage: false});
              }}
            />
          </Grid>
        </Grid>

        <TextField
          required size="small"
          id="pcrPlateSize"
          label="PCR Plate Size"
          select
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          error={this.state.showPCRsizeErrorMessage && (this.state.pcrPlateSize === undefined || this.state.pcrPlateSize === "")}
          helperText={(!this.state.showPCRsizeErrorMessage && (this.state.pcrPlateSize !== undefined || this.state.pcrPlateSize !== "")) ? "" : "Please Choose"}
          value={this.state.pcrPlateSize === undefined ? '' : this.state.pcrPlateSize}
          onChange={(event) => {
            this.setState({pcrPlateSize: Number(event.target.value), showAlertMessage: false, isUserTyping: true});
          }}
        >
          {DROPDOWN_OPTIONS.PCR_PLATE_SIZE.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    );
  }

  closeErrorMessage = () => {
    this.setState({showAlertMessage: false});
  }

  /** Handle the action when user clicks "Add New Experimental Plan" button at the very last step */
  handleAddNewStep = () => {

    var containInvalid = false;

    // Validate user input
    if (!this.validateInputValue()) {
      containInvalid = false;
    } else {
      containInvalid = true;
    }

    if (!containInvalid) {

      // Save input value temporary to website cache
      const data = {
        experimentalPlanID: uuidv4(), // Example output: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        nameOfExperimentalPlan: this.state.nameOfExperimentalPlan,
        numOfSampleConcentrations: this.state.numOfSampleConcentration,
        numOfTechnicalReplicates: this.state.numOfTechnicalReplicate,
        masterMixVolumnPerReaction: this.state.mastermixVolPerReaction,
        sampleVolumnPerReaction: this.state.sampleVolPerReaction,
        pcrPlateSize: this.state.pcrPlateSize
      }

      this.experimentalPlanData.push(data);
      localStorage.setItem(LOCAL_KEY_STORAGE.COMMON_EXPERIMENTAL_PLAN_FIELDS, JSON.stringify(this.experimentalPlanData));
      
      // Clear the existing input values
      this.clearForm();

      // Update states
      this.props.handleFinishExperimentalPlanForm();
    }

  }
  
  /** Render the action when user clicks "Save Changes" in the experimental plan */
  handleEditForm = () => {

    var containInvalid = false;

    // Validate user input
    if (!this.validateInputValue()) {
      containInvalid = false;
    } else {
      containInvalid = true;
    }

    if (!containInvalid) {

      const copyList = [...this.experimentalPlanData];
      var index = copyList.findIndex((row) => row.experimentalPlanID === this.props.rowId);

      copyList[index].nameOfExperimentalPlan = this.state.nameOfExperimentalPlan;
      copyList[index].masterMixVolumnPerReaction = this.state.mastermixVolPerReaction;
      copyList[index].sampleVolumnPerReaction = this.state.sampleVolPerReaction;
      copyList[index].numOfSampleConcentrations = this.state.numOfSampleConcentration;
      copyList[index].numOfTechnicalReplicates = this.state.numOfTechnicalReplicate;
      copyList[index].pcrPlateSize = this.state.pcrPlateSize;

      localStorage.setItem(LOCAL_KEY_STORAGE.COMMON_EXPERIMENTAL_PLAN_FIELDS, JSON.stringify(copyList));

      // Clear the existing input values
      this.clearForm();

      // Update states
      this.props.saveEditedForm();
    }
  }
  
  /** Clear all existing input values from the app and close the form dialog */
  handleCancelForm = () => {

    // Clear the existing input values
    this.clearForm();

    // Close the dialog form
    this.props.handleCloseExperimentalForm();

    // Reload the browser
    window.location.reload();
  }

  /** Validate user input */
  validateInputValue = () => {
    this.setState({showAlertMessage: false});

    // Validate input value
    const values = [this.state.numOfSampleConcentration, this.state.numOfTechnicalReplicate, 
      this.state.mastermixVolPerReaction, this.state.sampleVolPerReaction];

    var containsInvalidInput = false;
    if ((values.indexOf(0) !== -1) || (values.indexOf(-1) !== -1)) {
      containsInvalidInput = true;
    }

    var containEmptyPCRsize = false;
    if (this.state.pcrPlateSize === undefined || this.state.pcrPlateSize === '') {
      containEmptyPCRsize = true;
      this.setState({showPCRsizeErrorMessage: true});
    }

    const invalidInteger = [-1, 0];

    if (containsInvalidInput) {
      var errorMessage = "";

      if (invalidInteger.indexOf(this.state.numOfSampleConcentration) !== -1) {
        errorMessage += '\u2022 Number of Sample Concentration \n';
        this.setState({numOfSampleConcentration: 0});
      }
  
      if (invalidInteger.indexOf(this.state.numOfTechnicalReplicate) !== -1) {
        errorMessage += '\u2022 Number of Technical Replicates \n';
        this.setState({numOfTechnicalReplicate: 0});
      }
  
      if (invalidInteger.indexOf(this.state.mastermixVolPerReaction) !== -1) {
        errorMessage += '\u2022 Mastermix Volume Per Reaction \n';
        this.setState({mastermixVolPerReaction: 0});
      }
  
      if (invalidInteger.indexOf(this.state.sampleVolPerReaction) !== -1) {
        errorMessage += '\u2022 Sample Volume Per Reaction \n';
        this.setState({sampleVolPerReaction: 0});
      }

      this.setState({alertTitle: 'The following fields must be greater than 0: ', errorMessage: errorMessage, showAlertMessage: true, isUserTyping: true});
      return true;
    }

    if (this.state.nameOfExperimentalPlan.length === 0) {
      this.setState({showAlertMessage: true, isUserTyping: true});
    }

    if (containEmptyPCRsize) {
      this.setState({alertTitle: 'Please choose PCR plate size', errorMessage: '', showAlertMessage: true});
      return true;
    }
  }

  /** Clear existing values from the form (revert back to its initial state) */
  clearForm = () => {
    this.setState({
      nameOfExperimentalPlan: '',
      numOfSampleConcentration: -1,
      numOfTechnicalReplicate: -1,
      mastermixVolPerReaction: -1,
      sampleVolPerReaction: -1,
      pcrPlateSize: '',

      // state for validation
      isUserTyping: false,
      showAlertMessage: false,
      showPCRsizeErrorMessage: false,
      alertTitle: '',
      errorMessage: ''
    })
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.openExperimentalPlanForm} onClose={this.props.handleCloseExperimentalForm} disableEscapeKeyDown={true} maxWidth="xl" fullWidth={true}>

          {this.state.showAlertMessage && 
            <Alert onClose={this.closeErrorMessage} severity="error" variant="filled" >
              {this.state.alertTitle.length > 0 && <AlertTitle>{this.state.alertTitle}</AlertTitle>}
              {this.state.errorMessage}
            </Alert>
          }

          <DialogTitle>{this.props.isEditForm ? 'Edit Experimental Plan' : 'New Experimental Plan'}</DialogTitle>

          <DialogContent>
              <DialogContentText>
                Please fill out the details of the experimental plan.
              </DialogContentText>

              {/** The following are the required user input */}
              <div style={{paddingTop: 20}}>

                {this.renderFormContent()}

                <div style={{paddingTop: 30}}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button variant="contained" color="primary" onClick={this.props.isEditForm ? this.handleEditForm : this.handleAddNewStep}>
                      {this.props.isEditForm ? 'Save Changes' : 'Add New Experimental Plan'}
                    </Button>
                    
                    <div style={{marginLeft: '.5rem'}}>{' '}</div>
                    
                    <Button variant="contained" color="error" onClick={this.handleCancelForm}>
                      Cancel
                    </Button>
                  </Box>
                </div>
              
              </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

}
