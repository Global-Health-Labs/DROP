## Preparing for an LFA experiment 

An LFA effort on the DROP system begins by preparing the hardware and software for a given assay. Most often, we'll start with a strip or cassette with specific dimensions that correspond to the overall size of the assay, the pipetting location(s), and the read window. 

![LFA Strip vs Cassette Examples](./images/LFA_dimension examples.png) <br>
<small>Figure 1. Examples of a strip LFA (A) and cassetted LFA (B) with some example dimensions that may be required. Not pictured are the height dimensions that are important when programming pipetting steps. It is recommended to measure using a caliper or other highly accurate measurement tool. </small>

For a given LFA, make sure to take note of the important x, y, and z locations that will need to be incorporated for the hardware and software. 

### :simple-opensourcehardware:  **Adjusting hardware for LFA**

#### Cassette holder adjustments 

The cassette holder is made from laser cut acrylic that has a grid to consistently space cassettes inside the deck of the Hamilton STAR. To modify for a given LFA, start by measuring the width and the length of the LFA cassette. Make adjustments to the CAD file (link) so that the cassette can fit inside the rectangle cut from the acrylic. Make sure to keep the spacing between rectangles consistent in both the x and y dimensions, as this will be important when making labware adjustments. 


#### Strip holder adjustments 


### :simple-opensourcehardware:  **Adjusting labware for LFA**



### :material-image-auto-adjust: **Adjusting RADA for strip**



### :material-camera: **Adjusting imaging for strip** 



### :fontawesome-solid-droplet: **Optimizing liquid classes**

The DROP system has a library of liquid classes that can be used to run experiments. These liquid classes are modified to have the precise pipetting protocol to enable consistent pipetting for a given liquid class. It is important to precisely tune a liquid class for the liquids that will be pipetted during an experiment on the DROP system. Some of the parameters that are included are flow rate, air transport volume, blowout volume, settling time, and more. More information can be found in the CO-RE Liquid Editor Help section. Liquid classes can be made using the Hamilton Liquid Verification Kit (LVK). When more liquid classes are made, or when an existing liquid class is validated for a new liquid, they will undergo performance qualification. The list below includes liquid classes used commonly for the LFA system. 

| Liquid Class           | Tip size | Dispense Type     | Recommended validation for: |
| :-------------- | :-------------------- | :------------------- | :------------------- |
| RoboLFA_tip50_spot_JetEmpty | 50|Jet Empty | Antibody and conjugate solutions |
| RoboLFA_tip300_buffer_JetEmpty | 300|Jet Empty | LFA running buffer |
| RoboLFA_tip300_buffer_SurfaceEmpty | 300|Surface Empty | LFA running buffer |
| RoboLFA_tip50_buffer_JetEmpty | 50|Jet Empty | LFA running buffer |
| RoboLFA_tip50_buffer_SurfaceEmpty | 50|Surface Empty | LFA running buffer |
| RoboLFA_tip50_plasma_JetEmpty | 50|Jet Empty | Plasma or similar |
| RoboLFA_tip50_plasma_SurfaceEmpty | 50|Surface Empty | Plasma or similar |
| RoboLFA_tip50_water_JetEmpty | 50|Jet Empty | Water |
| RoboLFA_tip50_water_SurfaceEmpty | 50| Surface Empty | Water |

Once all of the above activities have been completed, the system is ready to run an LFA effort. An example checklist is shown below to step through the process from beginning to end. 

## :octicons-checklist-16: **Experiment Checklist**

***A. Preparing for the experiment:***  
    1. Design experimental protocol 
    2. Design, source, and build LFA components 
    3. Identify and define additional liquid classes or hardware requirements within the Hamilton software, if needed  
    4. Source appropriate reagents, pipette tips, plates, LFAs, and custom LFA-specific hardware  
    5. Generate experiment worklist file  
    6. Validate worklist file in simulation mode within the Hamilton software 
    7. Make modifications to worklist as needed   
    Note plate locations and number of tips used  
***B. Running the experiment:***  
    1. Prepare Hamilton STAR instrument deck   
    2. Spray down deck with cleaning solution  
    3. Complete Daily Maintenance. Skip, if already completed for the day.   
    4. Load all required tips onto instrument  
    5. Load reagents and samples into corresponding plates    
    6. Place all reagent plates, sample plates, LFAs and associated custom LFA-specific hardware onto Hamilton STAR instrument deck  
    7. Run worklist(s) on Hamilton STAR using Hamilton software  
***C. Finalizing experiment:***  
    1. Verify data has been acquired and saved in appropriate folders  
    2. Clean up Hamilton STAR instrument deck, reusable custom LFA-specific hardware, and dispose of materials appropriately  
    3. Analyze data using GH Labs image analysis software  
    4. Prepare documentation of results and analysis   

