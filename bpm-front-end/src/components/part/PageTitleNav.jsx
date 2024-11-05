
import React from "react";
import PropTypes from "prop-types";
import Icon from "./Icon";

const PageTitleNav = ({ 
    title, 
    breadcrumbs, 
    onClick = () => {} 
}) => {
  return (
    <header>
        <div className="row" style={{ display: "flex", alignItems: "center" }}>
            
            <h1 style={{ color: "#2654A1", margin: "0" }}>
                <Icon
                    type="Bold"
                    name="angle-left"
                    cssClass="btn px-1 py-0 text" 
                    onClick={onClick} 
                    style={{ fontSize: "28px", margin: "10px 5px", cursor: "pointer", color: "#2654A1" }}
                />
                {title}
            </h1>
        </div>

        <nav>
            <ol className="breadcrumb ms-5">
                {breadcrumbs.map((breadcrumb, index) => (
                    <li
                        key={index}
                        className={`breadcrumb-item ${breadcrumb.href ? "" : "active"}`}
                        aria-current={breadcrumb.href ? undefined : "page"}
                    >
                        {breadcrumb.href ? (
                            <a href={breadcrumb.href} 
                            style={{
                                color: '#575050',
                                textDecoration: 'none', 
                            }}>
                                {breadcrumb.label}
                            </a>
                        ) : (
                            <span>{breadcrumb.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    </header>
  );
};

PageTitleNav.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string
    })
  ).isRequired,
};

export default PageTitleNav;
