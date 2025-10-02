# LFA Image Analysis Tool

An automated image analysis system for Lateral Flow Assays (LFAs) designed for the DROP (Diagnostic Robotic Optimization Platform). This tool processes images captured by Hamilton robot systems to quantify test and control lines/spots, providing objective measurements for assay optimization.

## Overview

This software provides automated analysis of LFA images with support for:
- **Multiple signal types**: Lines and spots on lateral flow strips
- **Flexible backgrounds**: Dark frames (custom holders) or light frames (white cassettes)
- **Multi-signal analysis**: Simultaneous analysis of test and control lines
- **Automated and manual ROI selection**: Full automation or manual region of interest selection
- **Batch processing**: High-throughput analysis of multiple experiments
- **Hamilton robot integration**: Direct processing of robot-captured images

## Key Features

- **Versatile Image Processing**: Handles both line-based and spot-based LFA formats
- **Background Adaptability**: Optimized for both dark and light background imaging
- **Multi-channel Analysis**: Supports red, green, blue, and grayscale color channels
- **Automated ROI Detection**: Intelligent region of interest identification
- **Manual Override Capability**: Manual ROI selection for problematic images
- **Batch File Generation**: Automated creation of processing scripts
- **Comprehensive Output**: CSV data files and visualization PDFs
- **Parameter Optimization**: Extensive customization for different strip types

## File Structure

```
LFA_image_analysis/
├── backend.py                       # Core image processing functions
├── Hamilton_image_analysis.py       # Main analysis script for Hamilton integration
├── generate_batch_files_and_run.py  # Batch processing automation
├── Batch_files_and_run.ipynb       # Jupyter notebook for batch analysis
├── requirements.txt                 # Python dependencies
├── all_results.csv                  # Consolidated results from multiple experiments
├── exp3_full_worklist/              # Example experiment 3 data
├── exp4_full_worklist/              # Example experiment 4 data
├── *.bat                           # Generated batch files for automated processing
└── __pycache__/                    # Python cache files
```

## Core Functionality

### Image Processing Pipeline

1. **Image Loading**: Supports standard image formats (PNG, JPG, TIFF)
2. **Initial ROI Detection**: Automated identification of strip regions
3. **Background Correction**: Adaptive processing for dark/light backgrounds
4. **Signal Extraction**: Line or spot detection and quantification
5. **Multi-signal Analysis**: Simultaneous test and control line processing
6. **Data Export**: CSV results and visualization generation

### Signal Types

#### Line Analysis
- Horizontal or vertical line detection
- Signal intensity profiling along strip length
- Background subtraction and detrending
- Peak detection and quantification

#### Spot Analysis
- Circular/elliptical spot detection
- Contour-based region identification
- Intensity integration over spot area
- Background normalization

## Usage Methods

### Method 1: Automated Batch Processing
```python
python generate_batch_files_and_run.py
```
- Generates batch files for multiple folders
- Automatically executes processing
- Consolidates results across experiments
- Recommended for large-scale analysis

### Method 2: Single Experiment Processing
```bash
python Hamilton_image_analysis.py [input_folder] [parameters]
```
- Direct processing of single experiment
- Custom parameter specification
- Immediate results generation

### Method 3: Jupyter Notebook Interface
Open `Batch_files_and_run.ipynb` for interactive analysis with:
- Parameter visualization
- Real-time result inspection
- Custom processing workflows

### Method 4: Manual ROI Selection
For images requiring manual intervention:
- Use ImageJ to identify ROI coordinates
- Create custom batch files with manual ROI parameters
- Process specific problematic images separately

## Parameter Configuration

### Critical Parameters (Usually Modified)

#### Initial ROI Detection
```json
{
    "row0": 608,        // Initial top row
    "row1": 900,        // Initial bottom row  
    "col0": 680,        // Initial left column
    "col1": 1500,       // Initial right column
    "dark_frame": 0,    // 0 for light background, 1 for dark background
    "border": [190, 465] // Boundaries to split test/control regions
}
```

#### Signal Processing
```json
{
    "color_channel": ["red", "red"],      // Color channels for each signal
    "signal_type": ["line", "line"],      // Signal types: "line" or "spot"
    "nsignal": 3                          // Number of points to average for signal calculation
}
```

### Advanced Parameters

#### Image Preprocessing
- **`median_blur_size`**: Noise reduction kernel size
- **`sobel_size`**: Edge detection kernel size  
- **`gblur_size`**: Gaussian blur kernel size

#### ROI Refinement
- **`row_offset`**: Vertical boundary buffer
- **`col_offset`**: Horizontal boundary buffer
- **`crop_right_extra`**: Enhanced right boundary detection

#### Signal Analysis
- **`do_detrend`**: Enable background detrending
- **`ndetrend`**: Points used for trend calculation
- **`top_fraction`**: Threshold fraction for spot detection

