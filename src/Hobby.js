import React, { useEffect } from 'react';

import './BlogListing.css';

const Hobby = ({ onChangeTab }) => {
    const handleChange = (newValue) => {
        onChangeTab(newValue);
    };

    useEffect(() => {
        document.querySelectorAll('.blog-listing-item').forEach((item, index) => {
            item.style.visibility = 'visible';
            item.style.transitionDelay = `${index * 0.1}s`;
            item.style.opacity = '1';
            item.style.transition = 'opacity 250ms ease-in';
        });
    }, []);

    const blogs = [
        {
            tag: 'SHOEMAKING',
            title: 'Making Shoes From Scratch',
            synopsis: 'A gallery of all my shoes made from scratch.',
            readingTime: 'N/A'
        },
        {
            tag: 'PHOTOGRAPHY',
            title: 'Image Gallery',
            synopsis: 'I like to take images of things that caught my notice in my daily life',
            readingTime: 'N/A'
        },
    ];

    return (
        <section id='blog-listing'>
        {blogs.map((blog, index) => (
            <div className="blog-listing-item" key={index}>
                <br />
                <a href={blog.link} className="blog-listing-description"
                 onClick={(e) => { e.preventDefault(); handleChange(index + 200); }}>
                    <span className="blog-tag">{blog.tag}</span>
                    <span className="blog-title">{blog.title}</span>
                    <p className="blog-synopsis">{blog.synopsis}</p>
                    <div className="blog-subscript">
                        <span className="blog-subscript-text">Reading Time: {blog.readingTime}</span>
                        <span className="blog-subscript-text">{blog.date}</span>
                    </div>
                </a>
            </div>
        ))}
        </section>
    );
};

export default Hobby;
