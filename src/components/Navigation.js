import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const NavUl = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  .nweeter-icon {
    color: #04aaff;
  }
`;

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <NavUl>
        <li>
          <Link to="/">
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              className="nweeter-icon"
            />
            HOME
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} size="2x" className="nweeter-icon" />
            {userObj?.displayName?.length
              ? `${userObj.displayName}'s Profile`
              : 'Profile'}
          </Link>
        </li>
      </NavUl>
    </nav>
  );
};

export default Navigation;
