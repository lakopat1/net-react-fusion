import React from "react";

const TableContact = ({ contacts }) => {
    return (
        <table className="table table-hover table-bordered mb-0">
            <thead className="table-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя контакта</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>

            <tbody>
                {contacts.map((contact, index) => (
                    <tr key={contact.id}>
                        <td>{index + 1}</td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableContact;

