The DROP workflow, diagrammed in Figure 1 below, includes experimental design, experiment setup, experiment validation, running the experiment, and data analysis. This document specifically covers the procedures for Steps 3 and 4: experiment validation and running the experiment. Additional information about assay specific worklist generation and data analysis can be found in their respective pages. 

![DROP Quickstart](./images/DROP%20workflow%20overview.png) <br>
<small>Figure 1. High level overview of the DROP workflow. This workflow includes (1) Experimental design (2) Experiment setup (3) Experiment validation (4) Running an experiment and (5) Data analysis. In most applications, futher iteration would continue until product criteria are met.  </small>

## :octicons-checklist-16: **Experiment Checklist**

***A. Preparing for the experiment:***  

1. Design experimental protocol  
2. Define or specify any additional liquid classes, labware or hardware definitions needed
3. Source all necessary reagents, pipette tips, devices and plates  
4. Generate worklist    
5. Validate worklist in simulation   
6. Make modifications to worklist based on simulation results, as needed  
*Note plate locations and number of tips used*

***B. Running the experiment:***  

1. Prepare instrument deck   
2. Start refrigerated circulator (if required)  
3. UV treat and/or spray down deck with cleaning solution  
4. Complete Daily Maintenance. Skip, if already completed for the day.  
5. Load all required tips onto instrument  
6. Load reagents into reagent plates in PCR hood   
7. Load all reagent and assay plates required to run experiment onto Hamilton STAR  
8. Run worklist(s) on Hamilton STAR   
9. Seal assay plate(s)  
10. Vortex briefly and spin down assay plate(s)  
11. Place assay plate(s) onto thermocycler, load corresponding protocol and run  

***C. Finalizing experiment:***  

1. Clean deck and dispose of materials appropriately  
2. Analyze data   
3. Repeat as needed   

## :simple-materialdesignicons: **Experimental design**

A NAAT effort on the DROP system begins with reagent preparation for the selected assay. Typically, this starts with the formulation of a master mix, which include buffers, enzymes, primers, probes, and dNTPs. This master mix is prepared, mixed, and aliquoted into an experiment plate using the Hamilton STAR system.

To initiate a RoboNAAT workflow, primers and probes specific to the target of interest are first designed. Next, appropriate samples are selected for assay optimization and testing. Finally, the experimental framework is defined by establishing the scope, controls, and key variables.

![NAAT Experimental Design](./images/NAAT%20experimental%20design.png) <br>
<small>Figure 2. Examples of variables that can be optimized using the RoboNAAT system. </small>

Design of experiment (DoE) describes an approach to systematically and efficiently study the effects of input variables on a process and its outputs [1]. This approach has been widely applied across disciplines, from traditional engineering applications to polymerase chain reaction. The precision and repeatability of an automated liquid handling robot like the Hamilton STAR significantly expands the possibilities for experimental design. 

