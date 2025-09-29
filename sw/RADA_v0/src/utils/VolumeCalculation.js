import { getLiquidClass, getTipType } from "./ExtractLiquidClass";

/**
 * Constant represents the maximum allowed volume of mastermix
 * 
 * If the calculated mastermix volume exceeds the maximum value specified here, 
 * we will need to split mastermix volume into multiple wells.
 */
const MAX_VOLUME_IN_uL = 600; 

/**
 * Calculate and return the volume of mastermix (in uL).
 * @param {*} numOfSampleConcentrations Number of sample concentrations (from user input)
 * @param {*} numOfTechnicalReplicates Number of technical replicates (from user input)
 * @param {*} volPerReaction Volume (uL) per reaction (from user input)
 * @returns volume (uL) of mastermix
 */
export const getVolumeMastermix = (numOfSampleConcentrations, numOfTechnicalReplicates, volPerReaction) => {
  return numOfSampleConcentrations * numOfTechnicalReplicates * volPerReaction * 1.3;
}

/**
 * Calculate and return working volume in uL.
 * @returns volume (uL) for source beside water
 */
export const getVolumeWorking = (numOfSampleConcentrations, numOfTechnicalReplicates, volPerReaction, volSample) => {
  return numOfSampleConcentrations * numOfTechnicalReplicates * (volPerReaction + volSample) * 1.3;
}

/**
 * Calculate and return the list of volume for each source (in uL).
 * All elements in the returned list will populate into the worklist (csv) file.
 * 
 * @param {*} volumeMastermix Volume of mastermix in uL
 * @param {*} stockConcentration Value of stock concentration (from user input)
 * @param {*} finalConcentration Value of final concentration (from user input)
 * @returns list of volume (uL) for each source
 */
export const getVolume_uL = (numOfWells, volumeMastermix, stockConcentration, finalConcentration, liquidType, dispenseType) => {

  // List of volume that will return (the elements in this array will populate into the worklist file)
  var volumeEachSource = [];

  // Handle the case when there is only one well required
  // If more than 1 well required, it means the mastermix exceeds max volume
  // and must split into multiple wells
  if (numOfWells === 1) {

    // Calculate the volume of the source
    var volume = calculateVolumnEachSourceRoundUp(volumeMastermix, finalConcentration, stockConcentration);
    volumeEachSource.push(volume);

    // Compare the volume of the source with tip type
    var volumeAfterCompareWithTipType = compareVolumeWithTipType(volumeEachSource, liquidType, dispenseType);
    return volumeAfterCompareWithTipType;
  }

  // Calculate volume of each source based on the total number of wells required
  const updatedVolumeMastermix = volumeMastermix / numOfWells;
  for (let i = 1; i <= numOfWells; i++) {
    var result = calculateVolumnEachSourceRoundUp(updatedVolumeMastermix, finalConcentration, stockConcentration);
    volumeEachSource.push(result);
  }

  // Since we round up the volume of each source, we need to calculate the difference to match the original mastermix volume
  let sumOfVolumeEachSource = 0;
  for (let e of volumeEachSource) {
    sumOfVolumeEachSource += e;
  }

  var originalMaxVolumnMastermix = calculateVolumeEachSource(volumeMastermix, finalConcentration, stockConcentration);
  var delta = sumOfVolumeEachSource - originalMaxVolumnMastermix;

  // Remove the last element in volume list
  var volumnToRemove = volumeEachSource.pop();

  // Add new volume to the list
  var volumeDelta = Math.round(((volumnToRemove - delta) + Number.EPSILON) * 10) / 10;
  volumeEachSource.push(volumeDelta);

  // Compare the volume of the source with tip type. Note that volume for each source must be less than tip type.
  var volumesAfterCompareWithTipType = compareVolumeWithTipType(volumeEachSource, liquidType, dispenseType);
  return volumesAfterCompareWithTipType;
}

/**
 * Returns the value of volume for each source in uL.
 */
export const calculateVolumeEachSource = (volumeMastermix, finalConcentration, stockConcentration) => {
  // Assume that final concentration and stock concentration have the same unit
  return (volumeMastermix * (finalConcentration / stockConcentration)); // in uL
}

/**
 * Round up the value of volume to 2 decimal points.
 */
const calculateVolumnEachSourceRoundUp = (volumeMastermix, finalConcentration, stockConcentration) => {
  var volume = calculateVolumeEachSource(volumeMastermix, finalConcentration, stockConcentration);
  return Math.round((volume + Number.EPSILON) * 10) / 10;
}

