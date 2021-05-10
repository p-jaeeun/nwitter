import React, { useState } from 'react';
import { authService } from 'fBase';
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .authError {
    padding: 10px 0;
    font-size: 0.8rem;
    color: red;
    text-align: center;
    font-weight: bold;
  }
`;

const AuthInput = styled.input`
  max-width: 320px;
  width: 100%;
  height: 45px;
  padding: 10px;
  border-radius: 6px;
  background-color: #fff;
  margin-bottom: 12px;
  color: black;
  border: 1px solid #bebebe;
  font-size: 0.9rem;

  &:focus,
  :active {
    border: 1px solid #04aaff;
  }
`;

const InputSubmit = styled.input`
  background: #04aaff;
  padding: 10px;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 0;
  text-transform: uppercase;
  width: 100%;
  max-width: 320px;
  border-radius: 30px;
  border-color: transparent;
  box-shadow: 0px;
  outline: none;
  transition: 0.15s;
  text-align: center;
`;

const ToggleBtn = styled.span`
  font-size: 0.8rem;
  color: #04aaff;
  cursor: pointer;
  padding: 20px;
`;

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onHandleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newAccount) {
        // create new account
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        // login
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <Form onSubmit={onHandleSubmit}>
        <AuthInput
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={onHandleChange}
          required
        />
        <AuthInput
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={onHandleChange}
          required
        />
        <InputSubmit type="submit" value={newAccount ? '회원가입' : '로그인'} />
        {error && <span className="authError">{error}</span>}
      </Form>
      <ToggleBtn onClick={toggleAccount}>
        {newAccount
          ? '이미 계정이 있으신가요? · 로그인'
          : '아직 회원이 아니신가요? · 회원가입'}
      </ToggleBtn>
    </>
  );
};

export default AuthForm;
