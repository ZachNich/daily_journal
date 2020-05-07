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
// saves entry to database, then displays all entries on DOM 

document.querySelector('.button__journal').addEventListener('click', event => {
    event.preventDefault();
    if (document.querySelector('#journalConcepts').checkValidity() == false ||
    document.querySelector('#journalEntry').checkValidity() == false) {
        window.alert('Please use permitted characters only.');
    } else {
        if (document.querySelector('#journalDate').value !== '' &&
        document.querySelector('#journalConcepts').value !== '' &&
        document.querySelector('#journalEntry').value !== '' &&
        document.querySelector('#journalMood').value !== '') {
        let date = document.querySelector('#journalDate').value
        let concepts = document.querySelector('#journalConcepts').value
        let entry = document.querySelector('#journalEntry').value
        let mood = document.querySelector('#journalMood').value
            data.saveJournalEntry(newJournalEntry(date, concepts, entry, mood))
            .then( () => data.getJournalEntries())
            .then( (data) => entriesDOM.renderJournalEntries(data))
        } else window.alert('Please complete the required fields.')
    }
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

// click event for Delete Entry button

document.querySelector('.entryLog').addEventListener('click', event => {
    if (event.target.id.startsWith('delete')) {
        const entryID = event.target.id.split('-')[1]
        data.deleteJournalEntry(entryID)
        .then( () => data.getJournalEntries())
        .then(data => {
            entriesDOM.renderJournalEntries(data)
        })
    }
})