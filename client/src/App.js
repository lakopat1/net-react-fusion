import "./App.css";

const contacts = [
    { id: 1, name: "Иван Иванов", email: "ivan.ivanov@example.com" },
    { id: 2, name: "Пётр Петров", email: "petr.petrov@example.com" },
    { id: 3, name: "Анна Смирнова", email: "anna.smirnova@example.com" },
    { id: 4, name: "Сергей Кузнецов", email: "sergey.kuznetsov@example.com" },
];

const App = () => {
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1 className="h3 mb-0">Список контактов</h1>
                </div>

                <div className="card-body">
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
                </div>
            </div>
        </div>
    );
};

export default App;

