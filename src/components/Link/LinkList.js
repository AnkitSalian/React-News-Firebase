import React, { useState } from "react";
import { FirebaseContext } from "../../firebase";

import LinkItem from './LinkItem';

function LinkList(props) {

  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const isNewPage = props.location.pathname.includes('new');
  const isTopPage = props.location.pathname.includes('top');

  React.useEffect(() => {
    const unsubscribe = getLinks();
    return () => unsubscribe();
  }, [isTopPage]);

  function getLinks() {

    if (isTopPage) {
      return firebase.db.collection('Links')
        .orderBy('voteCount', 'desc')
        .onSnapshot(handleSnapshot);
    }
    return firebase.db.collection('Links')
      .orderBy('created', 'desc')
      .onSnapshot(handleSnapshot);
  }

  function handleSnapshot(snapshot) {
    const link = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    });

    setLinks(link)
  }

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem key={link.id} showCount={true} link={link} index={index + 1} />
      ))}
    </div>
  );
}

export default LinkList;
