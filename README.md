Online ads Readme
======

To run you need Node and MongoDb installed.

start with running `npm install` to install all dependencies

create a directory named "data", this is for the database later.

if you don't have mogod on your path go to the folder where you have mongoDB(eg c:\mongoDb\bin)

run `.\mongod --dbpath fullPathTo\onlineAds\data`

and then in a separate shell run `.\mogod`

In a new shell run `gulp re-populate-db` to create some mock data.

If you don't have `gulp` on PATH write `node_modules\gulp\.bin\gulp` instead

Then run `gulp deploy`

now go to `localhost:3000` and view the site. You will probably need to disable any adblocker plugin you might have.

Have Fun!

