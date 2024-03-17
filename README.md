# Book Project
This is a simple book project's backend.
It is an example of basic usage of nodejs, docker and mongo technologies together.

## Dependencies
1. You have to get **Docker** ( The entire project is suitable for running on Docker )
 - The own dependencies of this project in the docker container :
1. Jest
2. Mongoose
3. Express
4. Supertest
5. Body-parser
   
## How to Run Project
Please use the given instructions :
1. Clone the project using  **git clone**  command.
2. Open your terminal.
3. Go to project folder using  **cd**  command.
4. Run the project using  **docker compose up**  command. (If you have a problem with node module installations, use command in troubleshooting then try again docker compose up command.)
5. The test container runs first, then the app container runs. To try API tests, **wait** for the test container to finish running.

## API Tests
If you want to test with postman, you can download and import [api collection file for postman](/PostmanCollection.json). If you do not prefer import api collection file, required APIs listed below.

1. Create a book :
http://localhost:80/api/books/create

2. Get all books : http://localhost:80/api/books/all

3. Delete a book : http://localhost:80/api/books/deleteById?/:id

4. Update a book : http://localhost:80/api/books/updateById/:id

## Troubleshooting
If node packages does not install porperly in docker container, run this command: **docker-compose run --rm app npm install**

