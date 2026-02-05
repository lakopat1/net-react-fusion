using api.Storage;
using Microsoft.OpenApi.Models;


namespace api.Extensions;

public static class ApplicationDataBaseExtension
{
    public static WebApplication InitializeDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var storage = scope.ServiceProvider.GetRequiredService<IStorage>();
        storage.InitializeDatabase();
        return app;
    }
}