/************************************************************************************************
* Projekt:      EasyPickII                                                                      *
*                                                                                               *
* Beschreibung: Script to create SQLite database                                                *
*                                                                                               *
************************************************************************************************/


/*******************************************************************************/
/* Tabelle EasyPickIIDatabaseVersion                                           */
/*******************************************************************************/


CREATE TABLE [EasyPickIIDatabaseVersion]
(
        [Version]                      INT             NOT NULL
)
;

INSERT INTO [EasyPickIIDatabaseVersion] (Version) VALUES (4)
;



/*******************************************************************************/
/* Tabelle EasyPickIIRack                                                      */
/*******************************************************************************/


CREATE TABLE [EasyPickIIRack]
(
        [RackID]                        INTEGER         PRIMARY KEY,
        [CreatedDate]                   DATETIME        ,
        [RackBarcode]                   NVARCHAR(50)    ,
        [ReferenzPos1X]                 FLOAT           ,
        [ReferenzPos1Y]                 FLOAT           ,
        [ReferenzPos2X]                 FLOAT           ,
        [ReferenzPos2Y]                 FLOAT           ,
        [ReferenzPos3X]                 FLOAT           ,
        [ReferenzPos3Y]                 FLOAT           ,
        [ReferenzPos4X]                 FLOAT           ,
        [ReferenzPos4Y]                 FLOAT           ,
        [XMLSettings]                   BLOB            ,
        [XMLCameraSettings]             BLOB            ,
        [XMLColonySettings]             BLOB            ,
        [ReferencePointsCorrection]     BLOB            ,
        [PictureFilePath]               NVARCHAR(255)   ,
        [ColorModel]                    INT             ,
        [ErrorCode]                     INT             ,
        [Description]                   NVARCHAR(255)   ,
        [ImageStitcherID]               INT             
)
;


CREATE INDEX [EasyPickIIRack_CreatedDate_Index]     ON [EasyPickIIRack] ([CreatedDate])
;
CREATE INDEX [EasyPickIIRack_RackBarcode_Index]     ON [EasyPickIIRack] ([RackBarcode])
;
CREATE INDEX [EasyPickIIRack_ErrorCode_Index]       ON [EasyPickIIRack] ([ErrorCode])
;
CREATE INDEX [EasyPickIIRack_ImageStitcherID_Index] ON [EasyPickIIRack] ([ImageStitcherID])
;



/*******************************************************************************/
/* Tabelle EasyPickIIContainer */
/*******************************************************************************/


CREATE TABLE [EasyPickIIContainer]
(
        [ContainerID]       INTEGER         PRIMARY KEY,
        [RackID]            INT             REFERENCES [EasyPickIIRack] ([RackID]) ON DELETE CASCADE,
        [ContainerNumber]   INT             ,
        [ContainerName]     NVARCHAR(50)    ,
        [PickingOrder]      INT             ,
        [ErrorCode]         INT             ,
        [Description]       NVARCHAR(255)   
)
;


CREATE INDEX [EasyPickIIContainer_RackID_Index]             ON [EasyPickIIContainer]([RackID])
;
CREATE INDEX [EasyPickIIContainer_ContainerNumber_Index]    ON [EasyPickIIContainer]([ContainerNumber])
;
CREATE INDEX [EasyPickIIContainer_ContainerName_Index]      ON [EasyPickIIContainer]([ContainerName])
;
CREATE INDEX [EasyPickIIContainer_PickingOrder_Index]       ON [EasyPickIIContainer]([PickingOrder])
;
CREATE INDEX [EasyPickIIContainer_ErrorCode_Index]          ON [EasyPickIIContainer]([ErrorCode])
;



/*******************************************************************************/
/* Tabelle EasyPickIIColony                                                    */
/*******************************************************************************/

/* -- PickingState: 0 undefined, 1 ok, 2 error */

