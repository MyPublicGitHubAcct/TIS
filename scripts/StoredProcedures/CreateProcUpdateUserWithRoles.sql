/**
    Create a new stored procedure called 'sp_UpdateUserWithRoles' in schema 'tis'
    1 - make temp table for details
    2 - add the details to AppUser
    3 - get the new user's id & make second temp table for role settings
    4 - add the role settings to UserRoles

    Recieves...
    {
        "UpdatedUser": 
        [
            {
                "Details":
                {
                    "ID":7,
                    "FirstName":"Harold",
                    "LastName":"Franklin",
                    "Manager":2,
                    "Department":4,
                    "isManager":0,
                    "isActive":1
                },
                "Roles":
                [
                    {"RoleId":1,"UserHas":0},
                    {"RoleId":2,"UserHas":0},
                    {"RoleId":3,"UserHas":1},
                    {"RoleId":4,"UserHas":1},
                    {"RoleId":5,"UserHas":0},
                    {"RoleId":6,"UserHas":0},
                    {"RoleId":7,"UserHas":1},
                    {"RoleId":8,"UserHas":1},
                    {"RoleId":9,"UserHas":0},
                    {"RoleId":10,"UserHas":1}
                ]
            }
        ]
    }
*/

IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_UpdateUserWithRoles'
)
DROP PROCEDURE tis.sp_UpdateUserWithRoles
GO

CREATE PROCEDURE tis.sp_UpdateUserWithRoles
    @json VARCHAR(MAX) = '', 
    @responseMessage VARCHAR(250) = 'Not set.' OUTPUT
AS
  BEGIN
    -- bring in whole json document.
    SELECT temp_d.* INTO #temp_details FROM OPENJSON ( @json ) 
    WITH (
        ID INT '$.Details.ID',
        FirstName VARCHAR(200) '$.Details.FirstName',
        LastName VARCHAR(200) '$.Details.LastName',
        Manager INT '$.Details.Manager',
        Department INT '$.Details.Department',
        IsManager BIT '$.Details.isManager',
        IsActive BIT '$.Details.isActive',
        Perms NVARCHAR(MAX) '$.Roles' AS JSON
    ) AS temp_d

    -- validation TODO 
    -- IF NOT EXISTS (SELECT FirstName FROM #temp_details) BEGIN SET @responseMessage ='MissingFirstName' END

    -- ///////////// UPDATE USER
    -- test: if user already exists, update user/roles and return 'success', else return 'user does not exist'
    IF EXISTS (SELECT ID FROM [tis].[AppUser] WHERE ID=(SELECT ID FROM #temp_details))
        BEGIN TRY
            -- ///////////// UPDATE USER'S INFO
            DECLARE @UserId INT = (SELECT ID FROM #temp_details)
            DECLARE @DateChanged DATE = GETDATE()

            UPDATE [tis].[AppUser]
            SET FirstName=(SELECT FirstName FROM #temp_details), 
                LastName=(SELECT LastName FROM #temp_details),
                Manager=(SELECT Manager FROM #temp_details),
                Department=(SELECT Department FROM #temp_details),
                isManager=(SELECT IsManager FROM #temp_details),
                isActive=(SELECT IsActive FROM #temp_details),
                DateChanged=@DateChanged
            WHERE ID=@UserId

            -- ///////////// UPDATE USER'S ROLES
            SELECT * INTO #temp_roles FROM OPENJSON ( JSON_QUERY( @json, '$.Roles' ) )
            WITH (
                RoleId INT '$.RoleId',
                UserHas BIT '$.UserHas'
            )

            UPDATE [tis].[UserRole]
            SET UserHas = #temp_roles.UserHas
            FROM #temp_roles
            WHERE [tis].[UserRole].[RoleId] = #temp_roles.RoleId
            AND [tis].[UserRole].[UserId] = @UserId

            SET @responseMessage = 'success'

            -- ///////////// CLEANUP
            DROP TABLE #temp_roles
            DROP TABLE #temp_details
        END TRY

        BEGIN CATCH
            SET @responseMessage='failed'
        END CATCH

    ELSE
        SET @responseMessage = 'user does not exist'
    END
GO


    /*
    -- IF EXISTS (SELECT ID FROM [tis].[AppUser] WHERE ID=(SELECT ID FROM #temp_details))
        BEGIN TRY
            DECLARE @DateChanged DATE = GETDATE()
            
            UPDATE [tis].[AppUser]
            SET FirstName=(SELECT FirstName FROM #temp_details), 
                LastName=(SELECT LastName FROM #temp_details),
                Manager=(SELECT Manager FROM #temp_details),
                Department=(SELECT Department FROM #temp_details),
                isManager=(SELECT IsManager FROM #temp_details),
                isActive=(SELECT IsActive FROM #temp_details),
                DateChanged=@DateChanged
            WHERE ID=@UserId
            
            -- ///////////// UPDATE USER'S ROLES
            -- IF EXISTS (SELECT * FROM [tis].[UserRole] WHERE UserId=@UserId)
                BEGIN TRY

                    SELECT * INTO #temp_roles FROM OPENJSON ( JSON_QUERY( @json, '$.Roles' ) )
                    WITH (
                        RoleId INT '$.RoleId',
                        UserHas BIT '$.UserHas'
                    )

                    UPDATE [tis].[UserRole]
                    SET UserHas = #temp_roles.UserHas
                    FROM #temp_roles
                    WHERE [tis].[UserRole].[RoleId] = #temp_roles.RoleId
                    AND [tis].[UserRole].[UserId] = @UserId

                    SET @responseMessage='success'
                END TRY

                BEGIN CATCH
                    SET @responseMessage='failed'
                END CATCH

            -- ELSE
            --     SET @responseMessage='role update failed'

            -- ///////////// CLEANUP
            DROP TABLE #temp_roles

        END TRY

        BEGIN CATCH
            SET @responseMessage='failed'
        END CATCH

    -- ELSE 
    --     SET @responseMessage='user not found'

    -- ///////////// CLEANUP
    DROP TABLE #temp_details

    END
GO
*/
