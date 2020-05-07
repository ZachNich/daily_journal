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
}
}


export default API;