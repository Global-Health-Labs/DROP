## :fontawesome-solid-y: **Antibody screening effort**

The most used protocols for the DROP system to date are for large antibody screening efforts in the LFA format. These efforts were completed for SARS-CoV-2 spike and nucleocapsid, Malaria pLDH, and Mycobacterium Tuberculosis Lipoarabinomannan (TB LAM). A detailed explanation of one of these efforts is included here. More information on additional antibody screening efforts can be found in the following manuscripts. 

The rational behind the need for high-throughput screening of antibodies for LFA is based in binding kinetics. Traditional methods for measuring binding for antibodies/antigens, which include either Enzyme Linked Immunosorbent Assays (ELISAs) and Biolayer Inferometry (BLI), measure protein binding at steady state. However, binding in an LFA does not take place under optimal binding conditions. The RoboLFA system  is able to screen antibodies in an LFA format at a high rate, allowing for more precise information regarding optimal antibody pairs for a given LFA. This served particularly useful during the early days of the SARS-CoV-2 pandemic, and enabled very rapid down selection to high performing antibody pairs when very little information on various antibody products existed. 

### Experimental Design 

For this effort, we have 10 antibodies against TB LAM that have been identified to enter the screen. These antibodies are labeled TBL-001 to 010. There is a control pair that is established as the best performing pair for clinical LAM, which is TBL-001 as detector and TBL-002 as capture. This will be identified by a yellow square in the figures below. 

In this screening effort, there was a push to run all antibodies in both the capture and detection formats. This is considered a full factorial design of experiments (DOE). For other types of optimization efforts, such as conjugation chemistry or running buffer optimization, other DOE approaches may be recommended. 

The format for the selected LFA consists of a streptavidin test line and a donkey anti-chicken control line striped onto the nitrocellulose membrane. Each antibody in the screen will be (1) biotinylated and (2) conjugated to a 400nm latex nanoparticle. Something important to understand is that the stack format can make a big difference on the screening results, an antibody that performs very well as a biotinylated antibody capture may not have the same performance when striped directly onto the test line. Therefore, it is recommended to screen antibodies in the final format for the assay. 

### Reagent Preparation 

For this effort, all antibodies were conjugated to carboxylated latex nanoparticles (Magsphere CAB400NM). The samee antibodies were also biotinylated with 1 molar excess using EZ-Link NHS-PEG12-Biotin (A35389). These antibody conjugates were QCed against the control antibody pair and using Vector QuantTag Biotin Quantification Kit (BDK-2000). 

Test membranes were prepared using a generic LFA format. This included CN95 nitrocellulose (Sartorius) striped with 1mg/mL polySA (Biotez), and 0.5mg/mL Donkey anti-chicken IgG (Jackson ImmunoResearch). 

### Worklist Preparation and Validation 

To break up the 10x10 grid, there are two different worklists required. The worklists are: 

    - [Worklist A](./protocols/5x3_full_worklist.csv): 3 detection antibodies with 5 capture antibodies (15 total combinations)
    - [Worklist B](./protocols/15x1_full_worklist.csv): 1 detection antibody with 15 capture antibodies (15 total combinations)

The breakdown of how these worklists will span the 10x10 grid are shown in Figure 1. 

![LAM 10x10 Screening Effort](./images/LAM%20antibody%20screen%20grid.png) <br>
<small>Figure 1. Grid to demonstrate how to complete a 10x10 screening effort for a single antigen. Screen requires two worklists, a 3x5 and a 1x15. </small>

For every robot run, a worklist is run covering the antibodies shown in the grid. The maximum number of cassettes for each robot run for this cassette holder limits the number of LFAs run to 96. With this limitation, 3 negatives and 3 positives are run for every antibody pair, including an additional control antibody.  

The steps described in the worklist are as followed:
- Pipette 2uL of biotinylated antibody onto conjugate pad
- Pipette 4uL of latex conjugated antibody onto sample pad
- Wait 15 minutes for conjugates to dry
- Pipette 75uL sample onto sample pad
- Wait 30 minutes for LFAs to run
- Image read window 

### Running the experiment 

1. Place all reagent plates, sample plates, LFAs and associated custom LFA-specific hardware onto Hamilton STAR instrument deck  
2. Run worklist(s) on Hamilton STAR using Hamilton software  


### Results and Conclusions 

- Analyze data using GH Labs image analysis software  
- Prepare documentation of results and analysis   

![LAM 10x10 Screening Results](./images/TBL%20Antibody%20Screen.png) <br>
<small>Figure 2. Results from antibody screening effort. </small>

Something about S/N vs. S-N and why you would use one over the other 

## :simple-graphql: **Other example efforts**

Other examples can be found in the following manuscript: 