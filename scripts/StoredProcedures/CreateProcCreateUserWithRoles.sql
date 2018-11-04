/**
    Create a new stored procedure called 'sp_CreateUserWithRoles' in schema 'tis'
    1 - make two temp tables - one for Details & one for Roles
    2 - add the details to AppUser
    3 - get the new user's id
    4 - add the role settings to UserRoles
*/

IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_CreateUserWithRoles'
)
DROP PROCEDURE tis.sp_CreateUserWithRoles
GO

CREATE PROCEDURE tis.sp_CreateUserWithRoles
    @json VARCHAR(MAX) = '', 
    @responseMessage VARCHAR(250) = '' OUTPUT
AS
  BEGIN

--   INSERT INTO temp_details
--   INSERT INTO temp_roles

    -- bring in entire json document.
    SELECT * FROM OPENJSON ( @json ) 
    WITH (
        FirstName VARCHAR(200) '$.Details.FirstName',
        LastName VARCHAR(200) '$.Details.LastName',
        Manager INT '$.Details.Manager',
        Logon VARCHAR(200) '$.Details.Logon',
        Pwd VARCHAR(200) '$.Details.Password',
        Department INT '$.Details.Department',
        IsManager BIT '$.Details.isManager',
        IsActive BIT '$.Details.isActive',
        Perms NVARCHAR(MAX) '$.Roles' AS JSON
    )



  END
GO
