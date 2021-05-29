import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function SearchLinks() {

  const { firebase } = useContext(FirebaseContext);

  const [filter, setFilter] = useState("");
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);

  React.useEffect(() => {
    getInitialLinks();
  }, []);

  function getInitialLinks() {
    firebase.db.collection('Links').get().then(snapshot => {
      const link = snapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      setLinks(link);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const query = filter.toLowerCase();
    const matchedLinks = links.filter(link => {
      return link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query);
    });
    setFilteredLinks(matchedLinks);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Search <input onChange={event => setFilter(event.target.value)} />
          <button>OK</button>
        </div>
      </form>
      {filteredLinks.map((filteredLink, index) => (
        <LinkItem key={filteredLink.id} showCount={false} link={filteredLink} index={index} />
      ))}
    </div>
  );
}

export default SearchLinks;
