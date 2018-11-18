-- Create a new stored procedure called 'sp_ReadRoleListForUserId' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_ReadRoleListForUserId'
)
DROP PROCEDURE tis.sp_ReadRoleListForUserId
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_ReadRoleListForUserId
    @userID INT  = 0
-- add more stored procedure parameters here
AS
    -- body of the stored procedure
    SELECT ur.RoleId, ur.UserHas, ar.RoleName
    FROM [tis].[UserRole] ur Inner Join [tis].[AppRole] ar ON ur.RoleId=ar.ID
    WHERE ur.UserId=@userID
GO

