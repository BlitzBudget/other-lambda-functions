const FetchHelper = () => {};

const helper = require('./helper');
const bankAccount = require('../fetch/bank-account');
const category = require('../fetch/category');
const date = require('../fetch/date');
const transaction = require('../fetch/transaction');
const wallet = require('../fetch/wallet');

async function fetchAllItems(
  walletId,
  startsWithDate,
  endsWithDate,
  oneYearAgo,
  overviewData,
  docClient,
  events,
) {
  events.push(
    category.getCategoryData(
      walletId,
      startsWithDate,
      endsWithDate,
      overviewData,
      docClient,
    ),
  );
  // Get Transaction Items
  events.push(
    transaction.getTransactionItems(
      walletId,
      startsWithDate,
      endsWithDate,
      overviewData,
      docClient,
    ),
  );
  // Get Bank account for preview
  events.push(
    bankAccount.getBankAccountData(walletId, overviewData, docClient),
  );
  // Get Dates information to calculate the monthly Income / expense per month
  events.push(
    date.getDateData(
      walletId,
      oneYearAgo,
      endsWithDate,
      overviewData,
      docClient,
    ),
  );

  await Promise.all(events).then(
    () => {
      console.log('Cumilative data retrieved ', overviewData);
    },
    (err) => {
      throw new Error(
        `Unable error occured while fetching the transaction ${err}`,
      );
    },
  );
}

async function fetchAllWallets(walletId, userId, overviewData, docClient) {
  let walletPK = walletId;
  const events = [];
  async function fetchWalletsFromUser() {
    await wallet.getWalletsData(userId, overviewData, docClient).then(
      (result) => {
        walletPK = result.Wallet[0].walletId;
        console.log('retrieved the wallet for the item ', walletId);
      },
      (err) => {
        throw new Error(
          `Unable error occured while fetching the transaction ${err}`,
        );
      },
    );
  }

  if (helper.isEmpty(walletId) && helper.isNotEmpty(userId)) {
    await fetchWalletsFromUser(overviewData, docClient);
  } else if (helper.isNotEmpty(walletId) && helper.isNotEmpty(userId)) {
    events.push(
      wallet.getWalletData(userId, walletId, overviewData, docClient),
    );
  }
  return { walletPK, events };
}

FetchHelper.prototype.fetchAllWallets = fetchAllWallets;
FetchHelper.prototype.fetchAllItems = fetchAllItems;

// Export object
module.exports = new FetchHelper();