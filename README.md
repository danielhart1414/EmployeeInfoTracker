# EmployeeInfoTracker

This app allows you to type in basic employee information and store it in a SQLite database. The entries currently present in the database appear in a table at the top of the page. I hope to implement update and delete functionality in the future (you'll notice some update and delete methods present in the current code).

If you want to run this on your machine, you'll need to use migrations to create an SQLite database before using the app. (When you pull down the files onto your machine, delete that Migrations folder--I mistakenly included that in the repository.) To make migrations, first build the project, then run the following commands in a terminal. Note that you'll need to have the dotnet-ef tool installed to run these.

dotnet ef migrations add MyFirstMigration
dotnet ef database update

After running the commands your database should be good to go, and you should be able to run the app.
