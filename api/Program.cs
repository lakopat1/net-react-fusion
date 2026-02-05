namespace api.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApiServices(builder.Configuration);
builder.Services.InitializeDatabase(builder.Configuration);

var app = builder.Build();

app.UseApiPipeline();

app.Run();
