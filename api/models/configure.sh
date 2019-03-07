#!/api/models/bash 

database = "store-manager"
 echo "Setting up store-manager $database"

 dropdb -U postgres "store-manager"
 createdb -U postgres "store-manager"

 psql -U postgres < ./api/models/db.sql

 echo "$database completed"