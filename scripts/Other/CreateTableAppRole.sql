SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [tis].[AppRole]
(
    [ID] [int] IDENTITY(1,1) NOT NULL,
    [RoleName] [varchar](30) NOT NULL,
    [ProjectCreate] [bit] NULL,
    [ProjectRead] [bit] NULL,
    [ProjectUpdate] [bit] NULL,
    [ProjectDelete] [bit] NULL,
    [ProjectApprove] [bit] NULL,
    [UserCreate] [bit] NULL,
    [UserRead] [bit] NULL,
    [UserUpdate] [bit] NULL,
    [UserDelete] [bit] NULL,
    [UserApprove] [bit] NULL,
    [TimeCreate] [bit] NULL,
    [TimeRead] [bit] NULL,
    [TimeUpdate] [bit] NULL,
    [TimeDelete] [bit] NULL,
    [TimeApprove] [bit] NULL,
    [IssueCreate] [bit] NULL,
    [IssueRead] [bit] NULL,
    [IssueUpdate] [bit] NULL,
    [IssueDelete] [bit] NULL,
    [IssueApprove] [bit] NULL,
    [CommentCreate] [bit] NULL,
    [CommentRead] [bit] NULL,
    [CommentUpdate] [bit] NULL,
    [CommentDelete] [bit] NULL,
    [CommentApprove] [bit] NULL,
    [AdminAll] [bit] NULL
) ON [PRIMARY]
GO
ALTER TABLE [tis].[AppRole] ADD  CONSTRAINT [PK_AppRole_ID] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [ProjectCreate]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [ProjectRead]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [ProjectUpdate]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [ProjectDelete]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [ProjectApprove]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [UserCreate]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [UserRead]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [UserUpdate]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [UserDelete]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [UserApprove]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [TimeCreate]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [TimeRead]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [TimeUpdate]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [TimeDelete]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [TimeApprove]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [IssueCreate]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [IssueRead]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [IssueUpdate]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [IssueDelete]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [IssueApprove]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [CommentCreate]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [CommentRead]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [CommentUpdate]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [CommentDelete]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [CommentApprove]
GO
ALTER TABLE [tis].[AppRole] ADD  DEFAULT ((0)) FOR [AdminAll]
GO
