# 🎬 Movie Collection Application

A simple full-stack web application to manage your movie collection using **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features
- MongoDB database using **Mongoose**
- RESTful **CRUD API** for movies
- Responsive UI with **Materialize CSS**
- Real-time movie data displayed from the database

## 📦 Movie Schema
Each movie document contains:
- **title** – Movie title
- **genre** – Movie genre
- **director** – Director’s name
- **releaseYear** – Year of release (1900–2030)
- **rating** – Rating out of 10
- **posterUrl** – Image URL
- **synopsis** – Short description
- **createdAt / updatedAt** – Auto timestamps

## 🛠️ Requirements
- **Node.js** (v14+)
- **MongoDB** installed and running locally

## 📥 Installation

### 1. Install Dependencies
```
npm install
```

### 2. Start MongoDB
**Windows:**
```
net start MongoDB
```

**Mac/Linux:**
```
mongod
```

### 3. Insert Sample Data
```
node init-db.js
```

### 4. Start the Server
```
npm start
```
or
```
node server.js
```

Open: `http://localhost:3000`

## 🖥️ Viewing Data in MongoDB Compass
1. Open Compass  
2. Connect with:
```
mongodb://localhost:27017
```
3. Open **moviecollection** → **movies**  
4. You will see 3 sample movies.

