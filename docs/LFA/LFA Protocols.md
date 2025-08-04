## Running an LFA experiment 
### Adjusting hardware/labware for strip/cassette

### Adjusting RADA for strip

### Adjusting imaging for strip 

### Optimizing liquid classes 
The DROP system has a library of liquid classes that can be used to run experiments. These liquid classes are modified to have the precise pipetting protocol to enable consistent pipetting for a given liquid class. It is important to precisely tune a liquid class for the liquids that will be pipetted during an experiment on the DROP system. Some of the parameters that are included are flow rate, air transport volume, blowout volume, settling time, and more. More information can be found in the CO-RE Liquid Editor Help section. Liquid classes can be made using the Hamilton Liquid Verification Kit (LVK). When more liquid classes are made, or when an existing liquid class is validated for a new liquid, they will undergo performance qualification. The list below includes liquid classes used commonly for the LFA system. 

| Liquid Class           | Tip size | Dispense Type     | Recommended validation for: |
| :-------------- | :-------------------- | :------------------- | :------------------- |
| RoboLFA_tip50_spot_JetEmpty | 50|JetEmpty | Antibody and conjugate solutions |

### Experiment Checklist
***A. Preparing for the experiment:***  
- Design experimental protocol  
- Design, source, and build LFA components  
- Identify and define additional liquid classes or hardware requirements within the Hamilton software, if needed   
- Source appropriate reagents, pipette tips, plates, LFAs, and custom LFA-specific hardware  
- Generate experiment worklist file   
- Validate worklist file in simulation mode within the Hamilton software  
- Make modifications to worklist as needed   
- Note plate locations and number of tips used  
***B. Running the experiment:***  
- Prepare Hamilton STAR instrument deck   
- Spray down deck with cleaning solution  
- Complete Daily Maintenance. Skip, if already completed for the day.   
- Load all required tips onto instrument  
- Load reagents and samples into corresponding plates    
- Place all reagent plates, sample plates, LFAs and associated custom LFA-specific hardware onto Hamilton STAR instrument deck  
- Run worklist(s) on Hamilton STAR using Hamilton software  
***C. Finalizing experiment:***  
- Verify data has been acquired and saved in appropriate folders  
- Clean up Hamilton STAR instrument deck, reusable custom LFA-specific hardware, and dispose of materials appropriately  
- Analyze data using GH Labs image analysis software  
- Prepare documentation of results and analysis   

