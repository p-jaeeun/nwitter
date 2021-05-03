import { dbService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async (e) => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObj = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObj, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
  }, []);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      nweet,
      createdAt: Date.now(),
    });
    setNweet("");
  };

  const onChange = (e) => {
    setNweet(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <input
          type="text"
          value={nweet}
          placeholder="What's in your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="Ntweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
