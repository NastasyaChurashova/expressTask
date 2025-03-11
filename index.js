const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const viewsFile = path.join(__dirname, "views.json");

const loadViews = () => {
	try {
		if (fs.existsSync(viewsFile)) {
			const data = fs.readFileSync(viewsFile, "utf-8");
			return JSON.parse(data);
		}
	} catch (error) {
		console.error("Ошибка при сохранении данных просмотров:", error);
	}
};

const countViews = loadViews();

app.get("/", (req, res) => {
	res.send("<h1>Это главная страница</h1>");
});
app.get("/about", (req, res) => {
	res.send("<h1>Это страница обо мне</h1>");
});

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
