import { Link } from "react-router-dom";

const NavLinks = ({ className = "", linkHref, linkText}) => {
  return (
    <>
        {linkText.split("?")[0]}
        <a href={linkHref} className={`text-black hover:underline underline-offset-4 ${className}`}>
            {linkText.split("?")[1]}
        </a>
    </>
  );
};

export default NavLinks;
