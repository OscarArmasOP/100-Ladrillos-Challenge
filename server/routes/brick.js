const bricksController = require('../controllers').bricks;

module.exports = (app) => {
    app.post('/api/brick', bricksController.create);
    app.post('/api/update-bricks', bricksController.updateBricks);
    app.get('/api/get-bricks', bricksController.getBricks);
}