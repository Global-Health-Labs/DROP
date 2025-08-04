## Definitions

There is a lot of jargon associated with the DROP system. The definitions are grouped into sections based on the time of need, including general use, working with worklists, etc. 

## Abbreviations
| Term             | Definition                          |
| :--------------- | :----------------------------------- |
| `NAAT`           | Nucleic Acid Amplification Test |
| `LFA`            | Lateral Flow Assay |
| `DROP`           | Diagostic Robotic Optimization Platform |
| `AWS`            | Amazon Web Services|
| `RADA`           | Robotic Assay Development Application |
| `RPA`            | Recombinase Polymerase Amplification |
| `LAMP`           | Loop-mediated Isothermal Amplification |
| `PCR`            | Polymerase Chain Reaction |
| `DW`             | Deep well plates | 
| `NTR`            | Nesting tip racks | 
| `RDT`            | Rapid diagnsotic test |

## General definitions 
| Term              | Definition                          |
| :---------------- | :----------------------------------- |
| `worklist`        | The worklist is a .csv file that is input into the Hamilton Run Control to the robot what actions to follow and in what order. The file containing the worklist must end with ‘worklist.csv’ otherwise the Hamilton software will not recognize it. The file containing the worklist must end with worklist.csv; otherwise, the Hamilton software will not recognize it. The file must be a plain .csv file (not a UTF-8 or any other csv version). A worklist can be made manually or by coding. For LFA optimization work, we have python-based code called the “Robot Worklist Generator”. The worklist is composed of 21 columns (two of which are optional) and infinite rows. The identity and definition of each of these columns is described in Section 8. The order of the columns does not matter.  |
| `Method`          | A Hamilton specific piece of software that has been designed to carry out an experiment. Methods can be simple (always pipette a known volume between known locations) or complex (insert a .csv file with a range of different commands that can pipette any volume within reason between any location available on the deck). |
| `Deck`            | The area on the robot where things happen. It includes where the pipette tips are stored, where plates can be placed, and even includes the waste area. |
| `Stock plate(s)`  | Plates that have all stock reagents required for the experiment. Typically, we can use the stock plates as the location to prepare and mix the mastermix as well. |
| `Assay plate(s)`  | Plates where the mastermix and sample (or just template) are added. We have spots on the deck for both 96 well and 384 well PCR plates. A flat bottom plate can also be used as an "assay plate", depending on the application.|
| `Liquid Class(es)`| A liquid class is built to pipette a given liquid, and has information around aspiration speeds, dispense speeds, blowout volumes, air transports, etc and a calibration curve. We have liquid classes developed for a range of liquids, and more can be made as needed. This requires one of our LVK trained lab staff to assist. |

## Worklist column definitions 

| Term              | Definition                          |
| :---------------- | :----------------------------------- |
| `step`            | A text string to describe what the step is (e.g. conjugate addition, sample addition, buffer addition, imaging)|
| `volume_uL`       | Volume to be pipetted. Must be smaller than the volume associated with the liquid class (50, 300, or 1000 depending). If volume is set to 0, the robot will take a picture instead of pipetting.|
| `liquid_class`    | Liquid class associated with the liquid to be pipetted. These classes have been designed specifically for the liquids that we pipette and the volumes we plan to use. There is a list of possible liquid classes found in the CO-RE liquid editor. The specific liquid classes designed for LFAs can be found in the LFA documentation.|
| `tip_type`        | This value is associated with the liquid class selected and the volume to be pipetted. This value will be either 50, 300, or 1000. This value needs to be larger than the volume to be pipetted.|
| `dispense_type`   | Two dispense types, "Surface_Empty" and "Jet_Empty" are used. Surface_Empty goes to the tip of the liquid, detected using a capacitive measurement, and dispenses 2mm below that height. This feature struggles when there are bubbles at the top of a liquid. Jet_Empty goes inside the well and dispenses at a set height above the bottom of the well plate. Jet_Empty tends to be accurate at faster speeds than Surface Empty.|
| `asp_mixing`      | Programs the number of mixing cycles performed after a dispense step. This value needs to be the same value for an entire group. This feature only works for Surface_Empty liquid classes.|
| `source`          | The name of the liquid that is being pipetted. By using specific descriptors, source can be useful for the user when designing the worklist. |
| `group_number`    | The "group" classification is an important one. Each group needs to be from the same tip_type (50, 300, 1000). The group number is used by the robot to control the order and timing of pipetting steps. It is recommended to keep groups of 8 rows if you want to control the order in which the robot completes each step. Note: if one item in a group has mixing step, for example, then all items in that group will be mixed. However, using too many groups will make the method too slow. Therefore, group numbers need to be assigned wisely.|
| `timer_delta`     | If the assay has time dependent steps, a value to program a time delay between the step and the next (associated) step, defined in timer_group_check. The value here is in seconds.|
| `timer_group_check`| This value will tell the program which step from which the time should refer to, in seconds. For example, if you wanted group 3 to occur 10 minutes after group 1 is complete, then your group_number=3, timer_group_check=1, and timer_delta (for group 1) = 600.|
| `touchoff_dis`    | Used to change the distance vertically that the pipette tip moves up after touching a surface before dispensing.  Set value to -1 when not in use.|
| `to plate`        | The ID of the plate pipetting step is going to. For most cases, there are more than one of each type of plate on the deck, indicated by the number at the end of the to_plate ID. Plates used in LFA applications are the following: TABLE INSIDE TABLE? |
| `to_well`         | Where pipetting step is going to. The ID ranges from 1-96 for 96 well plates, and 1-384 for 384 well plates. Independent of plate size, the numbering is always top to bottom, left to right. Examples of the layout for each plate type are shown below.|
| `from_plate`      | Plate ID where pipetting step is coming from. See to_plate above for more information about plate IDs. |
| `from_well`       | Well ID where pipetting step is coming from. See to_well above to see more information about well IDs.|
| `step_index`      | This does not matter. Set value to 0. |
| `destination`     | This value can be used to name the destination location, which can be useful when making the worklist. Not required by Hamilton software and can be set to default value of 0 if desired.|
| `guid`            | ID number associated with that specific well or LFA. guid is used for tracking when multiple steps are associated with one assay or assay type.|
| `from_path`       | String value used to track events. Currently not integrated into workflow. Recommend setting to default value, which is “some path” and use other columns to do so instead.|
| `dx`            | Denotes pipetting location in the x-axis. Origin (0,0) coordinates are hardware dependent, but generally located in the bottom left side of the geometry. Need to be manually verified prior to use.|
| `dz`            | Denotes pipetting location in the z-direction. This value is hardware and instrument dependent. Needs to be manually verified prior to use.|
