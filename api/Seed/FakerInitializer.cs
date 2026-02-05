using System;
using Bogus;
using Microsoft.Data.Sqlite;

namespace api.Seed;

public interface IInitializer
{
    void Initialize();
}

public class FakerInitializer : IInitializer
{
    private readonly string connectionString;

    public FakerInitializer(string connectionString)
    {
        this.connectionString = connectionString;
    }

    public void Initialize()
    {
        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        using var command = connection.CreateCommand();
        command.CommandText = @"
            CREATE TABLE IF NOT EXISTS Contacts (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Name TEXT NOT NULL,
                MobilePhone TEXT NOT NULL,
                JobTitle TEXT NOT NULL,
                BirthDate TEXT NOT NULL
            );
        ";
        command.ExecuteNonQuery();

        command.CommandText = "SELECT COUNT(*) FROM Contacts;";
        var count = (long)command.ExecuteScalar()!;

        if (count > 0) return;

        var faker = new Faker("ru");

        for (int i = 0; i < 50; i++)
        {
            var name = faker.Name.FullName();
            var mobilePhone = faker.Phone.PhoneNumber("+7##########"); // чтобы было похоже на RU
            var jobTitle = faker.Name.JobTitle();
            var birthDate = faker.Date
                .Past(50, DateTime.Now.AddYears(-18))
                .ToString("yyyy-MM-dd");

            command.CommandText = @"
                INSERT INTO Contacts (Name, MobilePhone, JobTitle, BirthDate)
                VALUES ($name, $mobilePhone, $jobTitle, $birthDate);
            ";
            command.Parameters.Clear();
            command.Parameters.AddWithValue("$name", name);
            command.Parameters.AddWithValue("$mobilePhone", mobilePhone);
            command.Parameters.AddWithValue("$jobTitle", jobTitle);
            command.Parameters.AddWithValue("$birthDate", birthDate);

            command.ExecuteNonQuery();
        }
    }
}

