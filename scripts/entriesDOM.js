import entryComponent from "./entryComponent";

const renderJournalEntries = (makeJournalEntryComponent()) => {
    entries.forEach(entry => {
        document.querySelector('.entryLog').innerHTML += makeJournalEntryComponent(entry);
    });
}

export default { renderJournalEntries }