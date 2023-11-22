const AWS = require("aws-sdk");
const { sendResponse } = require('../../responses');
const middy = require("@middy/core");
const { validateToken } = require("../middleware/auth");
const db = new AWS.DynamoDB.DocumentClient();
//import middy from "@middy/core";

const getCats = async (event, context) => {
    if (event?.error && event?.error === '401')
        return sendResponse(401, { success: false, message: 'Invalid token' })

    const { Items } = await db.scan({
        TableName: 'cats-db',
        FilterExpression: "attribute_exists(#idnumber)",
        ExpressionAttributeNames: {
            "#idnumber": "idnumber"
        }
    }).promise();

    return sendResponse(200, { success: true, cats: Items });
}

const handler = middy(getCats)
    .use(validateToken);

module.exports = { handler };
