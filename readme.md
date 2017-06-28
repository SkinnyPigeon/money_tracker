Feel free to download this and have a wee play.

First things first, we need to clone this and make sure that the local host is working.

**INSTALLATION**

You need node.js installed globally:

`$ git clone https://github.com/SkinnyPigeon/money_tracker_test`  
`$ cd money_tracker_test`  
`$ npm install`  
`$ npm start`

Navigate to http://localhost:3000/ in your browser.

You should now be on the main page of the application.

Next comes the hard bit...

**SETTING UP THE DATABASE**

You'll need Ruby on Rails, PostgreSQL and RackCORS installed globally:

`$ rails new TestDB --database:postgresql`  
`$ cd TestDB`  
`$ rails g model Tran description:text  amount:float debit:boolean`  
`$ rake db:create`  
`$ rake db:migrate`  