## Typical Workflow

### 1. Initial Setup
- Organize images in experiment folders
- Use ImageJ to determine initial ROI coordinates
- Configure basic parameters (dark/light frame, signal types)

### 2. Parameter Optimization
```python
# Start with default parameters
parameters = {
    "row0": 600, "row1": 900, "col0": 700, "col1": 1400,
    "dark_frame": 0, "signal_type": ["line", "line"],
    "color_channel": ["red", "red"], "border": [200, 450]
}
```

### 3. Test Analysis
- Run on small subset of images
- Examine output PDF visualizations
- Check CSV results for reasonable values

### 4. Parameter Refinement
- Adjust ROI boundaries based on visualization
- Modify signal processing parameters
- Test edge cases and problematic images

### 5. Batch Processing
- Generate batch files for all experiments
- Execute automated processing
- Consolidate results for analysis

## Output Files

### Quantitative Results
- **`image.csv`**: Primary results file containing:
  - Image filenames and metadata
  - Signal intensities for each region
  - Signal-to-noise ratios
  - Background measurements
  - Quality metrics

### Visualization
- **`image_ROI_line.pdf`**: Multi-page PDF showing:
  - Original images with ROI overlays
  - Signal intensity profiles
  - Peak detection results
  - Quality control information

### Intermediate Files
- **`*_processed.png`**: Processed images with annotations
- **`*_profile.csv`**: Detailed signal profiles
- **`*.bat`**: Generated batch processing scripts

## Example Parameter Sets

### Standard Line Analysis (Dark Background)
```json
{
    "row0": 608, "row1": 900, "col0": 680, "col1": 1500,
    "median_blur_size": 7, "sobel_size": 5, "dark_frame": 1,
    "gblur_size": 30, "crop_right_extra": 1, "row_offset": 40,
    "col_offset": 30, "border": [190, 465],
    "color_channel": ["red", "red"], "signal_type": ["line", "line"],
    "do_detrend": 1, "ndetrend": 5, "nsignal": 3
}
```

### Spot Analysis (Light Background)
```json
{
    "row0": 500, "row1": 800, "col0": 600, "col1": 1200,
    "dark_frame": 0, "signal_type": ["spot", "spot"],
    "color_channel": ["blue", "blue"], "nblur": 400,
    "top_fraction": 0.05, "contour_mode": 1, "contour_method": 2,
    "rect_height": 10, "edge_gap": 40
}
```

## Integration with DROP Platform

### Hamilton Robot Integration
- Direct processing of robot-captured images
- Automated file organization by experiment
- Integration with robot worklist generators
- Compatibility with RADA web application

### Data Flow
1. **Robot Execution**: Hamilton captures images during LFA experiments
2. **Automated Processing**: Batch analysis of captured images
3. **Data Consolidation**: Results aggregated in `all_results.csv`
4. **Analysis Integration**: Output compatible with thermocycler analysis tools

## Dependencies

Key Python packages (see `requirements.txt` for complete list):
```python
opencv-python      # Image processing
numpy              # Numerical operations
pandas             # Data manipulation
matplotlib         # Plotting and visualization
scipy              # Scientific computing
```

## Troubleshooting

### Common Issues

#### Poor ROI Detection
- **Solution**: Adjust `row0`, `row1`, `col0`, `col1` parameters
- **Tool**: Use ImageJ to find correct coordinates
- **Check**: Verify `dark_frame` setting matches background

#### Incorrect Signal Separation
- **Solution**: Modify `border` parameter values
- **Check**: Ensure `border` list length matches number of signals - 1
- **Verify**: Test/control regions are properly separated

#### Noisy Results
- **Solution**: Increase `median_blur_size` or `gblur_size`
- **Alternative**: Adjust `ndetrend` for better background correction
- **Consider**: Manual ROI selection for problematic images

#### Processing Errors
- **Check**: Image file formats and accessibility
- **Verify**: Parameter JSON syntax is valid
- **Ensure**: Required directories exist

### Quality Control

#### Visual Inspection
- Always examine PDF output files
- Verify ROI placement on sample images
- Check signal intensity profiles make sense

#### Quantitative Validation
- Compare positive/negative control results
- Check for reasonable signal-to-noise ratios
- Validate consistency across replicates

## Advanced Features

### Custom Signal Processing
- Implement custom detrending algorithms
- Add specialized spot detection methods
- Create custom visualization outputs

### Batch Optimization
- Parallel processing for large datasets
- Memory-efficient handling of high-resolution images
- Automated parameter optimization

### Integration Capabilities
- Export results to various formats
- Integration with statistical analysis packages
- Compatibility with laboratory information systems

---

*Part of the DROP (Diagnostic Robotic Optimization Platform) - Global Health Labs, Inc.* 

