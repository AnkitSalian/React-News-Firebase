import React, { useState } from "react";
import { FirebaseContext } from "../../firebase";

import LinkItem from './LinkItem';

function LinkList(props) {

  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = useState([]);

  React.useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    firebase.db.collection('Links').onSnapshot(handleSnapshot);
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
