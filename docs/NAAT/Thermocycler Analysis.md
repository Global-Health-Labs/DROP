This document outlines the process for analyzing thermocycler data generated from nucleic acid amplification tests (NAAT). The provided code is optimized for handling large batch datasets, typically produced by the NAAT system. It has been developed and validated using data exported from Bio-Rad software. While the current implementation is tailored to Bio-Rad outputs, additional development may be necessary to support data from other thermocycler platforms. Importantly, the software described here can also be applied to thermocycler data generated outside the context of RoboNAAT.

Traditional analysis for thermocycler data analyzes one 96 or 384 well plate at a time. Background subtraction and amplification threshholds are deteremined automatically using the software associated with the machine. 

We sought to develop code that can analyze many plates at once. This presented unique challenges, as the automatically set threshold does not always apply to experiments where many variables are changing at once. Therefore, this code takes the raw fluorescence data from the thermocycler, generates a sigmoidal logistic function fit to the data, and outputs the variables of interest for analysis. The sigmoidal logistic function is based on [Goll et al 2006](https://link.springer.com/article/10.1186/1471-2105-7-107)

## :fontawesome-solid-computer: **Software requirements**

To operate the thermocycler data analysis code, Python and Jupyter notebook are required. Instructions on how to install Jupyter notebook on a Windows machine can be found here - https://www.geeksforgeeks.org/how-to-install-jupyter-notebook-in-windows/

## :material-file-edit: **Files included in Github Repo**

Link to repo - 

Jupyter Notebooks: these are the files that the operator will open to run the analysis code

- Batch Plate Analyzer.ipynb
- Single Plate Analyzer.ipynb
- Partial Plate Analyzer.ipynb

Python file(s): Python files that the Jupyter notebook refers to in order to analyze data. Some additional functions are present in these files beyond what is included in the Jupyter notebook file and can be updated if desired.

- PlateAnalyzer.py
- PlateAnalyzer-partial.py

## :material-application-variable-outline: **Important Values**

![Amplification Curve Example](./images/Amplification%20curve%20example.png) <br>
<small>Figure 1. Graphical representation of the Quantities of Interest (QOI) calculated by the Plate Analyzer code. More information about each of these variables can be found below. </small>

## :material-chart-bell-curve-cumulative: **Fitting Model and Quantities of Interest (QOI)**

This section provides background on the fitting model and the key quantities calculated by the Plate Analyzer Code.

**Input:**

- Raw fluorescence data from a thermocycler 

    !!! note
        Use data that has not been background-subtracted to preserve the integrity of the fitting process.

**Outputs:**

The PlateAnalyzer.py generates a model fit1 to the raw data for every well and fluorophore in thermocycler export. From this model fit, five parameters will be generated for every curve. These five parameters are:

- F_max: Maximum fluorescence for that curve
- C_half: Cycle number that is halfway between the time that exponential amplification starts and when it ends 
- k: Slope constant that relates to amplification efficiency
- F_b: Background fluorescence for that curve 
- DriftSlope: Drift of the slope that can occur as an experiment progresses. Enables background subtraction similar to how the thermocycler program background subtracts. 

Identifies the following quantities of interest (QOI): A graphical description of each of these factors is shown in Figure 1. 

- F_0: Starting fluorescence.
- F_1: Fluorescence value when exponential amplification begins. 
- F_2: Fluorescence value when exponential amplification stops.
- F_max: Maximum fluorescence for that curve.
- deltaF: Change in fluorescence values between F_max and F_0.
- R2_score: Coefficient of determination for the model fit. Higher value = model fit that is a good representation of the raw data. 
- C_half: Cycle number that is halfway between the time that exponential amplification starts and when it ends.
- dFdC_half: Slope of the amplification curve at C_half.
- C_lift: Cycle number at which exponential amplification begins. 
- C_slow: Cycle number at which exponential amplification stops. 
- deltaC: C_slow minus C_lift. Indicates how quickly a reaction plateaued. 

!!! note
    This list includes more information than we think is necessary for interpretation of a NAAT experiment, but we have retained the outputs in case they become useful for future chemistries or experimental designs. 

## :material-view-dashboard-edit-outline: **Module Options**

There are three different notebooks in the NAAT Thermocycler Analysis folder that process different types of plates. Information about each of these is included below. All three use the same backend code to analyze the thermocycler wells, the differences are in how the analysis files are identified and what the graphical output looks like. 

![Thermocycler Analysis Code Modules](./images/Thermocycler%20Analysis%20Code%20Modules.png) <br>
<small>Figure 2. The Thermocycler Analysis code has three notebook options that all use the same backend analysis. The difference between the three is whether it’s a single plate, a group of plates, or a partial plate. </small>

## :material-google-analytics: **Analyzing Thermocycler Data**

1. Export raw data as .xlsx from thermocycler. 
    For optimal results, remove background subtraction before exporting. The file to be analyzed is the Quantification Amplification Result file. The analysis file should be structured so each sheet contains the fluorescence reads for each fluorophore measured. Within each sheet the columns corresponds to well IDs and the rows are cycle numbers.
2. Load analysis code into a new folder. 
3. The code can be downloaded from: Analysis software
    *Location: External InDx > C-CAMP_InDx_GHL_Collaboration > Software > Analysis software* 
4. Save the Quantification Amplification Result file into your analysis folder made in 10.2. 
5. Launch the Jupyter Notebook and navigate to your analysis folder.
6. Open the Notebook. A new tab will open in your default web browser showing the Jupyter Notebook interface.
7. Navigate to the directory where the Jupyter Notebook file is located. 
    *Notebook options are Single Plate Analyzer, Batch Plate Analyzer, and Partial Plate Analyzer. More information about each of these can be found in the Module Options section below.* 
8. Select the relevant .ipynb file.

    ![Jupyter Notebook](./images/Jupyter%20Notebook%20Single.png) <br>
    <small>Figure 3. Example of Notebook view for Single Plate Analyzer. </small>

9. Run each kernel:

    - Run one Kernel at a time by selecting the Kernel and pressing Shift + Enter or by selecting the “Run” button on the toolbar. 
    - When a Kernel is running, a [*] will appear next to “In” on the left-hand side. Once it is complete there will be a number that appears inside the brackets. 

    !!! note 
        Make sure to run the Kernels in order. The analysis will not complete successfully if they are run out of order. 
    
10. Review output: In the analysis folder, the following files will be generated
    
    - Individual CSV file for each plate containing quantities of interest (QOIs) for each well and fluorophore.
        See Section 11 for more information about QOI calculations.
    - Individual CSV file for each plate containing model fit parameters for each well and fluorophore.
    - PDF with individual amplification curves in the shape of the plate for each fluorophore in the raw data file.

    ![Jupyter Notebook Files](./images/Thermocycler%20analysis%20files.png) <br>
    <small>Figure 4. Example images of files generated by all three of the Jupyter Notebooks. </small>

11. Save your work: Remember to save your work frequently by clicking the save icon or pressing Ctrl + S. 
12. Shut down the notebook: When you are done, you can shut down the notebook by closing the browser tab and stopping the Jupyter server in your terminal by pressing Ctrl + C. 