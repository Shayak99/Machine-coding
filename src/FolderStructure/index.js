import "../styles.css";
import data from "./data.json";
import { useState } from "react";

const List = ({ list, addNodeToList }) => {
  const [isExpanded, setIsExpanded] = useState({});

  return (
    list &&
    list.map((node) => {
      return (
        <div key={node?.id}>
          {node?.isFolder ? (
            <>
              {isExpanded[node.name] ? (
                <img
                  src="https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-open-folder-vector-document-archive-png-image_5284570.png"
                  height="15px"
                  alt="open folder"
                />
              ) : (
                <img
                  src="https://cdn0.iconfinder.com/data/icons/flat-documents-and-folders/512/Folder_Closed_Yellow-512.png"
                  height="15px"
                  alt="closed folder"
                />
              )}
            </>
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/136/136522.png"
              height="15px"
              alt="file"
            />
          )}
          <span
            className="folder"
            onClick={() =>
              node.isFolder &&
              setIsExpanded((prev) => ({
                ...prev,
                [node.name]: !prev[node.name],
              }))
            }
          >
            {node?.name}
          </span>
          <span className="btn" onClick={() => addNodeToList(node.id)}>
            {node?.isFolder && <button>+</button>}
          </span>
          <div className="container">
            {node?.children && isExpanded[node.name] && (
              <List list={node.children} addNodeToList={addNodeToList} />
            )}
          </div>
        </div>
      );
    })
  );
};

export default function App() {
  const [folderStructure, setFolderStructure] = useState(data);

  const addNodeToList = (parentId) => {
    const isFolder = window.confirm(
      "Do you want to add a folder? (Click OK for folder, Cancel for file)"
    );
    const name = prompt(`Enter ${isFolder ? "folder" : "file"} name`);
    if (!name) return;

    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                id: Date.now().toString(),
                name: name,
                isFolder: isFolder,
                children: isFolder ? [] : undefined,
              },
            ],
          };
        }
        if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setFolderStructure((prev) => updateTree(prev));
  };

  return (
    <div className="container">
      <h3>File explorer</h3>
      <List list={folderStructure} addNodeToList={addNodeToList} />
    </div>
  );
}
