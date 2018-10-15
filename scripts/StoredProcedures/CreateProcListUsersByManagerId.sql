-- Create stored procedure: sp_ListUsersByManagerId 
/*
    -- 1: report to currentUser
    -- 2: report to those reporting to 1
    -- 3: report to those reporting to 2
    -- etc....
*/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
USE dbtis
GO
-- Create a new stored procedure called 'sp_ListUsersByManagerId' in schema 'tis'
-- Drop the stored procedure if it already exists
IF EXISTS (
SELECT *
FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_ListUsersByManagerId'
)

DROP PROCEDURE [tis].[sp_ListUsersByManagerId]
GO

-- Create the stored procedure in the specified schema
CREATE PROCEDURE [tis].[sp_ListUsersByManagerId]
    @managerID INT  = 0
-- add more stored procedure parameters here
AS
-- body of the stored procedure
IF @managerID > 1
    WITH DirectReports (ID, FirstName, LastName, Manager, Logon, Department, IsManager, IsActive) AS
    (
    -- Anchor member
    SELECT ID, FirstName, LastName, Manager, Logon, Department, IsManager, IsActive
    FROM [tis].[AppUser] 
    WHERE [Manager] = @managerID  -- must be > 1 (admin)
    UNION ALL
    -- Recursive member
    SELECT e.ID, e.FirstName, e.LastName, e.Manager, e.Logon, e.Department, e.IsManager, e.IsActive
    FROM [tis].[AppUser] AS e
        INNER JOIN DirectReports AS d
        ON e.Manager = d.ID
    )
    SELECT * FROM DirectReports
ELSE
    SELECT NULL
GO
