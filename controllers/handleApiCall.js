const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "9828e58614dc421183b4b41c9b9e137b"
});

const handleApiCall = (req, res) => {
    const { url } = req.body;
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        url
      )
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        res.status(400).json("Error getting face");
    })
}

module.exports = {
    handleApiCall: handleApiCall
}