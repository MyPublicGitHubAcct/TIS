-- Create stored procedure: sp_AuthenticateUser 
/*
    Steps:
    > Find user id
    > Validate that the password received is the same as that for the user id
    > Return json with user id & list of roles associated with the user id
*/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
USE dbtis
GO
-- Create a new stored procedure called 'sp_AuthenticateUser' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_AuthenticateUser'
)

DROP PROCEDURE [tis].[sp_AuthenticateUser]
GO

-- Create the stored procedure in the specified schema
CREATE PROCEDURE [tis].[sp_AuthenticateUser]
    @Logon VARCHAR(7),
    @Password VARCHAR(64),
    @responseMessage VARCHAR(250) = '' OUTPUT
-- add more stored procedure parameters here
AS
-- body of the stored procedure
BEGIN
    SET NOCOUNT OFF

    DECLARE @UserId INT

    IF EXISTS (SELECT *
        FROM tis.AppUser
        WHERE [Logon] = @Logon) 
    BEGIN
        SET @UserId=(SELECT ID FROM tis.AppUser WHERE [Logon] = @Logon
        AND [Password] = HASHBYTES('SHA2_512', @Password+CAST([Salt] AS VARCHAR(36)))
        )

    IF (@UserId IS NULL)
        SET @responseMessage = 'Incorrect password'
    ELSE
        SET @responseMessage = 'success'
    END 

    ELSE 
        SET @responseMessage = 'Invalid login'
END
GO
