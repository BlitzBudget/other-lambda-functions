var fetchUser = function () {};

/*
 * Get User
 */
function getUser(response, cognitoidentityserviceprovider) {
  let params = {
    AccessToken: response.AuthenticationResult.AccessToken /* required */,
  };

  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.getUser(params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        reject(err);
      } else {
        console.log(data); // successful response
        resolve(data);
      }
    });
  });
}

fetchUser.prototype.getUser = getUser;
// Export object
module.exports = new fetchUser();
