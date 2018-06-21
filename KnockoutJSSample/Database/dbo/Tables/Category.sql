CREATE TABLE [dbo].[Category] (
    [Id]       INT            IDENTITY (1, 1) NOT NULL,
    [Name]     NVARCHAR (MAX) NOT NULL,
    [ParentId] INT            NULL,
    [Image]    NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Category_Category] FOREIGN KEY ([ParentId]) REFERENCES [dbo].[Category] ([Id])
);



