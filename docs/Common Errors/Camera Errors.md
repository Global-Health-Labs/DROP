### Incorrect library

+ **Problem**: If the system does not have the correct library for the camera installed, the method will not be able to communicate with the camera to initialize, take, or save images. 
+ **Error pop-up**:  
+ **Logfile information**: The LogFile error will include the following near the end of the LogFile 

>SYSTEM : Execute method - error; An error occurred while running Vector.  The error description is: C:\Program Files (x86)\Hamilton\Library\easyPickIILibrary\easyPickII_Library.hsl(303) : Invalid class string (0x23 - 0x2 - 0x39) 
>EasyPickII_Library : Trace - error; _Method::EASYPICKII::INIT::Init Initialisation failed!
>EasyPickII_Library : Trace - complete; _Method::EASYPICKII::SETTINGS::GetCameraSettingsNamesList( ...)
>EasyPickII_Library : Trace - error; _Method::EASYPICKII::SETTINGS::GetCameraSettingsNamesList The Application is not running!

+ **Solution**: Install the correct EasyPickII library. For the system at C-CAMP, the library is V1.3.2 or newer. For the system installed at GH Labs, the library is XX. 

### Lack of space 

+ **Problem**: If the computer runs out of space, the system cannot save the photos that it takes. This problem happens occasionally because the image files are quite large. 
+ **Error pop-up**:  
+ **Logfile information**: 
+ **Solution**: Establish data management system that enables long term storage/backup of images. 

