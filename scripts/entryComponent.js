const makeJournalEntryComponent = (journalEntry) => {
    return `<section><p class="date">${journalEntry.date}</p><p class="concepts">${journalEntry.concepts}</p><p class="entry">${journalEntry.entry}</p><p class="mood">${journalEntry.mood}</p></section>`;
}

export default { makeJournalEntryComponent }