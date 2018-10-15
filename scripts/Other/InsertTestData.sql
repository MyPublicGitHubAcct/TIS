-- InsertTestData

/** DEPARTMENTS */
EXEC dbtis.tis.sp_CreateDepartment @Name="Art", @isActive=1, @responseMessage="failed"
EXEC dbtis.tis.sp_CreateDepartment @Name="Finance", @isActive=1, @responseMessage="failed"
EXEC dbtis.tis.sp_CreateDepartment @Name="History", @isActive=1, @responseMessage="failed"
EXEC dbtis.tis.sp_CreateDepartment @Name="English", @isActive=1, @responseMessage="failed"
EXEC dbtis.tis.sp_CreateDepartment @Name="Pottery", @isActive=1, @responseMessage="failed"

/** ROLES */
--1
EXEC dbtis.tis.sp_CreateRole 
    @RoleName='AppAdmin', 
    @ProjectCreate=1, @ProjectRead=1, @ProjectUpdate=1, @ProjectDelete=1, @ProjectApprove=1, 
    @UserCreate=1, @UserRead=1, @UserUpdate=1, @UserDelete=1, @UserApprove=1, 
    @TimeCreate=1, @TimeRead=1, @TimeUpdate=1, @TimeDelete=1, @TimeApprove=1, 
    @IssueCreate=1, @IssueRead=1, @IssueUpdate=1, @IssueDelete=1, @IssueApprove=1, 
    @CommentCreate=1, @CommentRead=1, @CommentUpdate=1, @CommentDelete=1, @CommentApprove=1, 
    @AdminAll=1, @responseMessage='failed'
GO

--2
EXEC dbtis.tis.sp_CreateRole 
    @RoleName='UserMgr', 
    @ProjectCreate=0, @ProjectRead=0, @ProjectUpdate=0, @ProjectDelete=0, @ProjectApprove=0, 
    @UserCreate=1, @UserRead=1, @UserUpdate=1, @UserDelete=1, @UserApprove=1, 
    @TimeCreate=0, @TimeRead=1, @TimeUpdate=0, @TimeDelete=0, @TimeApprove=0, 
    @IssueCreate=0, @IssueRead=0, @IssueUpdate=0, @IssueDelete=0, @IssueApprove=0, 
    @CommentCreate=0, @CommentRead=0, @CommentUpdate=0, @CommentDelete=0, @CommentApprove=0, 
    @AdminAll=0, @responseMessage='failed'
GO

--3
EXEC dbtis.tis.sp_CreateRole 
    @RoleName='ProjectMgr', 
    @ProjectCreate=1, @ProjectRead=1, @ProjectUpdate=1, @ProjectDelete=1, @ProjectApprove=1, 
    @UserCreate=0, @UserRead=0, @UserUpdate=0, @UserDelete=0, @UserApprove=0, 
    @TimeCreate=1, @TimeRead=1, @TimeUpdate=1, @TimeDelete=1, @TimeApprove=1, 
    @IssueCreate=0, @IssueRead=1, @IssueUpdate=0, @IssueDelete=0, @IssueApprove=0, 
    @CommentCreate=0, @CommentRead=0, @CommentUpdate=0, @CommentDelete=0, @CommentApprove=1, 
    @AdminAll=0, @responseMessage='failed'
GO

--4
EXEC dbtis.tis.sp_CreateRole 
    @RoleName='TeamMember', 
    @ProjectCreate=0, @ProjectRead=0, @ProjectUpdate=0, @ProjectDelete=0, @ProjectApprove=0, 
    @UserCreate=0, @UserRead=0, @UserUpdate=0, @UserDelete=0, @UserApprove=0, 
    @TimeCreate=1, @TimeRead=1, @TimeUpdate=1, @TimeDelete=1, @TimeApprove=0, 
    @IssueCreate=0, @IssueRead=0, @IssueUpdate=0, @IssueDelete=0, @IssueApprove=0, 
    @CommentCreate=0, @CommentRead=0, @CommentUpdate=0, @CommentDelete=0, @CommentApprove=0, 
    @AdminAll=0, @responseMessage='failed'
GO

