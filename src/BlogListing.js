import React, { useEffect } from 'react';

import './BlogListing.css';

const BlogListing = () => {
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
            tag: 'Programming',
            title: 'Things Help Me To Be Productive During College',
            synopsis: 'Explanation of all the tools that maximize my productivity during college',
            readingTime: '15 min',
            date: 'August 20th, 2024',
            link: '/blog/things-help-me-to-be-productive-during-college.html',
        },
        {
            tag: 'MUSIC',
            title: 'Deconstructing the Vinyl Turntable: Unveiling Its Intricate Anatomy',
            synopsis:
            'Embark on a captivating journey into the heart of audio nostalgia as we delve deep into the mechanics and components that compose a vinyl turntable...',
            readingTime: '13 min',
            date: 'August 31st, 2023',
            link: '/blog/anatomy-of-a-vinyl-turntable.html',
        },
        {
            tag: 'FOOD',
            title: 'The Complete Guide to the Art of Making Coffee',
            synopsis:
            'Have you ever wondered how to transform those aromatic coffee beans into a cup of morning magic? In this comprehensive guide, I’ll walk you through...',
            readingTime: '16 min',
            date: 'September 1st, 2023',
            link: '/blog/everything-about-making-coffee.html',
        },
    ];

    return (
        <section id="blog-highlight" className="blog-highlight">
        {blogs.map((blog, index) => (
            <div className="blog-listing-item" key={index}>
                <br />
                <a href={blog.link} className="blog-listing-description">
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

export default BlogListing;
