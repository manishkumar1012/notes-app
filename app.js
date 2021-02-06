const fs = require('fs');
const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'Add note to the list',
    builder: {
        title: {
            describe: 'Title for the note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.add(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removes a note of the specified title',
    builder: {
        title: {
            describe: 'title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.remove(argv.title);
    }
})

yargs.parse();