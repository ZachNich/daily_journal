const journalEntries = [
    {
        date: {
            day: 17,
            month: 'April',
            year: 2020
        },
        concepts: "Javscript Objects",
        entry: "Learned to construct and access JS objects. Also learned to use .querySelector to access and modify DOM.",
        mood: "Optomistic"
    },
    {
        date: {
            day: 17,
            month: 'April',
            year: 2020
        },
        concepts: "HTML/CSS",
        entry: "Learned how to use flexbox and other CSS tools to style an HTML page. Also learned how to create an HTML skeleton with wireframing and sections before using CSS to style.",
        mood: "Energetic"
    },
    {
        date: {
            day: 17,
            month: 'April',
            year: 2020
        },
        concepts: "Teamwork, Presenting, GitHub",
        entry: "Learned how to discuss/plan/produce as a team with different ideas & skills. Also put together quick presentation with group and struggled through learning GitHub flow with pushes and pulls in a group setting.",
        mood: "Ovewhelmed"
    }
];

const makeJournalEntryComponent = (journalEntry) => {
    return `<section><p class="date">${journalEntry.date.month} ${journalEntry.date.day}, ${journalEntry.date.year}</p><p class="concepts">${journalEntry.concepts}</p><p class="entry">${journalEntry.entry}</p><p class="mood">${journalEntry.mood}</p></section>`;
}

const renderJournalEntries = (entries) => {
    entries.forEach(entry => {
        document.querySelector('.entryLog').innerHTML += makeJournalEntryComponent(entry);
    });
}

renderJournalEntries(journalEntries);