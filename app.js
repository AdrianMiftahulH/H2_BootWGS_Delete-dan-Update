const { listContact, saveData, detailContact, deleteContact, upContact } = require('./function.js');
const yargs = require("yargs");


// Membuat command yang perfungsi untuk menambahkan data
yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder: {
        name: {
            describe: 'Contact Name',
            // Harus di isi bila bersifat true didemandOption
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'contact email',
            demandOption: false,
            type: 'string',
        },
        mobile: {
            describe: 'contact mobile phone number',
            demandOption: true,
            type: 'string',
        },
    },

    handler(argv) {
        saveData(argv.name, argv.email, argv.mobile);
    },
});

// Membuat command yang perfungsi untuk List semua data
yargs.command({
    command: 'list',
    describe: 'see contact list',
    handler() {
        listContact();
    },
});

// Membuat command yang perfungsi untuk mencari data sesuai nama
yargs.command({
    command: "detail",
    describe: 'see contact detail base on name',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        detailContact(argv.name);
    },
});

// Membuat command yang perfungsi untuk menghapus data sesuai nama
yargs.command({
    command: "delete",
    describe: 'delete by name',
    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        deleteContact(argv.name);
    },
});

yargs.command({
    command: "update",
    describe: "update by name",
    builder: {
        namePre: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string',
        },
        newName: {
            describe: 'Contact Name',
            // Harus di isi bila bersifat true didemandOption
            demandOption: true,
            type: 'string',
        },
        NewEmail: {
            describe: 'contact email',
            demandOption: false,
            type: 'string',
        },
        newMobile: {
            describe: 'contact mobile phone number',
            demandOption: true,
            type: 'string',
        },
    },

    handler(argv) {
        upContact(argv.namePre, argv.newName, argv.newEmail, argv.newMobile);
    },
})

yargs.parse();


// === Catatan ===
// npm i yargs ==> untuk menginstall yargs