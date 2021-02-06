const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = getAllNotes();

  let serchTitle = notes.find((note) => {
    return note.title === title;
  });
  if (serchTitle != undefined) {
    console.log(chalk.red("Title already present"));
    return;
  }

  notes.push({
    title: title,
    body: body,
  });
  saveNotes(notes);
  console.log(chalk.green('Note added successfully'));
};

const removeNote = (title) => {
    const notes = getAllNotes();
    const duplicateNotes = notes.slice();
    const modifiedNotes = duplicateNotes.filter((note) => {
        return note.title !== title;
    });

    let msg = chalk.green('Note removed');
    if (duplicateNotes.length == modifiedNotes.length)
        msg = chalk.red('Title not found');
    console.log(msg);

    saveNotes(modifiedNotes);
}

const listNotes = () => {
  console.log(chalk.bold.green('Your Notes'));
  const notes = getAllNotes();
  notes.forEach((note) => {
    console.log(note.title);
  });
}

const getAllNotes = () => {
  try {
    const notesBuffer = fs.readFileSync("notes.json");
    const notesJSON = notesBuffer.toString();
    return JSON.parse(notesJSON);
  } catch (exc) {
    return [];
  }
};

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesJSON);
};

module.exports = {
  add: addNote,
  remove: removeNote,
  list: listNotes,
};
