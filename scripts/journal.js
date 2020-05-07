import data from "./data.js";
import entriesDOM from "./entriesDOM.js";

/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/

// data.getJournalEntries().then(entriesDOM.renderJournalEntries)

const newJournalEntry = (date, concepts, entry, mood) => ({
    date: date,
    concepts: concepts,
    entry: entry,
    mood: mood
})


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

document.getElementsByName('mood__filter').forEach(element => element.addEventListener('click', event => {
    const mood = event.target.value;
    data.getJournalEntries()
    .then(data => {
        entriesDOM.renderJournalEntries(data.filter(entry => entry.mood == mood));
    }
)}))