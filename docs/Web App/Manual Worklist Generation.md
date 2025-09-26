### Define experiment details 

Specify the number of assay steps, timing delays between steps, reagent types and reagent volumes required for each step. This includes addition of antibodies, addition of sample, addition of running buffer, and LFA imaging. These parameters are used to populate  the following columns in the worklist: ‘step’, ‘volume_ul’, ‘liquid_class’, ‘timer_delta’, ‘source’, ‘step_index’, ‘group_number’, ‘timer_group_check’.

### Determine experiment hardware

Based on the total volume of each reagent type, determine the appropriate hardware plate to hold each reagent, and layout reagents accordingly. Include an additional 30% volume to account for losses during pipetting. Reagents with volumes ≥ 200 uL should be placed in a 96 deep well plate, those with volumes < 200 uL in a 96 well plate, and those with volumes < 100 uL in a 384 well plate. This information is use to populate the ‘from plate’ and ‘from_well’ columns in the worklist .csv file.

Identify the appropriate custom LFA-hardware based on the assay architecture (i.e, LFA strips with or without cassette). Measure and note the precise pipetting and/or imaging locations. This information is used to populate ‘dx’, ‘dz’, ‘to_plate’, and ‘to_well’ columns in the worklist .csv file.

### Prepare worklist 

![Worklist example image](./images/Worklist%20example.PNG) <br>
<small>Figure 1. Example worklist, with corresponding column headers and each step indicated by a single row. </small>

Generate the "...worklist.csv" file by translating the calculated reagent volumes and plate layouts into line-by-line commands. Ensure that each step is accurately represented in the worklist format. Refer to the definitions provided in the Glossary to confirm that all required information are included in the file.

### Validate worklist 
Test the worklist in simulation mode, closely monitoring the execution of each command to ensure accuracy. Revise and iterate as needed based on observed discrepancies or errors.