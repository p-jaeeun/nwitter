import React, { useState } from "react";
import { storageService, dbService } from "fBase";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const createNweet = async (e) => {
    e.preventDefault();
    let attachmentUrl = "";
    // 이미지와 함께 트윗을 할 경우, 이미지 url를 받아서 트윗작성 후 함께 저장
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
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
          <button onClick={onClearAttachment}>Cancel upload</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
