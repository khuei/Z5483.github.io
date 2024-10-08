import React, { useEffect } from "react";
import "./BlogPost.css";

const CollegeProductivity = () => {
  useEffect(() => {
    document.title =
      "Things Help Me To Be Productive During College — Khue Nguyen";
  });

  return (
    <div>
      <section className="blog-page-title">
        <h2>Things Help Me To Be Productive During College</h2>
        <span>August 20th, 2024 — Khue Nguyen</span>
        <span>Reading Time: 15 min</span>
        <hr />
      </section>
      <section className="blog-page-content">
        <div className="blog-page-section">
          <h3>Table of Content</h3>
          <ul id="toc">
            <li>
              <a href="#intro">Intro</a>
            </li>
            <li>
              <a href="#linux">GNU/Linux</a>
            </li>
            <li>
              <a href="#tiling-window-manager">Tiling Window Manager</a>
            </li>
            <li>
              <a href="#vim">Vim/Neovim</a>
            </li>
            <li>
              <a href="#aliases">Command Line Aliases</a>
            </li>
            <li>
              <a href="#terminal">Terminal Styling</a>
            </li>
          </ul>
        </div>
        <div id="intro" className="blog-page-section">
          <h3>Intro</h3>
          <p>
            All the tools that maximized my productivity during college.
            Configuration files can be found at:
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/khuei/dotfiles"
            >
              https://github.com/khuei/dotfiles
            </a>
          </p>
          <aside>
            <blockquote>
              <p>
                "Pleasure in the job puts perfection in the work. - Aristotle"
              </p>
            </blockquote>
          </aside>
        </div>
        <div id="linux" className="blog-page-section">
          <h3>GNU/Linux</h3>
          <ul>
            <li>Customizable environment for productivity.</li>
            <li>Easier software development tool installation.</li>
            <li>Perfect integration of various tools and software.</li>
          </ul>
        </div>
        <div id="tiling-window-manager" className="blog-page-section">
          <h3>Tiling Window Manager</h3>
          <ul>
            <li>No need for a mouse to create or move windows.</li>
            <li>Quick workspace switching and window management.</li>
            <li>Efficient keyboard-only workflow.</li>
          </ul>
        </div>
        <div id="vim" className="blog-page-section">
          <h3>Vim/Neovim</h3>
          <ul>
            <li>Flexible customizability with plugins.</li>
            <li>Neovim provides Treesitter and LSP integration.</li>
            <li>Fast navigation, refactoring, and regular expressions.</li>
            <li>Keyboard-centric workflow.</li>
          </ul>
        </div>
        <div id="aliases" className="blog-page-section">
          <h3>Aliases</h3>
          <ul>
            <li>
              Boost productivity with custom aliases for terminal and git.
            </li>
            <li>
              Common git aliases for rebasing, branching, and visualizing trees.
            </li>
          </ul>
        </div>
        <div id="terminal" className="blog-page-section">
          <h3>Terminal Styling</h3>
          <ul>
            <li>Customized prompt shows git status and branch name.</li>
            <li>Statuses: modified, untracked, committed.</li>
            <li>Asynchronous prompt for handling large git repos.</li>
            <li>Quick switching between multiple terminal color schemes.</li>
            <li>Light and dark mode toggle based on lighting conditions.</li>
          </ul>
        </div>
        <h4>The End</h4>
      </section>
    </div>
  );
};

export default CollegeProductivity;
