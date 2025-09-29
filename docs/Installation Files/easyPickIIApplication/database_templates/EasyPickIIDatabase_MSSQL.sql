/************************************************************************************************
* Projekt:      EasyPickII                                                                      *
*                                                                                               *
* Beschreibung: Script to create SQL Server database                                            *
*                                                                                               *
************************************************************************************************/


/*******************************************************************************/
/* Tabelle EasyPickIIDatabaseVersion                                           */
/*******************************************************************************/


CREATE TABLE [EasyPickIIDatabaseVersion]
(
        [Version]                      INT             NOT NULL
)
GO

INSERT INTO [EasyPickIIDatabaseVersion] (Version) VALUES (4)
GO



/*******************************************************************************/
/* Tabelle EasyPickIIRack                                                      */
/*******************************************************************************/


CREATE TABLE [EasyPickIIRack]
(
        [RackID]              INT             IDENTITY PRIMARY KEY,
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
        [XMLSettings]                   IMAGE           ,
        [XMLCameraSettings]             IMAGE           ,
        [XMLColonySettings]             IMAGE           ,
        [ReferencePointsCorrection]     IMAGE           ,
        [PictureFilePath]               NVARCHAR(255)   ,
        [ColorModel]                    INT             ,
        [ErrorCode]                     INT             ,
        [Description]                   NVARCHAR(255)   ,
        [ImageStitcherID]               INT             
)
GO


CREATE INDEX [EasyPickIIRack_CreatedDate_Index]     ON [EasyPickIIRack] ([CreatedDate])
GO
CREATE INDEX [EasyPickIIRack_RackBarcode_Index]     ON [EasyPickIIRack] ([RackBarcode])
GO
CREATE INDEX [EasyPickIIRack_ErrorCode_Index]       ON [EasyPickIIRack] ([ErrorCode])
GO
CREATE INDEX [EasyPickIIRack_ImageStitcherID_Index] ON [EasyPickIIRack] ([ImageStitcherID])
GO



/*******************************************************************************/
/* Tabelle EasyPickIIContainer */
/*******************************************************************************/


CREATE TABLE [EasyPickIIContainer]
(
        [ContainerID]                   INT             IDENTITY PRIMARY KEY,
        [RackID]                        INT             REFERENCES [EasyPickIIRack] ([RackID]) ON DELETE CASCADE,
        [ContainerNumber]               INT             ,
        [ContainerName]                 NVARCHAR(50)    ,
        [PickingOrder]                  INT             ,
        [ErrorCode]                     INT             ,
        [Description]                   NVARCHAR(255)   
)
GO


CREATE INDEX [EasyPickIIContainer_RackID_Index]             ON [EasyPickIIContainer]([RackID])
GO
CREATE INDEX [EasyPickIIContainer_ContainerNumber_Index]    ON [EasyPickIIContainer]([ContainerNumber])
GO
CREATE INDEX [EasyPickIIContainer_ContainerName_Index]      ON [EasyPickIIContainer]([ContainerName])
GO
CREATE INDEX [EasyPickIIContainer_PickingOrder_Index]       ON [EasyPickIIContainer]([PickingOrder])
GO
CREATE INDEX [EasyPickIIContainer_ErrorCode_Index]          ON [EasyPickIIContainer]([ErrorCode])
GO



/*******************************************************************************/
/* Tabelle EasyPickIIColony                                                    */
/*******************************************************************************/

/* -- PickingState: 0 undefined, 1 ok, 2 error */

CREATE TABLE [EasyPickIIColony]
(
        [ColonyID]                      INT             IDENTITY PRIMARY KEY,
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
        [IsExcluded]                    BIT             ,
        [IsGoodColony]                  BIT             ,
        [PickingOrder]                  INT             ,
        [IsUserEdited]                  BIT             ,
        [ErrorCode]                     INT             ,
        [Description]                   NVARCHAR(250)    
)
GO


CREATE INDEX [EasyPickIIColony_ContainerID_Index]   ON [EasyPickIIColony]([ContainerID])
GO
CREATE INDEX [EasyPickIIColony_LoadingTotal_pct_Index]  ON [EasyPickIIColony]([LoadingTotal_pct])
GO
CREATE INDEX [EasyPickIIColony_PickingState_Index]  ON [EasyPickIIColony]([PickingState])
GO
CREATE INDEX [EasyPickIIColony_IsExcluded_Index]    ON [EasyPickIIColony]([IsExcluded])
GO
CREATE INDEX [EasyPickIIColony_IsGoodColony_Index]  ON [EasyPickIIColony]([IsGoodColony])
GO
CREATE INDEX [EasyPickIIColony_PickingOrder_Index]  ON [EasyPickIIColony]([PickingOrder])
GO



/*******************************************************************************/
/* Tabelle EasyPickIIImageStitcher */
/*******************************************************************************/


CREATE TABLE [EasyPickIIImageStitcher]
(
        [ImageStitcherID]               INT             IDENTITY PRIMARY KEY,
        [CreatedDate]                   DATETIME        ,
        [RackBarcode]                   NVARCHAR(50)    ,
        [ImageStitcherSettings]         IMAGE           ,
        [ReferencePointsCorrection]     IMAGE           ,
        [PictureFilePath]               NVARCHAR(255)   ,
        [ErrorCode]                     INT             ,
        [Description]                   NVARCHAR(255)   
)
GO


CREATE INDEX [EasyPickIIImageStitcher_CreatedDate_Index]     ON [EasyPickIIImageStitcher] ([CreatedDate])
GO
CREATE INDEX [EasyPickIIImageStitcher_RackBarcode_Index]     ON [EasyPickIIImageStitcher] ([RackBarcode])
GO
CREATE INDEX [EasyPickIIImageStitcher_ErrorCode_Index]       ON [EasyPickIIImageStitcher] ([ErrorCode])
GO



/*******************************************************************************/
/* Tabelle EasyPickIIImageStitcherPicture */
/*******************************************************************************/


CREATE TABLE [EasyPickIIImageStitcherPicture]
(
        [ImageStitcherPictureID]    INT             IDENTITY PRIMARY KEY,
        [ImageStitcherID]           INT             REFERENCES [EasyPickIIImageStitcher] ([ImageStitcherID]) ON DELETE CASCADE,
        [PositionIndex]             INT             ,
        [PictureFilePath]           NVARCHAR(255)    
)
GO

CREATE INDEX [EasyPickIIImageStitcherPicture_ImageStitcherID_Index]   ON [EasyPickIIImageStitcherPicture]([ImageStitcherID])
GO




