# RoboNAAT-Thermocycler-Analysis

This tool takes raw thermocycler data (example shown in sample_excel.xlsx) and plate map information (plate_map.xlsx and plate_key.xlsx) to analyze nucleic acid amplification (NAAT) data. Code outputs (A) a csv (Output_data.csv) with all output variables identified (B) a PDF with fluorescence traces for each well for troubleshooting and (C) a folder filled with one PNG per well, critical variables visualized on each plot. 

Some things that still need to be addressed - 
1. The current code does not load all flourophores (each fluorophore is a separate tab in the sample_excel.xlsx file), therefore introducing a way to take user input as to which fluorophore is of intrest needs to be included. 
2. Some way to combine input information for each plate and the output data
