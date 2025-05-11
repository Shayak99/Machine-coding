const Convert = ({ virtualNode, domNode }) => {
  function renderAndAppend(node, parent) {
    const renderedContent = render(node);

    if (renderedContent) {
      parent.appendChild(renderedContent);
    }
  }
  function render(node) {
    if (!node) {
      return;
    }

    if (typeof node !== "object") {
      return document.createTextNode(node.toString());
    }

    if (!node.type && node.props && node.props.children) {
      //handle flargments
      const fragment = document.createDocumentFragment();
      const children = node.props.children || {};

      Object.keys(children).forEach((key) => {
        const child = props.children[key];

        renderAndAppend(child, fragment);
      });
    }

    //html elements handling
    const element = document.createElement(node.type);
    const props = node.props || {};

    Object.keys(props).forEach((prop) => {
      if (prop === "children") {
        return;
      } else if (prop === "class") {
        // element.className = "container"
        element.className = props[prop];
      } else {
        element.setAttribute(prop, props[prop]);
      }
    });

    if (props.children) {
      if (typeof props.children === "object" && Array.isArray(props.children)) {
        //
        Object.keys(props.children).forEach((key) => {
          const child = props.children[key];
          renderAndAppend(child, element);
        });
      } else {
        // will get a textnode
        renderAndAppend(props.cildren, element);
      }
    }

    return element;
  }
  const renderedContent = render(virtualNode);

  /* 
        vn => actual do 
        if falsy value => empty string, 0, null , undefined
        return null 
        proper html elements
        with type, props, children
        type is missing but we can have props and children
        primitive string , number
        textNode
        recursion here !
    */
  return <div>{renderedContent && domNode.appendChild(renderedContent)}</div>;
};

export default Convert;
