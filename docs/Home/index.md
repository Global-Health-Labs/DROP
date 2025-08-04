## Overview

The Diagnostic Robotic Optimization Platform (DROP) was developed by GH Labs to support high throughput development of diagnostic chemistries, with an initial focus on Lateral Flow Assays (LFAs) and Nucleic Acid Amplification Tests (NAATs). The scope of this work includes: 

* Development and validation of robotic platforms for the optimization of lateral flow assay and nucleic acid amplification chemistries. 
* Application of the high-throughput screening platform to identify best performing antibodies for LFAs in multiple disease areas. 
* Demonstration of utility of Design of Experiments for NAAT development. 
* Technology transfer to partners in India and the UK. 

## The Why
Assay development can be a largely manual process that requires a large amount of hands-on time from highly trained laboratory personnel. The DROP system uses an automated liquid handling robot to support assay development efforts. The benefits of such a system include: 

* **Time** - potential to decrease both total development time and total hands-on time required
* **Maximizes experiment size** - no longer limited by how many strips or plates on person can run at a time
* **Reproducibility** - ensuing greater accuracy and consistency

Applications of this system can include, but are not limited to: 

![Diagnostic Robotic Optimization Platform (DROP) Applications](DROP_applications.png)
<small>Figure 1. Potential application areas for the DROP system. All of these categories can apply to both NAAT and LFA technologies. </small>


## The How
DROP consists of hardware, software, and protocols specific to this work. All of this is based on a Hamilton STAR liquid handling robot. Other Hamilton systems could be used with some modifications to the Method/Layout files and LFA hardware. 

ADD IMAGE OF HAMILTON SYSTEM WITH REQUIRED PARTS
<small>Figure 2. 

### Equipment Setup 

+ 8 channel Hamilton STAR liquid handling robot installed with the following:
    - VENUS 6 Software (VENUS 4 method also available)
    - Camera 
    - Tip carriers 
    - Cooling carriers
    - Grid carriers 
    - HEPA filter and UV hood (NAAT applications)
    - iSWAP (optional) 
+ Refrigerated circulator connected to Hamilton cooling carriers
+ Thermocycler (NAAT applications)

**Additional capabilities recommended:**

*LFA applications -*

+ Lateral flow assay preparation and assembly 
+ 3D printing (internal or outsourced) to make LFA strip holders 
+ Laser cutting (internal or outsourced) to make LFA cassette holders 

*NAAT applications -*

+ PCR hood for clean reagent preparation 
+ Gel capabilities 

### Experiment Overview

Running an experiment using the DROP system requires the preparation of a worklist, method, data analysis 


RoboNAAT
![Diagnostic Robotic Optimization Platform (DROP) for NAAT](DROP_NAAT_Flowchart.png)
<small>Figure 3. Flow chart describing use of DROP system for NAAT applications. </small>

RoboLFA
![Diagnostic Robotic Optimization Platform (DROP) for LFA](DROP_LFA_Flowchart.png)
<small>Figure 4. Flow chart describing use of DROP system for LFA applications. </small>

#### Worklist 
The worklist is a .csv file that is input into the Hamilton Run Control to the robot what actions to follow and in what order. The file containing the worklist must end with ‘worklist.csv’ otherwise the Hamilton software will not recognize it. The file containing the worklist must end with worklist.csv; otherwise, the Hamilton software will not recognize it. The file must be a plain .csv file (not a UTF-8 or any other csv version). A worklist can be made manually or by coding. For LFA optimization work, we have python-based code called the “Robot Worklist Generator”. The worklist is composed of 21 columns (two of which are optional) and infinite rows. The identity and definition of each of these columns is described in Section 8. The order of the columns does not matter. 

An AWS web application was developed to simplify the user experience when running the DROP system. More details about the web application, termed the Robotic Assay Development Application (RADA) can be found here - LINK

#### Method


#### Hands on experiment 


#### Data analysis 


## Ongoing work/next steps



## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.
