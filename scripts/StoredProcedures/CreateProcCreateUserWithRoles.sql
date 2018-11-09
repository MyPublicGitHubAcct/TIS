/**
    Create a new stored procedure called 'sp_CreateUserWithRoles' in schema 'tis'
    1 - make temp table
    2 - add the details to AppUser
    3 - get the new user's id & make second temp table from the first
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
    -- bring in whole json document.
    SELECT temp_d.* INTO #temp_details FROM OPENJSON ( @json ) 
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
    ) AS temp_d

    -- ///////////// ADD USER
    -- test: if logon already exists, return 'failed'
    --       else insert user/roles and return 'success'
    IF EXISTS (SELECT Logon FROM [tis].[AppUser] WHERE Logon=(SELECT Logon FROM #temp_details))
        SET @responseMessage='failed'
    ELSE
        BEGIN TRY
            DECLARE @Salt UNIQUEIDENTIFIER=NEWID()
            DECLARE @DateChanged DATE = GETDATE()
            
            INSERT INTO [tis].[AppUser]
            (
                [FirstName], [LastName], [Manager], [Logon], [Password], 
                [Salt], [Department], [isManager], [isActive], [DateChanged]
            )
            VALUES
            (
                (SELECT FirstName FROM #temp_details),
                (SELECT LastName FROM #temp_details),
                (SELECT Manager FROM #temp_details),
                (SELECT Logon FROM #temp_details),
                HASHBYTES('SHA2_512', (SELECT Pwd FROM #temp_details)+CAST(@Salt AS VARCHAR(36))), 
                @Salt, 
                (SELECT Department FROM #temp_details),
                (SELECT isManager FROM #temp_details),
                (SELECT isActive FROM #temp_details),
                @DateChanged
            )
                -- ///////////// ADD USER'S ROLES
                DECLARE @UserId INT = (SELECT ID FROM [tis].[AppUser] WHERE Logon=(SELECT Logon FROM #temp_details));

                SELECT temp_r.* INTO #temp_roles FROM OPENJSON ( @json ) 
                WITH (
                    Perms NVARCHAR(MAX) '$.Roles' AS JSON
                ) AS temp_r

                INSERT INTO [tis].[UserRole]
                SELECT @UserId AS UserId, tempPerm.*
                FROM #temp_roles CROSS APPLY OPENJSON(Perms)
                WITH
                (
                    RoleId INT '$.RoleId',
                    UserHas BIT '$.UserHas'
                ) AS tempPerm

                SET @responseMessage='success'

                -- ///////////// CLEANUP
                DROP TABLE #temp_roles

        END TRY
        BEGIN CATCH
            SET @responseMessage=ERROR_MESSAGE()
        END CATCH


    -- ///////////// ADD USER'S ROLES
    -- SELECT temp_r.* INTO #temp_roles FROM OPENJSON ( @json ) 
    -- WITH (
    --     Perms NVARCHAR(MAX) '$.Roles' AS JSON
    -- ) AS temp_r

    -- INSERT INTO [tis].[UserRole]
    -- SELECT @UserId AS UserId, tempPerm.*
    -- FROM #temp_roles CROSS APPLY OPENJSON(Perms)
    -- WITH
    -- (
    --     RoleId INT '$.RoleId',
    --     UserHas BIT '$.UserHas'
    -- ) AS tempPerm

    -- ///////////// CLEANUP
    DROP TABLE #temp_details
    -- DROP TABLE #temp_roles
  END
GO
