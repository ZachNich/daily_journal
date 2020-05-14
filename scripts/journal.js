import data from "./data.js";
import entriesDOM from "./entriesDOM.js";

// fills in initial select options and radio buttons

data.getMoods().then(moods => {
    entriesDOM.renderRadioButtons(moods)
    entriesDOM.renderSelectOptions(moods)
})

// creates journal entry object

const newJournalEntry = (date, concepts, entry, moodId) => ({
    date,
    concepts,
    entry,
    moodId
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
        let date = document.querySelector('#journalDate').value
        let concepts = document.querySelector('#journalConcepts').value
        let entry = document.querySelector('#journalEntry').value
        let moodId = document.querySelector('#journalMood').value
        const editedEntry = {
            date: date,
            concepts: concepts,
            entry: entry,
            moodId: moodId
        }
        if (document.getElementById('journalId').value !== '') {
            data.editJournalEntry(editedEntry, document.getElementById('journalId').value)
            .then( () => data.getJournalEntries())
            .then( (data) => entriesDOM.renderJournalEntries(data))
        } else {
            data.saveJournalEntry(newJournalEntry(date, concepts, entry, moodId))
            .then( () => data.getJournalEntries())
            .then( (data) => entriesDOM.renderJournalEntries(data))
        }
    } else window.alert('Please complete the required fields.')
})

// click event for Filter by Mood radio list
// displays entries that match the mood selected

let counter = 0;
document.querySelector('.fieldset__filter').addEventListener('mouseover', event => {
    if (counter === 0) {
        document.getElementsByName('mood__filter').forEach(element => element.addEventListener('click', event => {
            const mood = event.target.value;
            data.getJournalEntries()
            .then(data => {
                entriesDOM.renderJournalEntries(data.filter(entry => entry.mood.label == mood));
            })
        }))
        counter++;
    }
})

// click event for Delete Entry button and Edit Entry button

const prefillSearch = (entryObject) => {
    document.getElementById('journalId').value = entryObject.id
    document.getElementById('journalDate').value = entryObject.date
    document.getElementById('journalMood').value = entryObject.mood.label
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