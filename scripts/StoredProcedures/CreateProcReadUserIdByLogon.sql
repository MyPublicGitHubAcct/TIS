-- sp_ReadUserIdByLogon in schema tis
IF EXISTS ( SELECT * FROM INFORMATION_SCHEMA.ROUTINES 
            WHERE SPECIFIC_SCHEMA = N'tis'
            AND SPECIFIC_NAME = N'sp_ReadUserIdByLogon'
)

DROP PROCEDURE tis.sp_ReadUserIdByLogon
GO

CREATE PROCEDURE tis.sp_ReadUserIdByLogon
    @Logon VARCHAR(7) = '',
    @responseMessage VARCHAR(250) = '' OUTPUT
AS
    BEGIN
        SET NOCOUNT OFF
        DECLARE @UserId INT

        IF EXISTS(SELECT * FROM tis.AppUser WHERE [Logon] = @Logon)
            BEGIN
                SET @UserId=( SELECT ID From tis.AppUser WHERE [Logon] = @Logon )

                IF (@UserId IS NOT NULL)
                    SET @responseMessage = 'success'
                    SELECT ID From tis.AppUser WHERE [Logon] = @Logon
            END
        ELSE
            SET @responseMessage = 'Invalid logon'
    END
GO
