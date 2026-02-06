using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using api.Storage;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions;

public static class ApplicationServiceCollectionExtension
{
    public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddControllers();

        services.AddDbContext<SqliteDbContext>(options =>
        {
            var cs = config.GetConnectionString("SqliteStringConnection") ?? "Data Source=contacts.db";
            options.UseSqlite(cs);
        });

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(opt =>
        {
            opt.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "API списка контактов",
                Version = "v1"
            });
        });

        // Use EF-backed storage with scoped lifetime (depends on DbContext)
        services.AddScoped<IStorage, SqliteEfStorage>();

        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", policy =>
                policy.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader());
        });

        return services;
    }
}
