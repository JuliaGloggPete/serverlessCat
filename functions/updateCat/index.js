const AWS = require("aws-sdk")
const {sendResponse}= require('../../responses')
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) =>{
const {catId} = event.pathParameters;


const updateAttributes = JSON.parse(event.body);

const updateExpression = 'set '+ Object.keys(updateAttributes).map(attributeName => `${attributeName} = :${attributeName}`).join(', ');

//const ExpressionAttributeValues = Object.keys(updateAttributes).reduce((values, attributeName) => {

///})
const expressionAttributeValues = Object.keys(updateAttributes).reduce((values, attributeName) =>{
    values[`:${attributeName}`] = updateAttributes[attributeName];
        return values;
},{});


expressionAttributeValues[':catId']= catId;
try{
await db.update( {
TableName: 'cats-db',
Key: {idnumber: catId},
ReturnValues: 'ALL_NEW',
UpdateExpression: updateExpression,
ConditionExpression:'idnumber = :catId',
ExpressionAttributeValues: expressionAttributeValues
/*{
    ':age' : age,
    ':dogID': catId,


}*/
}

).promise();

return sendResponse(200, {success: true});

}
catch{

return sendResponse(500, {success: false, message:'could not update cat' });

}




}