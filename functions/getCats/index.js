const AWS = require("aws-sdk")
const {sendResponse}= require('../../responses')
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) =>{


   const {Items} = await db.scan({
        TableName:'cats-db'
    }).promise();

    return sendResponse(200, {success: true, cats: Items});


}