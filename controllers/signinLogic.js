const enterUser = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    db.select('*').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            return db('users').select('*')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
            .catch(err => {
                res.status(400).json('Unable to get user');
            })
        } else {
            res.status(400).json('wrong credentials');
        }
    })
    .catch(err => {
        res.status(400).send('Unable to login');
    })
}

module.exports = {
    enterUser: enterUser
}