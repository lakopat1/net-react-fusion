using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions;

public static class ApplicationDataBaseExtension
{
    public static IServiceCollection InitializeDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        // Get connection string from configuration or use default sqlite file
        var connectionString = configuration.GetConnectionString("SqliteStringConnection") ?? "Data Source=contacts.db";

        // Ensure migrations are applied so EF can create its migrations history table
        try
        {
            // Build a temporary provider to get the DbContext and run migrations
            using var serviceProvider = services.BuildServiceProvider();
            using var scope = serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetService<SqliteDbContext>();
            if (context != null)
            {
                // Apply any pending migrations (creates __EFMigrationsHistory table)
                context.Database.Migrate();
            }
        }
        catch
        {
            // Swallow any exception here to avoid preventing app startup; in dev you may want to log this.
        }

        // Run DB seed / initializer to ensure mock data exists (uses direct SQL for faster fake data population)
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