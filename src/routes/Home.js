import { dbService } from 'fBase';

import React, { useEffect, useState } from 'react';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  align-items: center;
`;
const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService
      .collection('nweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  return (
    <HomeContainer>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </HomeContainer>
  );
};

export default Home;
