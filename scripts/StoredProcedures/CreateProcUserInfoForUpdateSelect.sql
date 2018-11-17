/**
    Create a new stored procedure called 'sp_UserInfoForUpdateSelect' in schema 'tis'
    Returns a reduced set of data
*/

IF EXISTS (
SELECT *
    FROM INFORMATION_SCHEMA.ROUTINES
WHERE SPECIFIC_SCHEMA = N'tis'
    AND SPECIFIC_NAME = N'sp_UserInfoForUpdateSelect'
)
DROP PROCEDURE tis.sp_UserInfoForUpdateSelect
GO
CREATE PROCEDURE tis.sp_UserInfoForUpdateSelect
    @responseMessage VARCHAR(250) = 'Not set.' OUTPUT
AS
  BEGIN TRY
      SELECT ID, Logon, FirstName, LastName, Manager, Department, IsManager, IsActive 
      FROM [tis].[AppUser] 
      SET @responseMessage='success'
  END TRY
  BEGIN CATCH
    SET @responseMessage='failure'
  END CATCH
GO
