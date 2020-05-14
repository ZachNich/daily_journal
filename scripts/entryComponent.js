const makeJournalEntry = (journalEntry) => {
    return `
    <section>
        <p class="date">${journalEntry.date}</p>
        <p class="concepts">${journalEntry.concepts}</p>
        <p class="entry">${journalEntry.entry}</p>
        <p class="mood">${journalEntry.mood.label}</p>
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

const makeOptionSelect = (mood) => {
    return `
    <option value="${mood.id}">${mood.label}</option>
    `
}

export default { makeJournalEntry, makeRadioSelect, makeOptionSelect }