### Challenge 

Build a service that would run once per day and import the file converting to a new format based on the sample and saving on a MongoDB. 

It should consider the possibility of updating, inserting or removing items, and would have a limitation of 2GB of memory

### Implementation

For the implementation I tried to follow a clean architecture approach building the use case for reading the file and the use case for processing the data. 
The selected design was done because in this way I could split the responsibility of the domain and the responsibilities of the service in 2 different parts, which allows me to divide the complexity into smaller chunks and even use dedicated test cases, with little to no coupling between parts. 

For testing, I followed the Fake Pattern, that means I use a class that represents and has the implementation of the database, saving in memory the information, which allows me to fetch and check if the information was saved, (that does not test the repository though), but works better than mocks and stubs for the use case as I can assure that the use case works with a proper repository implementation. 


### Missing Parts and What I would do Differently in case of More time could be spend 

There are 2 missing requirements: 
- Implementation of condition for deletion of items 
- Getting improved description using GPT 4. 

How I would implement it:
For the deletion of items I would consider the possibility of inactivation on our platform, not a hard delete from the database and I would run it based on the previous list of items existed on the database vs items that don't came on the file. 

Other improvements I would make are: 
- Move save for the database in a different event that would be emitted, so it could use the resources in a queue and don't excited the capacity of the computer. 
- Create more test cases 
- Invest more time to understand Input, Output and Requirements


### Running 

In order to run you need to have a mongodb running locally or run the one on the docker-compose file via `docker-compose up -d` 

Run the application with `yarn start`, and please adjust the time of the execution on `CronJobManager.ts`

For running the tests please use `yarn test`

