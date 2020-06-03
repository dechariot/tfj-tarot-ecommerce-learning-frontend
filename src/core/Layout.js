import React from "react";
import Menu from "../core/Menu";
import "../css/style.css";

const Layout = ({
  title = "Title",
  description = "description",
  className,
  children,
}) => (
  <div>
    <Menu/>
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
