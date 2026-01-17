import React, { useState } from "react";

const formatBirthDate = (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("ru-RU");
};

const TableContact = ({ contacts, onDeleteContact }) => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <table className="table table-hover table-bordered mb-0">
            <thead className="table-light">
                <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>Мобильный</th>
                    <th>Должность</th>
                    <th>Дата рождения</th>
                </tr>
            </thead>

            <tbody>
                {contacts.map((contact, index) => (
                    <tr
                        key={contact.id}
                        onMouseEnter={() => setHoveredId(contact.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{ position: "relative" }}   // 👈 важно
                    >
                        <td>{index + 1}</td>
                        <td>{contact.name}</td>
                        <td>{contact.mobilePhone}</td>
                        <td>{contact.jobTitle}</td>
                        <td>{formatBirthDate(contact.birthDate)}</td>

                        {hoveredId === contact.id && (
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                                onClick={() => onDeleteContact(contact.id)}
                            >
                                Удалить
                            </button>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableContact;



