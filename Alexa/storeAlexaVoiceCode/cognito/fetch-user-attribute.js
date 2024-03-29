const FetchUser = () => {};

/*
 * Get User
 */
function getUser(response, cognitoidentityserviceprovider) {
  const params = {
    AccessToken: response.AuthenticationResult.AccessToken /* required */,
  };

  return new Promise((resolve, reject) => {
    cognitoidentityserviceprovider.getUser(params, (err, data) => {
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

FetchUser.prototype.getUser = getUser;
// Export object
module.exports = new FetchUser();
