-- Create stored procedure: sp_CreateRole
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
USE dbtis
GO
-- Create a new stored procedure called 'sp_CreateRole' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_CreateRole'
)
DROP PROCEDURE [tis].[AddRole]
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_CreateRole
    @RoleName VARCHAR(30),
    @ProjectCreate BIT = 0,
    @ProjectRead BIT = 0,
    @ProjectUpdate BIT = 0,
    @ProjectDelete BIT = 0,
    @ProjectApprove BIT = 0,
    @UserCreate BIT = 0,
    @UserRead BIT = 0,
    @UserUpdate BIT = 0,
    @UserDelete BIT = 0,
    @UserApprove BIT = 0,
    @TimeCreate BIT = 0,
    @TimeRead BIT = 0,
    @TimeUpdate BIT = 0,
    @TimeDelete BIT = 0,
    @TimeApprove BIT = 0,
    @IssueCreate BIT = 0,
    @IssueRead BIT = 0,
    @IssueUpdate BIT = 0,
    @IssueDelete BIT = 0,
    @IssueApprove BIT = 0,
    @CommentCreate BIT = 0,
    @CommentRead BIT = 0,
    @CommentUpdate BIT = 0,
    @CommentDelete BIT = 0,
    @CommentApprove BIT = 0,
    @AdminAll BIT = 0,
    @responseMessage VARCHAR(250) OUTPUT
-- add more stored procedure parameters here
AS
BEGIN
    SET NOCOUNT ON

    BEGIN TRY

        INSERT INTO [tis].[AppRole]
        ([RoleName], [ProjectCreate],[ProjectRead], [ProjectUpdate], [ProjectDelete], [ProjectApprove],
        [UserCreate], [UserRead], [UserUpdate], [UserDelete], [UserApprove],
        [TimeCreate], [TimeRead], [TimeUpdate], [TimeDelete], [TimeApprove],
        [IssueCreate], [IssueRead], [IssueUpdate], [IssueDelete], [IssueApprove],
        [CommentCreate], [CommentRead], [CommentUpdate], [CommentDelete], [CommentApprove],
        [AdminAll])
    VALUES
        (@RoleName, @ProjectCreate, @ProjectRead, @ProjectUpdate, @ProjectDelete, @ProjectApprove,
            @UserCreate, @UserRead, @UserUpdate, @UserDelete, @UserApprove,
            @TimeCreate, @TimeRead, @TimeUpdate, @TimeDelete, @TimeApprove,
            @IssueCreate, @IssueRead, @IssueUpdate, @IssueDelete, @IssueApprove,
            @CommentCreate, @CommentRead, @CommentUpdate, @CommentDelete, @CommentApprove,
            @AdminAll)

        SET @responseMessage='success'

    END TRY
    BEGIN CATCH
        SET @responseMessage=ERROR_MESSAGE()
    END CATCH
END
GO


