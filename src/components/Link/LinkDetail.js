import React, { useContext, useState } from "react";
import distanceInWordsNow from 'date-fns/distance_in_words_to_now'
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function LinkDetail(props) {

  const { firebase, user } = useContext(FirebaseContext);
  const [link, setLink] = useState(null);
  const [comments, setComments] = useState("");

  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection('Links').doc(linkId);


  React.useEffect(() => {
    getLink();
  }, []);

  function getLink() {
    linkRef.get().then(doc => {
      setLink({ id: doc.id, ...doc.data() });
    });
  }

  function handleComment() {
    if (!user) {
      props.history.push('/login');
    } else {
      linkRef.get().then(doc => {
        const previousComments = doc.data().comments;
        const comment = {
          postedBy: {
            id: user.uid,
            name: user.displayName
          },
          created: Date.now(),
          text: comments
        };
        const updatedComments = [...previousComments, comment];
        linkRef.update({ comments: updatedComments });

        setLink(prevState => ({
          ...prevState,
          comments: updatedComments
        }));
        setComments("");
      })
    }
  }

  return (
    !link
      ?
      <div>Loading...</div>
      :
      <div>
        <LinkItem key={link.id} showCount={false} link={link} />
        <textarea
          onChange={event => setComments(event.target.value)}
          value={comments}
          rows="6"
          cols="60"
        />
        <div>
          <button onClick={handleComment} className="button">Comment</button>
        </div>
        {link.comments.map((comment, index) => (
          <div key={index}>
            <p className="comment-author">
              {comment.postedBy.name} | {distanceInWordsNow(comment.created)}
            </p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
  );
}

export default LinkDetail;
