namespace api.Storage
{
    public class SqliteEfStorage : IStorage
    {
        private readonly SqliteDbContext context;

        public SqliteEfStorage(SqliteDbContext context)
        {
            this.context = context;
        }

        public List<Contact> GetContacts()
        {
            return context.Contacts.ToList();
        }

        public bool Add(Contact contact)
        {
            context.Contacts.Add(contact);
            return context.SaveChanges() > 0;
        }

        public bool Remove(int id)
        {
            var contact = context.Contacts.Find(id);
            if (contact == null) return false;
            context.Contacts.Remove(contact);
            return context.SaveChanges() > 0;
        }

        public bool UpdateContact(ContactDto contactDto, int id)
        {
            var contact = context.Contacts.Find(id);
            if (contact == null) return false;
            if (!string.IsNullOrWhiteSpace(contactDto.Name))
                contact.Name = contactDto.Name.Trim();
            if (!string.IsNullOrWhiteSpace(contactDto.MobilePhone))
                contact.MobilePhone = contactDto.MobilePhone.Trim();
            if (!string.IsNullOrWhiteSpace(contactDto.JobTitle))
                contact.JobTitle = contactDto.JobTitle.Trim();
            if (contactDto.BirthDate.HasValue)
                contact.BirthDate = contactDto.BirthDate.Value;
            context.Contacts.Update(contact);
            return context.SaveChanges() > 0;
        }

        public bool RemoveAll()
        {
            context.Contacts.RemoveRange(context.Contacts);
            return context.SaveChanges() > 0;
        }
    }
}
