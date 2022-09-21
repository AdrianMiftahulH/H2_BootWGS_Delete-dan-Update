// const readline = require('readline');
const validator = require('validator');
const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');


// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// Jika tidak ada folder data
if (!fs.existsSync("./data")) {
    // maka buat folder tersebut
    fs.mkdirSync("./data");
}
// jika tidak ada file di dalam folder data
if (!fs.existsSync("./data/contacts.json")) {
    // maka buat file 
    fs.writeFileSync('./data/contacts.json', "[]");
}

// Untuk Membaca Data
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');

    // mengambil string JSON dan mengubah menjadi objek js
    const contacts = JSON.parse(file);
    return contacts;
}

// Membuat List kontak
const listContact = () => {
    // membuat varibel dengan mengambil f loadContact
    const contacts = loadContact();
    console.log('Contact List : ');
    // melakukan pengulangan sesuai list
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}.${contact.name} - ${contact.mobile}`);
    });
}

// Membuat detail data sesuai name
const detailContact = (name) => {
    const contacts = loadContact();

    // Buat varibel untuk menemukan data sesaui nama
    const findName = contacts.find((contact) => contact.name === name);

    // Pengkondisian bila nama yang di cari ada
    if (findName) {
        console.log(`Name : ${findName.name}
email : ${findName.email}
mobile : ${findName.mobile} `);
    } else {
        console.log(`Name not Found`);
    }


}
// Menghapus data
const deleteContact = (name) => {
    const contacts = loadContact();

    // Temukan data terlebih dahulu, lalu buat array baru dengan filter
    const findName = contacts.filter((contact) => contact.name.toLowerCase() !== name.toLowerCase());

    // Pengkodisian bila nama tidak di temukan
    if (findName.length === contacts.length) {
        console.log("This data does not exist")
    } else {
        // Membuat data  baru dengan array di file contacts.json
        fs.writeFileSync('data/contacts.json', JSON.stringify(findName));
        // Output ke terminal sesuai jawaban di pertanyaan
        console.log(`This data has been deleted`);
    }

}

// MengUpdate Data
const upContact  = (namePre, newName, newEmail, newMobile) => {
    // mendapatkan semua data dari json
    const contacts = loadContact();
    // Filter data contact
    const NewContact = contacts.filter((contact) => contact.nama.toLowerCase() !== namePre.toLowerCase());

    // Cek length Contact jika sama maka data tidak ada
    if(contacts.length === NewContact.length) {
        console.log('Nama Contact tidak ada!');
        return false;
    }

    // Mencari data Lama
    const contactPre = contacts.find((contact) => contact.nama.toLowerCase() === namePre.toLowerCase());
     // Mengembalikan Posisi Pertama Jadi ditentukan
    const index = contacts.indexOf(contactPre);

    // Pengkondisian jika nama di ubah sama
    if(nama) {
        // Cek Duplikat Nama
        const duplikat = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase() );
        if(duplikat) {
            console.log('Maaf, Contact yang anda masukan sudah tersedia.');
            return false;
        }
        contacts[index].nama = nama; 
    }

    // Pengkondisian jika email di ubah sama
    if(email) {
        if(!validator.isEmail(email)) {
            console.log('Maaf Email Tidak Valid!');
            return false;
        }
        contacts[index].email = email;
    }

    // Pengkondisian jika mobile di ubah sama
    if(mobile) {
        if(!validator.isMobilePhone(mobile, 'id-ID')) {
            console.log('Maaf No Hp Tidak Valid!');
            return false;
        }
        contacts[index].mobile = mobile;
    }
    // Save Data yang sudah di Update
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
    console.log('Data Contact Berhasil di Update!');
}
// Menyimpan Data
const saveData = (name, email, mobile,) => {
    const contact = { name, email, mobile };
    const contacts = loadContact();

    // Bila nama ada yang sama
    const duplicate = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    if (duplicate) {
        console.log('Contact Name is already recorded. Use another name');
        return false;
    }
    // validator
    if (email) {
        if (!validator.isEmail(email)) {
            console.log('Account Email invalid!');
            return false;
        }
    }
    if (!validator.isMobilePhone(mobile, "id-ID")) {
        console.log('No Phone invalid!');
        return false;
    }

    contacts.push(contact);
    // Membuat data di file contacts.json
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    // Output ke terminal sesuai jawaban di pertanyaan
    console.log(`${contact.name} data has been saved`);
    // Keluar dari rl
    // rl.close();
}

module.exports = { listContact, saveData, detailContact, deleteContact, upContact };

// ==== Catatan =====
//node app add --name="yYannn" --email="abcgmail.com" --mobile="089656104174" ==> untuk run di terminal
