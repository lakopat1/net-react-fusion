namespace api.Extensions;

public static class ApplicationDataBaseExtension
{
    public static IServiceCollection InitializeDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        // Get connection string from configuration or use default sqlite file
        var connectionString = configuration.GetConnectionString("SqliteStringConnection") ?? "Data Source=contacts.db";

        // Run DB seed / initializer to ensure mock data exists
        try
        {
            var initializer = new api.Seed.FakerInitializer(connectionString);
            initializer.Initialize();
        }
        catch
        {
            // Swallow any exception here to avoid preventing app startup; in dev you may want to log this.
        }

        return services;
    }
}