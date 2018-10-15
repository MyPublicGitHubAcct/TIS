-- Create a new stored procedure called 'sp_CreateUserWithRoles' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_CreateUserWithRoles'
)
DROP PROCEDURE tis.sp_CreateUserWithRoles
GO
-- Create the stored procedure in the specified schema
CREATE PROCEDURE tis.sp_CreateUserWithRoles
    @param1 /*parameter name*/ int /*datatype_for_param1*/ = 0, /*default_value_for_param1*/
    @param2 /*parameter name*/ int /*datatype_for_param1*/ = 0 /*default_value_for_param2*/
-- add more stored procedure parameters here
AS
    -- body of the stored procedure
    SELECT @param1, @param2
GO
-- example to execute the stored procedure we just created
EXECUTE tis.sp_CreateUserWithRoles 1 /*value_for_param1*/, 2 /*value_for_param2*/
GO