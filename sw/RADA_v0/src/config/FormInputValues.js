import { LIQUID_TYPE, DISPENSE_TYPE } from "../utils/ExtractLiquidClass"

export const DROPDOWN_OPTIONS = {

  // Different options for Tip Washing of recipe for each mastermix
  TIP_WASHING : ['Yes', 'No'],

  // Different options for concentration unit
  UNITS: [
    'mg/mL',
    'ug/mL',
    'ng/mL',
    'mM',
    'uM',
    'nM',
    'X',
    'U/uL',
    '%'
  ],

  // Different options for PCR plate size
  PCR_PLATE_SIZE: [
    96,
    384
  ],

  // Supported options for dispense type
  DISPENSE_TYPE: [
    DISPENSE_TYPE.JET_EMPTY, 
    DISPENSE_TYPE.SURFACE_EMPTY
  ],

  // Supported options for liquid type
  LIQUID_TYPE: [
    LIQUID_TYPE.WATER,
    LIQUID_TYPE.BUFFER,
    LIQUID_TYPE.PRIMER,
    LIQUID_TYPE.ENZYMES,
    LIQUID_TYPE.TEMPLATE,
    LIQUID_TYPE.ORGANICS,
    LIQUID_TYPE.DETERGENT,
    LIQUID_TYPE._20uL_MM
  ]
}
