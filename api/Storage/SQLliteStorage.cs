using System;
using System.Collections.Generic;
using Microsoft.Data.Sqlite;

namespace api.Storage;
public class SQLiteStorage : IStorage
{
    private readonly string connectionString = "Data Source=contacts.db";

    public List<Contact> GetContacts()
    {
        var contacts = new List<Contact>();

        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        using var command = connection.CreateCommand();
        command.CommandText = "SELECT Id, Name, MobilePhone, JobTitle, BirthDate FROM Contacts;";

        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            contacts.Add(new Contact
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                MobilePhone = reader.GetString(2),
                JobTitle = reader.GetString(3),
                BirthDate = DateTime.Parse(reader.GetString(4))
            });
        }

        return contacts;
    }


    public bool Add(Contact contact)
    {
        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        using var command = connection.CreateCommand();
        command.CommandText = @"
        INSERT INTO Contacts (Name, MobilePhone, JobTitle, BirthDate)
        VALUES (@name, @mobilePhone, @jobTitle, @birthDate);
        ";

        command.Parameters.AddWithValue("@name", contact.Name);
        command.Parameters.AddWithValue("@mobilePhone", contact.MobilePhone);
        command.Parameters.AddWithValue("@jobTitle", contact.JobTitle);
        command.Parameters.AddWithValue("@birthDate", contact.BirthDate.ToString("yyyy-MM-dd"));

        return command.ExecuteNonQuery() > 0;
    }


    public bool Remove(int id)
    {
        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        using var command = connection.CreateCommand();
        command.CommandText = "DELETE FROM Contacts WHERE Id = @id;";
        command.Parameters.AddWithValue("@id", id);

        return command.ExecuteNonQuery() > 0;
    }


    public bool UpdateContact(ContactDto contactDto, int id)
    {
        using var connection = new SqliteConnection(connectionString);
        connection.Open();

        using var command = connection.CreateCommand();
        command.CommandText = @"
        UPDATE Contacts
        SET Name = @name,
            MobilePhone = @mobilePhone,
            JobTitle = @jobTitle,
            BirthDate = @birthDate
        WHERE Id = @id;
        ";

        command.Parameters.AddWithValue("@name", contactDto.Name);
        command.Parameters.AddWithValue("@mobilePhone", contactDto.MobilePhone);
        command.Parameters.AddWithValue("@jobTitle", contactDto.JobTitle);
        command.Parameters.AddWithValue("@birthDate", contactDto.BirthDate!.Value.ToString("yyyy-MM-dd"));
        command.Parameters.AddWithValue("@id", id);

        return command.ExecuteNonQuery() > 0;
    }

}
