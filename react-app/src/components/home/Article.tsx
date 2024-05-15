// @ts-nocheck
import React from "react";

// @ts-ignore
const Article = ({ title, imageURL, description }) => {
    return (
        <div className="article">
            <img src={imageURL} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Article;