Leveraging this capability, GH LAbs has explored DoE strategies, including the Taguchi Method and Definitive Screening Design, to optimize and develop assay and evaluate performance. When planning a RoboNAAT experiment, selecting an appropriate experimental design is critical to ensure sufficient statistical power for informed decision-making. There are a number of groups who have published on the use of Taguchi for PCR applications, two selected manuscripts are [Cobb et al 1994](https://pmc.ncbi.nlm.nih.gov/articles/PMC308365/) and [Celani de Souza et al 2011](https://pubmed.ncbi.nlm.nih.gov/21867748/). 

## :material-test-tube: **Experiment Setup**

Setup for a NAAT experiment involves the preparation of the working stock of all materials required to run the designed experiment. 

![NAAT workflow](./images/roboNAAT%20workflow.png) <br>
<small>Figure 3. Example workflow automated by RoboNAAT. </small>

### Adjusting hardware/labware

Most NAAT efforts use basic labware definitions, such as PCR plates, deep well plates, and tubes. These definitions come with the Hamilton software, and the only adjustments that are typically required are to dial in the labware locations in the Hamilton Layout file. 

### Optimizing liquid classes 

The DROP system has a comprehensive library of liquid classes designed to support a wide range of experimental workflows. Each liquid class is configured with precise pipetting parameters to ensure consistent and accurate liquid handling. Proper tuning of these parameters is critical for reliable performance, especially when working with diverse reagents in NAAT workflows.
Key parameters that can be adjusted include the flow rate, air transport volume, blowout volume, settling time, etc. 

Information on configuring and modifying liquid classes is available in the CO-RE Liquid Editor Help section. New liquid classes can be created and validated using the Hamilton Liquid Verification Kit (LVK). When a new liquid class is developed or an existing one is validated for a different reagent, it undergoes performance qualification to ensure it meets experimental requirements.
Below is a list of commonly used liquid classes for NAAT workflows on the DROP system.

| Liquid Class           | Tip size | Dispense Type     | Recommended validation for: |
| :-------------- | :-------------------- | :------------------- | :------------------- |
| RoboNAAT_tip50_buffer_SurfaceEmpty | 50|Surface Empty | Water, 10X Reaction buffers, 100mM magnesium |
| RoboNAAT_tip300_buffer_JetEmpty | 300|Jet Empty | Water, 10X IsoAmp buffers, 100mM magnesium |
| RoboNAAT_tip300_buffer_SurfaceEmpty | 300|Surface Empty | Water, 10X IsoAmp buffers, 100mM magnesium |
| RoboNAAT_tip50_primers_SurfaceEmpty | 50|Surface Empty | Primers, dNTPs, gDNA |
| RoboNAAT_tip300_primers_SurfaceEmpty | 300|Surface Empty | Primers, dNTPs, gDNA |
| RoboNAAT_tip50_enzymes_SurfaceEmpty | 50|Surface Empty | Any enzyme in 50% glycerol, other related viscous liquids |
| RoboNAAT_tip300_enzymes_SurfaceEmpty | 300|Surface Empty | Any enzyme in 50% glycerol, other related viscous liquids |
| RoboNAAT_tip1000_water_JetEmpty | 1000|Jet Empty | Water |
| RoboNAAT_tip1000_water_SurfaceEmpty | 1000|Surface Empty | Water |
| RoboNAAT_tip50_template_SurfaceEmpty | 50|Surface Empty | RNA or DNA template |
| RoboNAAT_tip50_organics_SurfaceEmpty | 50|Surface Empty | Ethanol |
| RoboNAAT_tip50_detergent_SurfaceEmpty | 50|Surface Empty | 5% Triton X-100, Tween-20, and PVP |
| RoboNAAT_tip50_buffer_JetEmpty | 50|Jet Empty | Aliquoting full mastermix |

!!! note
    Best practices recommend including the date and liquid class version in the validated liquid class documentation.

Once the above activities have been completed, the system is ready to run a NAAT experiment. An example checklist detailing the entire workflow can be found at the top of this page. 

### :material-microsoft-excel: **Generate worklist(s)**

Worklists can be generated using the Robotic Assay Development Application (RADA) or manually. Instructions for making a worklist using either method can be found in the RADA tab. 

## :material-hazard-lights: **Experiment Validation**

!!! note     
    All worklists must first be run in simulation mode to identify any potential problems before running the actual experiment. Simulation mode allows you to: 

    - Verify run by watching the deck layout.
    - Optional: verify run using the trace file.
    - Optional and recommended: enable animation in the method. The animation provides realistic virtual x, y, z visualization. Animation only applies when using VENUS 4. VENUS 6 does not currently have animation capabilities. 

1. To validate the worklist(s) generated for the experiment, first launch VENUS software 
2. Locate the relevant shortcut in either the “Frequently Used” section or the “Shortcuts” panel. Click the three dots on the right-hand side of the shortcut to open the menu. Select “Simulate Method” from the drop down. Once selected, Run Control will launch to execute the method in simulation mode. 

    ![Simulation Mode](./images/Simulate%20Method%20Nav.png) <br>
    <small>Figure 4. Navigation to enter Simulation Mode in VENUS 6 software. </small>

3. Confirm that the system is in simulation mode, this will be indicated in the upper-left corner of the window. Once confirmed, click the blue play button to begin simulation.

    ![Simulate Method Run Control](./images/Simulate%20Method%20Run%20Control.png) <br>
    <small>Figure 5. In Run Control, the mode can be viewed by noting the name listed next to “Instrument”.  In simulation mode, the programmed steps will not be sent to the machine itself. Instead they are sent to a virtual machine that simulates the entire method. In instrument mode, the programmed steps will be sent to the machine. All worklists should first be validated in simulation mode. </small>

4. Click the “…” button to browse and select the appropriate worklist file for the experiment. Once the file is loaded, the “Run” button will become active. Click “Run” to begin the simulation.
    
    !!! note 
        The worklist file must be a .csv file that ends with worklist.csv. If the file is of another type, the Hamilton software will not recognize it. 

        **Developer notes:** The Hamilton Method was developed in collaboration with the Hamilton Apps team. It inputs a *worklist.csv file where each row in the document corresponds to one robot step. The method file is intended to be flexible for a range of experimental designs. More information about this document, called a “worklist” can be found in the RADA tab.


    ![Run Pop Up](./images/Run%20Method%20Pop%20Up.png) <br>
    <small>Figure 6. Pop-up window once the method is started. Load the worklist file from a location on the local machine. Animation can be selected or deselected depending on operator preference. Click the “Run” button to start the operation.</small>

5. When the tip counters appear, update the count for each tip type by clicking on the first available tip in each rack.
Note that insufficient virtual tips will cause the method to error. For simulation runs, best practice is to fill all positions for each tip type. This helps determine the total number of tips required for the actual experiment. Once all tip counts are updated, click “OK” to proceed.

    ![Tip Counters](./images/Tip%20Counters.png) <br>
    <small>Figure 7. Example pop-up windows that appear to indicate what tips are present on the deck. Make sure enough tips are loaded virtually to cover the steps written in the worklist. This can be checked in Simulation Mode.</small>

6.  Run simulation and observe for any potential errors. 
     
    !!! note 
        - Errors in the worklist can prevent the method from running to completion, and a notification will appear with information to fix the error. 
        - Common errors include having the wrong liquid class for the volume or dispense type selected, choosing a location that doesn’t exist on the deck, or having incorrect group numbering. Other errors will allow the worklist to run without errors but still indicate a problem with the worklist. These errors are typically due to incorrectly noting the plate or well number on the deck. More information about these errors can be found in the Troubleshooting section.
        - There are a few different windows that can be present during simulation.  It is recommended to focus on the “Instrument” window and the “Traces” window. These two windows will allow the operator to see what is happening and identify the cause of any potential error.  

        *Note: The other optional windows that can be included in the simulation view are the “Activities” and “Scheduler” windows, however these are not useful for the current methods.*

        - The length of the simulation will depend on the type and number of steps included in the worklist. 

    ![VENUS Method Running](./images/VENUS%20Method%20Running.png) <br>
    <small>Figure 8. Run Control when the method is running.</small>

7. Verification and troubleshooting: 
    - If the method runs successfully, a “Method Complete” message will appear. If there are issues, an error message will be displayed.    
    - Note the error and open the logfile to get more information. Once the issue has been identified, refer to the DROP Troubleshooting: Quick Guide document for common problems and how to fix them. 
8. Note the plate and tip locations. 
    - If the run is completed successfully, note the location of the plates and tips used. 
    - It is recommended to take a screenshot and save it into a virtual laboratory notebook to assist with experimental set up. 

![Deck after simulation](./images/Deck%20after%20simulation.png) <br>
<small>Figure 9. Example screenshots of methods run on the Hamilton Method. An ideal screenshot will show both the number of tips used and the plate locations that are required.</small>

## :material-robot-industrial: **Run Experiment**

1. Before running an experiment, it is recommended to run daily maintenance. To do so, launch the Instrument Maintenence Program and follow the step by step instructions provided. 
2. If required, turn on the cooling pump at least 1 hour before the experiment to ensure that the carreirs have reached the required temperature. Make sure there is enough liquid in the chiller. 
3. Wipe down the deck with an appropriate cleaning solution. 
4. Add a new biohazard bag intot he waste container. 
5. Ensure there are no potential obstructions to the movement of the channels. 
6. Set up labware according to the deck layout as required by the corresponding Layout and Worklist files. 
7. Load pipette tips into their respective locations. The number of tips required can be determined from the simulation run. 
8. Load all reagents and materials onto the deck. Verify that each piece of labware fits correctly. 
9. Close the front shield of the instrument and verify there is no interference nearby. 
10. Open VENUS software and return to the Home Page in the Navigation Bar. Load the method by selecting the shortcut or by choosing from "Run History". 
11. Confirm that VENUS software is in insturment mode by noting the name listed next to "Instrument" in the Run Control Window. 

    ![Run Control Experiment](./images/Run%20Control%20Experiment.png) <br>
    <small>Figure 10. The view in Run Control when an experiment has been started in instrument mode. Note the machine’s ID to ensure that the system is connected to the Hamilton STAR.</small>

12. Select the blue play button to begin the run. 
13. The pop up shown in figure 11 will appear. Select the worklist file that corresponds to the experiment and select "Run". 

    ![Run Control Experiment](./images/Run%20Method%20Pop%20Up.png) <br>
    <small>Figure 11. Pop up to prompt loading of worklist file. </small>

    !!! note 
        The method can be run with or without animation when in instrument mode. 

14. Using insights from the simulation run, , confirm the number of tips required for the experiment. Update the tip count for each tip type by selecting the first available tip in each rack. Be precise—accurate tip counts are essential for successful execution.
Once all tip counts are updated, click “OK” to proceed.
15. Run the method, monitor the instrument and/or the trace for any potential errors. For first-time runs of a new worklist, remain near the instrument to respond quickly in case of any incidents. If a problem occurs, use the “Pause” or “Abort” buttons in the Run Control window to stop or interrupt the process safely.
  
    !!! note 
        Make sure there are enough pipette tips on the deck for the experiment programmed. The system will not notice that there are not enough tips until it runs out.   
  
16. If an error message appears, refer to the Troubleshooting section for assistance. 
17. Clean up:
    - Remove all consumables except for tips from the deck. 
    - Seal all plates (especially any plates containing template) and place immediately in biohazard. 
    - Remove biohazard bag, tie, and place immediately in biohazard bin. 
    - Spray down deck with ethanol and/or bleach (experiment/sample dependent)
    - Clean up any spills and debris, as necessary. 
    - Turn off the cooling pump if used. 

!!! note "General Precautions"
    - Do not insert arms and hands when the robot is running. 
    - Do not switch tubes around once processing has begun. 
    - Do not reuse tips that have been discarded into the waste.
    - Do not empty the tip waste while the instrument is running. 
    - Do not leave tips on the pipetting channels for extended periods (such as overnight).
    - Shield the instrument from direct sunlight or intense artificial light. 
    - Do not place anything on the deck higher than 145mm above the deck’s surface.
    - Close the front cover during the run. The front cover is monitored by software and will abort the method if left open. 
    - Low volume (10µL) tips do not reach the deck or the bottom of sample tubes in standard sample carriers
    - Load tips correctly. 50µL and 300µL tips have the same shoulder height and cannot be used interchangeably.
    - Depending on the assay, certain chemistries are more stable on the deck when stored at 4°C than others. Additional chemistry specific testing may be required. 

## :material-virus: **Testing for Contamination** 

If you suspect contamination in your Hamilton Star liquid handling robot:

1.	Stop the operation: Immediately halt any ongoing processes to prevent further contamination.
2.	Identify the source: Determine where the contamination might have occurred (i.e., from the liquid samples, pipette tips, the environment, etc).
3.	Clean the system:
    - Pipette tips: Replace all pipette tips; discard the contaminated ones and use new, sterile tips.
    - Deck and surfaces: Clean all surfaces of the robot, including the deck and any other areas that might have come into contact with the contaminating material. Use cleaning agent appropriate to the contaminating material (refer to section 9.6 of DROP SOP-001)
4.	Check for residual contamination: After cleaning, run a test with no template control or NTC for NAAT, or blank reactions inside the system to ensure that the contamination has been fully removed.
5.	Prevent future contamination:
    - Regular maintenance: Perform regular maintenance and cleaning as recommended by Hamilton.
    - Proper handling: Ensure that all samples and reagents are handled properly to avoid introducing contaminants.
    - Environmental controls: Maintain a clean working environment to minimize the risk of contamination.

If the contamination persists or unsure about any steps, contact Hamilton’s technical support for further assistance.

<small>
[1] https://www.jmp.com/en/statistics-knowledge-portal/design-of-experiments </small>