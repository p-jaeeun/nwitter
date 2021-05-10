import React from 'react';
import AuthForm from 'components/AuthForm';
import SocialLogin from 'components/SocialLogin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;

  .nweeter-icon {
    color: #04aaff;
    margin-bottom: 30px;
  }
`;

const Auth = () => {
  return (
    <AuthContainer>
      <FontAwesomeIcon icon={faTwitter} size={'3x'} className="nweeter-icon" />
      <AuthForm />
      <SocialLogin />
    </AuthContainer>
  );
};

export default Auth;
