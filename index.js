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
		console.error("Ошибка при загрузке просмотров:", error);
	}
	return { "/": 0, "/about": 0 };
};

const countViews = loadViews();

const saveViews = (views) => {
	try {
		fs.writeFileSync(viewsFile, JSON.stringify(views, null, 2));
	} catch (error) {
		console.error("Ошибка при сохранении просмотров:", error);
	}
};

const updateViews = (route) => {
	if (!countViews[route]) {
		countViews[route] = 0;
	}
	countViews[route] += 1;
	saveViews(countViews);
};

app.get("/", (req, res) => {
	updateViews("/");
	res.send(`
        <h1>Корневая страница</h1>
        <p>Просмотров: ${countViews["/"]}</p>
        <a href="/about">Ссылка на страницу /about</a>
    `);
});
app.get("/about", (req, res) => {
	updateViews("/about");
	res.send(`
        <h1>Страница About</h1>
        <p>Просмотров: ${countViews["/about"]}</p>
        <a href="/">Ссылка на главную страницу</a>
    `);
});

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
});
