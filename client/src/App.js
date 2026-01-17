import axios from "axios";
import "./App.css";
import { useMemo, useState } from "react";
import initialContacts from "./contact/contacts";
import FormContact from "./layout/FormContact/FormContact";

const App = () => {
    const url = "http://localhost:5000/api/ContactManagement/contacts";
    axios.get(url).then(res => console.log(res.data));
    const [contacts, setContacts] = useState(initialContacts);

    const nextId = useMemo(() => {
        const maxId = contacts.reduce((max, c) => Math.max(max, c.id), 0);
        return maxId + 1;
    }, [contacts]);

    const handleAddContact = (newContact) => {
        setContacts((prev) => [newContact, ...prev]);
    };

    const handleDeleteContact = (id) => {
        setContacts((prev) => prev.filter((c) => c.id !== id));
    };


    return (
        <FormContact
            contacts={contacts}
            nextId={nextId}
            onAddContact={handleAddContact}
            onDeleteContact={handleDeleteContact}
        />
    );
};

export default App;
