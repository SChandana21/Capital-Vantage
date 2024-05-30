const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'bankdbb',
    password: 'mysecretpassword',
    post: 5432
})




const connect = async () => await client.connect()
client.connect((err, db) => {
    if (err) {
        console.log('Error in connectivityy');
        return 
    }
    console.log('Connected succesfully');
})


const createNewAccount = ({acId, acNm, balance}) => {
    client.query(`insert into account values ($1, $2, $3)`,[acId, acNm, balance] ,(err, res) => {
        if (err) console.log(`Problem in Inserting Data`)
        else {
        console.log(`New Customer Created Succesfully`);
        // console.log(res)
        }
    })
}
    const withdraw = ({acId, amount}) => {
        client.query(`select balance from account where ac_id= $1`, [acId], (err, res) => {
            if (err) {
                console.log(` \n Problem in WithDrawal`)
            } else {
                const balance = parseFloat(res.rows[0].balance)
                const newBalance = balance - parseFloat(amount)

                client.query(`update account set balance = $1 where ac_id =$2`, [newBalance, acId], (err, res) => {
                    if (err) {
                        console.log(`\n Problem in Withdrawing`)
                    } else {
                        console.log(`\n Amount ${amount} Withdrawal succesful`)
                    }
                })
            }
        })
    }

    const deposit = ({acId, amount}) => {
        client.query(`select balance from account where ac_id=$1`, [acId], (err, res) => {
            if (err) {
                console.log(`Problem in Depositing`)
            } else {
                const balance = parseFloat(res.rows[0].balance)
                const newbalance = balance + parseFloat(amount);

                client.query(`update account set balance = $1 where ac_id = $2`, [ newbalance, acId], (err, res) => {
                    if (err) {
                        console.log(`Problem in Updating the Deposited money`)
                    } else {
                        console.log(`${amount} Amount is Deposited Into the Bank!`)
                    }
                })
            }

        })
    }

    const transfer = ({srcId, destId, amount}) => {
        withdraw({acId:srcId , amount})
        deposit({acId: destId, amount})
    }


    const balance = (acId) => {
        client.query(`select balance from account where ac_id=$1`, [acId], (err, res) => {
            if (err) {
                console.log(`Error in Fetching The Balance`);
            } else {
                const balance = parseFloat(res.rows[0].balance)
                console.log(`Your account Balance is ${balance}`)
            }
        })

    }

    // createNewAccount({acId: 2, acNm:'Saraswathi', balance:0})

    // deposit({acId: '1', amount: 2})
    // transfer({srcId: 1, destId: 2, amount:2});

module.exports = {
    createNewAccount,withdraw,deposit,transfer,balance
}
