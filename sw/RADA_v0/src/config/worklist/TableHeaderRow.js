/** 
 * The following variables are the unique identifier keys to differentiate each header cell.
 * Each cell must have different key.
 **/
export const COLUMN_A = 'step_A';
export const COLUMN_B = 'dx_B';
export const COLUMN_C = 'dz_C';
export const COLUMN_D = 'volume_uL_D';
export const COLUMN_E = 'liquid_class_E';
export const COLUMN_F = 'timer_delta_F';
export const COLUMN_G = 'source_G';
export const COLUMN_H = 'step_index_H';
export const COLUMN_I = 'destination_I';
export const COLUMN_J = 'group_number_J';
export const COLUMN_K = 'timer_group_check_K';
export const COLUMN_L = 'guid_L';
export const COLUMN_M = 'from_path_M';
export const COLUMN_N = 'asp_mixing_N';
export const COLUMN_O = 'dispense_type_O';
export const COLUMN_P = 'tip_type_P';
export const COLUMN_Q = 'touchoff_dis_Q';
export const COLUMN_R = 'to_plate_R';
export const COLUMN_S = 'to_well_S';
export const COLUMN_T = 'from_plate_T';
export const COLUMN_U = 'from_well_U';

/** List of column header name in the worklist file (worklist.csv)
 * This list must be in the order (left to right column) of how the CSV file will display.
 * 
 * label - Value of each header cell (first row) to appear in the CSV file
 * key - Unique identifier key to differentiate each header cell
 * 
 */
 export const COLUMN_HEADERS = [
  { label: "step", key: COLUMN_A },
  { label: "dx", key: COLUMN_B },
  { label: "dz", key: COLUMN_C },
  { label: "volume_uL", key: COLUMN_D },
  { label: "liquid_class", key: COLUMN_E },
  { label: "timer_delta", key: COLUMN_F },
  { label: "source", key: COLUMN_G },
  { label: "step_index", key: COLUMN_H },
  { label: "destination", key: COLUMN_I },
  { label: "group_number", key: COLUMN_J },
  { label: "timer_group_check", key: COLUMN_K },
  { label: "guid", key: COLUMN_L },
  { label: "from_path", key: COLUMN_M },
  { label: "asp_mixing", key: COLUMN_N },
  { label: "dispense_type", key: COLUMN_O },
  { label: "tip_type", key: COLUMN_P },
  { label: "touchoff_dis", key: COLUMN_Q },
  { label: "to_plate", key: COLUMN_R },
  { label: "to_well", key: COLUMN_S },
  { label: "from_plate", key: COLUMN_T },
  { label: "from_well", key: COLUMN_U }
]