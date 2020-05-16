import components from './entryComponent.js'

const renderRadioButtons = (moods) => {
    moods.forEach(mood => {
        document.querySelector('.fieldset__filter').innerHTML += components.makeRadioSelect(mood);
    })
}

const renderMoodOptions = (moods) => {
    moods.forEach(mood => {
        document.getElementById('journalMood').innerHTML += components.makeMoodSelect(mood);
    })
}

const renderInstructorOptions = (instructors) => {
    instructors.forEach(instructor => {
        document.getElementById('journalInstructor').innerHTML += components.makeInstructorSelect(instructor);
    })
}

const renderJournalEntries = (entries) => {
    document.querySelector('.entryLog').innerHTML = '';
    entries.forEach(entry => {
        document.querySelector('.entryLog').innerHTML += components.makeJournalEntry(entry);
    });
}

export default { renderJournalEntries, renderRadioButtons, renderMoodOptions, renderInstructorOptions }