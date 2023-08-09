const User = require('../model/User');



const deposit = ({ username, amount }, onDeposit = undefined) => {
  User.find(`select balance from account where ac_id = $1`, [username], (err, res) => {
      if (err) {
          console.log(`\n ❌ Problem In Deposit`)
      }
      else {
          const balance = parseFloat(res.rows[0].balance)
          const newBalance = balance + parseFloat(amount)

          User.find(`update account set balance = $1 where ac_id = $2`, [newBalance, username], (err, res) => {
              if (err) console.log(`\n ❌ Problem In Depositing`)
              else  {
                  console.log(`\n ✅ Amount ${amount} Deposited Successfully`)

                  if(onDeposit) onDeposit(`✅ Amount ${amount} Deposited Successfully`)
              }
          })
      }
  })
}

module.exports = { deposit };
