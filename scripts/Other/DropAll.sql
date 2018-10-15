-- DROP STORED PROCEDURES
USE dbtis
GO
DROP PROCEDURE [tis].[sp_CreateRole]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_CreateUser]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_CreateUserRole]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_CreateDepartment]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_AuthenticateUser]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_FillDptOpts]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_FillRoleOpts]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_FillMgrOpts]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_ReadRoleListForUser]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_ReadRoleListForUserId]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_ReadUserAndRolesByLogon]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_ReadUserById]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_ReadUserByLogon]
GO

USE dbtis
GO
DROP PROCEDURE [tis].[sp_ReadUserRoleList]
GO

-- DROP TABLES
DROP TABLE [dbtis].[tis].[UserRole]
GO

DROP TABLE [dbtis].[tis].[AppRole]
GO

DROP TABLE [dbtis].[tis].[AppUser]
GO

DROP TABLE [dbtis].[tis].[Department]
GO

--DROP DATABASE -> do from separate script
-- USE master
-- GO
-- DROP DATABASE [dbtis]
-- GO
