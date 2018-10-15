-- Create stored procedure: sp_CreateUser
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
USE dbtis
GO
-- Create a new stored procedure called 'sp_CreateUser' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_CreateUser'
)
DROP PROCEDURE [tis].[sp_CreateUser]
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_CreateUser
    @FirstName VARCHAR(30) = '',
    @LastName VARCHAR(100) = '',
    @Manager int = 0,
    @Logon VARCHAR(7) = '',
    @Password VARCHAR(64) = '',
    @Department int = 0,
    @isManager BIT = 0,
    @isActive BIT = 0,
    @responseMessage [VARCHAR](250) OUTPUT
-- add more stored procedure parameters here
AS
BEGIN
    SET NOCOUNT ON

    DECLARE @Salt UNIQUEIDENTIFIER=NEWID()
    DECLARE @DateChanged DATE = GETDATE()

    IF EXISTS (SELECT Logon
    FROM [tis].[AppUser]
    WHERE Logon = @Logon)
        SET @responseMessage='failed'
    ELSE
        BEGIN TRY

            INSERT INTO [tis].[AppUser]
        ([FirstName], [LastName], [Manager], [Logon], [Password], [Salt], [Department], [isManager], [isActive], [DateChanged])
    VALUES
        (@FirstName, @LastName, @Manager, @Logon, HASHBYTES('SHA2_512', @Password+CAST(@Salt AS VARCHAR(36))), @Salt, @Department, @isManager, @isActive, @DateChanged)

            SET @responseMessage='success'

        END TRY
        BEGIN CATCH
            SET @responseMessage=ERROR_MESSAGE()
        END CATCH
END
GO

