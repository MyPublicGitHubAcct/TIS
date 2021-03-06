SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [tis].[UserRole]
(
	[UserId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
	[UserHas] [bit] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [tis].[UserRole] ADD  CONSTRAINT [PK_User_Role] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [tis].[UserRole]  WITH CHECK ADD  CONSTRAINT [FK_AppRole] FOREIGN KEY([RoleId])
REFERENCES [tis].[AppRole] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [tis].[UserRole] CHECK CONSTRAINT [FK_AppRole]
GO
ALTER TABLE [tis].[UserRole]  WITH CHECK ADD  CONSTRAINT [FK_AppUser] FOREIGN KEY([UserId])
REFERENCES [tis].[AppUser] ([ID])
GO
ALTER TABLE [tis].[UserRole] CHECK CONSTRAINT [FK_AppUser]
GO
