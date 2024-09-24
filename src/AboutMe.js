import React, { useEffect, useRef } from 'react';
import './AboutMe.css';

const AboutMe = () => {
  const typingTextRef = useRef(null);
  const typingTimeRef = useRef(null);
  const menuItemsRef = useRef([]);
  const hasTyped = useRef(false); // Flag to prevent multiple calls

  useEffect(() => {
    document.title = "About Me — Khue Nguyen";

    if (hasTyped.current) return; // Exit if already typed
    hasTyped.current = true; // Set flag to true

    const typeLs = (text, index) => {
      if (index === 0) {
        typingTextRef.current.innerHTML = ''; // Clear only once at the start
      }
      if (index < text.length) {
        typingTextRef.current.innerHTML += text.charAt(index);
        setTimeout(() => typeLs(text, index + 1), 100);
      } else {
        setTimeout(() => {
          typingTimeRef.current.style.visibility = 'visible';
          setTimeout(showMenuItems, 200);
        }, 200);
      }
    };

    const showMenuItems = () => {
      menuItemsRef.current.forEach((item, idx) => {
        setTimeout(() => {
          item.classList.add('show');
          typeMenuItem(item, 0, item.textContent);
        }, idx * 100);
      });
    };

    const typeMenuItem = (item, index, text) => {
      if (index < text.length) {
        item.innerHTML = text.substring(0, index + 1);
        setTimeout(() => typeMenuItem(item, index + 1, text), 50);
      }
    };

    typeLs(' ls', 0);
  }, []);

  return (
    <div>
      <header></header>
      <section className="about-me-intro">
        <span className="about-me-title">
          Architected in Vietnam / Engineered in U.S.A / Deployed in U.S.A
        </span>
        <p className="about-me-bio">
          I'm a full stack software engineer. <br /><br /> I have a strong commitment to
          making effective and creative products that can withstand the test of time.
        </p>
        <hr />
        <span className="about-me-title">Personal Interest</span>
        <section className="terminal">
          <div className="terminal-prompt">
            <span className="cli-prompt-rhs">
              ~ 
              <mark id="prompt-caret" style={{ color: '#DC9656', background: '#181818' }}>
                ❯ 
                <mark id="typing-text" style={{ color: '#A1B56C', background: '#181818' }}>
                  <b ref={typingTextRef}></b>
                </mark>
              </mark>
            </span>
            <span ref={typingTimeRef} className="cli-prompt-lhs" style={{ visibility: 'hidden' }}>
              0.02s ~
            </span>
          </div>
          <ul className="terminal-menu">
            {['Cybersecurity', 'Computer Vision', 'Machine Learning', 'Embedded System', 
              'UI/UX', 'Web Development', 'HCI', 'Cinematography', 
              'Photography', 'Music', 'Cooking', 'Boxing', 'Blacksmithing', 'Weightlifting', 
              'Shoemaking'].map((item, idx) => (
              <li 
                key={idx} 
                className="terminal-menu-item" 
                ref={el => menuItemsRef.current[idx] = el}
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </section>
      <footer></footer>
    </div>
  );
};

export default AboutMe;
