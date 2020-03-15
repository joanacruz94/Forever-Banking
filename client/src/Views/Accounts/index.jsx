import React, { Component } from 'react';
import './style.scss';

import Layout from '../../Components/Layout';
import Account from '../../Components/Account';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Accounts = props => {
  console.log(props);
  return (
    <Layout>
      <h1>Accounts</h1>
      <div className="action-container">
        <Button variant="contained" className="primary">
          <i className="fas fa-plus"></i>
        </Button>
        <Button variant="contained" className="secondary">
          <i className="fas fa-sync-alt"></i>
        </Button>
        <Button variant="contained" className="third">
          <i className="fas fa-times"></i>
        </Button>
      </div>
      <Account />
    </Layout>
  );
};
<<<<<<< HEAD
=======

import { userIDAccounts } from './../../Services/account';

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: []
    };
    this.removeAccount = this.removeAccount.bind(this);
  }

  addingAccount() {
    console.log('add account');
  }

  refresh() {
    window.location.reload();
    console.log('refresh');
  }

  getData() {
    const userID = this.props.user._id;
    userIDAccounts(userID)
      .then(account => {
        console.log('LENGTH', account.length);
        this.setState({
          account
        });
      })
      .catch(error => console.log(error));
  }

  removeAccount(id) {
    this.setState(previousState => {
      return {
        account: previousState.account.filter(acc => acc._id !== id)
      };
    });
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    //Works but its not good
    //this.getData();
  }

  render() {
    return (
      <Layout>
        <h1 className="pb-3">Accounts</h1>
        <div className="action-container">
          <Link to={`/accounts/add-account`} onClick={this.addingAccount}>
            <Button variant="contained" className="primary">
              <i className="fas fa-plus"></i>
            </Button>
          </Link>
          <Button variant="contained" className="secondary" onClick={this.refresh}>
            <i className="fas fa-sync-alt"></i>
          </Button>
        </div>
        {this.state.account.map(single => {
          console.log(single);
          return <Account key={single._id} {...single} />;
        })}
      </Layout>
    );
  }
}
>>>>>>> 9a8a74c4c22abf20cbe6219f18515c7e0662bbc8

export default Accounts;
