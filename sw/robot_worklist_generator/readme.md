# Robot Worklist Generator

A comprehensive worklist generation tool for Hamilton liquid handling robots, designed to automate the creation of experimental protocols for the DROP (Diagnostic Robotic Optimization Platform). This tool generates CSV worklist files that can be directly imported into Hamilton VENUS software to execute automated assays.

## Overview

The Robot Worklist Generator converts high-level experimental designs into detailed robot instructions, handling:
- **Factorial experimental designs** with multiple variables and replicates
- **Solution preparation** and reagent handling protocols
- **Plate management** across multiple deck positions
- **Time-based sequencing** of experimental steps
- **Automatic experiment splitting** when experiments exceed deck capacity

## Key Features

- **Automated Worklist Generation**: Creates Hamilton VENUS-compatible CSV files
- **Factorial Design Support**: Handles multi-variable experiments with customizable parameters
- **Intelligent Experiment Splitting**: Automatically divides large experiments into manageable sub-experiments
- **Dual Output Modes**: 
  - Assay-only worklists (reagents pre-prepared)
  - Full worklists (includes solution preparation steps)
- **Flexible Liquid Handling**: Configurable pipetting parameters and liquid classes
- **Time Management**: Incorporates incubation periods and step timing
- **Deck Optimization**: Optimizes plate placement and liquid transfers

## File Structure

```
robot_worklist_generator/
├── main.py                          # Main execution script
├── full_experiment.py               # Full experimental worklist generation
├── one_run.py                       # Single run worklist generation
├── split_input.py                   # Experiment splitting utilities
├── rearrange_worklist.py            # Worklist optimization functions
├── util.py                          # Utility functions and helpers
├── input_master.csv                 # Master configuration file
├── input_experiment/                # Experimental design templates
│   └── factorial_experiment.csv     # Example factorial design
├── input_instrument/                # Instrument configuration files
│   ├── reagent_plates.csv          # Deck plate definitions
│   └── exp_time.csv                # Step timing specifications
├── input_liquid/                    # Liquid handling specifications
│   ├── solutions.xlsx              # Available solutions inventory
│   └── liquid_type.csv             # Liquid class definitions
├── output_run_assay_worklist/       # Assay-only worklist outputs
└── output_full_worklist/            # Complete worklist outputs
```

## Input Files

### 1. Master Configuration (`input_master.csv`)
Central configuration file containing all experimental parameters:

| Category | Key Parameters | Description |
|----------|----------------|-------------|
| **Experiment Setup** | `exp_input_file`, `coord0`, `coord1` | Defines experimental design and variable coordinates |
| **Replication** | `nsub0`, `nsub1`, `nrep` | Number of conditions and replicates per sub-experiment |
| **Instrument** | `assay_plate_prefix`, `nplate`, `nperplate` | Deck configuration and plate specifications |
| **Liquid Handling** | `sol_df_file`, `liquid_type_df_file` | Solution inventory and pipetting parameters |
| **Output** | `output_dir`, `full_dir`, `prefix` | File naming and directory structure |

### 2. Experimental Design (`input_experiment/`)
- **`factorial_experiment.csv`**: Defines experimental steps, volumes, and conditions
- **Step Parameters**: dx/dz offsets, volumes, liquid classes, timing
- **Variable Specification**: Primary and secondary experimental variables
- **Time Control**: Step delays and incubation periods

### 3. Instrument Configuration (`input_instrument/`)
- **`reagent_plates.csv`**: Deck layout and plate positions
- **`exp_time.csv`**: Timing specifications for each experimental step

### 4. Liquid Specifications (`input_liquid/`)
- **`solutions.xlsx`**: Available reagents, concentrations, and volumes
- **`liquid_type.csv`**: Liquid class definitions for different solution types

## Usage

### Command Line Execution
```bash
python main.py
```

This will:
1. Read configuration from `input_master.csv`
2. Process experimental design files
3. Generate worklist files in specified output directories
4. Create both assay-only and full experimental worklists

### Configuration Steps

1. **Define Experiment**: Modify `input_experiment/factorial_experiment.csv`
   - Specify experimental steps and parameters
   - Define variable conditions (comma-separated in cells)
   - Set timing requirements

2. **Configure Parameters**: Update `input_master.csv`
   - Set variable coordinates (`coord0`, `coord1`)
   - Define sub-experiment sizes (`nsub0`, `nsub1`)
   - Specify replication (`nrep`)

3. **Prepare Solutions**: Update `input_liquid/solutions.xlsx`
   - List available reagents and concentrations
   - Specify volumes and storage locations

4. **Run Generation**: Execute `main.py` to create worklists

## Output Files

### Assay Worklists (`output_run_assay_worklist/`)
- **`[prefix]N_worklist.csv`**: Hamilton-compatible worklist for assay execution
- **`[prefix]N_source.csv`**: Source plate mapping and reagent locations
- **`[prefix]N_perm_df.csv`**: Experimental condition permutations
- **`[prefix]N_exp_input_patched.csv`**: Processed experimental design

### Full Worklists (`output_full_worklist/`)
- Complete protocols including solution preparation steps
- Integrated reagent mixing and assay execution
- Optimized for minimal manual intervention

## Experimental Design Features

### Factorial Design Support
- **Multi-variable experiments**: Primary and secondary variables with multiple levels
- **Automatic permutation**: Generates all variable combinations
- **Replication control**: Configurable number of replicates per condition
- **Randomization options**: Built-in experimental randomization

### Time Management
Special timing control syntax in experimental design:
- **`-1`**: Next step can occur at any time after completion
- **`0`**: Next step must occur immediately (rarely used)
- **Positive number**: Specific delay time in seconds

### Experiment Splitting
When experiments exceed deck capacity:
- Automatically splits into sub-experiments
- Maintains experimental integrity
- Generates separate worklists for each sub-experiment
- Preserves randomization within splits

## Example Workflow

1. **Design Experiment**: 
   ```csv
   step,dx,dz,volume,liquid_class,time,source
   Conjugate addition,13,0.2,2,pbst,-1,"conjugate_1,conjugate_2"
   sample,0,1,75,water,600,"Pos, Neg"
   imaging,24,0,0,imaging,1500,imaging
   ```

2. **Configure Variables**:
   - Primary variable (coord0): Different conjugates
   - Secondary variable (coord1): Sample types
   - Replicates: 4 per condition

3. **Generate Worklists**:
   - Creates optimized liquid handling sequences
   - Handles timing and incubations
   - Produces Hamilton-ready CSV files

## Requirements

```python
pandas
numpy
openpyxl  # For Excel file reading
```

## Troubleshooting

### Common Issues
- **File Path Errors**: Ensure all input files are in correct directories
- **Variable Coordinate Errors**: Verify `coord0` and `coord1` reference valid cells
- **Deck Capacity**: Reduce `nsub0` or `nsub1` if experiments are too large
- **Solution Availability**: Check that all referenced solutions exist in `solutions.xlsx`

### Output Validation
- Check generated worklist row counts match expected conditions × replicates
- Verify liquid volumes don't exceed source plate capacities
- Confirm timing sequences are logical

## Advanced Features

### Custom Liquid Classes
Modify `input_liquid/liquid_type.csv` to define:
- Custom aspiration/dispense speeds
- Mixing parameters
- Air gap specifications

### Plate Layout Optimization
Configure `input_instrument/reagent_plates.csv` for:
- Custom deck layouts
- Specialized plate types
- Multi-plate experiments

---

*Part of the DROP (Diagnostic Robotic Optimization Platform) - Global Health Labs, Inc.*