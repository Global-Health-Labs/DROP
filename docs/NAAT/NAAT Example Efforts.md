SARS-CoV-2 LAMP assay overview 

![SARS-CoV-2 LAMP Optimization Summary](./images/Example%20NAAT%20Efforts.png) <br>
<small>Figure 1. High level overview of the NAAT optimization efforts described in this page. The efforts were broken into (1) mastermix optimization, (2) additive screening and (3) performance evaluation. </small>

## LAMP Mastermix Optimization Effort 

### Experimental Design

The first step in the optimization process for the SARS-CoV-2 LAMP assay was to optimize the best reagents and optimal concentrations for:

- Polymerase (NEB BST 2.0 or 3.0)
- Reverse transcriptase (Omniscript RT or NEB WarmStart RTx)
- Primer sets (L1, L3, and L5)
- Magnesium 

A definitive screening design (DSD) was used to determine the reagent conditions that gave the fastest time to positive without increasing off-target amplification. Using JMP software, the anticipated power for all variables tested was estimated to be between 0.99 and 1. 

The starting mastermix conditions were used as the control and was included on every plate. A total of 84 mastermixes were run including the control mastermix included across six PCR plates. For each mastermix, four technica replicates were run for both negative and positive (1000 copies/uL). 

### Reagent Preparation

Three LAMP primer sets were designed using Geneious software and published sequences of the SARS-CoV-2 genome. Primers were ordered from IDT. 

Reagents required for this effort included:

- 10X Isamp buffer
- MgSO4 diluted to 100mM working stock
- dNTP mix (NEB)
- Nuclease free water
- Evagreen (20X)
- NEB BST 2.0 and 3.0
- Omniscript and NEB Warmstart RT
- Primers (IDT)
- PCR plates
- PCR plate seals 

### Worklist Preparation and Validation

Worklists were prepared to run the experiment as designed by JMP. This effort was run using 96 well plates and prepared two at a time. The worklists for preparing the mastermix and aliquoting sample were seperated to enable sample preparation to occur while the mastermix is being run. This effort could be accelerated by using a 384 well plate or if there are more thermocyclers available. 

- Run 1
    - [Make, mix, and aliquot mastermix](./worklists/A1A_makeandmix_worklist.csv)
    - [Aliquot Sample](./worklists/A1A_template_aq_worklist.csv)
- Run 2
    - [Make, mix, and aliquot mastermix](./worklists/A1A2_makeandmix_worklist.csv)
    - [Aliquot Sample](./worklists/A1A2_template_aq_worklist.csv)
- Run 3
    - [Make, mix, and aliquot mastermix](./worklists/A1A3_makeandmix_worklist.csv)
    - [Aliquot Sample](./worklists/A1A3_template_aq_worklist.csv)
- Run 4
    - [Make, mix, and aliquot mastermix](./worklists/A1A4_makeandmix_worklist.csv)
    - [Aliquot Sample](./worklists/A1A4_template_aq_worklist.csv)

For all four of these runs, they have similar deck layouts. Examples of the wells and plates used for both worklist types are in the images below. 

![Make and mix deck layout](./images/NAAT%20make%20and%20mix%20deck%20layout.png) <br>
<small>Figure 2. Deck layout from the make, mix, and aliquot worklist after running in simulation. </small>

![LAM 10x10 Screening Results](./images/NAAT%20aq%20sample%20deck%20layout.png) <br>
<small>Figure 3. Deck layout from the sample aliquot worklist after running in simulation. </small>

### Running the experiment

All reagent plates were prepared with the reagents detailed in the worklist viewer in the RADA app. This includes all mastermix components and samples (negative and positive). Tips were loaded onto the deck corresponding to the number identified in the simulation run. The validated worklist(s) were then run on the Hamilton STAR using the VENUS software.

### Results and Conclusions

From this screening effort, 31 formulations were found to have better performance than the control mastermix. 

![DSD Screening Results](./images/DSD_Results.png) <br>
<small>Figure 4. Snapshot of the data generated from the Definitive Screening Design to identify optimized conditions for the SARS-CoV-2 LAMP assay. </small>

There were three larger trends that were identified from this screening effort:

- Increasing the reverse transcriptase concentration has little impact on time to result for all three primer sets tested
- BST 3.0 polymerase helps with reaction speed for primers set 1, but not 3 or 5. 
- Primer sets 1 and 3 amplify faster at 7mM Mg, where set 5 does not have as strong of a response. 

From this effort, the 80+ mastermixes allowed an increased understanding of the LAMP chemistry. The two top performing assay conditions were selected and used for additional testing. 

## LAMP Additive Screening Effort

### Experimental Design


### Reagent Preparation


### Worklist Preparation and Validation


### Running the experiment

Same protocol as described under the LAMP Mastermix Optimization Effort. 

### Results and Conclusions


## LAMP Performance Evaluation 

### Experimental Design


### Reagent Preparation


### Worklist Preparation and Validation


### Running the experiment

Same protocol as described under the LAMP Mastermix Optimization Effort. 

### Results and Conclusions