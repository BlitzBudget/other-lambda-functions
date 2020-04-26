// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'eu-west-1'});

// Create the DynamoDB service object
var DB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log( 'event ' + JSON.stringify(event.Records[0]));
    let financialPortfolioId = parseInt(event.Records[0].Sns.Message);
    let deleteParams = {};
    
    await getAllGoals(event.Records[0].Sns.Message).then(function(result) {
       console.log("successfully fetched all the goals ", result);
       deleteParams = buildParamsForDelete(result, financialPortfolioId);
    }, function(err) {
       throw new Error("Unable to delete the goals " + err);
    });
    
    if(isEmpty(deleteParams)) {
        return event;
    }
    
    await deleteGoals(deleteParams).then(function(result) {
       console.log("successfully deleted the goals");
    }, function(err) {
       throw new Error("Unable to delete the goals " + err);
    });
        
    return event;
};

function buildParamsForDelete(result, financialPortfolioId) {
    if(isEmpty(result.Items)){
        return;
    }
    
    let params = {};
    params.RequestItems = {};
    params.RequestItems.goals = [];
    
    for(let i = 0, len = result.Items.length; i < len; i++) {
        let item = result.Items[i];
        params.RequestItems.goals[i] = { 
                    "DeleteRequest": { 
                       "Key": {
                           "financial_portfolio_id": financialPortfolioId,
                           "goal_timestamp": item['goal_timestamp']
                       }
                    }
                 };
        
    }
    
    return params;
}

// Get goal Item
function getAllGoals(financialPortfolioId) {
    var params = {
      TableName: 'goals',
      KeyConditionExpression   : "financial_portfolio_id = :financialPortfolioId",
      ExpressionAttributeValues: {
          ":financialPortfolioId": parseInt(financialPortfolioId)
      },
      ProjectionExpression: "goal_timestamp"
    };
    
    // Call DynamoDB to read the item from the table
    return new Promise((resolve, reject) => {
        DB.query(params, function(err, data) {
          if (err) {
            console.log("Error ", err);
            reject(err);
          } else {
            console.log("data retrieved ", JSON.stringify(data.Items));
            resolve(data);
          }
        });
    });
}


function deleteGoals(params) {
   
    return new Promise((resolve, reject) => {
        DB.batchWrite(params, function(err, data) {
          if (err) {
            console.log("Error ", err);
            reject(err);
          } else {
            resolve({ "success" : data});
          }
        });
    });
}

function  isEmpty(obj) {
  // Check if objext is a number or a boolean
  if(typeof(obj) == 'number' || typeof(obj) == 'boolean') return false; 
  
  // Check if obj is null or undefined
  if (obj == null || obj === undefined) return true;
  
  // Check if the length of the obj is defined
  if(typeof(obj.length) != 'undefined') return obj.length == 0;
   
  // check if obj is a custom obj
  for(let key in obj) {
        if(obj.hasOwnProperty(key))return false;
    }

  return true;
}