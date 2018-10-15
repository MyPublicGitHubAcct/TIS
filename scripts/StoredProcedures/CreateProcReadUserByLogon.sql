-- Create a new stored procedure called 'sp_ReadUserByLogon' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_ReadUserByLogon'
)
DROP PROCEDURE tis.sp_ReadUserByLogon
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_ReadUserByLogon
    @Logon VARCHAR(7) = ''
-- add more stored procedure parameters here
AS
    -- body of the stored procedure
    SELECT *
    FROM tis.AppUser
    WHERE Logon = @Logon
GO
