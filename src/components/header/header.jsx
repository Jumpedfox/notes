import React from "react";
import "./header.css";
import AddButton from "../addbutton/addbutton";
import RemoveButton from "../removebutton/removebutton";
import EditButton from "../editbutton/editbutton";
import Searchbar from "../searchbar/searchbar";

const Header = () => {
  return (
    <div className="header">
      <div>
        <AddButton />
        <RemoveButton />
        <EditButton />
      </div>
      <Searchbar />
    </div>
  );
};

export default Header;
