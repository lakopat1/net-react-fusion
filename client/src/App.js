import axios from "axios";
import "./App.css";
import { useEffect, useMemo, useState } from "react";
import initialContacts from "./contact/contacts";
import FormContact from "./layout/FormContact/FormContact";

const baseApiUrl = process.env.REACT_APP_API_URL;

const App = () => {
    const url = `${baseApiUrl}/ContactManagement/contacts`;

    const [contacts, setContacts] = useState(initialContacts);

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                console.log("API contacts:", res.data);
                setContacts(res.data); 
            })
            .catch((err) => console.error("API error:", err));
    }, [url]);

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
