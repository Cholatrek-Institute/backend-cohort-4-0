// Built-in modules
const fsPromise = require('fs').promises;
const fs = require('fs');
const rl = require('readline');

// create an interface to get input and output streams
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const directoryPath = './fileManager'

// function to showMenu
function showMenu() {
  console.log('Welcome to Simple File Manager, Enter a value to continue...');
  console.log('1. Create a file');
  console.log('2. Read a file');
  console.log('3. Update a file');
  console.log('4. Delete a file');
  console.log('5. Exit');
}

// function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    readline.question(question, (answer) => {
      resolve(answer);
    });
  })
}

// function to create a file
async function createFile() {
  const fileName = await askQuestion('Enter the file name: ')
  const content = await askQuestion('Enter the file content: ')

  try{
    // fileManager/fileName
    // directoryPath +'/' + fileName
    await fsPromise.writeFile(`${directoryPath}/${fileName}`, content);
    console.log('File created successfully')

    showMenu()
  } catch (error) {
    console.log(error)
  }
}

async function readFile() {
  const fileName = await askQuestion('Enter the file name: ');

  try {
    const content = await fsPromise.readFile(`${directoryPath}/${fileName}`, 'utf8');
    console.log('File Content: \n', content);

    showMenu()
  } catch (error) {
    console.log(error);
  }
}

async function updateFile() {
  const fileName = await askQuestion('Enter the file name: ');
  const newContent = await askQuestion('Enter the new content: ');

  try {
    // check if the file exists already
    const readFile = await fsPromise.readFile(`${directoryPath}/${fileName}`, 'utf8');
    if(readFile) {
      await fsPromise.writeFile(`${directoryPath}/${fileName}`, newContent, { flag: 'a+'});
      console.log('File updated successfully');
    } else {
      console.log('File does not exist');
    }
    showMenu()
  } catch (error){
    console.log(error);
  }
}

async function deleteFile() {
  const fileName = await askQuestion('Enter the file name: ');

  try {
    await fsPromise.unlink(`${directoryPath}/${fileName}`);
    console.log('File deleted successfully');
  } catch (error) {
    console.log(error);
  }
  showMenu()
}

// start
async function start() {
  showMenu()

  // get input from user
  readline.on('line', async function (input) {
    const option = parseInt(input);

    if (option === 1){
      await createFile();
    } else if(option === 2) {
      await readFile();
    } else  if (option === 3){
      await updateFile();
    } else if (option === 4){
      await deleteFile();
    } else if (option === 5){
      console.log('Exit');
      readline.close();
    } else {
      console.log('Invalid option');
    }
  })
}

start()
