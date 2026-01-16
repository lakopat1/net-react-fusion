import "./App.css";
import { useMemo, useState } from "react";
import initialContacts from "./contact/contacts";
import FormContact from "./layout/FormContact/FormContact";

const App = () => {
    const [contacts, setContacts] = useState(initialContacts);

    const nextId = useMemo(() => {
        const maxId = contacts.reduce((max, c) => Math.max(max, c.id), 0);
        return maxId + 1;
    }, [contacts]);

    const handleAddContact = (newContact) => {
        setContacts((prev) => [newContact, ...prev]);
    };

    return (
        <FormContact
            contacts={contacts}
            nextId={nextId}
            onAddContact={handleAddContact}
        />
    );
};

export default App;
