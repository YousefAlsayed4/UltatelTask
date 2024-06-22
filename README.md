# Ultatel-Task-CRUD

## Live Demo

Access the live application here: [Ultatel-Task-CRUD](https://drive.google.com/file/d/1-epyIb6G7mhfeD4Rb2mw3OhkW4MHtOcL/view?usp=sharing)

## Features

- **Fully crud support for students**
- **Protect website using access token**
- **Maintaining session using refresh token**
- **Applied repo/service design pattern with layered architecture in nestjs for clean code**
- **User Authentication**
- **Responsive Design**
### Frontend

- **Angular**
- **Bootstrap**
- **ng-bootstrap**
- **ng-select**
- **sweetalert2**
- **Datepicker**

### Backend

- **NestJS**
- **RESTful API**
- **ORM / Repository Pattern**

### Database

- **MySQL**


### Backend Setup

1. **Clone the Repository**

```bash
   git clone https://github.com/YousefAlsayed4/UltatelTask.git
   cd backend
   ```

2. **Install Dependencies**
 ```bash
   npm install --force
```
3. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory with the following content:
 ```bash
   DATABASE_HOST=your_database_host
   DATABASE_PORT=3306
   DATABASE_USER=your_database_user
   DATABASE_PASSWORD=your_database_password
   DATABASE_NAME=newultatel

   JWT_SECRET=your_jwt_secret
```
4. **Start the Backend Server**
 ```bash
   npm run start:dev

   The backend server will be available at `http://localhost:3000`.
```
### Frontend Setup

1. **Navigate to the Frontend Directory**
 ```bash
   cd ../Frontend
```
2. **Install Dependencies**
 ```bash
   npm install --force
```

3. **Run the Angular Application**
 ```bash
   ng serve --open

   The frontend will be available at `http://localhost:4200`.
```

## Postman Collection
 ```
endpoints

for user
@POST
`http://localhost:3000/user/register`
@POST
`http://localhost:3000/user/login`


for student

@POST
`http://localhost:3000/student`
@GET
`http://localhost:3000/student`
@PUT
`http://localhost:3000/student/:id`
@DELETE
`http://localhost:3000/student/id`

```


### Note

Make sure your front end is hosted on port 4200 or just add the new one in CORS list in .env file