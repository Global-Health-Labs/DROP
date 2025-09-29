### Insufficient tips 

+ **Problem**: Did not load enough tips onto deck (virtually) in either simulation or in instrument mode.
+ **Error pop-up**:  An error occured while running Vector. The error description is C:\Program Files(x86)\Hamilton\Library\HSLMlStarStepReturnLib.hsl(401): _Method::StepReturn::GetErrorCode() The parameter is incorrect (0x0 - 0x0 - 0x1)
+ **Logfile information**: The LogFile error will include the following near the end of the LogFile 

>Microlab STAR : Main - error; An error occurred while running Vector.  The error description is: No more positions available in sequence seqTipFull. (0x28 - 0x2 - 0x80d) <br><br>
>Microlab STAR : 1000ul Channel Tip Pick Up (Single Step) - complete with error; An error occurred while running Vector.  The error description is: No more positions available in sequence seqTipFull. (0x28 - 0x2 - 0x80d) <br><br>
>USER : Trace - complete; Tip Pickup Return:  0 <br><br>
>SYSTEM : Execute method - error; An error occurred while running Vector.  The error description is: C:\Program Files (x86)\Hamilton\Library\HSLMlStarStepReturnLib.hsl(401) : _Method::StepReturn::GetErrorCode() The parameter is incorrect. (0x0 - 0x0 - 0x1)

+ **Solution**: Load more tips onto the deck. If there are not enough positions on that specific layout for the number of tips required to run the worklist, make an updated layout file with the correct number of pipette tip positions (in increments of 96). The sequence referenced can also include seqTipPartial if the sequence that does not have enough positions is a partial tip sequence. 

### No liquid detected

+ **Problem**: No liquid is detected when the pipette goes into the well to either aspirate or dispense. 
+ **Error pop-up**:  1000ul Channel Aspirate - Error > Description: Liquid level not found. 
+ **Logfile information**: The LogFile error will include the following near the end of the LogFile 
+ **Solution**: 

    - This problem can be fixed in a couple ways. If this is an error that should not appear at this step for any reason, look to see if previous pipetting steps delivered the correct volumes. An example would be if you had the wrong liquid class selected for a viscous liquid, causing the robot to pipette too little volume. This would lead a mastermix to have insufficient volume, which can be easily confirmed by looking at the volume of your viscous liquid remaining in the stock plate.   
    - Typically, though, we see this error because the robot is looking for a liquid level higher than where it is. Therefore, fix this by selecting the "Bottom" button. Then click "Execute". This will send the pipette tip to the bottom of the well (and then raise up slightly to enable pipetting) instead of looking for the liquid level and bypass this issue. 

### Pipette does not reach labware bottom

+ **Problem**: Pipette tip doesn’t reach the bottom of the labware, therefore requiring large amounts of dead volume in the well plates than what should be required. 
+ **Error pop-up**:  First sign of an error is typically that the volume pipetted is lower than programmed. Can be identified by visually watching how far into the well plate or onto the LFA that the pipette tip goes. 
+ **Logfile information**: NA
+ **Solution**: Teach the position of the labware to the appropriate height. Contact GH Labs or IGB application specialist for support in teaching labware positions. 

### Incorrect pipette tip assignment

+ **Problem**: The system is expecting a certain pipette tip, and a different one is in the identified location. 
+ **Error pop-up**:  If the issue is between 50 and 300 uL tips, then non error will pop up but the system will run assuming that it is using a tip with different dimensions (height) and may either crash or be unable to reach the liquid level. 
+ **Logfile information**: None if the issue happens with 50 and 300 uL tip. Will identify that it can not pick up the tip if it is between 50/300 and 1000 as their shoulder heights are different. 
+ **Solution**: Ensure that the tips loaded on the deck are the ones identified in the Hamilton Layout. Pictures of the deck layout or labels on the tip carriers can also reduce the likelihood of error. 

### Tip swap

+ **Problem**: Tips are not in the correct position on the deck. 
+ **Error pop-up**:  For mixups between the 50 and 300uL tips the system cannot differentiate between them. The error that will happen is that the channel will act as though the tip is either much longer or much shorter than it is actually. 
+ **Logfile information**: NA
+ **Solution**: Ensure that pipette tips are loaded in their exact locations as described in the layout file. 

### Channel cannot reach location 

+ **Problem**: Because the camera is installed in the DROP system, channels 1 and 2 cannot reach all locations on the deck. Specifically they are unable to reach the locations closest to the front of the machine.
+ **Error pop-up**:  
+ **Logfile information**: 
+ **Solution**: The deck design can be optimized to reduce the risk of this happening. This is also why most experiments that require the running of LFAs should be in groups of 8. 
