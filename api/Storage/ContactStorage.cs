using System;
using System.Collections.Generic;

public class ContactStorage
{
    private List<Contact> Contacts { get; set; }

    public ContactStorage()
    {
        Contacts = new List<Contact>
        {
            new Contact { Id = 1, Name = "Сергей Камянецкий", MobilePhone = "+79990001122", JobTitle = "Backend Developer", BirthDate = new DateTime(1993, 7, 12) },
            new Contact { Id = 2, Name = "Мария Петрова",     MobilePhone = "+79161234567", JobTitle = "QA Engineer",      BirthDate = new DateTime(1996, 2, 3)  },
            new Contact { Id = 3, Name = "Алексей Сидоров",   MobilePhone = "+380501112233", JobTitle = "Project Manager", BirthDate = new DateTime(1990, 11, 20) },
            new Contact { Id = 4, Name = "Екатерина Кузнецова",MobilePhone = "+37251234567", JobTitle = "UI/UX Designer",  BirthDate = new DateTime(1998, 5, 1)  },
            new Contact { Id = 5, Name = "Дмитрий Васильев",  MobilePhone = "+48500111222", JobTitle = "DevOps Engineer",  BirthDate = new DateTime(1988, 9, 30) }
        };
    }

    public List<Contact> GetContacts()
    {
        return Contacts;
    }

    public bool Add(Contact contact)
    {
        foreach (var item in Contacts)
        {
            if (contact.Id == item.Id)
                return false;
        }

        Contacts.Add(contact);
        return true;
    }

    public bool Remove(int id)
    {
        for (int i = 0; i < Contacts.Count; i++)
        {
            if (Contacts[i].Id == id)
            {
                Contacts.RemoveAt(i);
                return true;
            }
        }
        return false;
    }

    public bool UpdateContact(ContactDto contactDto, int id)
    {
        for (int i = 0; i < Contacts.Count; i++)
        {
            if (Contacts[i].Id == id)
            {
                var contact = Contacts[i];

                if (!string.IsNullOrWhiteSpace(contactDto.Name))
                    contact.Name = contactDto.Name.Trim();

                if (!string.IsNullOrWhiteSpace(contactDto.MobilePhone))
                    contact.MobilePhone = contactDto.MobilePhone.Trim();

                if (!string.IsNullOrWhiteSpace(contactDto.JobTitle))
                    contact.JobTitle = contactDto.JobTitle.Trim();

                if (contactDto.BirthDate.HasValue)
                    contact.BirthDate = contactDto.BirthDate.Value;

                return true;
            }
        }
        return false;
    }
}
