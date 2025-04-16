const express = require('express');

const app = express();

const users = [{
    userId: 123,
    accounts:[{
        bank: 'SBI',
        open: true
    },{
        bank: 'HDFC',
        open: false
    }]
}];

app.get('/', function(req, res){
    const user1 = users[0];
    const noOfAccountBeforeUpdate = user1.accounts.length;
    let noOfActiveAccountAfterUpdate = 0;
    const activeAccount =[];
    const deactiveAccont = [];
    for(let i=0; i<noOfAccountBeforeUpdate; i++){
        if(user1.accounts[i].open){
            noOfActiveAccountAfterUpdate++;
            activeAccount.push(user1.accounts[i].bank);
        }else{
            deactiveAccont.push(user1.accounts[i].bank);
        }
    }
    const noOfDeactiveAccount = noOfAccountBeforeUpdate - noOfActiveAccountAfterUpdate;
    res.json({
        noOfAccountBeforeUpdate,
        noOfActiveAccountAfterUpdate,
        activeAccount,
        deactiveAccont,
        noOfDeactiveAccount
    })
})
app.use(express.json());

app.post('/', function(req, res){
    const bankName = req.body.bankName;
    const isopen = req.body.isopen;
    users[0].accounts.push({
        bank: bankName,
        open: isopen,
    })
    res.json({
        msg:'Done!'
    })
})

app.listen(3000); 