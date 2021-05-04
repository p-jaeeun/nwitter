import { dbService } from "fBase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const deleteNweet = () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    console.log(ok);
    if (ok) {
      //delete nweet
      dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => {
    setIsEdit((prev) => !prev);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setIsEdit(false);
  };
  const onChange = (e) => {
    setNewNweet(e.target.value);
  };
  return (
    <div>
      {isEdit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet!"
              value={newNweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              alt="uploadedImg"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit</button>
              <button onClick={deleteNweet}>❌</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
