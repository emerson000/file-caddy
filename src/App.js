import React, { useState } from 'react';
import './style.scss';

function App(props) {
  const tree = props.files;
  const topLevelFolder = tree.filter((item) => item.parent === null)[0];
  const [parent, setParent] = useState(topLevelFolder.filename);
  const currentFiles = tree.filter((item) => item.parent === parent);
  return <div id='app-body'>
    <div><a href="#" onClick={() => setParent(getLevelUpPath(parent, topLevelFolder))}>&#10548;&#65039; {parent} </a></div>
    <Folder files={currentFiles} setParent={setParent}/>
  </div>;
}

function Folder(props) {
  return <ul>{props.files.map((file, i) => <File key={i} file={file} setParent={props.setParent}/>)}</ul>;
}

function File(props) {
  const click = () => {
    if(props.file.type === 'FOLDER')
      props.setParent(joinPaths(props.file.parent, props.file.filename))
  };
  return <li className={props.file.type} onClick={click}>{props.file.filename}</li>;
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

export default App;
