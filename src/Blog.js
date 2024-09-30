import BlogListing from './BlogListing.js';
import './Blog.css';

const Blog = ({ onChangeTab }) => {
    return (
        <section id='blog-listing'>
            <BlogListing onChangeTab={onChangeTab} />
        </section>
    );
};

export default Blog;
