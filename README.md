# fundraise test fullstack

## Get started

### 1. Install node.js v18.10.0 or NVM

```bash
nvm install
nvm use
```

### 2. NPM install

```bash
npm install
```

### 3. Build everything

```bash
npm run build
```

### 4. Start database

```bash
cd packages/backend
docker-compose up --build
```

Mongo Express: http://localhost:8081

### 5. Start application

```bash
cd packages/backend
npm run start
```

Serving HTML on http://localhost:8000  
Serving script and /track on http://localhost:8001

# Bonus

Напишите свой сниппет вставки трекера на страницу, замените им <script src="http://localhost:8001/"></script>, и объясните зачем “все так усложнили”.

> Это нужно для того, чтобы асинхронно грузить script и перед загрузкой скрипта куда-то складывать события, которые происходят по ходу.

---

Сделайте так, чтобы при клике по ссылке все события успели дойти до бекенда до перехода на новую страницу.

> Добавил navigator.sendBeacon для отправки при закрытии страницы, чтобы отправка не терялась при закрытии

---

Сделайте так, чтобы при CORS запросе не происходил префлайт OPTIONS запрос.

> Изменил content-type: text/plain и сделал, чтобы express пытался парсить json из text/plain
