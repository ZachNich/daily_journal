const journalEntries = [];

const makeJournalEntryComponent = (journalEntry) => {
    return `<section><p class="date">${journalEntry.date.month} ${journalEntry.date.day}, ${journalEntry.date.year}</p><p class="concepts">${journalEntry.concepts}</p><p class="entry">${journalEntry.entry}</p><p class="mood">${journalEntry.mood}</p></section>`;
}

const renderJournalEntries = (entries) => {
    entries.forEach(entry => {
        document.querySelector('.entryLog').innerHTML += makeJournalEntryComponent(entry);
    });
}

fetch('http://localhost:3000/entries')
.then(response => response.json())
.then(entries => {
    entries.forEach(entry => {
        journalEntries.push(entry);
    });
    renderJournalEntries(journalEntries);
    })