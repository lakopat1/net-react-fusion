using api.Storage;
using Microsoft.OpenApi.Models;

namespace api.Extensions;

public static class ApplicationServiceCollectionExtension
{
    public static IServiceCollection AddApiServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddControllers();

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(opt =>
        {
            opt.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "API списка контактов",
                Version = "v1"
            });
        });

        services.AddSingleton<IStorage>(sp =>
        {
            var cs = config.GetConnectionString("SqliteStringConnection");
            return new SqliteStorage(cs);
        });

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
