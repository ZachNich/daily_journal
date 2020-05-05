import entryComponent from './entryComponent.js'

const renderJournalEntries = (entries) => {
    entries.forEach(entry => {
        document.querySelector('.entryLog').innerHTML += entryComponent.makeJournalEntryComponent(entry);
    });
}

export default {renderJournalEntries};