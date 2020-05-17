import data from "./data.js";
import entriesDOM from "./entriesDOM.js";

// fills in initial select options, radio buttons, and tag checkbox

data.getMoods().then(moods => {
    entriesDOM.renderRadioButtons(moods)
    entriesDOM.renderMoodOptions(moods)
})

data.getInstructors().then(instructors => {
    entriesDOM.renderInstructorOptions(instructors)
})

data.getTags().then(tags => {
    entriesDOM.renderTagCheckbox(tags)
})

// creates journal entry object

const newJournalEntry = (date, concepts, entry, moodId, instructorId) => ({
    date,
    concepts,
    entry,
    moodId,
    instructorId
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
        window.alert('Watch your fucking mouth.');
    } else if (document.querySelector('#journalDate').value !== '' &&
    document.querySelector('#journalConcepts').value !== '' &&
    document.querySelector('#journalEntry').value !== '' &&
    document.querySelector('#journalMood').value !== '') {
        let date = document.querySelector('#journalDate').value
        let concepts = document.querySelector('#journalConcepts').value
        let entry = document.querySelector('#journalEntry').value
        let moodId = parseInt(document.querySelector('#journalMood').value, 10)
        let instructorId = parseInt(document.querySelector('#journalInstructor').value, 10)
        let checked = Array.from(document.getElementsByClassName('checked')).map(tag => tag.id.split('-')[1])
        let unchecked = Array.from(document.getElementsByClassName('unchecked')).map(tag => tag.id.split('-')[1])
        const editedEntry = {
            date,
            concepts,
            entry,
            moodId,
            instructorId
        }
        let journalId = document.getElementById('journalId').value
        if (journalId !== '') {
            data.editJournalEntry(editedEntry, journalId)
                .then( () => data.getEntriesTags())
                .then(entriesTags => entriesTags.forEach(entryTag => {
                    if (entryTag.entriesId == journalId) {
                        data.deleteEntriesTags(entryTag.id)
                    }
                }))
                .then( () => {
                    checked.forEach(tagId => {
                        let newEntriesTags = {
                            "entriesId": parseInt(journalId, 10),
                            "tagsId": parseInt(tagId, 10)
                        }
                        data.saveEntriesTags(newEntriesTags)
                    })
                })
                .then( () => data.getJournalEntries())
                .then( (data) => entriesDOM.renderJournalEntries(data))
            
        } else {
            data.saveJournalEntry(newJournalEntry(date, concepts, entry, moodId, instructorId))
                .then( () => data.getJournalEntries())
                .then( (entries) => {
                    checked.forEach(tagId => {
                        let newEntriesTags = {
                            "entriesId": entries[entries.length - 1].id,
                            "tagsId": parseInt(tagId, 10)
                        }
                        data.saveEntriesTags(newEntriesTags)
                    })
                    entriesDOM.renderJournalEntries(entries)
                })    
        }
    } else window.alert('Please complete the required fields.')
})

// click event for tags checkbox
// adds or removes "checked/unchecked" class on clicked boxes
document.getElementById('tags-checkbox').addEventListener('click', event => {
    if (event.target.id.startsWith('tag-')) {
        if (event.target.className === 'unchecked') {
            event.target.className = "checked"
        } else {
            event.target.className = "unchecked"
        }
    }
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
    document.getElementById('journalMood').value = entryObject.moodId
    document.getElementById('journalInstructor').value = entryObject.instructorId
    document.getElementById('journalConcepts').value = entryObject.concepts
    document.getElementById('journalEntry').value = entryObject.entry
}

const prefillTags = (tags, entryId) => {
    Array.from(document.getElementsByClassName("checked")).map(checkbox => {
        checkbox.checked = false;
        checkbox.className = "unchecked";
    })
    tags.filter(tag => tag.entriesId == entryId).forEach(entryTag => {
        document.getElementById(`tag-${entryTag.tagsId}`).checked = true;
        document.getElementById(`tag-${entryTag.tagsId}`).className = "checked";
    })
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
        let entryId = event.target.id.split('-')[1]
        data.getJournalEntry(entryId)
            .then(entryObject => prefillSearch(entryObject))
        data.getEntriesTags()
            .then(entriesTags => prefillTags(entriesTags, entryId))
    }
})

// keypress event for Search journal entries field

document.querySelector('.fieldset__search').addEventListener('keypress', event => {
    if (event.keyCode === 13) {
        let matchingEntries = new Set()
        data.getJournalEntries()
            .then(entries => entries.forEach(entry => {
                Object.values(entry).forEach(value => {
                    if (value.toString(10).includes(event.target.value)) {
                        matchingEntries.add(entry)
                    }
                })
                entriesDOM.renderJournalEntries(matchingEntries);
            }))
    }
})