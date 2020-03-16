import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { addAccount, userIDAccounts } from '../../Services/account';

import Breadcrumb from 'react-bootstrap/Breadcrumb';

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accountIDFrom: '',
      accountInfo: '',
      balance: '',
      types: ['Savings', 'Current', 'Credit'],
      type: 'Savings',
      options: ['Existing', 'External'],
      option: 'Existing'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getData = this.getData.bind(this);
    this.handleAccountFromChange = this.handleAccountFromChange.bind(this);
  }

  handleInputChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;
    this.setState({
      [inputName]: value
    });
    console.log('value', value);
    if (value === 'Credit') {
      this.setState({
        balance: '5000'
      });
    }
  }

  componentDidMount() {
    this.props.changeActiveNav();
    this.getInfo();
  }

  handleAccountFromChange(event) {
    const inputName = event.target.name;
    const value = event.target.value;

    const accountSplitted = value.split(' ');
    const accountIDFrom = accountSplitted[0];

    this.setState({
      accountIDFrom
    });
    console.log(inputName, 'inputname', value, 'value');
  }

  getInfo() {
    const userID = this.props.userID;

    const account = Object.assign({}, this.state);
    account.userID = userID;

    userIDAccounts(userID)
      .then(account => {
        this.setState({
          accounts: account,
          type: account[0].type,
          accountIDFrom: account[0]._id
        });
      })
      .catch(error => console.log(error));
  }

  randomKey() {
    let Numberresult = '';
    let Numbercharacters = '0123456789';
    let NumbercharactersLength = Numbercharacters.length;
    for (let i = 0; i < 2; i++) {
      Numberresult += Numbercharacters.charAt(Math.floor(Math.random() * NumbercharactersLength));
    }

    let Letterresult = '';
    let Lettercharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let LettercharactersLength = Lettercharacters.length;
    for (let i = 0; i < 20; i++) {
      Letterresult += Lettercharacters.charAt(Math.floor(Math.random() * LettercharactersLength));
    }

    let result = Numberresult + Letterresult;
    console.log(result);
    return result;
  }

  getData(event) {
    event.preventDefault();
    const userID = this.props.userID;
    const accountNumber = this.randomKey();

    const account = Object.assign({}, this.state);
    account.accountNumber = accountNumber;
    account.userID = userID;

    console.log(account, 'NEW');

    addAccount(account)
      .then(account => {
        this.props.history.push({
          pathname: '/accounts'
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Layout>
        <Breadcrumb>
          <Breadcrumb.Item href="/accounts">Accounts</Breadcrumb.Item>
          <Breadcrumb.Item className="disable-breadcrumb">Creating a New Account</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="mb-4">Creating a New Account</h1>
        <form onSubmit={event => this.getData(event)} className="add-account-form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <InputLabel htmlFor="age-native-simple">Type of Account</InputLabel>
                <Select name="type" native onChange={event => this.handleInputChange(event)}>
                  {this.state.types.map(type => (
                    <option value={type} key={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {this.state.type === 'Credit' ? (
              <Grid item xs={12} sm={12}>
                <div>We offer a 5.000€ starting credit limit</div>
              </Grid>
            ) : (
              <>
                <Grid item xs={12} sm={12}>
                  <h4 className="pt-3 pb-2">Add money to your account</h4>
                  <FormControl>
                    <InputLabel htmlFor="age-native-simple">Choose to top up using:</InputLabel>
                    <Select name="option" native onChange={event => this.handleInputChange(event)}>
                      {this.state.options.map(option => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {this.state.option === 'Existing' ? (
                  <Grid item xs={12} sm={12}>
                    <h4 className="pt-3 pb-2">Amount of money you would like to add</h4>
                    <FormControl>
                      <Select
                        name="accountInfo"
                        native
                        className="mb-4"
                        onChange={event => this.handleAccountFromChange(event)}
                      >
                        {console.log(this.state.accounts)}
                        {this.state.accounts.map(acc => (
                          <option value={acc._id + ' ' + acc.type} key={acc.accountNumber}>
                            {acc.accountNumber + ' ' + acc.type}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="balance"
                      label="Balance"
                      name="balance"
                      type="number"
                      value={this.state.balance}
                      onChange={event => this.handleInputChange(event)}
                    />
                  </Grid>
                ) : (
                  <>
                    <h4 className="pl-2 pt-3 pb-2">Add money to your new account</h4>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="iban"
                        label="IBAN"
                        name="iabn"
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="reference"
                        label="Reference"
                        name="reference"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="balance"
                        label="Balance"
                        name="balance"
                        type="number"
                        value={this.state.balance}
                        onChange={event => this.handleInputChange(event)}
                      />
                    </Grid>
                  </>
                )}
              </>
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Create New Account
          </Button>
        </form>
      </Layout>
    );
  }
}

export default AddAccount;
