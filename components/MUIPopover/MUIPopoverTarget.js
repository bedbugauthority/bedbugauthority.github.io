import React from "react";

const MUIPopoverTarget = props => {
  return React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      key: index,
      ref: props.targetRef,
      onClick: props.onClick
    });
  });
};

export default MUIPopoverTarget;
