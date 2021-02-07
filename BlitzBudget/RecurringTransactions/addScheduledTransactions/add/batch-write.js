var batchWrite = function () { };

/*
 * Batch write all the transactions and dates created
 */
function batchWriteItems(paramsPartial, DB) {
    return new Promise((resolve, reject) => {
        DB.batchWrite(paramsPartial, function (err, data) {
            if (err) {
                console.log("Error ", err);
                reject(err);
            } else {
                console.log("successfully added the batch of data to the database");
                resolve({
                    "success": data
                });
            }
        });
    });
}

batchWrite.prototype.batchWriteItems = batchWriteItems;
// Export object
module.exports = new batchWrite(); 