CREATE TABLE [EasyPickIIColony]
(
        [ColonyID]                      INTEGER         PRIMARY KEY,
        [ContainerID]                   INT             REFERENCES [EasyPickIIContainer] ([ContainerID]) ON DELETE CASCADE,
        [PosX_px]                       FLOAT           ,
        [PosY_px]                       FLOAT           ,
        [PosX_mm]                       FLOAT           ,
        [PosY_mm]                       FLOAT           ,
        [Area_mm2]                      FLOAT           ,
        [Circularity]                   FLOAT           ,
        [ClearanceNeighbor_mm]          FLOAT           ,
        [ClearanceMargin_mm]            FLOAT           ,
        [LoadingArea_pct]               FLOAT           ,
        [LoadingCircularity_pct]        FLOAT           ,
        [LoadingClearanceNeighbor_pct]  FLOAT           ,
        [LoadingClearanceMargin_pct]    FLOAT           ,
        [LoadingTotal_pct]              FLOAT           ,
        [ColorHue]                      FLOAT           ,
        [ColorSaturation]               FLOAT           ,
        [ColorIntensity]                FLOAT           ,
        [ColorArea_pct]                 FLOAT           ,
        [ColorRed]                      FLOAT           ,
        [ColorGreen]                    FLOAT           ,
        [ColorBlue]                     FLOAT           ,
        [PickingDate]                   DATETIME        ,
        [PickingState]                  INT             ,
        [IsExcluded]                    BOOLEAN         ,
        [IsGoodColony]                  BOOLEAN         ,
        [PickingOrder]                  INT             ,
        [IsUserEdited]                  BOOLEAN         ,
        [ErrorCode]                     INT             ,
        [Description]                   NVARCHAR(250)    
)
;


CREATE INDEX [EasyPickIIColony_ContainerID_Index]   ON [EasyPickIIColony]([ContainerID])
;
CREATE INDEX [EasyPickIIColony_LoadingTotal_pct_Index]  ON [EasyPickIIColony]([LoadingTotal_pct])
;
CREATE INDEX [EasyPickIIColony_PickingState_Index]  ON [EasyPickIIColony]([PickingState])
;
CREATE INDEX [EasyPickIIColony_IsExcluded_Index]    ON [EasyPickIIColony]([IsExcluded])
;
CREATE INDEX [EasyPickIIColony_IsGoodColony_Index]  ON [EasyPickIIColony]([IsGoodColony])
;
CREATE INDEX [EasyPickIIColony_PickingOrder_Index]  ON [EasyPickIIColony]([PickingOrder])
;



/*******************************************************************************/
/* Tabelle EasyPickIIImageStitcher */
/*******************************************************************************/


CREATE TABLE [EasyPickIIImageStitcher]
(
        [ImageStitcherID]               INTEGER         PRIMARY KEY,
        [CreatedDate]                   DATETIME        ,
        [RackBarcode]                   NVARCHAR(50)    ,
        [ImageStitcherSettings]         BLOB            ,
        [ReferencePointsCorrection]     BLOB            ,
        [PictureFilePath]               NVARCHAR(255)   ,
        [ErrorCode]                     INT             ,
        [Description]                   NVARCHAR(255)   
)
;


CREATE INDEX [EasyPickIIImageStitcher_CreatedDate_Index]     ON [EasyPickIIImageStitcher] ([CreatedDate])
;
CREATE INDEX [EasyPickIIImageStitcher_RackBarcode_Index]     ON [EasyPickIIImageStitcher] ([RackBarcode])
;
CREATE INDEX [EasyPickIIImageStitcher_ErrorCode_Index]       ON [EasyPickIIImageStitcher] ([ErrorCode])
;



/*******************************************************************************/
/* Tabelle EasyPickIIImageStitcherPicture */
/*******************************************************************************/


CREATE TABLE [EasyPickIIImageStitcherPicture]
(
        [ImageStitcherPictureID]    INTEGER         PRIMARY KEY,
        [ImageStitcherID]           INT             REFERENCES [EasyPickIIImageStitcher] ([ImageStitcherID]) ON DELETE CASCADE,
        [PositionIndex]             INT             ,
        [PictureFilePath]           NVARCHAR(255)    
)
;

CREATE INDEX [EasyPickIIImageStitcherPicture_ImageStitcherID_Index]   ON [EasyPickIIImageStitcherPicture]([ImageStitcherID])
;



