-- Create a new stored procedure called 'sp_FillMgrOpts' in schema 'tis'
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
    AND SPECIFIC_NAME = N'sp_FillMgrOpts'
)
DROP PROCEDURE tis.sp_FillMgrOpts
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_FillMgrOpts
AS
    SELECT ID, FirstName, LastName
    FROM [tis].[AppUser] 
    WHERE IsManager=1 AND IsActive=1
GO

