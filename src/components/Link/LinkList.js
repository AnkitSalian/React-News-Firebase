import React, { useState } from "react";
import { FirebaseContext } from "../../firebase";
import { LINKS_PER_PAGE } from "../../utils";

import LinkItem from './LinkItem';

function LinkList(props) {

  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = useState([]);
  const [cursor, setCursor] = useState(null);
  const isNewPage = props.location.pathname.includes('new');
  const isTopPage = props.location.pathname.includes('top');
  const page = Number(props.match.params.page);

  React.useEffect(() => {
    return getLinks();
  }, [isTopPage, page]);

  function getLinks() {
    if (isTopPage) {
      return firebase.db.collection('Links')
        .orderBy('voteCount', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else if (page === 1) {
      return firebase.db.collection('Links')
        .orderBy('created', 'desc')
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else if (Boolean(cursor)) {
      return firebase.db.collection('Links')
        .orderBy('created', 'desc')
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    }

  }

  function handleSnapshot(snapshot) {
    const link = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() }
    });

    setLinks(link);
    const lastLink = link[link.length - 1];
    setCursor(lastLink);
  }

  function visitPreviousPage() {
    if (page > 1) {
      props.history.push(`/new/${page - 1}`)
    }
  }

  function visitNextPage() {
    if (page <= (links.length / LINKS_PER_PAGE)) {
      props.history.push(`/new/${page + 1}`)
    }
  }

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem key={link.id} showCount={true} link={link} index={index + pageIndex} />
      ))}
      {isNewPage && (
        <div className="pagination">
          <div className="pointer mr2" onClick={visitPreviousPage}>Previous</div>
          <div className="pointer" onClick={visitNextPage}>Next</div>
        </div>
      )}
    </div>
  );
}

export default LinkList;
