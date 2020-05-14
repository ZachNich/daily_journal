const API = {
    getJournalEntries () {
        return fetch("http://localhost:3000/entries?_expand=mood")
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
    },
    getJournalEntry (entryID) {
        return fetch(`http://localhost:3000/entries/${entryID}?_expand=mood`)
        .then(response => response.json())
    },
    editJournalEntry (entry, entryID) {
        return fetch(`http://localhost:3000/entries/${entryID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
        .then(response => response.json())
        .then(() => document.getElementById('journalId').value = '')
    },
    getMoods() {
        return fetch('http://localhost:3000/moods')
            .then(response => response.json())
    }
}


export default API;