--5
EXEC dbtis.tis.sp_CreateRole 
    @RoleName='IssueInputter', 
    @ProjectCreate=0, @ProjectRead=0, @ProjectUpdate=0, @ProjectDelete=0, @ProjectApprove=0, 
    @UserCreate=0, @UserRead=0, @UserUpdate=0, @UserDelete=0, @UserApprove=0, 
    @TimeCreate=0, @TimeRead=0, @TimeUpdate=0, @TimeDelete=0, @TimeApprove=0, 
    @IssueCreate=1, @IssueRead=1, @IssueUpdate=1, @IssueDelete=1, @IssueApprove=0, 
    @CommentCreate=0, @CommentRead=0, @CommentUpdate=0, @CommentDelete=0, @CommentApprove=0, 
    @AdminAll=0, @responseMessage='failed'
GO

--6
EXEC dbtis.tis.sp_CreateRole 
    @RoleName='IssueApprover', 
    @ProjectCreate=0, @ProjectRead=0, @ProjectUpdate=0, @ProjectDelete=0, @ProjectApprove=0, 
    @UserCreate=0, @UserRead=0, @UserUpdate=0, @UserDelete=0, @UserApprove=0, 
    @TimeCreate=0, @TimeRead=0, @TimeUpdate=0, @TimeDelete=0, @TimeApprove=0, 
    @IssueCreate=0, @IssueRead=0, @IssueUpdate=1, @IssueDelete=0, @IssueApprove=1, 
    @CommentCreate=0, @CommentRead=0, @CommentUpdate=0, @CommentDelete=0, @CommentApprove=0, 
    @AdminAll=0, @responseMessage='failed'
GO

--7
EXEC dbtis.tis.sp_CreateRole 
    @RoleName='IssueReader', 
    @ProjectCreate=0, @ProjectRead=0, @ProjectUpdate=0, @ProjectDelete=0, @ProjectApprove=0, 
    @UserCreate=0, @UserRead=0, @UserUpdate=0, @UserDelete=0, @UserApprove=0, 
    @TimeCreate=0, @TimeRead=0, @TimeUpdate=0, @TimeDelete=0, @TimeApprove=0, 
    @IssueCreate=0, @IssueRead=1, @IssueUpdate=0, @IssueDelete=0, @IssueApprove=0, 
    @CommentCreate=0, @CommentRead=0, @CommentUpdate=0, @CommentDelete=0, @CommentApprove=0, 
    @AdminAll=0, @responseMessage='failed'
GO

--8
EXEC dbtis.tis.sp_CreateRole 
    @RoleName='CommentInputter', 
    @ProjectCreate=0, @ProjectRead=0, @ProjectUpdate=0, @ProjectDelete=0, @ProjectApprove=0, 
    @UserCreate=0, @UserRead=0, @UserUpdate=0, @UserDelete=0, @UserApprove=0, 
    @TimeCreate=0, @TimeRead=0, @TimeUpdate=0, @TimeDelete=0, @TimeApprove=0, 
    @IssueCreate=0, @IssueRead=0, @IssueUpdate=0, @IssueDelete=0, @IssueApprove=0, 
    @CommentCreate=1, @CommentRead=1, @CommentUpdate=1, @CommentDelete=1, @CommentApprove=0, 
    @AdminAll=0, @responseMessage='failed'
GO

--9
EXEC dbtis.tis.sp_CreateRole 
    @RoleName='CommentApprover', 
    @ProjectCreate=0, @ProjectRead=0, @ProjectUpdate=0, @ProjectDelete=0, @ProjectApprove=0, 
    @UserCreate=0, @UserRead=0, @UserUpdate=0, @UserDelete=0, @UserApprove=0, 
    @TimeCreate=0, @TimeRead=0, @TimeUpdate=0, @TimeDelete=0, @TimeApprove=0, 
    @IssueCreate=0, @IssueRead=0, @IssueUpdate=0, @IssueDelete=0, @IssueApprove=0, 
    @CommentCreate=0, @CommentRead=1, @CommentUpdate=1, @CommentDelete=0, @CommentApprove=1, 
    @AdminAll=0, @responseMessage='failed'
GO

