-- Create a new stored procedure called 'sp_ReadUserIdByLogon' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_ReadUserIdByLogon'
)
DROP PROCEDURE tis.sp_ReadUserIdByLogon
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_ReadUserIdByLogon
    @Logon VARCHAR(7) = '',
    @responseMessage VARCHAR(250) = '' OUTPUT
-- add more stored procedure parameters here
AS
-- body of the stored procedure
BEGIN
SET NOCOUNT OFF

    IF NOT EXISTS (SELECT * FROM tis.AppUser WHERE [Logon] = @Logon)
        BEGIN
            SET @responseMessage = 'Invalid login'
        END
    ELSE 
        BEGIN
            SET @responseMessage = 'success'
            SELECT ID FROM tis.AppUser WHERE [Logon] = @Logon
        END
    
END

GO

