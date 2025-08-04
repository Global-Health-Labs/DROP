### Worklist file not found

+ **Problem**: The desired worklist file is not found by the Hamilton software in the folder where it is located  
+ **Error pop-up**: NA  
+ **Logfile information**: NA  
+ **Solution**: Worklist files need to be named so that the end of the filename is worklist.csv. If this is not the case, the file will not be found by the Hamilton software.   


### CSV in incorrect format

+ **Problem**: CSV cannot be loaded because of file type. The Hamilton method can only use a plain .csv file, so if another file type (e.g. .csv UTF-8) is loaded an error will occur. 
+ **Error pop-up**: States that the item cannot be found in the collection corresponding to the requested name or ordinal.  
+ **Logfile information**: The LogFile error will include the following near the end of the LogFile 

>SYSTEM : Execute method - error; An error occurred while running Vector.  The error description is: C:\Program Files (x86)\HAMILTON\Methods\Master_IVL_Method_Factorial_Screening\RoboNAAT_Method_v3.med(83, 1) : Item cannot be found in the collection corresponding to the requested name or ordinal. (0x23 - 0x2 - 0x39) 

+ **Solution**: This problem can be fixed by file>save as the worklist file as a plain .csv.   

### Liquid class type mismatch

+ **Problem**: The liquid class included in the worklist doesn’t match the values input for volume and/or dispense type. 
+ **Error pop-up**:  An error occured while running Vector. The error description is C:\Program Files(x86)\Hamilton\Library\HSLMlStarStepReturnLib.hsl(401): _Method::StepReturn::GetErrorCode() The parameter is incorrect. (0x0 - 0x0 - 0x1).
+ **Logfile information**: The LogFile error will include the following near the end of the LogFile 

> Microlab STAR : Main - error; An error occurred while running Vector. The error description is: Tip type mismatch. (Liquidclass 'RoboNAAT_tip1000_water_JetEmpty' is defined for tip type '1000ul High Volume Tip (4)' but 'Channel 1' uses a tip of type '300ul Standard Volume Tip (0)'.) (0x28 - 0x1 - 0x827)   <br><br>
> Microlab STAR : 1000ul Channel Aspirate (Single Step) - complete with error; An error occurred while running Vector. The error description is: Tip type mismatch. (Liquidclass 'RoboNAAT_tip1000_water_JetEmpty' is defined for tip type '1000ul High Volume Tip (4)' but 'Channel 1' uses a tip of type '300ul Standard Volume Tip (0)'.) (0x28 - 0x1 - 0x827)   <br><br>
>USER : Trace - complete; Aspirate Return: 0 <br> 2024-10-29 12:02:56.816 SYSTEM : Execute method - error; An error occurred while running Vector. The error description is: C:\Program Files (x86)\Hamilton\Library\HSLMlStarStepReturnLib.hsl(401) : _Method::StepReturn::GetErrorCode() The parameter is incorrect. (0x0 - 0x0 - 0x1)

+ **Solution**: Fix the listed error. In this case, the worklist needs to be updated so that the tip type is 1000 uL to match the tip type that the liquid class is defined for. This assumes that the 1000 uL tip is the correct tip size for this step. 

### Volume outside correction curve

+ **Problem**: Volume in worklist is not in the correction curve for the designated liquid class. 
+ **Error pop-up**:  An error occured while running Vector. The error description is C:\Program Files(x86)\Hamilton\Library\HSLMlStarStepReturnLib.hsl(401): _Method::StepReturn::GetErrorCode() The parameter is incorrect. (0x0 - 0x0 - 0x1).
+ **Logfile information**: The LogFile error will include the following near the end of the LogFile 

>Microlab STAR : Main - error; An error occurred while running Vector. The error description is: Volume is not in the range of the correction curve (extrapolation not supported for volumes higher than the highest point of the correction curve). (0x6f - 0x2 - 0x55) <br><br>
>Microlab STAR : 1000ul Channel Aspirate (Single Step) - complete with error; An error occurred while running Vector. The error description is: Volume is not in the range of the correction curve (extrapolation not supported for volumes higher than the highest point of the correction curve). (0x6f - 0x2 - 0x55) <br><br>
>USER : Trace - complete; Aspirate Return: 0 <br><br>
>SYSTEM : Execute method - error; An error occurred while running Vector. The error description is: C:\Program Files (x86)\Hamilton\Library\HSLMlStarStepReturnLib.hsl(401) : _Method::StepReturn::GetErrorCode() The parameter is incorrect. (0x0 - 0x0 - 0x1)

+ **Solution**: Select a different volume or liquid class type to meet the requirements of the experiment. This could also include updating the liquid class correction curve if needed. 

### Incorrect group numbering

+ **Problem**: Group numbering doesn’t start from 1 or skips numbers. 
+ **Error pop-up**:  An error occured while running Vector. The error description is C:\Program Files(x86)\Hamilton\Library\HSLExtensions\Sequence.hsl(282): bad argument (0x23 - 0x1 - 0x34).
+ **Logfile information**: The LogFile error will include the following near the end of the LogFile 

>SYSTEM : Execute method - error; An error occurred while running Vector. The error description is: C:\Program Files (x86)\Hamilton\Library\HSLExtensions\Sequence.hsl(282) : bad argument (0x23 - 0x1 - 0x34)

+ **Solution**: Update group numbering to start from 1 and incrementing appropriately. 

### Labware definitions incorrect for deck layout

+ **Problem**: The labware name does not exist on the deck layout. When that happens, the system cannot run the worklist as it does not recognize a location for that labware. 
+ **Error pop-up**:  An error occured while running Vector. The error description is C:\Program Files(x86)\Hamilton\Library\HSLStrLib.hsl(449): type mismatch (0x23 - 0x1 - 0x14).
+ **Logfile information**: The LogFile error will include the following near the end of the LogFile 

>SYSTEM : Execute method - error; An error occurred while running Vector. The error description is: C:\Program Files (x86)\Hamilton\Library\Labware Properties\Labware_Property_Query.hsi(3519) : An error occurred while running Vector. The error description is: LabwareId dw_96_0002 is invalid for the current deck layout. (0x5 - 0x0 - 0x0) (0x23 - 0x2 - 0x39)

+ **Solution**: Update deck layout or worklist so that the labware name matches between the two documents. 