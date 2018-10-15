-- Create stored procedure: sp_ReadUserAndRolesByLogon
/*
    Used to create token upon user authentication
*/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
USE dbtis
GO
-- Create a new stored procedure called 'sp_ReadUserAndRolesByLogon' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_ReadUserAndRolesByLogon'
)

DROP PROCEDURE [tis].[sp_ReadUserAndRolesByLogon]
GO

-- Create the stored procedure in the specified schema
CREATE PROCEDURE [tis].[sp_ReadUserAndRolesByLogon]
    @Logon VARCHAR(7) = ''
-- add more stored procedure parameters here
AS
-- body of the stored procedure
SELECT DISTINCT u.ID, u.Logon, u.FirstName, u.isManager, u.isActive, ur.RoleId, ar.RoleName, ur.UserHas,
    ar.ProjectCreate, ar.ProjectRead, ar.ProjectUpdate, ar.ProjectDelete, ar.ProjectApprove,
    ar.UserCreate, ar.UserRead, ar.UserUpdate, ar.UserDelete, ar.UserApprove,
    ar.TimeCreate, ar.TimeRead, ar.TimeUpdate, ar.TimeDelete, ar.TimeApprove,
    ar.IssueCreate, ar.IssueRead, ar.IssueUpdate, ar.IssueDelete, ar.IssueApprove,
    ar.CommentCreate, ar.CommentRead, ar.CommentUpdate, ar.CommentDelete, ar.CommentApprove,
    ar.AdminAll
FROM [tis].[AppUser] u, [tis].[UserRole] ur, [tis].[AppRole] ar
WHERE u.Logon=@Logon AND u.ID=ur.UserId AND ur.RoleId=ar.ID
GO
