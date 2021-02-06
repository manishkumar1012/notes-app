const fs = require("fs");
const chalk = require("chalk");
const { timeLog } = require("console");

const addNote = (title, body) => {
  const notes = getAllNotes();

  const searchTitle = notes.find((note) => {
    return note.title === title;
  });
  if (searchTitle) {
    console.log(chalk.red("Title already present"));
    return;
  }

  notes.push({
    title: title,
    body: body,
  });
  saveNotes(notes);
  console.log(chalk.green("Note added successfully"));
};

const removeNote = (title) => {
  const notes = getAllNotes();
  const duplicateNotes = notes.slice();
  const modifiedNotes = duplicateNotes.filter((note) => {
    return note.title !== title;
  });

  let msg = chalk.green("Note removed");
  if (duplicateNotes.length == modifiedNotes.length)
    msg = chalk.red("Title not found");
  console.log(msg);

  saveNotes(modifiedNotes);
};

const listNotes = () => {
  console.log(chalk.bold.green("Your Notes"));
  const notes = getAllNotes();
  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNotes = (title) => {
  const notes = getAllNotes();
  const note = notes.find((note) => note.title === title);
  if (!note) {
    console.log(chalk.red('No note found'));
    return;
  }
  console.log(chalk.green('Note found'));
  console.log(chalk.bold(note.title), note.body);
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
  read: readNotes,
};
