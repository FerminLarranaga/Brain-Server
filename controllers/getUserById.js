const getUser = (db) => (req, res) =>{
    const { id } = req.params;
    db.select('*')
        .from('users')
        .where({id})
        .then(user => {
            user.length? 
            res.json(user[0]) :
            res.status(404).send('Not found');
        })
        .catch(err => {
            res.status(400).send('error getting user!');
        });
}

module.exports = {
    getUserById: getUser
}