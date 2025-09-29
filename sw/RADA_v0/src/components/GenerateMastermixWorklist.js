import { VALUE, MIX_MM, ALIQUOTING_MM } from "../config/worklist/DefaultValues";
import * as wl from "../utils/WorklistCalculation";
import { getVolumeMastermix, getVolume_uL, getVolumeWorking, calcuateNumOfWells, 
  calculateVolumeEachSource, getVolume_uL_water } from "../utils/VolumeCalculation";
import { getFromPlate_MM, getTotalWellsPerMastermix, getToPlate_AQ, FROM_PLATE_DW } from "../utils/WellPlateCalculation";

/** 
 * This function is to used to perform calculations to generate worklist file in CSV format.
 */
export const getMastermixWorklistData = (listOfMastermixes, experimentalPlanData, generateAllData) => {

  var data = [];
  var groupNumber = 0;
  var previousRowLiquidClass = "";
  var currentRowLiquidClass = "";
  var currentRowSource = "";
  var previousRowSource = "";
  var listOfTotalVolumesEachMM = [];
  var totalVolumeEachMM = 0;

  var masterMixVolumnPerReaction = experimentalPlanData[0].masterMixVolumnPerReaction;
  var numOfSampleConcentrations = experimentalPlanData[0].numOfSampleConcentrations;
  var numOfTechnicalReplicates = experimentalPlanData[0].numOfTechnicalReplicates;
  var sampleVolumnPerReaction = experimentalPlanData[0].sampleVolumnPerReaction;

  // Calculate volume of mastermix
  var volumeOfMastermix = getVolumeMastermix(numOfSampleConcentrations, numOfTechnicalReplicates, masterMixVolumnPerReaction);
  var volumeWorking = getVolumeWorking(numOfSampleConcentrations, numOfTechnicalReplicates, masterMixVolumnPerReaction, sampleVolumnPerReaction);
  var numOfWells = calcuateNumOfWells(volumeOfMastermix);

  /*
  * Loop through each mastermix to generate data for making the mastermix
  */
  listOfMastermixes.forEach((mastermix, mastermixIndex) => {

    // Calculate the total volumes of other components in mastermix beside water
    var totalVolumeBesideWater = 0;
    mastermix.recipeForEachMasterMix.forEach((recipe) => {
      var volume_ul = 0;
      if (recipe.finalSource.trim().toLowerCase() !== 'water') {
        volume_ul = calculateVolumeEachSource(
          volumeWorking,
          recipe.finalConcentration,
          recipe.stockConcentration);
      }
      totalVolumeBesideWater += volume_ul;
    });
    //console.log('***************** Total', totalVolumeBesideWater, numOfWells, volumeOfMastermix);
  
    // Loop through each recipe source in mastermix
    mastermix.recipeForEachMasterMix.forEach((recipe, recipeId) => {
      var listOfVolume = [];
      
      // Calculate volume for water source
      if (recipe.finalSource.trim().toLowerCase() === 'water') {
        listOfVolume = getVolume_uL_water(
          numOfWells, volumeOfMastermix, 
          totalVolumeBesideWater, recipe.liquidType,
          recipe.dispenseType);
      } else {
        listOfVolume = getVolume_uL(numOfWells, volumeWorking, 
          recipe.stockConcentration, recipe.finalConcentration, recipe.liquidType, recipe.dispenseType); 
      }

      totalVolumeEachMM += listOfVolume[0].volume;

      listOfVolume.forEach((step) => {

        data.push({
          id: mastermixIndex,
          recipeId: recipeId,
          step_A: mastermix.nameOfMasterMix,
          dx_B : VALUE.COLUMN_B,
          dz_C : VALUE.COLUMN_C,
          volume_uL_D : step.volume,
          liquid_class_E : step.liquidClass,
          timer_delta_F : VALUE.COLUMN_F,
          source_G : recipe.finalSource,
          step_index_H : VALUE.COLUMN_H,
          destination_I : VALUE.COLUMN_I,
          group_number_J : 0,
          timer_group_check_K : VALUE.COLUMN_K,
          guid_L : VALUE.COLUMN_L,
          from_path_M : VALUE.COLUMN_M,
          asp_mixing_N : wl.getAspMixing(recipe.tipWashing),
          dispense_type_O : recipe.dispenseType,
          tip_type_P : step.tipType,
          touchoff_dis_Q : VALUE.COLUMN_Q,
          to_plate_R : VALUE.COLUMN_R,
          to_well_S : 0,
          from_plate_T : '',
          from_well_U : 0
        })
      });
    });

    // Add total volumes of each mixture to the list (to be used for mixing steps)
    listOfTotalVolumesEachMM.push(totalVolumeEachMM);
    totalVolumeEachMM = 0; // re-initialize value

  });

  // Create the list that contains unique input sources
  const sourceLists = data.map(row => row.source_G);
  const uniqueSourceLists = [...new Set(sourceLists)];
  const totalVolumeSourcePair = [];
  const sortedKeyPairs = [];

  // Calculate total source volume of all recipes
  uniqueSourceLists.forEach((source, index) => {
    sortedKeyPairs.push({
      source: source,
      index: index
    })
  }); 

  // Calculate total source volume of all recipes
  sortedKeyPairs.forEach((source) => {

    data.forEach((object) => {

      var sortedKey = '';
      if (source.source.toLowerCase() === object.source_G.toLowerCase()) {
        sortedKey = source.index + '-' + object.source_G + ' - ' + object.liquid_class_E + ' - ' + object.id + ' - ' + object.recipeId;
        object.sortedKey = sortedKey;
      }

    });
  });

  // Sort mastermix data based on source and liquid type
  data.sort((a, b) => {
    return a.sortedKey.localeCompare(b.sortedKey, undefined, {sensitivity: 'base'});
  });
  //console.log('Sorted list of mastermixes data to be populated to worklist file', data);

  // Calculate total source volume of all recipes
  uniqueSourceLists.forEach((source, index) => {
  
    var totalSourceVolume = 0;
    data.forEach((object) => {
      
      if (source.toLowerCase() === object.source_G.toLowerCase()) {
        totalSourceVolume += object.volume_uL_D;
      }
    });
    totalVolumeSourcePair.push({
      source: source,
      totalSourceVolumes: totalSourceVolume,
      index: index
    })
  });

  var toWellID = 1;
  var totalMM = listOfMastermixes.length;
  var totalWellAfterSplit = totalMM * numOfWells; // determine number of rows to display in worklist for each source

  var current_DW = {
    wellValue: 0,
    sampleIndex: 1,
    startFromWell: 1,
    previousNumOfWells: 0
  };

  var current_flat = {
    wellValue: 0,
    sampleIndex: 1,
    startFromWell: 1,
    previousNumOfWells: 0
  };

  var maxNumOfWells = 0;

  // Loop through each data entry to assign group ID, to/from well ID
  data.map((object, index) => {

    currentRowSource = object.source_G.toLowerCase();          
    currentRowLiquidClass = object.liquid_class_E;

    // Group by liquid class and source name
    if ((previousRowLiquidClass !== currentRowLiquidClass) || (previousRowSource !== currentRowSource)) {
      groupNumber++;
    }

    // Assign group number
    object.group_number_J = groupNumber;
    previousRowLiquidClass = currentRowLiquidClass;

    // Assign to_well ID (1 well per mastermix)
    object.to_well_S = toWellID;
    if (toWellID < totalWellAfterSplit) {
      toWellID++;
    } else {
      toWellID = 1;
    }

    // Assign from_plate value
    var currentRowFromPlate = getFromPlate_MM(totalVolumeSourcePair, object.source_G);
    object.from_plate_T = currentRowFromPlate;

    current_DW.previousNumOfWells = maxNumOfWells;
    current_flat.previousNumOfWells = maxNumOfWells;

    // Get max well number of each source
    if (previousRowSource !== currentRowSource) {
      for (const object of totalVolumeSourcePair) {
        if (object.source.toLowerCase() === currentRowSource.toLowerCase()) {

          // Calculate max volume per well (practical 80%)
          var maxWellVolume = currentRowFromPlate === FROM_PLATE_DW ? 700 : 140;
          //console.log('max', object.source, object.totalSourceVolumes, object.totalSourceVolumes * 1.3 / maxWellVolume);
          maxNumOfWells = Math.ceil((object.totalSourceVolumes * 1.3) / maxWellVolume);
          break;
        }
      }
    }

    // Handle deep well plate type: 
    // The goal here is to make sure we don't assign redundant/duplicate from_well ID of the same plate type for different source.
    if (currentRowFromPlate === FROM_PLATE_DW) {

      if (previousRowSource === "" || previousRowSource === currentRowSource) {

        if (current_DW.wellValue < (maxNumOfWells + current_DW.startFromWell - 1)) {
          current_DW.wellValue += 1;
        } else {
          current_DW.wellValue = current_DW.startFromWell;
        }

      } else {
        // Increment from_well
        var startWellID = current_DW.wellValue === 0 ? 0 : current_DW.startFromWell;
        current_DW.wellValue = startWellID + current_DW.previousNumOfWells;
        current_DW.startFromWell = current_DW.wellValue;
      }

      object.from_well_U = current_DW.wellValue;
    
    } else { // Handle flat plate

      if (previousRowSource === "" || previousRowSource === currentRowSource) {

        if (current_flat.wellValue < (maxNumOfWells + current_flat.startFromWell - 1)) {
          current_flat.wellValue += 1;
        } else {
          current_flat.wellValue = current_flat.startFromWell;
        }

      } else {
        // Increment from_well
        var flat_startWellID = current_flat.wellValue === 0 ? 0 : current_flat.startFromWell;
        current_flat.wellValue = flat_startWellID + current_flat.previousNumOfWells;
        current_flat.startFromWell = current_flat.wellValue;
      }

      object.from_well_U = current_flat.wellValue;
    }

    previousRowSource = currentRowSource;

    return object;
  });

  // Generate data in worklist for mixing step and aliquoting step
  if (generateAllData) {
    var mm_groupNumber = groupNumber + 1; // continue from mm step
    const mixingData = generateMixingSteps(listOfMastermixes, listOfTotalVolumesEachMM, mm_groupNumber, numOfWells);
    mixingData.forEach(mixing_step => {
      data.push(mixing_step);
    });

    const aliquotingData = generateAliquotingStep(listOfMastermixes, experimentalPlanData, mm_groupNumber, numOfWells);
    aliquotingData.forEach(aq_step => {
      data.push(aq_step);
    });
  }
  
  return data;
}

