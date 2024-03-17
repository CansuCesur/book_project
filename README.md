# Book Project
Book Project

## Dependencies
1. You have to get openssl libraries.
    - Get openssl libraries using given link.
    - https://www.openssl.org/source/
    - Download openssl
    - Unzip openssl folder
    - Enter the folder using terminal
    - ./config shared --prefix=/usr/local/
    - make
    - make install
    - NOTE: Change the location /usr/local/ and you must have root permissions (sudo)
2. Do not run the client project before run server project
## How to Run Project
Please use the given insructions :
1. Clone the project using  git clone  command.
2. Open your terminal.
3. Go to project folder using  cd  command.
4. Run the project using  docker compose up  command.
5. The test container runs first, then the app container runs. To try API tests, *wait* for the test container to finish running.

## API Tests
If you want to test with postman, you can import [api collection file for postman](/PostmanCollection.json). If you do not prefer import api collection file, required APIs listed below.

1. Create a book

git status

2. Get all books

git status

3. Delete a book

git status

4. Update a book

git status
