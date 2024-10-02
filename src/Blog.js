import React, { useEffect } from 'react';
import BlogListing from './BlogListing.js';
import './Blog.css';

const Blog = ({ onChangeTab }) => {
    useEffect(() => {
        document.title = 'Blog — Khue Nguyen';
    });

    return (
        <section id='blog-listing'>
            <BlogListing onChangeTab={onChangeTab} />
        </section>
    );
};

export default Blog;
