const api = require('southern-company-api');
const config = require('./config.json');
const SouthernCompany =  new api({username:config.username, password:config.password});
SouthernCompany.on('login', ()=>{
  console.info('Logged In...');

  /* Displaying accounts found */
  console.info('Accounts:', SouthernCompany.accounts, '\n');

  /* Getting Monthly Data */
  SouthernCompany.getMonthlyData().catch(console.error)
    .then((data)=>{
      console.info('Monthly Data');
      console.info(JSON.stringify(data));
      console.info();
    });

  /* Getting Daily Data */
  SouthernCompany.getDailyData('05/01/2017', '05/05/2017').catch(console.error)
    .then((data)=>{
      console.info('Daily Data');
      console.info(JSON.stringify(data));
      console.info();
    });
});

/* Listening for any errors */
SouthernCompany.on('error', console.error);
