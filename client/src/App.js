import "./App.css";

const App = () =>{
    return (
        <div className = "container mt-5">
            <div className = "card">
                <div className = "card-header">
                    <h1>Список контактов</h1>
                </div>
                <div className = "card-body">
                    <table className = "table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Имя контакта</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <th>1</th>
                            <th>Имя фамилия 1</th>
                            <th>example@mail.ru</th>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
