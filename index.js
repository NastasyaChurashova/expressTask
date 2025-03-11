const express = require("express");
const app = express();

const countViews = {
    "/": 0,
    "/about":0
}

app.get("/", (req, res) => {
	res.send("<h1>Это главная страница</h1>");
});
app.get("/about", (req, res) => {
	res.send("<h1>Это страница обо мне</h1>");
});



const port = 3000;

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
