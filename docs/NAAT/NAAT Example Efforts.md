The DROP system can provide utility for a range of efforts along the research and development pathway for NAAT assays. RoboNAAT, as it has been affectionately named, has been built out to enable large scale experiments for PCR as well as isothermal amplification methods. An example effort for a SARS-CoV-2 loop mediated isothermal amplification (LAMP) assay is described in this document. 

LAMP is an isothermal amplification method that relies on 4-6 primers to amplify a DNA or RNA target at a steady temperature, usually between 60-65C. The chemistry also utilizes a DNA polymerase with strand-displacing properties to allow for effective amplification. Different from PCR, which produces a predictable amplicon, LAMP amplicons can form many different structures. This provides both an advantage, for example in the probability, as well as a challenge, such as the possibility of off-target amplification. 

Therefore, this chemistry was ideal for optimization on the RoboNAAT system as traditional one factor at a time (OFAT) optimization may not capture the full picture of a given LAMP assay. In this example, (1) Mastermix optimization, (2) additive screening, and (3) assay evaluation are all demonstrated with their example worklists and results. 

![SARS-CoV-2 LAMP Optimization Summary](./images/Example%20NAAT%20Efforts.png) <br>
<small>Figure 1. High level overview of the NAAT optimization efforts described in this page. The efforts were broken into (1) mastermix optimization, (2) additive screening and (3) performance evaluation. </small>

## :simple-graphql: **LAMP Mastermix Optimization Effort**

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

## :material-graph: **LAMP Additive Screening Effort**

### Experimental Design

The Additive Screening round had a few goals, specifically to identify the impact of a list of additives on the speed, tolerance to inhibihors, or stability of the assay. Most additives included in this screen fall into three categories:

1. Stability and blocking 
2. Crowding agents 
3. Melting temperature (Tm) and secondary structure reducers 

Because of the differing nature of each of these categories, the experimental design included mastermixes tested with one additive at a time at two concentrations, as well as a DSD design testing combinations of the additives in the stability and blocking category. 

### Reagent Preparation

In addition to the reagent preparation described in the previous effort, a long list of additives and crowding agents were identified for screening. These reagents include:

**Stability agents:**

- Sucrose
- Trehalose 
- BSA

**Crowding agents:**

- PEG (1000, 3000, and 8000)
- Ficoll (400)
- Dextran (12k, 80k, and 410k)

**Tm and secondary structure reducers:**

- Formamide
- Betaine
- DMSO
- SSBs 

**Miscellaneous:**

- ATP
- Guanidine
- EDTA

### Worklist Preparation and Validation

The additive screening was split into three robot runs, preparing two 96 well plates each run. 

### Results and Conclusions



![Additive Screening Results](./images/RoboNAAT%20Additive%20Screening.png) <br>
<small>Figure 5. Snapshot of the data generated from the Additive Screening to identify optimized conditions for the SARS-CoV-2 LAMP assay. </small>

Observation: Best improvement can be seen from PEG1K and Dextran 410K, which had average improvement (reduction) in CT of 15 (with NTCs coming up at ~ 92 cycles) and 15 (w/o NTCs coming up) respectively. 

## :octicons-graph-16: **LAMP Performance Evaluation**

### Experimental Design

The top mastermix condition was evaluated using an LOD against the starting mastermix. The two conditions are:

- Start mastermix: 1X RT, 1X BST 2.0, 8mM Mg
- Optimized mastermix: 1.25X RT, 1.25X BS 2.0, and 7mM Mg 

### Reagent Preparation

This effort used the same reagents as the mastermix optimization and additive screening efforts. 

### Worklist Preparation and Validation




### Results and Conclusions