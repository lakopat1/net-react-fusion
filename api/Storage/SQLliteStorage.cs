using System;

public interface IStorage
{
    List<Contact> GetContacts();
    bool Add(Contact contact);
    bool Remove(int id);
    bool UpdateContact(ContactDto contactDto, int id);
}

public class SQLliteStorage : IStorage
{
    public List<Contact> GetContacts()
    {
        throw new NotImplementedException();
    }

    public bool Add(Contact contact)
    {
        throw new NotImplementedException();
    }

    public bool Remove(int id)
    {
        throw new NotImplementedException();
    }

    public bool UpdateContact(ContactDto contactDto, int id)
    {
        throw new NotImplementedException();
    }


}
