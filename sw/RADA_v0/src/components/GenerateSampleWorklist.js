import { VALUE, SAMPLE_MM } from "../config/worklist/DefaultValues";
import { getTotalWellsPerMastermix, getToPlate_AQ } from "../utils/WellPlateCalculation";

/** 
 * This function is to used to perform calculations to generate sample data file in CSV format.
 * Note that this function is meant to be called only if the worklist is successfully generated.
 */
export const getSampleWorklistData = (listOfMastermixes, experimentalPlanData) => {

  const data = [];
  var totalNumOfMastermixes = listOfMastermixes.length;
  var plateSize = parseInt(experimentalPlanData[0].pcrPlateSize); // 96 or 364
  var groupNumber = 1;
  var toWell = 1;
  var fromWell = 1;
  var countRow = 0;

  // Get total wells per mastermix (the result will determine how many rows to include in the worklist file)
  var numOfSampleConcentration = experimentalPlanData[0].numOfSampleConcentrations;
  var totalWellsPerMastermix = getTotalWellsPerMastermix(numOfSampleConcentration, 
    experimentalPlanData[0].numOfTechnicalReplicates);
  var sampleVolumePerReaction_uL = experimentalPlanData[0].sampleVolumnPerReaction;

  // Create list of source based on number of sample concentrations
  var listOfSources = [];
  for (var i = 0; i < numOfSampleConcentration; i++) {
    listOfSources.push('sample' + (i < 9 ? '0' + i : i)); // Expected output: sample00, sample01 -etc
  }
  var sampleListOfSources = [];
  var maxSources = listOfSources.length;
  var currentSourceIndex = 0;

  for (var j = 0; j < totalWellsPerMastermix * totalNumOfMastermixes; j++) {
    sampleListOfSources.push(listOfSources[currentSourceIndex]);
    if (currentSourceIndex < maxSources - 1) {
      currentSourceIndex++;
    } else {
      currentSourceIndex = 0;
    }
  }

  listOfMastermixes.forEach((mastermix) => {

    for (var k = 1; k <= totalWellsPerMastermix; k++) {

      countRow++;
      
      data.push({
        step_A: SAMPLE_MM.STEP,
        dx_B : VALUE.COLUMN_B,
        dz_C : VALUE.COLUMN_C,
        volume_uL_D : sampleVolumePerReaction_uL,
        liquid_class_E : SAMPLE_MM.LIQUID_CLASS,
        timer_delta_F : VALUE.COLUMN_F,
        source_G : sampleListOfSources[countRow - 1],
        step_index_H : VALUE.COLUMN_H,
        destination_I : VALUE.COLUMN_I,
        group_number_J : groupNumber,
        timer_group_check_K : VALUE.COLUMN_K,
        guid_L : VALUE.COLUMN_L,
        from_path_M : VALUE.COLUMN_M,
        asp_mixing_N : SAMPLE_MM.ASP_MIXING,
        dispense_type_O : SAMPLE_MM.DISPENSE_TYPE,
        tip_type_P : SAMPLE_MM.TIP_TYPE,
        touchoff_dis_Q : VALUE.COLUMN_Q,
        to_plate_R : getToPlate_AQ(plateSize, countRow),
        to_well_S : toWell,
        from_plate_T : SAMPLE_MM.FROM_PLATE,
        from_well_U : fromWell
      })

      // Assign to_well value
      if (toWell < plateSize) {
        toWell++;
      } else {
        toWell = 1;
      }

      // Assign from_well value: 1 --> Number of Sample Concentrations
      if (fromWell < numOfSampleConcentration) {
        fromWell++;
      } else {
        fromWell = 1;
      }
      
      // Assign group number value
      if ((countRow) % plateSize === 0) {
        groupNumber++; // increment groupNumber every plate size step
      }
    }
  });

  return data;
}