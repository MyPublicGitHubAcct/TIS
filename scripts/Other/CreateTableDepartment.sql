-- Create a new table called '[Department]' in schema '[tis]' in database '[dbtis]'
-- Drop the table if it already exists
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('[dbtis].[tis].[Department]', 'U') IS NOT NULL
DROP TABLE [dbtis].[tis].[Department]
GO
-- Create the table in the specified database and schema
CREATE TABLE [dbtis].[tis].[Department](
    [ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[DateChanged] [datetime] NULL
) ON [PRIMARY]
GO
ALTER TABLE [tis].[Department] ADD  CONSTRAINT [PK_Department_ID] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [tis].[Department] ADD  DEFAULT ((0)) FOR [IsActive]
GO
