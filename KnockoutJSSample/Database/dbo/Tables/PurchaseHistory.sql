CREATE TABLE [dbo].[PurchaseHistory] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [ProductId] INT            NOT NULL,
    [Quantity]  INT            NOT NULL,
    [UserId]    NVARCHAR (128) NOT NULL,
    [CreatedOn] DATETIME2 (7)  NOT NULL,
    CONSTRAINT [PK_PurchaseHistory] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PurchaseHistory_AspNetUsers] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]),
    CONSTRAINT [FK_PurchaseHistory_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([Id])
);

