import React, { Component } from 'react';
import './style.scss';

class Home extends Component {
  componentDidMount() {
    this.props.changeActiveNav();
  }
  render() {
    return (
      <section className="homepage">
        <div className="homepage--info">
          <nav className="homepage-nav">
            <div className="homepage-nav--left">
              <a href="/" className="pl-0">
                <div className="homepage--logo-image"></div>
              </a>
              <a href="/features">Features</a>
            </div>
            <div className="sign-in-desktop">
              <a href="/signin">Login</a>
              <a href="/signup">
                <button>Sign Up Now</button>
              </a>
            </div>
          </nav>
          <div className="sign-in-mobile">
            <a href="/signin">Login</a>
            <a href="/signup">
              <button>Sign Up Now</button>
            </a>
          </div>
          <div className="homepage-content">
            <h5 className="mt-3">Forever. Banking.</h5>
            <h1>
              Banking <br></br>has never been <br></br>so rewarding.
            </h1>
            <h2>A banking experience consisting of an app with limitless capabilities.</h2>
          </div>
        </div>
        <div className="homepage--image"></div>
      </section>
    );
  }
}

export default Home;
