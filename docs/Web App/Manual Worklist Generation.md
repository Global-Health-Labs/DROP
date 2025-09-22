### Define experiment details 

Define the number of assay steps, timing delays between steps, reagent types, reagent volumes required for each step. This includes addition of antibodies, addition of sample, addition of running buffer, and LFA imaging. This information is used to fill out the ‘step’, ‘volume_ul’, ‘liquid_class’, ‘timer_delta’, ‘source’, ‘step_index’, ‘group_number’, ‘timer_group_check’ columns in the worklist.csv file.

### Determine experiemnt hardware

Based on the total volume of each reagent type, identify the appropriate hardware plate to hold each reagent, and layout reagents 
accordingly. Include an additional 30% volume to account for losses during pipetting. Volumes ≥ 200 uL should be placed in a 96 deep well plate, volumes < 200 uL should be placed in a 96 well plate, volumes < 100 uL should be placed in a 384 well plate. This information is use to fill out the ‘from plate’ and ‘from_well’ columns in the worklist .csv file.

Identify the custom LFA-hardware to be used based on the architecture of the RDT (i.e, LFA strips with or without cassette). Measure or note the locations where pipetting needs to take place. This information is used to fill out ‘dx’, ‘dz’, ‘to_plate’, and ‘to_well’ columns in the worklist .csv file.

### Prepare worklist 

Prepare the worklist. In a “…worklist.csv” file, translate calculations and plate layout into line-by-line commands in the worklist. Use the definitions described in Section 7 to make sure the worklist has all necessary components. 

### Validate worklist 
Test the worklist in simulation mode. Watch simulation closely to make sure all commands are correct. Iterate as needed.
