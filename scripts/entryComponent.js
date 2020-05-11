const makeJournalEntryComponent = (journalEntry) => {
    return `<section><p class="date">${journalEntry.date}</p><p class="concepts">${journalEntry.concepts}</p><p class="entry">${journalEntry.entry}</p><p class="mood">${journalEntry.mood}</p></section><button id='delete-${journalEntry.id}'>Delete Entry</button><button id='edit-${journalEntry.id}'>Edit Entry</button>`;
}

export default { makeJournalEntryComponent }