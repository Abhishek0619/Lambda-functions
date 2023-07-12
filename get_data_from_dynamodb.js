const AWS=require('aws-sdk');
var docClient=new AWS.DynamoDB.DocumentClient();

var tableName=""; // Enter your Dynamo DB table name here

exports.handler =(event,context,callback) => {
    console.log(event.Name)
    
    
var params={
    TableName: tableName,
    Key:{
        "Name":event.Name
    }
}

docClient.get(params,function(err,data){
    callback(err,data);
})

};
