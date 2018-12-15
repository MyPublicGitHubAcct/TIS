-- USE master
-- DROP DATABASE dbtis

/*
    admin       admin
    warpymx     aRule42*
    tellymx     bRule42*
    hampycx     cRule42*
    dalleax     dRule42*
    hardybx     eRule42*
    frankhx     fRule42*
*/

-- SELECT * FROM [tis].[AppUser] WHERE ID = 5
-- SELECT ID, Logon, FirstName, LastName FROM [tis].[AppUser] WHERE IsActive = 1 AND IsManager = 0

-- SELECT * FROM [tis].[AppRole]
-- SELECT * FROM [tis].[UserRole] WHERE UserId = 7
-- SELECT * FROM [tis].[Department]

-- EXEC dbtis.tis.sp_ListUsersByManagerId @managerID = 2
-- EXEC dbtis.tis.sp_FillMgrOpts
-- EXEC dbtis.tis.sp_FillDptOpts
-- EXEC dbtis.tis.sp_FillRoleOpts
-- EXEC dbtis.tis.sp_ReadRoleListForUser @Logon='hampycx'
-- EXEC dbtis.tis.sp_ReadUserById @userID=2
-- EXEC dbtis.tis.sp_ReadRoleListForUserId @userID=1
-- EXEC dbtis.tis.sp_ReadUserByLogon @Logon='tellymx'
-- EXEC dbtis.tis.sp_ReadUserIdByLogon @Logon='warpymx'

-- EXEC dbtis.tis.sp_CreateUserWithRoles @json = '[ { "Details": { "FirstName":"Test", "LastName":"User", "Manager":4, "Logon":"userxtx", "Password":"hjTY78@#", "Department":1, "isManager":1,"isActive":0 } } ]'

-- SELECT * from [tis].[AppUser] WHERE ID=(SELECT ID FROM [tis].[AppUser] WHERE Logon='dalleax')

-- EXEC dbtis.tis.sp_CreateUserWithRoles @json = '[{ 
--     "Details": { "FirstName":"Test5", "LastName":"User5", "Manager":4, "Logon":"userxta", "Password":"hjTY78@#", "Department":1, "isManager":1,"isActive":0 },
--     "Roles": [ {"RoleId":1,"UserHas":0}, {"RoleId":2,"UserHas":1}, {"RoleId":3,"UserHas":0}, {"RoleId":4,"UserHas":1}, {"RoleId":5,"UserHas":1}, {"RoleId":6,"UserHas":0}, {"RoleId":7,"UserHas":1}, {"RoleId":8,"UserHas":1}, {"RoleId":9,"UserHas":0}, {"RoleId":10,"UserHas":1} ]
-- }]'

-- EXEC dbtis.tis.sp_UpdateUserWithRoles @json = '[{
--     "Details":{"ID":3,"FirstName":"Marge","LastName":"Telly","Manager":2,"Department":1,"isManager":1,"isActive":1},
--     "Roles":[ {"RoleId":1,"UserHas":0},{"RoleId":2,"UserHas":0},{"RoleId":3,"UserHas":1},{"RoleId":4,"UserHas":1},{"RoleId":5,"UserHas":1},{"RoleId":6,"UserHas":1},{"RoleId":7,"UserHas":1},{"RoleId":8,"UserHas":0},{"RoleId":9,"UserHas":1},{"RoleId":10,"UserHas":1} ]
-- }]'


-- EXEC dbtis.tis.sp_UpdateUserWithRoles @json = '[{
--     "Details":{"ID":7,"FirstName":"Harold","LastName":"Franklin","Manager":2,"Department":4,"isManager":0,"isActive":1},
--     "Roles":[{"RoleId":1,"UserHas":0},{"RoleId":2,"UserHas":0},{"RoleId":3,"UserHas":0},{"RoleId":4,"UserHas":1},{"RoleId":5,"UserHas":0},{"RoleId":6,"UserHas":0},{"RoleId":7,"UserHas":1},{"RoleId":8,"UserHas":1},{"RoleId":9,"UserHas":0},{"RoleId":10,"UserHas":1}]
-- }]'

-- {"UpdatedUser":[{"Details":{"ID":7,"FirstName":"Harold","LastName":"Franklin","Manager":2,"Department":4,"isManager":0,"isActive":1},"Roles":[{"RoleId":1,"UserHas":0},{"RoleId":2,"UserHas":0},{"RoleId":3,"UserHas":0},{"RoleId":4,"UserHas":1},{"RoleId":5,"UserHas":0},{"RoleId":6,"UserHas":0},{"RoleId":7,"UserHas":1},{"RoleId":8,"UserHas":1},{"RoleId":9,"UserHas":0},{"RoleId":10,"UserHas":1}]}]}




DECLARE @json VARCHAR(MAX) = '{"Details":{"ID":7,"FirstName":"Harold","LastName":"Franklin","Manager":2,"Department":4,"isManager":0,"isActive":1},"Roles":[{"RoleId":1,"UserHas":0},{"RoleId":2,"UserHas":0},{"RoleId":3,"UserHas":0},{"RoleId":4,"UserHas":0},{"RoleId":5,"UserHas":0},{"RoleId":6,"UserHas":0},{"RoleId":7,"UserHas":1},{"RoleId":8,"UserHas":1},{"RoleId":9,"UserHas":0},{"RoleId":10,"UserHas":1}]}'
DECLARE @responseMessage VARCHAR(250) = 'Not set.'
DECLARE @DateChanged DATE = GETDATE()

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

DECLARE @UserId INT = (SELECT ID FROM #temp_details)

BEGIN TRY
    UPDATE [tis].[AppUser]
    SET FirstName=(SELECT FirstName FROM #temp_details), 
        LastName=(SELECT LastName FROM #temp_details),
        Manager=(SELECT Manager FROM #temp_details),
        Department=(SELECT Department FROM #temp_details),
        isManager=(SELECT IsManager FROM #temp_details),
        isActive=(SELECT IsActive FROM #temp_details),
        DateChanged=@DateChanged
    WHERE ID=@UserId


    SELECT * INTO #temp_roles FROM OPENJSON ( JSON_QUERY( @json, '$.Roles' ) )
    WITH (
        RoleId INT '$.RoleId',
        UserHas BIT '$.UserHas'
    ) 

    -- TEST
    select * from #temp_roles

    UPDATE [tis].[UserRole]
    SET UserHas = #temp_roles.UserHas
    FROM #temp_roles
    WHERE [tis].[UserRole].[RoleId] = #temp_roles.RoleId
    AND [tis].[UserRole].[UserId] = @UserId

    -- TEST
    select * from dbtis.tis.UserRole where UserId=@UserId


    SET @responseMessage='success'

    DROP TABLE #temp_roles
    DROP TABLE #temp_details


END TRY

BEGIN CATCH
    SET @responseMessage='failed'
END CATCH

















