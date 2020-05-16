const makeJournalEntry = (journalEntry) => {
    return `
    <section>
        <p class="date">${journalEntry.date}</p>
        <p class="concepts">${journalEntry.concepts}</p>
        <p class="entry">${journalEntry.entry}</p>
        <p class="mood">${journalEntry.mood.label}</p>
        <p class="instructor">${journalEntry.instructor.firstName} ${journalEntry.instructor.lastName}</p>
    </section>
    <button id='delete-${journalEntry.id}'>Delete Entry</button>
    <button id='edit-${journalEntry.id}'>Edit Entry</button>
    `;
}

const makeRadioSelect = (mood) => {
    return `
    <input type="radio" name="mood__filter" id="${mood.label}-filter" value="${mood.label}">
    <label for="${mood.label}-filter">${mood.label}</label>
    `
}

const makeMoodSelect = (mood) => {
    return `
    <option value="${mood.id}">${mood.label}</option>
    `
}

const makeInstructorSelect = (instructor) => {
    return `
    <option value="${instructor.id}">${instructor.firstName} ${instructor.lastName}</option>
    `
}

export default { makeJournalEntry, makeRadioSelect, makeMoodSelect, makeInstructorSelect }