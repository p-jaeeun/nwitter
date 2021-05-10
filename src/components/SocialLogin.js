import React from 'react';
import { authService, firebaseInstance } from 'fBase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const SocialBlock = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;
const SocialBtn = styled.button`
  font-size: 0.9rem;
  background-color: #fff;
  color: #000;
  outline: none;
  border: 1px solid #000;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #000;
    color: #fff;
  }

  & + & {
    margin-top: 10px;
  }

  .social-icon {
    margin-left: 5px;
  }
`;
const SocialLogin = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <SocialBlock>
      <SocialBtn onClick={onSocialClick} name="google">
        Continue with Google
        <FontAwesomeIcon icon={faGoogle} className="social-icon" />
      </SocialBtn>
      <SocialBtn onClick={onSocialClick} name="github">
        Continue with Github
        <FontAwesomeIcon icon={faGithub} className="social-icon" />
      </SocialBtn>
    </SocialBlock>
  );
};

export default SocialLogin;