/**
 * Returns the total number of wells required to split the mastermix volume into.
 * 
 * The purpose of this function is to determine if we need to split mastermix volume into multiple wells.
 */
export const calcuateNumOfWells = (volumeMastermix) => {
  
  // No splitting since the mastermix volume is less than the maximum volume
  if (volumeMastermix <= MAX_VOLUME_IN_uL) { 
    return 1;
  }

  // Split the mastermix volume to get the total number of wells required
  // to meet the total volume
  return Math.ceil(volumeMastermix / MAX_VOLUME_IN_uL);
}

/**
 * Compare the volume of each source with the tip type. 
 * Volume to be pipetted must be smaller than the tip type. If the volume is greater than the
 * tip type, we need to split the volume into multiple pippetting events.
 * 
 * @param {*} listOfVolumeEachSource List of volumes for each source to be pipetted 
 * @param {*} tipType Tip type extracted from liquid class (Possible tip type: 50, 300, 1000)
 * @returns List of volumes of each source
 */
const compareVolumeWithTipType = (listOfVolumeEachSource, liquidType, dispenseType) => {

  var volumeList = [];

  // Compare the volume of the source with tip type
  listOfVolumeEachSource.forEach((volume) => {

    // Check the returned value of tip type
    var tipType = getTipType(liquidType, volume);
    var finalTipType = 0;
    if (tipType.tip !== -1) {
      finalTipType = tipType.tip; // valid tip type
    } else {
      // The volume exceeds the maximum required volume in tip (require volume splitting)
      finalTipType = tipType.maxVolume; // use the maximum possible tip type based on dispense type and liquid type
    }

    var liquidClass = getLiquidClass(liquidType, dispenseType, finalTipType)

    if (volume >= finalTipType) {

      // Calculate how many times to split (pipetting events)
      var numToSplit = Math.ceil(volume / finalTipType);
      
      // New volume after split (round to one decimal point)
      var volumeAfterSplit = Math.round((volume / numToSplit + Number.EPSILON) * 10) / 10;

      /**
       * Assume we split equally, so add each new volume after split to the final list.
       * For example, the orignal volume of 150uL with 50 tip type will be splitted 
       * into 3 pipetting events (50uL each)
       */
      for (var i = 1; i <= numToSplit; i++) {
        volumeList.push({
          volume: volumeAfterSplit,
          tipType: finalTipType,
          liquidClass: liquidClass
        });
      }

    } else {
      // No splitting
      volumeList.push({
        volume: volume,
        tipType: finalTipType,
        liquidClass: liquidClass
      });
    }
  });

  return volumeList;
}

/**
 * Calculate the volume of water source.
 */
const calculateVolumeOfWater = (volumeOfMastermix, totalVolumeBesideWater) => {
  return Math.round(((volumeOfMastermix - totalVolumeBesideWater) + Number.EPSILON) * 10) / 10;
}

/**
 * Calculate and return the list of volume of water source (in uL).
 * All elements in the returned list will populate into the worklist (csv) file.
 * @returns list of volume (uL) for water source
 */
export const getVolume_uL_water = (numOfWells, volumeOfMastermix, totalVolumeBesideWater, liquidType, dispenseType) => {

  // List of volume that will return (the elements in this array will populate into the worklist file)
  var volumeEachSource = [];

  // Handle the case when there is only one well required
  if (numOfWells === 1) {
    
    // Calculate the volume of the source
    var waterVolume = calculateVolumeOfWater(volumeOfMastermix, totalVolumeBesideWater);
    volumeEachSource.push(waterVolume);

    // Compare the volume of the source with tip type
    var volumeAfterCompareWithTipType = compareVolumeWithTipType(volumeEachSource, liquidType, dispenseType);
    return volumeAfterCompareWithTipType;
  }

  // Calculate volume of each source based on the total number of wells required
  const updatedVolumeMastermix = volumeOfMastermix / numOfWells;
  const updatedVolumeBesideWater = totalVolumeBesideWater / numOfWells;

  for (let i = 1; i <= numOfWells; i++) {
    var result = calculateVolumeOfWater(updatedVolumeMastermix, updatedVolumeBesideWater);
    volumeEachSource.push(result);
  }

  // Compare the volume of the source with tip type. Note that volume for each source must be less than tip type.
  var volumesAfterCompareWithTipType = compareVolumeWithTipType(volumeEachSource, liquidType, dispenseType);
  return volumesAfterCompareWithTipType;
}