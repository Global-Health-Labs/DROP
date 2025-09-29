# DROP Project Overview
DROP is a comprehensive automated diagnostic assay development platform developed by Global Health Labs. It's designed to accelerate and optimize the development of diagnostic tests, specifically focusing on:

- Lateral Flow Assays (LFAs) - rapid diagnostic tests like pregnancy tests or COVID antigen tests
- Nucleic Acid Amplification Tests (NAATs) - molecular tests like PCR, LAMP, and RPA

# Development Benefits

- Accelerated Timelines: Reduces development time and hands-on work
- Improved Scalability: Enables large-scale experiments
- Enhanced Reproducibility: Minimizes human variability
- Cost Effective: Reduces resource requirements for assay optimization

# Key Components
1. Hardware Platform

- Built around a Hamilton STAR liquid handling robot
- Custom 3D-printed LFA strip and cassette holders
- Integrated camera system for automated imaging
- Specialized deck layouts for different assay types
- HEPA filtration and UV sterilization for NAAT applications

2. Software Ecosystem

**RADA (Robotic Assay Development Application)**

- AWS-based web application that simplifies robot operation
- Generates worklist files (CSV instructions for the robot)
- Features separate interfaces for LFA and NAAT experiments
- Includes admin capabilities for managing users, deck layouts, and liquid classes
- Built with user-friendly interface to reduce technical barriers

**Image Analysis Software**

- Python-based LFA image analysis tools (LFA_image_analysis)
- Automated analysis of test and control lines
- Signal-to-noise ratio calculations
- Flexible parameters for different LFA formats

**Supporting Tools**

- Robot worklist generators
- Thermocycler analysis software
- Documentation system (MkDocs-based)

3. Protocols and Methods

- Standardized workflows for both LFA and NAAT development
- Design of Experiments (DoE) approaches
- Validation procedures and troubleshooting guides

# Applications
The DROP system has been used for:

**LFA Applications:**

- Antibody pair screening and optimization
- Membrane material optimization
- Buffer condition optimization
- Conjugate chemistry development
- Drying and spraying condition optimization

**NAAT Applications:**

- PCR optimization
- LAMP (Loop-mediated Isothermal Amplification) development
- RPA (Recombinase Polymerase Amplification) optimization
- Primer design and validation

# Current State

- Complete hardware and software designs are available on GitHub
RADA web application is deployment-ready
- Comprehensive documentation and troubleshooting guides included
- Proven track record in accelerating diagnostic development

This is a sophisticated, production-ready platform for automated diagnostic assay development that combines robotics, custom software, and validated protocols to streamline the traditionally manual and time-intensive process of diagnostic test optimization.
