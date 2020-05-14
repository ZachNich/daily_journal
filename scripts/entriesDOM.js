import components from './entryComponent.js'

const renderRadioButtons = (moods) => {
    moods.forEach(mood => {
        document.querySelector('.fieldset__filter').innerHTML += components.makeRadioSelect(mood);
    })
}

const renderSelectOptions = (moods) => {
    moods.forEach(mood => {
        document.getElementById('journalMood').innerHTML += components.makeOptionSelect(mood);
    })
}

const renderJournalEntries = (entries) => {
    document.querySelector('.entryLog').innerHTML = '';
    entries.forEach(entry => {
        document.querySelector('.entryLog').innerHTML += components.makeJournalEntry(entry);
    });
}

export default { renderJournalEntries, renderRadioButtons, renderSelectOptions }