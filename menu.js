const readline = require('readline');
const {createNewAccount, withdraw, deposit, transfer, balance} = require('./db')

const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout
});

console.log("\n Welcome to the Banking System");
console.log("1. Create Account");
console.log(" \n 2. Make Deposit");
console.log(" \n 3. Withdraw Money");
console.log("\n 4. Transfer Money");
console.log("\n 5. Check Balance");
console.log("\n 6. Exit");

const ip = (msg) => {
    return new Promise ((resolve, reject) => {
        rl.question(` \n ${msg}: `, (ch) => {
            resolve(ch);
            reject(new Error ('there is an Error'))
        })
    })
}

const start = async() => {
    while (true) {
        const choice = await ip('Enter Your Choice')
        if (choice == 1) {  
            console.log('Create Account')
            const acId = parseInt(await ip('Enter The Account ID'))
            const acNm = await ip('Enter Account Name')
            const balance = 0
            createNewAccount({acId, acNm, balance})    
        }
        else if (choice == 2) {
            console.log('Please Deposit Money');
        } else if (choice == 3) {
            console.log('Please withdraw money')
        } else if (choice == 4 ) {
            console.log('Please check Balance')
        }
        else if (choice == 5) {
            console.log('Please Transfer money')
        } else {
            console.log('Bye Bye')
            process.exit()
        }
    }
    }

    start()