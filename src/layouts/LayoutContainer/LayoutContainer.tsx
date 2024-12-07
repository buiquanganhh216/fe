import React, { ReactNode } from "react";
import Header from "./Header";
import "./LayoutContainer.scss";

interface LayoutContainerProps {
  children: ReactNode;
  titleShow?: boolean;
  footerShow?: boolean;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({
  children,
  titleShow = true,
}) => {
  return (
    <div className="layout-container">
      <Header titleShow={titleShow} />

      <div className="body-container">{children}</div>
    </div>
  );
};

export default LayoutContainer;
