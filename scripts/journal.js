import data from "./data.js";
import entriesDOM from "./entriesDOM.js";

/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/

// creates journal entry object

const newJournalEntry = (date, concepts, entry, mood) => ({
    date: date,
    concepts: concepts,
    entry: entry,
    mood: mood
})

// click event for Record Journal Entry button
// checks validity of inputs and if they're filled out
// saves entry to database
// OR edits entry in database if edit button clicked to populate input fields
// outputs all entries to DOM

document.querySelector('.button__journal').addEventListener('click', event => {
    event.preventDefault();
    if (document.querySelector('#journalConcepts').checkValidity() == false ||
    document.querySelector('#journalEntry').checkValidity() == false) {
        window.alert('Please use permitted characters only.');
    } else if (document.querySelector('#journalConcepts').value.includes('fuck') ||
    document.querySelector('#journalEntry').value.includes('fuck') ||  
    document.querySelector('#journalConcepts').value.includes('bitch') ||
    document.querySelector('#journalEntry').value.includes('bitch') ||
    document.querySelector('#journalConcepts').value.includes('shit') ||
    document.querySelector('#journalEntry').value.includes('shit')) {
        window.alert('Watch your mouth.');
    } else if (document.querySelector('#journalDate').value !== '' &&
    document.querySelector('#journalConcepts').value !== '' &&
    document.querySelector('#journalEntry').value !== '' &&
    document.querySelector('#journalMood').value !== '') {
        const editedEntry = {
            date: document.querySelector('#journalDate').value,
            concepts: document.querySelector('#journalConcepts').value,
            entry: document.querySelector('#journalEntry').value,
            mood: document.querySelector('#journalMood').value
        }
        if (document.getElementById('journalId').value !== '') {
            data.editJournalEntry(editedEntry, document.getElementById('journalId').value)
            .then( () => data.getJournalEntries())
            .then( (data) => entriesDOM.renderJournalEntries(data))
        } else {
            data.saveJournalEntry(newJournalEntry(date, concepts, entry, mood))
            .then( () => data.getJournalEntries())
            .then( (data) => entriesDOM.renderJournalEntries(data))
        }
    } else window.alert('Please complete the required fields.')
})

// click event for Filter by Mood radio list
// displays entries that match the mood selected

document.getElementsByName('mood__filter').forEach(element => element.addEventListener('click', event => {
    const mood = event.target.value;
    data.getJournalEntries()
    .then(data => {
        entriesDOM.renderJournalEntries(data.filter(entry => entry.mood == mood));
    }
    )}))

// click event for Delete Entry button and Edit Entry button

const prefillSearch = (entryObject) => {
    document.getElementById('journalId').value = entryObject.id
    document.getElementById('journalDate').value = entryObject.date
    document.getElementById('journalMood').value = entryObject.mood
    document.getElementById('journalConcepts').value = entryObject.concepts
    document.getElementById('journalEntry').value = entryObject.entry
}

document.querySelector('.entryLog').addEventListener('click', event => {
    if (event.target.id.startsWith('delete')) {
        let entryID = event.target.id.split('-')[1]
        data.deleteJournalEntry(entryID)
        .then( () => data.getJournalEntries())
        .then(data => {
            entriesDOM.renderJournalEntries(data)
        })
    } else if (event.target.id.startsWith('edit')) {
        let entryID = event.target.id.split('-')[1]
        data.getJournalEntry(entryID)
        .then(entryObject => {
            prefillSearch(entryObject)
        })
    }
})