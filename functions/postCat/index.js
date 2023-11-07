const AWS = require("aws-sdk")
const {sendResponse}= require('../../responses')
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) =>{

    const cat = JSON.parse(event.body);

    const timestamp = new Date().getTime();

    cat.idnumber=`${timestamp}`;

    try{
   await db.put({

        TableName:'cats-db',
        Item: cat


    }).promise()



    return sendResponse(200, {success:true});}

    catch (error){
        return sendResponse(500, {success: false})
    }


}