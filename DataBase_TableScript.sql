

/****** Object:  Table [dbo].[StudentDetails]    Script Date: 18-10-2020 08:12:25 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[StudentDetails](
	[StudentId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](100) NULL,
	[LastName] [nvarchar](100) NULL,
	[Class] [nvarchar](50) NULL,
 CONSTRAINT [PK_StudentDetails] PRIMARY KEY CLUSTERED 
(
	[StudentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[StudentSubjectDetails](
	[SubjectId] [int] IDENTITY(1,1) NOT NULL,
	[SubjectName] [nvarchar](150) NULL,
	[Marks] [nvarchar](50) NULL,
	[StudentId] [int] NOT NULL,
 CONSTRAINT [PK_StudentSubjectDetails] PRIMARY KEY CLUSTERED 
(
	[SubjectId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[StudentSubjectDetails]  WITH CHECK ADD  CONSTRAINT [FK_StudentSubjectDetails_StudentDetails] FOREIGN KEY([StudentId])
REFERENCES [dbo].[StudentDetails] ([StudentId])
GO

ALTER TABLE [dbo].[StudentSubjectDetails] CHECK CONSTRAINT [FK_StudentSubjectDetails_StudentDetails]
GO