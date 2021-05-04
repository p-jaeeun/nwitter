import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  const createNweet = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  const onInputChange = (e) => {
    setNweet(e.target.value);
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  };

  const onClearAttachment = () => setAttachment(null);
  return (
    <>
      <form onSubmit={createNweet}>
        <input
          type="text"
          value={nweet}
          placeholder="What's in your mind?"
          maxLength={120}
          onChange={onInputChange}
        />
        <input type="file" accept="iamge/*" onChange={onFileChange} />
        <input type="submit" value="Ntweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="previewImg" width="50px" height="50px" />
            <button onClcik={onClearAttachment}>Cancel upload</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
