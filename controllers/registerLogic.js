const saveUser = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    if(!name || !email || !password) {
        return res.status(400).json('incorrect data');
    }
    db.transaction(trx => {
        trx('login').insert({
            email: email,
            hash: hash
        })
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .returning('*')
        })
        .then(user => {
            res.json(user[0]);
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json("unable to register"));
}

module.exports = {
    saveUser: saveUser
}