--10
EXEC dbtis.tis.sp_CreateRole 
    @RoleName='CommentReader', 
    @ProjectCreate=0, @ProjectRead=0, @ProjectUpdate=0, @ProjectDelete=0, @ProjectApprove=0, 
    @UserCreate=0, @UserRead=0, @UserUpdate=0, @UserDelete=0, @UserApprove=0, 
    @TimeCreate=0, @TimeRead=0, @TimeUpdate=0, @TimeDelete=0, @TimeApprove=0, 
    @IssueCreate=0, @IssueRead=0, @IssueUpdate=0, @IssueDelete=0, @IssueApprove=0, 
    @CommentCreate=0, @CommentRead=1, @CommentUpdate=0, @CommentDelete=0, @CommentApprove=0, 
    @AdminAll=0, @responseMessage='failed'
GO

/** USERS */
-- -- -- -- -- -- -- -- -- -- -- -- -- -- 1. admin -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUser
    @FirstName='Admin', @LastName='Admin', @Manager=1, 
    @Logon='admin', @Password='admin', @Department=1, 
    @isManager=0, @isActive=1, @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 2. director -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUser
    @FirstName='Mary', @LastName='Warpy', @Manager=1, 
    @Logon='warpymx', @Password='aRule42*', @Department=1, 
    @isManager=1, @isActive=1, @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 3. snr manager -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUser
    @FirstName='Marge', @LastName='Telly', @Manager=2, 
    @Logon='tellymx', @Password='bRule42*', @Department=1, 
    @isManager=1, @isActive=1, @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 4. manager -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUser
    @FirstName='Christopher', @LastName='Hampy', @Manager=3, 
    @Logon='hampycx', @Password='cRule42*', @Department=2, 
    @isManager=1, @isActive=1, @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 5. snr staff -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUser
    @FirstName='Anthony', @LastName='DAlley', @Manager=4, 
    @Logon='dalleax', @Password='dRule42*', @Department=1, 
    @isManager=0, @isActive=1, @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 6. staff -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUser
    @FirstName='Britney', @LastName='Hardy', @Manager=4, 
    @Logon='hardybx', @Password='eRule42*', @Department=3, 
    @isManager=0, @isActive=1, @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 7. bu rep -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUser
    @FirstName='Harold', @LastName='Franklin', @Manager=2, 
    @Logon='frankhx', @Password='fRule42*', @Department=4, 
    @isManager=0, @isActive=1, @responseMessage='failed'
GO

