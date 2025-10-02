# Thermocycler Analysis Tool

A comprehensive analysis toolkit for processing and analyzing nucleic acid amplification test (NAAT) data from thermocycler experiments. This tool is part of the DROP (Diagnostic Robotic Optimization Platform) software suite and processes raw fluorescence data from Bio-Rad CFX thermocyclers.

## Overview

This tool processes raw thermocycler data files (`.xlsx` format) and generates comprehensive analysis outputs including:
- Quantitative metrics (Cq values, amplification efficiency, etc.)
- Fluorescence trace plots for each well
- Multi-fluorophore support (FAM, HEX, Cy5, Texas Red, Quasar 705)
- Batch processing capabilities for multiple plates

## Features

- **Multi-fluorophore Analysis**: Supports analysis of FAM, HEX, Cy5, Texas Red, and Quasar 705 fluorescence channels
- **Batch Processing**: Analyze multiple plates simultaneously using the Jupyter notebook interfaces
- **Flexible Thresholding**: User-defined threshold values for Cq determination
- **Comprehensive Outputs**: CSV files with quantitative metrics and PDF plots for visualization
- **96 and 384 Well Plate Support**: Works with both standard plate formats

## File Structure

```
thermocycler_analysis/
├── main.py                          # Command-line interface for single plate analysis
├── data_process.py                  # Core data processing functions
├── PlateAnalyzer.py                 # Main analysis class
├── Plate Analyzer.ipynb             # Jupyter notebook for batch analysis
├── Single Plate Analyzer.ipynb     # Jupyter notebook for single plate analysis
├── Batch Plate Analyzer.ipynb      # Advanced batch processing notebook
├── Plate Analyzer-FAM.ipynb        # FAM-specific analysis notebook
├── Example 96 well plate/           # Example data and outputs for 96-well format
├── Example 384 well plate/          # Example data and outputs for 384-well format
├── raw_data/                        # Directory for input data files
└── fitting_models.txt               # Documentation of curve fitting models
```

## Input Data Requirements

### Thermocycler Data
- **Format**: Excel files (`.xlsx`) exported from Bio-Rad CFX software
- **Required Sheet**: "Quantification Amplification Results" (recommended without background subtraction)
- **Data Structure**: Cycles in first column, well data in subsequent columns

### Expected File Naming
- Input files should be placed in the `raw_data/` directory or current working directory
- Output files will be generated with the same base name plus suffixes:
  - `_params.csv`: Quantitative parameters
  - `_qoi.csv`: Quantities of interest
  - `_[fluorophore]_plot.pdf`: Fluorescence plots for each channel

## Usage

### Method 1: Command Line Interface
```bash
python main.py
```
- Interactive threshold selection
- Processes single Excel file (`sample_excel.xlsx`)
- Requires `plate_map.xlsx` and `plate_key.xlsx` for well mapping

### Method 2: Jupyter Notebooks

#### Single Plate Analysis
Open `Single Plate Analyzer.ipynb` for analyzing individual plates with detailed visualization.

#### Batch Processing
Open `Plate Analyzer.ipynb` for processing multiple plates simultaneously:
1. Place all `.xlsx` files in the working directory
2. Run all cells to process each file
3. Outputs generated for each input file

#### Advanced Batch Analysis
Use `Batch Plate Analyzer.ipynb` for more sophisticated batch processing with custom parameters.

## Outputs

### CSV Files
- **`[filename]_params.csv`**: Contains calculated parameters for each well including:
  - Cq values (cycle threshold)
  - Amplification efficiency
  - R-squared values for curve fits
  - Baseline and plateau values

- **`[filename]_qoi.csv`**: Quantities of interest summary

### PDF Plots
- **`[filename]_[fluorophore]_plot.pdf`**: Multi-panel plots showing fluorescence traces for all wells
  - One plot per fluorescence channel
  - Grid layout matching plate format (8x12 for 96-well, 16x24 for 384-well)
  - Individual well traces with cycle numbers

## Supported Fluorophores
- **FAM** (6-carboxyfluorescein)
- **HEX** (Hexachlorofluorescein)
- **Cy5** (Cyanine 5)
- **Texas Red**
- **Quasar 705**

## Example Data

The `Example 96 well plate/` and `Example 384 well plate/` directories contain sample data and expected outputs to help users understand the input format and expected results.

## Dependencies

```python
pandas
matplotlib
scipy
numpy
openpyxl  # For Excel file reading
```

## Configuration

### Threshold Selection
- **Recommended range**: 5,000 - 25,000 RFU (Relative Fluorescence Units)
- **Default**: User-prompted input in command-line interface
- **Customizable**: Can be modified in notebook interfaces

### Analysis Parameters
- Curve fitting models are documented in `fitting_models.txt`
- Spline interpolation used for smooth curve analysis
- Background subtraction options available

## Known Limitations

1. **Fluorophore Selection**: Currently requires manual specification of fluorophore of interest in some interfaces
2. **Plate Mapping**: Integration between plate map information and output data could be enhanced
3. **File Formats**: Currently optimized for Bio-Rad CFX Excel export format

## Troubleshooting

### Common Issues
- **File Not Found**: Ensure input files are in the correct directory (`raw_data/` or working directory)
- **Excel Format**: Verify files are exported from CFX software with "Quantification Amplification Results" sheet
- **Threshold Selection**: If analysis fails, try adjusting threshold values within the recommended range

### Support
For technical issues or questions, refer to the main DROP documentation or contact the development team.

## Integration with DROP Platform

This analysis tool integrates with the broader DROP ecosystem:
- Processes data from NAAT experiments run on the Hamilton STAR platform
- Outputs can be used for Design of Experiments (DoE) analysis
- Compatible with RADA web application workflow

---

*Part of the DROP (Diagnostic Robotic Optimization Platform) - Global Health Labs, Inc.*
