import { getMastermixWorklistData } from "./GenerateMastermixWorklist";
import { getSampleWorklistData } from "./GenerateSampleWorklist";
import { v4 as uuidv4 } from 'uuid';

/**
 * Generate the list of data to be used for interactive instructions.
 * @returns The array of objects in the format:
 * {
 *    id: uuidv4(), // Example output: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      source: source,      
      plate: plate,
      well: wellId,
      originalTotalSourceVolumes: totalSourceVolume * 1.3,
      totalSourceVolumes: Math.ceil(((totalSourceVolume + 1) * 1.3) / 10) * 10,
      isDone: false
 * }
 */
export const getInstructionData = (listOfMastermixes, experimentalPlanData) => {

  var data = [];

  // Generate the list of mastermix worklist data
  const mmWorklistData = getMastermixWorklistData(listOfMastermixes, experimentalPlanData, false);

  // Sort mastermix data based on plate type and well ID
  mmWorklistData.sort((a, b) => {
    return a.from_well_U - b.from_well_U;
  }).sort((a, b) => {
    return a.from_plate_T.localeCompare(b.from_plate_T, undefined, {sensitivity: 'base'}); 
  })

  // Add sorted key to the original worklist data
  mmWorklistData.forEach((object) => {
    object.wellPlatePair = object.from_well_U + '-' + object.from_plate_T + '-' + object.source_G;
  });

  // Create the list of unique well and plate
  const listOfWellPlate = mmWorklistData.map(row => row.wellPlatePair);
  const uniqueWellPlate = [...new Set(listOfWellPlate)];
  const totalVolumeSourcePair = [];

  // Loop through each well/plate pair to calculate the total volume of each unqiue well/plate/source
  uniqueWellPlate.forEach((object) => {

    var totalSourceVolume = 0;
    var wellId = 0;
    var plate = "";
    var source = "";

    mmWorklistData.forEach((row) => {
      if (object === row.from_well_U + '-' + row.from_plate_T + '-' + row.source_G) {
        totalSourceVolume += row.volume_uL_D;
      }
    });

    wellId = Number(object.split('-')[0].trim());
    plate = object.split('-')[1].trim();
    source = object.split('-')[2].trim();

    totalVolumeSourcePair.push({
      id: uuidv4(), // Example output: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      source: source,      
      plate: plate,
      well: wellId,
      //originalTotalSourceVolumes: totalSourceVolume * 1.3,
      totalSourceVolumes: Math.ceil(((totalSourceVolume + 1) * 1.3) / 10) * 10,
      isDone: false
    });
  });
  //console.log('Source list', totalVolumeSourcePair);

  totalVolumeSourcePair.forEach(mmRow => {
    data.push(mmRow);
  });

  // Add source from sample worklist
  const sampleWorklistData = getSampleWorklistData(listOfMastermixes, experimentalPlanData);
  //console.log('sampleWorklistData', sampleWorklistData);

  // Create the list that contains unique input sources
  const sampleSourceList = sampleWorklistData.map(row => row.source_G);
  const uniqueSampleSourceLists = [...new Set(sampleSourceList)];
  const totalVolumeSampleSourcePair = [];

  // Calculate total source volume of each sample
  uniqueSampleSourceLists.forEach((source, index) => {
  
    var totalSourceVolume = 0;
    var wellId = 0;
    var plate = "";

    sampleWorklistData.forEach((object) => {
      if (source.toLowerCase() === object.source_G.toLowerCase()) {
        totalSourceVolume += object.volume_uL_D;
      }
    });

    for (const object of sampleWorklistData) {
      if (object.source_G.toLowerCase() === source.toLowerCase()) {
        wellId = object.from_well_U;
        plate = object.from_plate_T;
        break;
      }
    }

    totalVolumeSampleSourcePair.push({
      id: uuidv4(), // Example output: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      source: source,      
      plate: plate,
      well: wellId,
      //originalTotalSourceVolumes: totalSourceVolume * 1.3,
      totalSourceVolumes: Math.ceil(((totalSourceVolume + 1) * 1.3) / 10) * 10,
      isDone: false
    })
  });
  //console.log('Sample', totalVolumeSampleSourcePair);

  totalVolumeSampleSourcePair.forEach(sampleRow => {
    data.push(sampleRow);
  })

  return data;
}