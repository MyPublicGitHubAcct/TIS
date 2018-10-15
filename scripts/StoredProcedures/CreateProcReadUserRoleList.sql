-- Create a new stored procedure called 'sp_ReadUserRoleList' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_ReadUserRoleList'
)
DROP PROCEDURE tis.sp_ReadUserRoleList
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_ReadUserRoleList
AS
    -- body of the stored procedure
    -- SELECT * FROM [tis].[AppRole]
    SELECT ID, RoleName, 'false' UserHas FROM [tis].[AppRole]
GO

