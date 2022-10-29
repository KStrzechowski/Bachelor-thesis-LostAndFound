using LostAndFound.AuthService.Core;
using LostAndFound.AuthService.Core.FluentValidators;
using LostAndFound.AuthService.CoreLibrary.Settings;
using LostAndFound.AuthService.DataAccess;
using LostAndFound.AuthService.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var authenticationSettings = new AuthenticationSettings();
builder.Configuration.Bind("Authentication", authenticationSettings);
builder.Services.AddSingleton(authenticationSettings);

builder.Services.AddHealthChecks();
builder.Services.AddControllers();

builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddFluentValidators();
builder.Services.AddDataAccessServices(builder.Configuration);
builder.Services.AddCoreServices();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(config =>
    {
        config.TokenValidationParameters = new TokenValidationParameters()
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.AccessTokenSecret)),
            ValidIssuer = authenticationSettings.Issuer,
            ValidAudience = authenticationSettings.Audience,
            ValidateIssuerSigningKey = true,
            ValidateIssuer = true,
            ValidateAudience = true,
            ClockSkew = TimeSpan.Zero
        };
    });

var app = builder.Build();

app.UseHttpsRedirection();
app.UseRouting();

app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapHealthChecks("/healthcheck");
    endpoints.MapControllers();
});

app.Run();

// Make the implicit Program class public so test projects can access it
public partial class Program { }
