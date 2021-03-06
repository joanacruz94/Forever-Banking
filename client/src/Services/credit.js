import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/credit'
});


const singleAccount = async id => {
  try {
    const result = await instance.get(`/${id}`);
    const credit = result.data.credit;
    return credit;
  } catch (error) {
    throw error;
  }
};

// only showing the accounts that belong to that user
const creditAccounts = async userID => {
  try {
    const result = await instance.get(`/${userID}/credit`);
    const account = result.data.accounts;
    return account;
  } catch (error) {
    throw error;
  }
};

// when user applys for credit an account is created
const createAccount = async data => {
  try {
    const result = await instance.post('/apply-for-credit', data);
    const account = result.data.account;
    return account;
  } catch (error) {
    throw error;
  }
};

// deleting an account from users account
const deleteAccount = async idAccount => {
  try {
    await instance.post(`/${idAccount}/delete-account`);
  } catch (error) {
    throw error;
  }
};

export { singleAccount, creditAccounts, createAccount, deleteAccount };
