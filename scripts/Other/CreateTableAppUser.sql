SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [tis].[AppUser](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](30) NOT NULL,
	[LastName] [varchar](100) NOT NULL,
	[Manager] [int] NOT NULL,
	[Logon] [varchar](7) NOT NULL,
	[Password] [varchar](64) NOT NULL,
	[Salt] [uniqueidentifier] NOT NULL,
	[Department] [int] NOT NULL,
	[IsManager] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[DateChanged] [datetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [tis].[AppUser] ADD  CONSTRAINT [PK_AppUser_ID] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [tis].[AppUser] ADD  DEFAULT ((0)) FOR [IsManager]
GO
ALTER TABLE [tis].[AppUser] ADD  DEFAULT ((0)) FOR [IsActive]
GO
