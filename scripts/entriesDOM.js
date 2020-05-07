import entryComponent from './entryComponent.js'

const renderJournalEntries = (entries) => {
    document.querySelector('.entryLog').innerHTML = '';
    entries.forEach(entry => {
        document.querySelector('.entryLog').innerHTML += entryComponent.makeJournalEntryComponent(entry);
    });
}

export default {renderJournalEntries};