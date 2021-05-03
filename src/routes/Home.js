import { dbService } from "fBase";
import React, { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");

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
    </div>
  );
};

export default Home;
