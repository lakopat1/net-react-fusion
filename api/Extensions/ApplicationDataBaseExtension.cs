namespace api.Extensions;

public static class ApplicationDataBaseExtension : 
{
    public static IServiceProvider InitializeDatabase(this IServiceProvider services,IConfiguration configuration)
    {
        using var scope = app.Services.CreateScope();

        var storage = scope.ServiceProvider.GetService<IStorage>();
        var dbStorage = storage as SqliteStorage;

        if (dbStorage != null)
        {
            string cs = configuration.GetConnectionString("SqliteStringConnection");
            new FakerInitializer(cs).Initialize();

        }
        return app;
    }
}