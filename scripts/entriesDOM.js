const renderJournalEntries = (entries) => {
    entries.forEach(entry => {
        document.querySelector('.entryLog').innerHTML += makeJournalEntryComponent(entry);
    });
}
