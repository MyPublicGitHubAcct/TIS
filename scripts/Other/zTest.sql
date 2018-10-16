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

-- SELECT * FROM [tis].[AppUser]
-- SELECT * FROM [tis].[AppRole]
-- SELECT * FROM [tis].[UserRole]
-- SELECT * FROM [tis].[Department]

-- SELECT ID, RoleName, 'false' UserHas FROM [tis].[AppRole]

-- EXEC dbtis.tis.sp_ListUsersByManagerId @managerID = 2
-- EXEC dbtis.tis.sp_FillMgrOpts
-- EXEC dbtis.tis.sp_FillDptOpts
-- EXEC dbtis.tis.sp_FillRoleOpts
-- EXEC dbtis.tis.sp_ReadRoleListForUser @Logon='hampycx'
-- EXEC dbtis.tis.sp_ReadUserById @userID=2
-- EXEC dbtis.tis.sp_ReadRoleListForUserId @userID=1
-- EXEC dbtis.tis.sp_ReadUserByLogon @Logon='tellymx'
EXEC dbtis.tis.sp_ReadUserIdByLogon @Logon='frankhx'




