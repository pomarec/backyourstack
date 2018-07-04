import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from '../routes';

export default class Header extends React.Component {

  static propTypes = {
    pathname: PropTypes.string,
    loggedInUser: PropTypes.object,
    brand: PropTypes.bool,
    login: PropTypes.bool,
    brandAlign: PropTypes.string,
  };

  static defaultProps = {
    brand: true,
    login: true,
    brandAlign: 'left',
  };

  render () {
    const { pathname, loggedInUser, brand, login, brandAlign } = this.props;
    return (
      <Fragment>

        <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .brand {
          width: 200px;
          height: 45px;
        }

        .brand img {
          width: 200px;
          height: 45px;
        }

        .login, .loggedInUser {
          margin-left: auto;
          margin-right: 60px;
        }

        a:not(.button) {
          color: inherit;
          text-decoration: none;
        }

        a:not(.button):hover {
          text-decoration: underline;
        }

        .profile {
          display: inline-block;
          vertical-align: -2px;
          height: 36px;
          line-height: 36px;
          color: #494D52;
        }

        .avatar {
          display: inline-block;
          vertical-align: middle;
          width: 36px;
          height: 36px;
          border-radius: 36px;
          margin-left: 10px;
          margin-right: 20px;
          border: 0;
        }

        `}
        </style>

        <header>
          <div
            className="brand"
            style={{
              visibility: brand ? 'visible' : 'hidden',
              margin: brandAlign === 'left' ? '0 0 0 60px' : 'auto',
            }}
            >
            <Link route="index">
              <a>
                <img src="/static/img/logo-bys-horizontal.png" alt="Back Your Stack" />
              </a>
            </Link>
          </div>
          {loggedInUser && (
            <div className="loggedInUser" style={{ display: login ? 'block' : 'none' }}>
              <span className="profile">
                Welcome&nbsp;
                <strong>
                  <Link route="profile" params={{ id: loggedInUser.username }}>
                    <a>{loggedInUser.displayName} ({loggedInUser.username})</a>
                  </Link>
                </strong>
              </span>
              <Link route="profile" params={{ id: loggedInUser.username }}>
                <a>
                  <img className="avatar" src={loggedInUser.avatarUrl} />
                </a>
              </Link>
              &nbsp;
              <Link route="logout" params={{ next: pathname || '/' }}>
                <a className="button">Sign Out</a>
              </Link>
            </div>
          )}
          {!loggedInUser && (
            <div className="login" style={{ display: login ? 'block' : 'none' }}>
              <Link route="login" params={{ next: pathname || '/' }}>
                <a className="button">Sign In with GitHub</a>
              </Link>
            </div>
          )}
        </header>

      </Fragment>
    );
  }

}