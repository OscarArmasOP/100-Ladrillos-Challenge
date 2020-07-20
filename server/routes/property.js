const propertyController = require('../controllers').properties;

const cm = require('connect-multiparty');
const md_upload = cm({ uploadDir: './server/uploads/img/' });

module.exports = (app) => {
    app.post('/api/property', propertyController.create);
    app.put('/api/property', propertyController.update);
    app.post('/api/upload-img', md_upload, propertyController.uploadImg);
    app.get('/api/get-property', propertyController.getProperty);
    app.get('/api/properties', propertyController.getAll);
}