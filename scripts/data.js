const API = {
    getJournalEntries() {
        return fetch("http://localhost:3000/entries?_expand=mood&_expand=instructor")
            .then(response => response.json())
    },
    saveJournalEntry(entry) {
        return fetch('http://localhost:3000/entries', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
    },
    deleteJournalEntry(entryID) {
        return fetch(`http://localhost:3000/entries/${entryID}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    },
    getJournalEntry(entryID) {
        return fetch(`http://localhost:3000/entries/${entryID}`)
            .then(response => response.json())
    },
    editJournalEntry(entry, entryID) {
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
    },
    getInstructors() {
        return fetch('http://localhost:3000/instructors')
            .then(response => response.json())
    },
    getTags() {
        return fetch('http://localhost:3000/tags')
            .then(response => response.json())
    },
    getEntriesTags() {
        return fetch('http://localhost:3000/entriesTags')
            .then(response => response.json())
    },
    saveEntriesTags(object) {
        return fetch('http://localhost:3000/entriesTags', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
    },
    editEntriesTags(entriesTagsObject, entriesTagsId) {
        return fetch(`http://localhost:3000/entriesTags/${entriesTagsId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entriesTagsObject)
        })
        .then(response => response.json())
        .then(() => document.getElementById('journalId').value = '')
    },
    deleteEntriesTags(entriesTagsId) {
        return fetch(`http://localhost:3000/entriesTags/${entriesTagsId}`, {
        method: "DELETE"
    })
        .then(response => response.json())
    }
}


export default API;