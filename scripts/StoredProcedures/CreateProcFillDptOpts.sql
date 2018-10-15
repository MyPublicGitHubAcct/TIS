-- Create a new stored procedure called 'sp_FillDptOpts' in schema 'tis'
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
USE dbtis
GO
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_FillDptOpts'
)
DROP PROCEDURE tis.sp_FillDptOpts
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_FillDptOpts
AS
    -- body of the stored procedure
    SELECT ID, Name
    FROM [tis].[Department] 
    WHERE IsActive = 1
GO

