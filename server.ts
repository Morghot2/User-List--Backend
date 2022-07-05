import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

//Middleware for data on post-request
app.use(cors(options));
app.use(express.json());

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

type ButtonType = {
  show: boolean;
  type: string;
};

const users: UserType[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    age: 27,
  },
  {
    id: "2",
    firstName: "Lech",
    lastName: "Nowak",
    email: "nowaklech@gmail.com",
    age: 25,
  },
  {
    id: "3",
    firstName: "Jan",
    lastName: "Kowalski",
    email: "jankowalski@gmail.com",
    age: 43,
  },
];

let button: ButtonType = {
  show: false,
  type: "none",
};

const currentApiUser = { user: 1 };

app
  .route("/")
  .get((req: Request, res: Response) => {
    res.status(200).json(users);
  })
  .post((req: Request, res: Response) => {
    const newUser: UserType = {
      id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
    };
    users.push(newUser);
    res.status(201).json(users);
  })
  .put((req: Request, res: Response) => {
    const updatedUser = {
      id: users[req.body.currentUserPosition].id,
      firstName: req.body.userValues.firstName,
      lastName: req.body.userValues.lastName,
      email: req.body.userValues.email,
      age: req.body.userValues.age,
    };
    users[req.body.currentUserPosition] = updatedUser;
    res.status(201).json(users);
  })
  .delete((req: Request, res: Response) => {
    users.splice(req.body.position, 1);
    res.status(201).json(req.body);
  });

app
  .route("/button")
  .get((req: Request, res: Response) => {
    res.status(200).json(button);
  })
  .put((req: Request, res: Response) => {
    button = req.body;
    res.status(201).json(button);
  });

app
  .route("/currentuser")
  .get((req: Request, res: Response) => {
    res.status(200).json(currentApiUser);
  })
  .put((req: Request, res: Response) => {
    currentApiUser.user = req.body.position;

    res.status(201).json(currentApiUser);
  });

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
