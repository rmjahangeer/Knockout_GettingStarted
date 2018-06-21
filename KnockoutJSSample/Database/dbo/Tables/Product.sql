CREATE TABLE [dbo].[Product] (
    [Id]          INT             IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (MAX)  NOT NULL,
    [Description] NVARCHAR (MAX)  NULL,
    [CategoryId]  INT             NOT NULL,
    [Image]       NVARCHAR (MAX)  NULL,
    [Price]       DECIMAL (18, 2) CONSTRAINT [DF_Product_Price] DEFAULT ((0)) NOT NULL,
    [CreatedOn]   DATETIME2 (7)   NOT NULL,
    [CreatedBy]   NVARCHAR (128)  NULL,
    [ModifiedOn]  DATETIME2 (7)   NULL,
    [ModifiedBy]  NVARCHAR (128)  NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Product_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Category] ([Id])
);



