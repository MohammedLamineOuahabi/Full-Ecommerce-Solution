import React from "react";
import "./directory.styles.scss";

import MenuItem from "../menu-item/menu-item";

class Directory extends React.Component {
  constructor() {
    super();
    this.state = {
      sections: [
        {
          title: "HTML BOOKS",
          imageUrl:
            "https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          id: 1,
          url: "html"
        },
        {
          title: "CSS BOOKS",
          imageUrl:
            "https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          id: 2,
          url: "css"
        },
        {
          title: "JAVASCRIPT BOOKS",
          imageUrl:
            "https://images.pexels.com/photos/904616/pexels-photo-904616.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          id: 3,
          url: "javascript"
        },
        {
          title: "REACT BOOKS",
          imageUrl:
            "https://images.pexels.com/photos/1428626/pexels-photo-1428626.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          id: 4,
          size: "large",
          url: "react"
        },
        {
          title: "REACT NATIVE BOOKS",
          imageUrl:
            "https://images.pexels.com/photos/545068/pexels-photo-545068.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          id: 5,
          size: "large",
          url: "react-native"
        }
      ]
    };
  }
  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({ title, imageUrl, id, size, url }) => (
          <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} url={url} />
        ))}
      </div>
    );
  }
}

export default Directory;
