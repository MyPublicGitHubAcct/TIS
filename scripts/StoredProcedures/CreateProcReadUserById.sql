-- Create stored procedure: sp_ReadUserById 
/*
    Steps:
    >
*/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
USE dbtis
GO
-- Create a new stored procedure called 'sp_ReadUserById' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_ReadUserById'
)

DROP PROCEDURE [tis].[sp_ReadUserById]
GO

-- Create the stored procedure in the specified schema
CREATE PROCEDURE [tis].[sp_ReadUserById]
    @userID INT  = 0
-- add more stored procedure parameters here
AS
-- body of the stored procedure
SELECT *
FROM tis.AppUser
WHERE ID = @userID

GO
