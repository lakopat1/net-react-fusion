// src/App.jsx
import "./App.css";
import { useMemo, useState } from "react";
import TableContact from "./layout/TableContact/TableContact";
import initialContacts from "./contact/contacts";

const App = () => {
    const [contacts, setContacts] = useState(initialContacts);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const nextId = useMemo(() => {
        const maxId = contacts.reduce((max, c) => Math.max(max, c.id), 0);
        return maxId + 1;
    }, [contacts]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (!trimmedName) {
            setError("Введите имя контакта");
            return;
        }
        if (!trimmedEmail) {
            setError("Введите email");
            return;
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
        if (!emailOk) {
            setError("Email выглядит неверно");
            return;
        }

        // (опционально) запретим одинаковые email
        const emailExists = contacts.some(
            (c) => c.email.toLowerCase() === trimmedEmail.toLowerCase()
        );
        if (emailExists) {
            setError("Контакт с таким email уже есть");
            return;
        }

        const newContact = {
            id: nextId,
            name: trimmedName,
            email: trimmedEmail,
        };

        // Добавляем в начало списка (можно в конец — как хочешь)
        setContacts([newContact, ...contacts]);

        // Очищаем форму
        setName("");
        setEmail("");
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1 className="h3 mb-0">Список контактов</h1>
                </div>

                <div className="card-body">
                    {/* Форма добавления */}
                    <form onSubmit={handleSubmit} className="mb-3">
                        <div className="row g-2">
                            <div className="col-md-5">
                                <input
                                    className="form-control"
                                    placeholder="Имя"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="col-md-5">
                                <input
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="col-md-2 d-grid">
                                <button className="btn btn-primary" type="submit">
                                    Добавить
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger mt-2 mb-0">
                                {error}
                            </div>
                        )}
                    </form>

                    {/* Таблица */}
                    <TableContact contacts={contacts} />
                </div>
            </div>
        </div>
    );
};

export default App;

