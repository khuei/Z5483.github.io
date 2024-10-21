import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogListing.css";

const BlogListing = () => {
  const navigate = useNavigate();  // Use useNavigate for routing

  useEffect(() => {
    document.querySelectorAll(".blog-listing-item").forEach((item, index) => {
      item.style.visibility = "visible";
      item.style.transitionDelay = `${index * 0.1}s`;
      item.style.opacity = "1";
      item.style.transition = "opacity 250ms ease-in";
    });
  }, []);

  const blogs = [
    {
      tag: "DESIGN",
      title: "My Favorite Monospace Fonts",
      synopsis:
        "Having spent a significant amount of time in the command line, I’ve come to appreciate how crucial font choice is for productivity and comfort.",
      readingTime: "5 min",
      date: "October 8th, 2024",
      link: "/blog/favorite-font", // Define the route for each blog
    },
    {
      tag: "Programming",
      title: "Things Help Me To Be Productive During College",
      synopsis:
        "Explanation of all the tools that maximize my productivity during college",
      readingTime: "15 min",
      date: "August 20th, 2024",
      link: "/blog/college-productivity", // Define the route for each blog
    },
    {
      tag: "MUSIC",
      title:
        "Deconstructing The Vinyl Turntable: Unveiling Its Intricate Anatomy",
      synopsis:
        "Embark on a captivating journey into the heart of audio nostalgia as we delve deep into the mechanics and components that compose a vinyl turntable...",
      readingTime: "13 min",
      date: "August 31st, 2023",
      link: "/blog/vinyl-anatomy", // Define the route for each blog
    },
    {
      tag: "FOOD",
      title: "The Complete Guide To The Art Of Making Coffee",
      synopsis:
        "Have you ever wondered how to transform those aromatic coffee beans into a cup of morning magic? In this comprehensive guide, I’ll walk you through...",
      readingTime: "16 min",
      date: "September 1st, 2023",
      link: "/blog/making-coffee", // Define the route for each blog
    },
  ];

  return (
    <>
      {blogs.map((blog, index) => (
        <div className="blog-listing-item" key={index}>
          <br />
          <a
            href={blog.link}
            className="blog-listing-description"
            onClick={(e) => {
              e.preventDefault();
              navigate(blog.link);  // Navigate to the blog page
            }}
          >
            <span className="blog-tag">{blog.tag}</span>
            <span className="blog-title">{blog.title}</span>
            <p className="blog-synopsis">{blog.synopsis}</p>
            <div className="blog-subscript">
              <span className="blog-subscript-text">
                Reading Time: {blog.readingTime}
              </span>
              <span className="blog-subscript-text">{blog.date}</span>
            </div>
          </a>
        </div>
      ))}
    </>
  );
};

export default BlogListing;
