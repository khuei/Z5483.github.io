import React, { useEffect } from 'react';

import './BlogListing.css';

function BlogListing() {
    useEffect(() => {
        document.querySelectorAll('.blog-listing-item').forEach((item, index) => {
            item.style.visibility = 'visible';
            item.style.transitionDelay = `${index * 0.1}s`;
            item.style.opacity = 1;
        });
    }, []);

    return (
        <section class="blog-listing">
          <div class="blog-listing-item">
            <br/>
            <a href="things-help-me-to-be-productive-during-college.html" class="blog-listing-description">
              <span class="blog-tag">Programming</span>
              <span class="blog-title">Things Help Me To Be Productive During College</span>
              <p class="blog-synopsis">Explanation of all the tools that maximize my productivity during college</p>
              <div class="blog-subscript">
                <span class="blog-subscript-text">Reading Time: 15 min</span>
                <span class="blog-subscript-text">August 20th, 2024</span>
              </div>
            </a>
          </div>
          <div class="blog-listing-item">
            <br/>
            <a href="anatomy-of-a-vinyl-turntable.html" class="blog-listing-description">
              <span class="blog-tag">MUSIC</span>
              <span class="blog-title">Deconstructing the Vinyl Turntable: Unveiling Its Intricate Anatomy</span>
              <p class="blog-synopsis">Embark on a captivating journey into the
              heart of audio nostalgia as we delve deep into the mechanics and
              components that compose a vinyl turntable. Unveil the intricate
              anatomy behind the magic of spinning records that make the turntable
              a timeless icon of musical craftsmanship</p>
              <div class="blog-subscript">
                <span class="blog-subscript-text">Reading Time: 13 min</span>
                <span class="blog-subscript-text">August 31st, 2023</span>
              </div>
            </a>
          </div>
          <div class="blog-listing-item">
            <br/>
            <a href="everything-about-making-coffee.html" class="blog-listing-description">
              <span class="blog-tag">FOOD</span>
              <span class="blog-title">The Complete Guide to the Art of Making Coffee</span>
              <p class="blog-synopsis">Have you ever wondered how to transform
              those aromatic coffee beans into a cup of morning magic? In this
              comprehensive guide, I'll walk you through the art of crafting a
              perfect cup of coffee from scratch.</p>
              <div class="blog-subscript">
                <span class="blog-subscript-text">Reading Time: 16 min</span>
                <span class="blog-subscript-text">September 1st, 2023</span>
              </div>
            </a>
          </div>
        </section>
    )
}

export default BlogListing;
