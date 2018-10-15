-- Create stored procedure: sp_CreateDepartment
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
USE dbtis
GO
-- Create a new stored procedure called 'sp_CreateDepartment' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_CreateDepartment'
)
DROP PROCEDURE [tis].[sp_CreateDepartment]
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_CreateDepartment
    @Name VARCHAR(50) = '',
    @isActive BIT = 0,
    @responseMessage [VARCHAR](250) OUTPUT
-- add more stored procedure parameters here
AS
BEGIN
    SET NOCOUNT ON

    DECLARE @DateChanged DATE = GETDATE()

    BEGIN TRY

        INSERT INTO [tis].[Department]
        ([Name], [isActive], [DateChanged])
    VALUES
        (@Name, @isActive, @DateChanged)

        SET @responseMessage='success'

    END TRY
    BEGIN CATCH
        SET @responseMessage=ERROR_MESSAGE()
    END CATCH
END
GO
