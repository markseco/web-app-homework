const express = require('express')
const bodyParser = require('body-parser');
const pool = require('./db');


const app = express();
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('Homework 3')
});

// USERS ENDPOINTS


app.get('/users', async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/*
    EXAMPLE OF JSON BODY FOR POST REQUEST
        {
            "username": "marcos",
            "role": "admin"
        }
*/

app.post('/add-user', async (req, res) => {
    try{
        const { username, role } = req.body;
        //insert user in db
        const [result] = await pool.query('INSERT INTO users (username, role) VALUES (?, ?)', [username, role]);
        res.json({ id: result.insertId });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/*
    EXAMPLE OF JSON BODY FOR PUT REQUEST
        {
            "username": "marcos",
            "role": "admin",
            "id": 1
        }
*/

app.put('/update-user', async (req, res) => {
    try{
        const { username, role, id } = req.body;
        //update user in db
        const [result] = await pool.query('UPDATE users SET username = ?, role = ? WHERE id = ?', [username, role, id]);
        res.json({ id: id });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/*
    EXAMPLE OF JSON BODY FOR DELETE REQUEST
        {
            "id": 1
        }
*/

app.delete('/delete-user', async (req, res) => {
    try{
        const { id } = req.body;
        //delete user in db
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ id: id });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// POSTS ENDPOINTS

app.get('/posts', async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM posts');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


/*
    EXAMPLE OF JSON BODY FOR POST REQUEST
        {
            "title": "my first post",
            "body": "this is the body of my first post",
            "user_id": 1,
            "status": "published"
        }
*/

app.post('/add-post', async (req, res) => {
    try{
        const { title, body, user_id, status } = req.body;

        if(!title || !body || !user_id){
            throw new Error('Missing parameters');
        }
        if(typeof user_id !== 'number'){
            throw new Error('user id must be a number');
        }
        if(body.length > 200){
            throw new Error('body of the post must be less than 250 characters');
        }
        if(title.length > 45){
            throw new Error('title of the post must be less than 45 characters');
        }
        //insert post in db
        const [result] = await pool.query('INSERT INTO posts (title, body, user_id, status) VALUES (?, ?, ?, ?)', [title, body, user_id, status]);
        res.json({ id: result.insertId });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/*
    EXAMPLE OF JSON BODY FOR PUT REQUEST
        {
            "title": "my first post",
            "body": "this is the body of my first post",
            "user_id": 1,
            "status": "published",
            "id": 2
        }
*/

app.put('/update-post', async (req, res) => {
    try{
        const { title, body, user_id, status, id } = req.body;
        //update post in db
        const [result] = await pool.query('UPDATE posts SET title = ?, body = ?, user_id = ?, status = ? WHERE id = ?', [title, body, user_id, status, id]);
        res.json({ id: id });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/*
    EXAMPLE OF JSON BODY FOR DELETE REQUEST
        {
            "id": 2
        }
*/

app.delete('/delete-post', async (req, res) => {
    try{
        const { id } = req.body;
        //delete post in db
        const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
        res.json({ id: id });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// FOLLOWS ENDPOINTS

app.get('/follows', async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM follows');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

/*
    EXAMPLE OF JSON BODY FOR POST REQUEST
        {
            "following_user_id": 1,
            "followed_user_id": 2
        }
*/

app.post('/add-follow', async (req, res) => {
    try{
        const { following_user_id, followed_user_id } = req.body;
        //insert follow in db
        const [result] = await pool.query('INSERT INTO follows (following_user_id, followed_user_id) VALUES (?, ?)', [following_user_id, followed_user_id]);
        res.json({ id: result.insertId });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// IT DOESNT MAKE SENSE TO UPDATE A FOLLOW: this is because a follow is just a relationship between two users, so if we want to update it, we should delete it or create a new one

/*
    EXAMPLE OF JSON BODY FOR DELETE REQUEST
        {
            "followed_user_id": 2,
            "following_user_id": 1
        }
*/

app.delete('/delete-follow', async (req, res) => {
    try{
        const { followed_user_id, following_user_id } = req.body;
        //delete follow in db
        const [result] = await pool.query('DELETE FROM follows WHERE followed_user_id = ? AND following_user_id = ?', [followed_user_id, following_user_id]);
        res.json('Deleted follow');
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});




app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
});