/**
 * Loop through each mastermix to generate data for mixing the mastermix steps.
 */
const generateMixingSteps = (listOfMastermixes, listOfMixtureVolume, groupNumber, numOfWells) => {
  var data = [];
  var wellId = 1;

  listOfMastermixes.forEach((mastermix, mixMMindex) => {

    // Volume_ul is 80% of the total volume of mixture (round to 1 digit)
    var volume = Math.ceil(Math.round(((listOfMixtureVolume[mixMMindex] * 80 / 100) + Number.EPSILON) * 10) / 10);

    for (var i = 0; i < numOfWells; i++) {
      data.push({
        step_A: 'mix_' + mastermix.nameOfMasterMix,
        dx_B : VALUE.COLUMN_B,
        dz_C : VALUE.COLUMN_C,
        volume_uL_D : volume,
        liquid_class_E : MIX_MM.LIQUID_CLASS,
        timer_delta_F : VALUE.COLUMN_F,
        source_G : MIX_MM.SOURCE,
        step_index_H : VALUE.COLUMN_H,
        destination_I : VALUE.COLUMN_I,
        group_number_J : groupNumber,
        timer_group_check_K : VALUE.COLUMN_K,
        guid_L : VALUE.COLUMN_L,
        from_path_M : VALUE.COLUMN_M,
        asp_mixing_N : MIX_MM.ASP_MIXING,
        dispense_type_O : MIX_MM.DISPENSE_TYPE,
        tip_type_P : MIX_MM.TIP_TYPE,
        touchoff_dis_Q : VALUE.COLUMN_Q,
        to_plate_R : MIX_MM.TO_PLATE,
        to_well_S : wellId,
        from_plate_T : MIX_MM.FROM_PLATE,
        from_well_U : wellId
      })

      wellId++;
    }
  });

  return data;
}