/** USERS and USERROLES */
-- -- -- -- -- -- -- -- -- -- -- -- -- -- 1. admin -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUserRole
    @UserId=1, -- admin
    @RoleId=1, -- AppAdmin
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=1, -- admin
    @RoleId=2, -- UserMgr
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=1, -- admin
    @RoleId=3, -- ProjectMgr
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=1, -- admin
    @RoleId=4, -- TeamMember
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=1, -- admin
    @RoleId=5, -- IssueInputter
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=1, -- admin
    @RoleId=6, -- IssueApprover
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=1, -- admin
    @RoleId=7, -- IssueReader
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=1, -- admin
    @RoleId=8, -- CommentInputter
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=1, -- admin
    @RoleId=9, -- CommentApprover
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=1, -- admin
    @RoleId=10, -- CommentReader
    @UserHas=1,
    @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 2. director -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUserRole
    @UserId=2, -- director
    @RoleId=1, -- AppAdmin
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=2, -- director
    @RoleId=2, -- UserMgr
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=2, -- director
    @RoleId=3, -- ProjectMgr
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=2, -- director
    @RoleId=4, -- TeamMember
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=2, -- director
    @RoleId=5, -- IssueInputter
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=2, -- director
    @RoleId=6, -- IssueApprover
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=2, -- director
    @RoleId=7, -- IssueReader
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=2, -- director
    @RoleId=8, -- CommentInputter
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=2, -- director
    @RoleId=9, -- CommentApprover
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=2, -- director
    @RoleId=10, -- CommentReader
    @UserHas=1,
    @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 3. snr manager -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUserRole
    @UserId=3, -- snr manager
    @RoleId=1, -- AppAdmin
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=3, -- snr manager
    @RoleId=2, -- UserMgr
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=3, -- snr manager
    @RoleId=3, -- ProjectMgr
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=3, -- snr manager
    @RoleId=4, -- TeamMember
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=3, -- snr manager
    @RoleId=5, -- IssueInputter
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=3, -- snr manager
    @RoleId=6, -- IssueApprover
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=3, -- snr manager
    @RoleId=7, -- IssueReader
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=3, -- snr manager
    @RoleId=8, -- CommentInputter
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=3, -- snr manager
    @RoleId=9, -- CommentApprover
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=3, -- snr manager
    @RoleId=10, -- CommentReader
    @UserHas=1,
    @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 4. manager -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUserRole
    @UserId=4, -- manager
    @RoleId=1, -- AppAdmin
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=4, -- manager
    @RoleId=2, -- UserMgr
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=4, -- manager
    @RoleId=3, -- ProjectMgr
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=4, -- manager
    @RoleId=4, -- TeamMember
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=4, -- manager
    @RoleId=5, -- IssueInputter
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=4, -- manager
    @RoleId=6, -- IssueApprover
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=4, -- manager
    @RoleId=7, -- IssueReader
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=4, -- manager
    @RoleId=8, -- CommentInputter
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=4, -- manager
    @RoleId=9, -- CommentApprover
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=4, -- manager
    @RoleId=10, -- CommentReader
    @UserHas=1,
    @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 5. snr staff -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUserRole
    @UserId=5, -- snr staff
    @RoleId=1, -- AppAdmin
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=5, -- snr staff
    @RoleId=2, -- UserMgr
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=5, -- snr staff
    @RoleId=3, -- ProjectMgr
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=5, -- snr staff
    @RoleId=4, -- TeamMember
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=5, -- snr staff
    @RoleId=5, -- IssueInputter
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=5, -- snr staff
    @RoleId=6, -- IssueApprover
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=5, -- snr staff
    @RoleId=7, -- IssueReader
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=5, -- snr staff
    @RoleId=8, -- CommentInputter
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=5, -- snr staff
    @RoleId=9, -- CommentApprover
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=5, -- snr staff
    @RoleId=10, -- CommentReader
    @UserHas=1,
    @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 6. staff -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUserRole
    @UserId=6, -- staff
    @RoleId=1, -- AppAdmin
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=6, -- staff
    @RoleId=2, -- UserMgr
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=6, -- staff
    @RoleId=3, -- ProjectMgr
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=6, -- staff
    @RoleId=4, -- TeamMember
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=6, -- staff
    @RoleId=5, -- IssueInputter
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=6, -- staff
    @RoleId=6, -- IssueApprover
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=6, -- staff
    @RoleId=7, -- IssueReader
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=6, -- staff
    @RoleId=8, -- CommentInputter
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=6, -- staff
    @RoleId=9, -- CommentApprover
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=6, -- staff
    @RoleId=10, -- CommentReader
    @UserHas=1,
    @responseMessage='failed'
GO

-- -- -- -- -- -- -- -- -- -- -- -- -- -- 7. bu rep -- -- -- -- -- -- -- -- -- -- -- -- -- --
EXEC dbtis.tis.sp_CreateUserRole
    @UserId=7, -- buRep
    @RoleId=1, -- AppAdmin
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=7, -- buRep
    @RoleId=2, -- UserMgr
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=7, -- buRep
    @RoleId=3, -- ProjectMgr
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=7, -- buRep
    @RoleId=4, -- TeamMember
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=7, -- buRep
    @RoleId=5, -- IssueInputter
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=7, -- buRep
    @RoleId=6, -- IssueApprover
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=7, -- buRep
    @RoleId=7, -- IssueReader
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=7, -- buRep
    @RoleId=8, -- CommentInputter
    @UserHas=1,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=7, -- buRep
    @RoleId=9, -- CommentApprover
    @UserHas=0,
    @responseMessage='failed'
GO

EXEC dbtis.tis.sp_CreateUserRole
    @UserId=7, -- buRep
    @RoleId=10, -- CommentReader
    @UserHas=1,
    @responseMessage='failed'
GO
