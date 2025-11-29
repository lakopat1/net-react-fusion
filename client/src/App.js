// src/App.jsx
import "./App.css";
import TableContact from "./layout/TableContact/TableContact";
import contacts from "./contact/contacts";

const App = () => {
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1 className="h3 mb-0">Список контактов</h1>
                </div>

                <div className="card-body">
                    <TableContact contacts={contacts} />
                </div>
            </div>
        </div>
    );
};

export default App;


