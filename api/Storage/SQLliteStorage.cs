using System;
using System.Collections.Generic;
using Microsoft.Data.Sqlite;

public interface IStorage
{
    List<Contact> GetContacts();
    bool Add(Contact contact);
    bool Remove(int id);
    bool UpdateContact(ContactDto contactDto, int id);
}

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

    }

    public bool Remove(int id)
    {

    }

    public bool UpdateContact(ContactDto contactDto, int id)
    {

    }
}
