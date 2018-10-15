-- Create stored procedure: sp_CreateUserRole
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
USE dbtis
GO
-- Create a new stored procedure called 'sp_CreateUserRole' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_CreateUserRole'
)
DROP PROCEDURE [tis].[sp_CreateUserRole]
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_CreateUserRole
    @UserId int = 0,
    @RoleId int = 0,
    @UserHas bit = 0,
    @responseMessage [VARCHAR](250) OUTPUT
-- add more stored procedure parameters here
AS
BEGIN
    SET NOCOUNT ON
    
    SET @responseMessage='failed'

    BEGIN TRY

        INSERT INTO [tis].[UserRole]
        ([UserId], [RoleId], [UserHas])
    VALUES
        (@UserId, @RoleId, @UserHas)

        SET @responseMessage='success'

    END TRY
    BEGIN CATCH
        SET @responseMessage=ERROR_MESSAGE()
    END CATCH
END
GO


