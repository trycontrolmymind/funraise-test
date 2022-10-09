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
