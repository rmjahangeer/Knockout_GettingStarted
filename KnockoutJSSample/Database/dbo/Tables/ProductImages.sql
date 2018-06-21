CREATE TABLE [dbo].[ProductImages] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [Image]     NVARCHAR (MAX) NOT NULL,
    [ProductId] INT            NOT NULL,
    CONSTRAINT [PK_ProductImages] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_ProductImages_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id])
);