/**
 * Loop through each mastermix to generate data for aliquoting mastermix
 */ 
const generateAliquotingStep = (listOfMastermixes, experimentalPlanData, mm_groupNumber, numOfWells) => {
  
  var data = [];  
  
  var masterMixVolumePerReaction = experimentalPlanData[0].masterMixVolumnPerReaction;  
  var aq_groupNumber = mm_groupNumber + 1;
  var aq_to_well = 1;
  var plateSize = parseInt(experimentalPlanData[0].pcrPlateSize); // 96 or 364
  var aq_from_well = 1;
  var start_from_well_id = 1;
  var countRow = 0;

  // Get total wells per mastermix (the result will determine how many rows to include in the worklist file)
  var totalWellsPerMastermix = getTotalWellsPerMastermix(experimentalPlanData[0].numOfSampleConcentrations, 
    experimentalPlanData[0].numOfTechnicalReplicates);

  listOfMastermixes.forEach((mastermix) => {
      
    for (var i = 1; i <= totalWellsPerMastermix; i++) {

      countRow++;

      data.push({
        step_A: 'aq_' + mastermix.nameOfMasterMix,
        dx_B : VALUE.COLUMN_B,
        dz_C : VALUE.COLUMN_C,
        volume_uL_D : masterMixVolumePerReaction,
        liquid_class_E : ALIQUOTING_MM.LIQUID_CLASS,
        timer_delta_F : VALUE.COLUMN_F,
        source_G : ALIQUOTING_MM.SOURCE,
        step_index_H : VALUE.COLUMN_H,
        destination_I : VALUE.COLUMN_I,
        group_number_J : aq_groupNumber,
        timer_group_check_K : VALUE.COLUMN_K,
        guid_L : VALUE.COLUMN_L,
        from_path_M : VALUE.COLUMN_M,
        asp_mixing_N : ALIQUOTING_MM.ASP_MIXING,
        dispense_type_O : ALIQUOTING_MM.DISPENSE_TYPE,
        tip_type_P : ALIQUOTING_MM.TIP_TYPE,
        touchoff_dis_Q : VALUE.COLUMN_Q,
        to_plate_R : getToPlate_AQ(plateSize, countRow),
        to_well_S : aq_to_well,
        from_plate_T : ALIQUOTING_MM.FROM_PLATE,
        from_well_U : aq_from_well
      })

      if (aq_to_well % plateSize === 0) {
        aq_to_well = 1; // reset
      } else {
        aq_to_well++;
      }

      if (aq_from_well < (numOfWells + start_from_well_id - 1)) {
        aq_from_well++;
      } else {
        aq_from_well = start_from_well_id;
      }
    }

    // increment to next plate for next mastermix
    aq_from_well = start_from_well_id + numOfWells;
    start_from_well_id = aq_from_well;

  });

  return data;
}