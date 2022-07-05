"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const allowedOrigins = ["http://localhost:3000"];
const options = {
    origin: allowedOrigins,
};
//Middleware for data on post-request
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
const users = [
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
let button = {
    show: false,
    type: "none",
};
const currentApiUser = { user: 1 };
app
    .route("/")
    .get((req, res) => {
    res.status(200).json(users);
})
    .post((req, res) => {
    const newUser = {
        id: (0, uuid_1.v4)(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,
    };
    users.push(newUser);
    res.status(201).json(users);
})
    .put((req, res) => {
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
    .delete((req, res) => {
    users.splice(req.body.position, 1);
    res.status(201).json(req.body);
});
app
    .route("/button")
    .get((req, res) => {
    res.status(200).json(button);
})
    .put((req, res) => {
    button = req.body;
    res.status(201).json(button);
});
app
    .route("/currentuser")
    .get((req, res) => {
    res.status(200).json(currentApiUser);
})
    .put((req, res) => {
    currentApiUser.user = req.body.position;
    res.status(201).json(currentApiUser);
});
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
