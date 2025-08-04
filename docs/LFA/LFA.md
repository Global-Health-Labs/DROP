## RoboLFA Overview

Lateral Flow Assays (LFAs) are a popular diagnostic technology that enables more sophisticated protein based chemistries to be run at or near the point of care. With low cost and ease of use, the LFA technology has been used for applications that span across a wide range of targets, including bacteria, viruses, toxins, and more. Even though the use of these tests is fairly straightforward, there can be a significant investment required to create high performance LFAs. 

![LFA Background](./images/Figure%201%20revision-01.png) <br>
<small>Figure 1. Schematic of a classic LFA, from https://doi.org/10.1007/s00216-022-03897-9. The image depicts the materials involved in an LFA, which often includes a sample pad, a conjugate pad, a test membrane onto which a test and control ine are striped, and a wicking pad to drive flow (A). Typical use involves the addition of a sample and/or buffer to the sample pad, which flows downstream to rehydrate the conjugate dried into the conjugate pad (B). Liquid then moves into the test membrane onto which a test and/or control line will appear depending on whether analyte is present in the sample. All remaining liquid and unbound proteins then flow into the wicking pad. </small>

To address the time and monetary cost involved in LFA research and development, GH Labs developed a development platform utilizing an automated liquid handling system. This system, termed RoboLFA, is a subcategory of the DROP platform. RoboLFA consists of LFA specific hardware, software, and protocols to enable large optimization or characterization expriments with limited hands-on time required. The system is described in more detail in a paper by Anderson et al<sup>[1](https://link.springer.com/article/10.1007/s00216-022-03897-9)</sup>. 

## Custom Hardware 

LFAs can come in a few different forms. We have developed holders to address two of these forms, a strip and a cassette. Other form factors can be integrated, but may require additional development to get a holder that is compatible with both the form factor of the LFA and the form factor of the deck postiions on the Hamilton STAR. These holders may also be adapted to other liquid handling systems. 

![LFA Strip Holders](LFA_strip_cassette_holders.png) <br>
<small>Figure 2. Image of the developed LFA strip (A), (B), and (C), and cassettes (D) from https://doi.org/10.1007/s00216-022-03897-9</small>

### RoboLFA Strip Holder 
An LFA strip holder is helpful when a cassette has not yet been designed or the LFA dimensions are still requiring adjustment. Some LFAs on the market are in strip form, such as *Milenia Biotec HybriDetect Universal Lateral Flow Assays* and over-the-counter HCG tests, and therefore would stay in this category throught the entire research and development lifecycle. On this site we will mostly discuss our most commonly used strip holder, which consists of the following:

- Aluminium plate (dimensions) with six holes compatible with (size) screws  
- 3D printed base plate designed to fit the dimensions of the LFA  
- 3D printed top plate designed with necessary pinch points, wells for reagent addition, and read window   
- 6 Screws (size)

When starting a new RoboLFA effort, it is critical to understand the requirements for a strip holder. This includes the length and width of the strip, the location and thickness of pinch points, the location and volume required for reagent addition, and the location and size of the read window. Each of these factors can be modified in the CAD files linked below. More detailed instructions can be found [here](NEED TO ADD A LINK HERE). 

![LFA Strip Holders](LFA_strip_holder.png) <br>
<small>Figure 2. Strip holder to hold non-cassetted LFAs. The designed holder consists of three parts, (1) an aluminum base plate, (2) 3D brinted base plate and (3) 3D printed top plate. The bottom plate is designed with guide posts for consistent placement of a strip, while the top plate is designed to have pinch points and wells where required. Image from https://doi.org/10.1007/s00216-022-03897-9</small>

CAD files can be found here: 

We have two other versions of the strip holder that have some usability issues that need to be addressed. The other two strip holders are either challenging to set up reproducibly or require additional engineering on the clamping mechanism. More details about both of these holders can be found in the [supplemental material](https://doi.org/10.1007/s00216-022-03897-9). 
If we were to get additional time to further improve the strip holders, the most exciting holder is the lego inspired assembly that allows for different 3D printed cross bars to be added interchangeably in 0.5mm increments along the length of the holder. 

### RoboLFA Cassette Holder
An LFA cassette holder is used when the strip dimensions have been locked and is further along the R&D pipeline. The cassette holder has defined spacing, allowing for precise liquid delivery and imaging across a large number of LFA devices.  

The cassette holder consists of:  

+ A 1/4" aluminum plate (40 x 48 cm) with the following modifications  
    - Two pins to guide the acrylic sheet in place  
    - Two drilled holes (dimensions) that enable consistent placement of the cassette holder onto the Hamilton Deck  
+ A 1/16" acrylic sheet (40 x 48 cm) with the following modifications
    - Laser cut to fit the cassette dimensions (example CAD files fit 80 and 96 cassettes respectively)
    - Two pin holes to guide ont othe aluminum plate 

![LFA Cassette Holders](LFA_cassette_holder.png) <br>
<small>Figure 3. Holder for cassetted LFAs. The designed holder consists of two parts, (1) an aluminum base plate, (2) a laser cut acrylic sheet designed to fit cassettes with little "wiggle room".  Image from https://doi.org/10.1007/s00216-022-03897-9</small>


CAD link:


The cassette holder requires two additional custom parts: 

+ Hamilton Carrier (product #) with posts (modification) in one slot  - ADD GITHUB LINK
+ Alignment spacers to assist with consistent placement of cassette holder 
    - Spacer 1 - ADD GITHUB LINK
    - Spacer 2 - ADD GITHUB LINK



CAD link: 

## Deck build 

Images of deck build with both the LFA strip holder and the cassette holder 

## Custom Software

### Hamilton Method and Layout

Link to github page

### RADA
link to RADA page? 

### LFA image analysis 

Link to github page

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


## References

[1] Anderson, C.E., Huynh, T., Gasperino, D.J. et al. Automated liquid handling robot for rapid lateral flow assay development. Anal Bioanal Chem 414, 2607–2618 (2022). https://doi.org/10.1007/s00216-022-03897-9 <br>
[2] Cate, D. M., Bishop, J. D., Hsieh, H. V., et al. Antibody Screening Results for Anti-Nucleocapsid Antibodies Toward the Development of a Lateral Flow Assay to Detect SARS-CoV-2 Nucleocapsid Protein. ACS Omega 2021 6 (39), 25116-25123. DOI: 10.1021/acsomega.1c01253 <br> 
[3] Cantera, J. L., Cate, D. M., Golden, A., et al. Screening Antibodies Raised against the Spike Glycoprotein of SARS-CoV-2 to Support the Development of Rapid Antigen Assays. ACS Omega 2021 6 (31), 20139-20148. DOI: 10.1021/acsomega.1c01321 <br>

