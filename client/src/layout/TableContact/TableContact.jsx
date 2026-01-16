import React from "react";

const TableContact = ({ contacts }) => {
  return (
    <table className="table table-hover table-bordered mb-0">
      <thead className="table-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя</th>
          <th scope="col">Мобильный</th>
          <th scope="col">Должность</th>
          <th scope="col">Дата рождения</th>
        </tr>
      </thead>

      <tbody>
        {contacts.map((contact, index) => (
          <tr key={contact.id}>
            <td>{index + 1}</td>
            <td>{contact.name}</td>
            <td>{contact.mobilePhone}</td>
            <td>{contact.jobTitle}</td>
            <td>{(contact.birthDate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableContact;


