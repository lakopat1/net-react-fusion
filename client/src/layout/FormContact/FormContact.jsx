import React, { useState } from "react";
import TableContact from "../TableContact/TableContact";

const FormContact = ({ contacts, nextId, onAddContact }) => {
    const [name, setName] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [error, setError] = useState("");


    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1 className="h3 mb-0">Список контактов</h1>
                </div>

                <div className="card-body">
                    <form onSubmit={error} className="mb-3">
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

                    <TableContact contacts={contacts} />
                </div>
            </div>
        </div>
    );
}
export default FormContact;
