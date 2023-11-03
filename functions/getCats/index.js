const {sendResponse} = require('../../responses/index');

var cats = [
    {
        "name": "Whiskers",
        "age": 2,
        "idnumber": "CAT123456",
        "breed": "Siamese",
        "color": "Seal Point"
    },
    {
        "name": "Mittens",
        "age": 4,
        "idnumber": "CAT789012",
        "breed": "Maine Coon",
        "color": "Tabby"
    },
    {
        "name": "Luna",
        "age": 1,
        "idnumber": "CAT654321",
        "breed": "Persian",
        "color": "White"
    }
];

exports.handler = async (event, context) =>{

    return sendResponse(200, {cats});


}