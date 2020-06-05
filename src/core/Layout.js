import React from "react";
import Menu from "../core/Menu";
import "../style.css";

const Layout = ({
  title = "Title",
  description = "description",
  className,
  children,
}) => (
  <div>
    <Menu/>
    <div className="mainColor p-4 mb-4">
      
      <h2 className="display-3 font-weight-bold">{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
