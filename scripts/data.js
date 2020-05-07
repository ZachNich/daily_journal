const API = {
    getJournalEntries () {
        return fetch("http://localhost:3000/entries")
            .then(response => response.json())
    },
    saveJournalEntry (entry) {
        return fetch('http://localhost:3000/entries', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
    },
    deleteJournalEntry (entryID) {
        return fetch(`http://localhost:3000/entries/${entryID}`, {
            method: "DELETE"
        })
        .then(response => response.json())
    }
}


export default API;