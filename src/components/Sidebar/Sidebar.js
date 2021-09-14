import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import classes from './Sidebar.module.css';
import { Link, Redirect, withRouter } from 'react-router-dom';
import HomeLogo from '../../assets/images/sidebar/home.svg';
import HomeActiveLogo from '../../assets/images/sidebar/active/home.svg';
import WishlistLogo from '../../assets/images/sidebar/wishlist.svg';
import WishlistActiveLogo from '../../assets/images/sidebar/active/wishlist.svg';
import TransactionLogo from '../../assets/images/sidebar/transaction.svg';
import TransactionActiveLogo from '../../assets/images/sidebar/active/transaction.svg';
import StoreLogo from '../../assets/images/sidebar/store.svg';
import StoreActiveLogo from '../../assets/images/sidebar/active/store.svg';
//import GroupLogo from '../../assets/images/sidebar/group.svg';
import * as actions from '../../store/actions/index';

import { selectTenantData, selectUserData, selectUserId } from '../../store/selectors/auth';

class Sidebar extends Component {
  state = {
    redirect: false,
  };

  authRedirectHandler = (path) => {
    this.props.onSetAuthRedirectPath(path);
    this.setState({ redirect: true });
  };

  render() {
    const { tenantData, location } = this.props;
   
    console.log(tenantData, location);
    let appLogo = localStorage.getItem('logo_path') || this.props.onboarding_configs.splash_image;
 
    let redirectUrl = null;
    if (this.state.redirect) {
      redirectUrl = <Redirect to="/sign-in" />;
    }

    let url = location.pathname;
    //let search = window.location.search;
    //let params = new URLSearchParams(search);
    console.log('url', url);
    return (
      <Aux>
        {redirectUrl}
        <div className={classes.bgSidebar + ' col-lg-2 sidenav hidden-xs nopadding'}>
          <br />
          <div className={classes.logoImage}>
            <Link to="/home">
              {appLogo !== '' ? (
                <img
                  className="img-fluid"
                  src={appLogo}
                  style={{ width: '95px',height:'50px' }}
                  alt="Tradly"
                  title="Tradly"
                />
              ) : (
                'Loading...'
              )}
            </Link>
          </div>
          <ul className="nav nav-pills nav-stacked">
            <li
              className={
                url === '/' || url === '/home' || url.indexOf('/store-details') > -1 ? 'active' : ''
              }
            >
              <Link to="/home" style={{ display: 'flex ', alignItems: 'center' }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={url === '/' || url === '/home' ? 'var(--primary_color)' : '#e6e6e6'}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 22.065V17.065C15 16.2693 14.6839 15.5063 14.1213 14.9437C13.5587 14.3811 12.7956 14.065 12 14.065C11.2044 14.065 10.4413 14.3811 9.87868 14.9437C9.31607 15.5063 9 16.2693 9 17.065V22.065H4C3.46957 22.065 2.96086 21.8543 2.58579 21.4792C2.21071 21.1041 2 20.5954 2 20.065V9.19699C2 8.85162 2.08943 8.51213 2.25959 8.21159C2.42976 7.91104 2.67485 7.65969 2.971 7.48199L10.971 2.68199C11.2818 2.49549 11.6375 2.39697 12 2.39697C12.3625 2.39697 12.7182 2.49549 13.029 2.68199L21.029 7.48199C21.3252 7.65969 21.5702 7.91104 21.7404 8.21159C21.9106 8.51213 22 8.85162 22 9.19699V20.065C22 20.5954 21.7893 21.1041 21.4142 21.4792C21.0391 21.8543 20.5304 22.065 20 22.065H15Z" />
                </svg>

                <span>Home</span>
              </Link>
            </li>
            <li className={url === '/wishlist' ? 'active' : ''}>
              {!this.props.isAuthentication ? (
                <Link
                  to="#"
                  onClick={(path) => this.authRedirectHandler('/wishlist')}
                  style={{ display: 'flex ', alignItems: 'center' }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={url === '/wishlist' ? 'var(--primary_color)' : '#e6e6e6'}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.6328 6.64689C21.3187 5.91948 20.8657 5.2603 20.2992 4.70627C19.7323 4.15058 19.064 3.70898 18.3305 3.40549C17.5699 3.08953 16.7541 2.92781 15.9305 2.9297C14.775 2.9297 13.6477 3.24611 12.668 3.84377C12.4336 3.98674 12.2109 4.14377 12 4.31486C11.7891 4.14377 11.5664 3.98674 11.332 3.84377C10.3523 3.24611 9.225 2.9297 8.06953 2.9297C7.2375 2.9297 6.43125 3.08908 5.66953 3.40549C4.93359 3.71017 4.27031 4.14845 3.70078 4.70627C3.13359 5.25968 2.6805 5.91901 2.36719 6.64689C2.04141 7.40392 1.875 8.20783 1.875 9.03517C1.875 9.81564 2.03438 10.6289 2.35078 11.4563C2.61563 12.1477 2.99531 12.8649 3.48047 13.5891C4.24922 14.7352 5.30625 15.9305 6.61875 17.1422C8.79375 19.1508 10.9477 20.5383 11.0391 20.5945L11.5945 20.9508C11.8406 21.1078 12.157 21.1078 12.4031 20.9508L12.9586 20.5945C13.05 20.536 15.2016 19.1508 17.3789 17.1422C18.6914 15.9305 19.7484 14.7352 20.5172 13.5891C21.0023 12.8649 21.3844 12.1477 21.6469 11.4563C21.9633 10.6289 22.1227 9.81564 22.1227 9.03517C22.125 8.20783 21.9586 7.40392 21.6328 6.64689Z" />
                  </svg>
                  <span>My Wishlist</span>
                </Link>
              ) : (
                <Link to="/wishlist" style={{ display: 'flex ', alignItems: 'center' }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={url === '/wishlist' ? 'var(--primary_color)' : '#e6e6e6'}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.6328 6.64689C21.3187 5.91948 20.8657 5.2603 20.2992 4.70627C19.7323 4.15058 19.064 3.70898 18.3305 3.40549C17.5699 3.08953 16.7541 2.92781 15.9305 2.9297C14.775 2.9297 13.6477 3.24611 12.668 3.84377C12.4336 3.98674 12.2109 4.14377 12 4.31486C11.7891 4.14377 11.5664 3.98674 11.332 3.84377C10.3523 3.24611 9.225 2.9297 8.06953 2.9297C7.2375 2.9297 6.43125 3.08908 5.66953 3.40549C4.93359 3.71017 4.27031 4.14845 3.70078 4.70627C3.13359 5.25968 2.6805 5.91901 2.36719 6.64689C2.04141 7.40392 1.875 8.20783 1.875 9.03517C1.875 9.81564 2.03438 10.6289 2.35078 11.4563C2.61563 12.1477 2.99531 12.8649 3.48047 13.5891C4.24922 14.7352 5.30625 15.9305 6.61875 17.1422C8.79375 19.1508 10.9477 20.5383 11.0391 20.5945L11.5945 20.9508C11.8406 21.1078 12.157 21.1078 12.4031 20.9508L12.9586 20.5945C13.05 20.536 15.2016 19.1508 17.3789 17.1422C18.6914 15.9305 19.7484 14.7352 20.5172 13.5891C21.0023 12.8649 21.3844 12.1477 21.6469 11.4563C21.9633 10.6289 22.1227 9.81564 22.1227 9.03517C22.125 8.20783 21.9586 7.40392 21.6328 6.64689Z" />
                  </svg>
                  <span>My Wishlist</span>
                </Link>
              )}
            </li>
            <li className={url === '/listings' || url.includes('/product') ? 'active' : ''}>
              <Link to="/listings" style={{ display: 'flex ', alignItems: 'center' }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={url === '/listings' ? 'var(--primary_color)' : '#e6e6e6'}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21.546 7.93789L19.4386 4.49805C19.2502 4.18926 18.9158 4 18.5586 4H5.44014C5.08296 4 4.7485 4.18926 4.56017 4.49805L2.45277 7.93789C1.36498 9.71426 2.32938 12.1846 4.36209 12.4668C4.50821 12.4867 4.65758 12.4967 4.80695 12.4967C5.7681 12.4967 6.61885 12.065 7.20334 11.3977C7.78782 12.065 8.64182 12.4967 9.59973 12.4967C10.5609 12.4967 11.4116 12.065 11.9961 11.3977C12.5806 12.065 13.4346 12.4967 14.3925 12.4967C15.3537 12.4967 16.2044 12.065 16.7889 11.3977C17.3766 12.065 18.2274 12.4967 19.1853 12.4967C19.3379 12.4967 19.484 12.4867 19.6301 12.4668C21.6693 12.1879 22.637 9.71758 21.546 7.93789ZM19.1918 13.5625C18.8671 13.5625 18.5456 13.5127 18.2339 13.4363V16.75H5.76486V13.4363C5.45313 13.5094 5.13166 13.5625 4.80695 13.5625C4.61212 13.5625 4.41404 13.5492 4.22246 13.5227C4.04062 13.4961 3.86203 13.4529 3.68993 13.4031V19.9375C3.68993 20.5252 4.15427 21 4.72902 21H19.2762C19.851 21 20.3153 20.5252 20.3153 19.9375V13.4031C20.1399 13.4563 19.9646 13.4994 19.7828 13.5227C19.5847 13.5492 19.3899 13.5625 19.1918 13.5625Z" />
                </svg>

                <span>Listings</span>
              </Link>
            </li>
            {/* <li className={url === '/my-transaction' ? 'active' : ''}>
              <Link to="/my-transaction">
                <img
                  className="img-fluid"
                  src={url === '/my-transaction' ? TransactionActiveLogo : TransactionLogo}
                  alt="Home"
                  title="Home"
                />
                <span>My Transaction</span>
              </Link>
            </li>
             */}
            <li>
              {!this.props.isAuthentication ? (
                <Link to="#" onClick={(path) => this.authRedirectHandler('/store')}>
                  <img
                    className="img-fluid"
                    src={url === '/store' ? StoreActiveLogo : StoreLogo}
                    alt="store"
                    title="store"
                  />
                  <span>My Store</span>
                </Link>
              ) : (
                <Link to="/store" style={{ display: 'flex ', alignItems: 'center' }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={url === '/store' ? 'var(--primary_color)' : '#e6e6e6'}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21.546 7.93789L19.4386 4.49805C19.2502 4.18926 18.9158 4 18.5586 4H5.44014C5.08296 4 4.7485 4.18926 4.56017 4.49805L2.45277 7.93789C1.36498 9.71426 2.32938 12.1846 4.36209 12.4668C4.50821 12.4867 4.65758 12.4967 4.80695 12.4967C5.7681 12.4967 6.61885 12.065 7.20334 11.3977C7.78782 12.065 8.64182 12.4967 9.59973 12.4967C10.5609 12.4967 11.4116 12.065 11.9961 11.3977C12.5806 12.065 13.4346 12.4967 14.3925 12.4967C15.3537 12.4967 16.2044 12.065 16.7889 11.3977C17.3766 12.065 18.2274 12.4967 19.1853 12.4967C19.3379 12.4967 19.484 12.4867 19.6301 12.4668C21.6693 12.1879 22.637 9.71758 21.546 7.93789ZM19.1918 13.5625C18.8671 13.5625 18.5456 13.5127 18.2339 13.4363V16.75H5.76486V13.4363C5.45313 13.5094 5.13166 13.5625 4.80695 13.5625C4.61212 13.5625 4.41404 13.5492 4.22246 13.5227C4.04062 13.4961 3.86203 13.4529 3.68993 13.4031V19.9375C3.68993 20.5252 4.15427 21 4.72902 21H19.2762C19.851 21 20.3153 20.5252 20.3153 19.9375V13.4031C20.1399 13.4563 19.9646 13.4994 19.7828 13.5227C19.5847 13.5492 19.3899 13.5625 19.1918 13.5625Z" />
                  </svg>
                  <span>My Store</span>
                </Link>
              )}
            </li>
            {/* <li>
              <Link to="/group">
                <img className="img-fluid" src={GroupLogo} alt="Home" title="Home" />
                <span>Group</span>
              </Link>
            </li> */}
          </ul>
          <br />
        </div>
        <br />
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: selectUserId(state),
    tenantData: selectTenantData(state),
    userData: selectUserData(state),
    onboarding_configs: state.auth.onboarding_configs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path, null)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));




