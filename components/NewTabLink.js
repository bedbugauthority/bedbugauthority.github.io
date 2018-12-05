const NewTabLink = ({ children, href }) => {
  const handleClick = e => {
    e.preventDefault();
    window.open(href, "_blank");
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export default NewTabLink;
