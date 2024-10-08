import React, { useEffect } from "react";
import "./BlogPost.css";

const FavoriteFont = () => {
  useEffect(() => {
    document.title =
      "Things Help Me To Be Productive During College — Khue Nguyen";
  });

  return (
    <div>
      <section className="blog-page-title">
        <h2>My Favorite Monospace Fonts</h2>
        <span>October 8th, 2024 — Khue Nguyen</span>
        <span>Reading Time: 5 min</span>
        <hr />
      </section>
      <div className="blog-page-section">
        <h3>Table of Content</h3>
        <ul id="toc">
          <li>
            <a href="#intro">Intro</a>
          </li>
          <li>
            <a href="#pragmatapro">Pragmata Pro</a>
          </li>
          <li>
            <a href="#iosevka">Iosevka</a>
          </li>
          <li>
            <a href="#sudo">Sudo</a>
          </li>
          <li>
            <a href="#dejavu">DejaVu</a>
          </li>
        </ul>
      </div>
      <section className="blog-page-content">
        <div id="intro" className="blog-page-section">
          <h3>Intro</h3>
          <p>
            Having spent a significant amount of time in the command line, I’ve
            come to appreciate how crucial font choice is for productivity and
            comfort.
          </p>
          <aside>
            <blockquote>
              <p>
                “Typography is the craft of endowing human language with a
                durable visual form. – Robert Bringhurst"
              </p>
            </blockquote>
          </aside>
        </div>
        <div id="pragmatapro" className="blog-page-section">
          <h3>Pragmata Pro</h3>
          <ul>
            <li>
              Minimize eye strain by having distinct character shapes with ample
              spacing.
            </li>
            <li>
              Allow more code to fit within fewer columns while maintaining
              readability.
            </li>
            <li>Support commonly programming ligatures.</li>
          </ul>
        </div>
        <div id="iosevka" className="blog-page-section">
          <h3>Iosevka</h3>
          <ul>
            <li>
              Highly customizable down to the ligatures, width, and styles.
            </li>
            <li>Great for technical writing.</li>
            <li>Support commonly programming ligatures.</li>
          </ul>
        </div>
        <div id="sudo" className="blog-page-section">
          <h3>Sudo</h3>
          <ul>
            <li>The best compromise between narrow and broad font style.</li>
            <li>Maintain high readability at small font size.</li>
          </ul>
        </div>
        <div id="dejavu" className="blog-page-section">
          <h3>DejaVu</h3>
          <ul>
            <li>The Times New Roman of the terminal.</li>
            <li>Super readable with sharp shapes and wide spacing.</li>
          </ul>
        </div>
        <h4>The End</h4>
      </section>
    </div>
  );
};

export default FavoriteFont;
