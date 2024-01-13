const saraRoute = (req, res) => {
    res.send("Sara Kirby");
    };

const kevinRoute = (req, res) => {
    res.send("Kevin Kirby");
    };

module.exports = {
    saraRoute,
    kevinRoute
}