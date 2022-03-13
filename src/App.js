import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import _ from 'lodash';
import './style.scss';

function App(props) {
  const tree = props.files;
  const topLevelFolder = tree.filter((item) => item.parent === null)[0];
  const [parent, setParent] = useState(topLevelFolder.filename);
  const currentFiles = tree.filter((item) => item.parent === parent);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [fuse, setFuse] = useState(null);
  useEffect(() => {
    const options = { keys: ['filename'], threshold: 0.0, ignoreLocation: true };
    const index = Fuse.createIndex(options.keys, tree);
    const newFuse = new Fuse(tree, options, index);
    window.fuse = newFuse;
    setFuse(newFuse);
  }, []);

  function searchFieldChanged(event) {
    var newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    runFuseQuery(fuse, newSearchTerm, setSearchResults);
  }

  return <div id='app-body'>
    <div className="menu">
      <a href="#" onClick={() => setParent(getLevelUpPath(parent, topLevelFolder))}>&#10548;&#65039; {parent} </a>
      <input className="right" onChange={searchFieldChanged} value={searchTerm}/>
      <span className="right">&#128270;&nbsp;</span>
    </div>
    {searchTerm.length > 1
      ? <Folder files={searchResults} setParent={() => {}} showPaths={true} />
      : <Folder files={currentFiles} setParent={setParent}/>
     }

  </div>;
}

function Folder(props) {
  return <ul>{props.files.map((file, i) => <File key={i} file={file} setParent={props.setParent} showPath={props.showPaths}/>)}</ul>;
}

function File(props) {
  const click = () => {
    if(props.file.type === 'FOLDER')
      props.setParent(joinPaths(props.file.parent, props.file.filename))
  };
  return <li className={props.file.type} onClick={click}>{props.showPath ? joinPaths(props.file.parent, props.file.filename) : props.file.filename}</li>;
}

function joinPaths(path1, path2) {
  if(!path1)
    return path2;
  return [path1, path2].join('/');
}

function getLevelUpPath(path, topLevelFolder) {
  if(path === topLevelFolder.filename || !path)
    return null;
  var folders = path.split('/');
  folders.pop();
  return folders.join('/');
}

const runFuseQuery = _.debounce((fuse, query, setSearchResults)  => {
  var results = fuse.search(query);
  var mappedResults = results.map((result) => result.item);
  setSearchResults(mappedResults);
}, 600);

export default App;
