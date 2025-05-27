import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get("/teste", (req, res) => {
    console.log("Test route accessed");

    res.send("Hello world response")
})

app.get("/hello", (req, res) => {
    console.log("Hello route accessed");

    res.send("Welcome to the Hello route!")
})

app.get("/about", (req, res) => {
    console.log("About route accessed");

    res.send({
        nome: "Pedro Feld",
        email: "pedro.gael.feld@gmail.com",
        resume: "System Analyst and Developer",
        age: 20,
        skills: [
            "JavaScript",
            "TypeScript",
            "HTML",
            "CSS",
            "Python",
            "Node.js",
            "React",
            "Express",
            "APIs REST",
            "MySQL",
            "PostgreSQL"
        ]
    })
})

const porta = process.env.PORT;

app.listen(porta, () => {
    console.log('Server is running on port', porta);
});