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


