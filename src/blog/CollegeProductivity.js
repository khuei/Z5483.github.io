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
          <p>
            Linux opened up a whole world of possibility in terms of
            customization and tooling. During college, I had to use various
            types of tools and software for software development, and it is so
            much easier to install and integrate them in a Linux environment.
          </p>
        </div>
        <div id="tiling-window-manager" className="blog-page-section">
          <h3>Tiling Window Manager</h3>
          <p>
            Tiling Window Manager removed the need to use a mouse every time I
            need to create or move windows. It also allows me to quickly switch
            workspaces. Overall, I enjoy the ability to just keep my hands on
            the keyboard while simultaneously quickly opening/moving/switching
            windows as needed.
          </p>
        </div>
        <div id="vim" className="blog-page-section">
          <h3>Vim/Neovim</h3>
          <p>
            At the beginning of college, I mainly used Vim, but I later switched
            to Neovim for the Treesitter and Language Server Protocol
            integration. The quick navigation and refactoring ability of Neovim
            are so useful when programming. Again, I do not need to move my
            hands away from the keyboard to use this tool. Additionally, I find
            the ability to apply regular expressions to texts extremely useful.
          </p>
        </div>
        <div id="aliases" className="blog-page-section">
          <h3>Aliases</h3>
          <p>
            Having aliases for terminal and git commands boost my ability to
            instantaneously perform complex actions. Especially with git
            commands, I constantly use aliases for rebasing, branching, and
            displaying trees with useful visual/information.
          </p>
        </div>
        <div id="terminal" className="blog-page-section">
          <h3>Terminal Styling</h3>
          <p>
            I modified my command line prompt to show the status of the git
            repository and the current branch name. The different statuses are:
            modified, untracked, and committed. In addition, I also made my
            prompt asynchronous to avoid hold-up while working with large git
            repositories.
          </p>
          <p>
            I also added the ability to switch between multiple terminal color
            schemes with a single command. I find it cool as I often get tired
            of one color scheme if I use it too much. It is also helpful for
            quickly switching between dark and light modes depending on the
            lighting of where I am working.
          </p>
        </div>
        <h4>The End</h4>
      </section>
    </div>
  );
};

export default CollegeProductivity;
