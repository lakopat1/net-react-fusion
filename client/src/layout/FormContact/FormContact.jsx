import React, { useState } from "react";
import TableContact from "../TableContact/TableContact";

const FormContact = ({ contacts, nextId, onAddContact, onDeleteContact }) => {
    const [name, setName] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [error, setError] = useState("");



    const normalizePhone = (value) => value.replace(/[^\d+]/g, "");

    const validate = () => {
        const trimmedName = name.trim();
        const trimmedJobTitle = jobTitle.trim();
        const normalizedPhone = normalizePhone(mobilePhone.trim());

        if (!trimmedName) return "Введите имя контакта";
        if (trimmedName.length < 2) return "Имя слишком короткое (минимум 2 символа)";

        if (!normalizedPhone) return "Введите мобильный телефон";
        if (!/^\+?\d{10,15}$/.test(normalizedPhone))
            return "Телефон должен содержать 10–15 цифр (можно начать с +)";

        if (!trimmedJobTitle) return "Введите должность";
        if (trimmedJobTitle.length < 2)
            return "Должность слишком короткая (минимум 2 символа)";

        if (!birthDate) return "Выберите дату рождения";

        const selected = new Date(birthDate);
        if (Number.isNaN(selected.getTime()))
            return "Дата рождения выглядит неверно";

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        selected.setHours(0, 0, 0, 0);

        if (selected > today)
            return "Дата рождения не может быть в будущем";

        const phoneExists = contacts.some(
            (c) =>
                normalizePhone(String(c.mobilePhone || "")) === normalizedPhone
        );

        if (phoneExists)
            return "Контакт с таким телефоном уже существует";

        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        onAddContact({
            id: nextId,
            name: name.trim(),
            mobilePhone: normalizePhone(mobilePhone.trim()),
            jobTitle: jobTitle.trim(),
            birthDate,
        });

        setName("");
        setMobilePhone("");
        setJobTitle("");
        setBirthDate("");
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1 className="h3 mb-0">Список контактов</h1>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit} className="mb-3">
                        <div className="row g-2">
                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    placeholder="Имя"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    placeholder="Мобильный телефон"
                                    value={mobilePhone}
                                    onChange={(e) => setMobilePhone(e.target.value)}
                                />
                            </div>

                            <div className="col-md-3">
                                <input
                                    className="form-control"
                                    placeholder="Должность"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                />
                            </div>

                            <div className="col-md-2">
                                <input
                                    className="form-control"
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </div>

                            <div className="col-md-1 d-grid">
                                <button className="btn btn-primary" type="submit">
                                    Добавить контакт
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger mt-2 mb-0">
                                {error}
                            </div>
                        )}
                    </form>

                    <TableContact contacts={contacts} onDeleteContact={onDeleteContact} />
                    
                </div>
            </div>
        </div>
    );
};

export default FormContact;