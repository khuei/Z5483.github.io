import React, { useEffect } from 'react';
import './BlogPost.css';

const MakingCoffee = () => {
  return (
    <div>
      <section className="blog-page-title">
        <h2>The Complete Guide to the Art of Making Coffee</h2>
        <span>September 1st, 2023 — Khue Nguyen</span>
        <span>Reading Time: 16 min</span>
        <hr />
      </section>
      <section className="blog-page-content">
        <div className="blog-page-section">
          <h3>Table of Content</h3>
          <ul id="toc">
            <li><a href="#intro">Intro</a></li>
            <li><a href="#choosing">Choosing Your Beans</a></li>
            <li><a href="#roasting">Roasting for Flavors</a></li>
            <li><a href="#grinding">Grinding for Greatness</a></li>
            <li><a href="#brewing">Coffee Brewing Methods</a></li>
            <li><a href="#mastering-brewing">Mastering the Brewing Process</a></li>
            <li><a href="#finishing-touches">The Finishing Touches</a></li>
            <li><a href="#conclusion">In Conclusion</a></li>
          </ul>
        </div>

        <div id="intro" className="blog-page-section">
          <h3>Intro</h3>
          <p>There's something magical about the aroma of freshly brewed coffee...</p>
          <aside>
            <blockquote>
              <p>"Even bad coffee is better than no coffee at all."</p>
              <cite>— David Lynch</cite>
            </blockquote>
          </aside>
        </div>

        <div id="choosing" className="blog-page-section">
          <h3>Choosing Your Beans</h3>
          <p>The foundation of a great cup of coffee lies in selecting the right beans...</p>
        </div>

        <div id="roasting" className="blog-page-section">
          <h3>Roasting For Flavor</h3>
          <p>Coffee roast is the transformative process of heating green coffee beans...</p>
          <img src={require("./media/everything-about-making-coffee/roast-chart.webp")} alt="roast-chart" />
          <cite>
            by <a href="https://www.shutterstock.com/g/pongpinun" target="_blank" rel="noreferrer">Pongpinun Traisrisilp</a>
            published on <a href="https://www.shutterstock.com/image-vector/coffee-roast-curve-464098091" target="_blank" rel="noreferrer">shutterstock</a>
          </cite>
        </div>

        <div id="grinding" className="blog-page-section">
          <h3>Grinding for Greatness</h3>
          <p>Once you've acquired your preferred coffee beans, it's time to grind them...</p>
          <img src={require("./media/everything-about-making-coffee/grind-level.webp")} alt="grind-level" />
          <cite>
            by <a href="https://solidgroundroasters.com.au/blogs/news/the-coffee-grind-guide" target="_blank" rel="noreferrer">solidgroundroasters.com</a>
          </cite>
        </div>

        <div id="brewing" className="blog-page-section">
          <h3>Coffee Brewing Methods</h3>
          <p>The way you brew your coffee can significantly impact its flavor...</p>
          <ul>
            <li><b>French Press</b>: Full-bodied and robust flavor.</li>
            <li><b>Pour-Over</b>: Intricate flavors.</li>
            <li><b>Espresso</b>: Concentrated, intense flavor.</li>
            <li><b>AeroPress</b>: Portable and versatile.</li>
            <li><b>Cold Brew</b>: Smooth, less acidic.</li>
          </ul>
        </div>

        <div id="mastering-brewing" className="blog-page-section">
          <h3>Mastering the Brewing Process</h3>
          <ul>
            <li><b>Water Temperature</b>: Ideal range is 195°F to 205°F (90°C to 96°C).</li>
            <li><b>Brew Time</b>: Experiment with brew times for the perfect strength.</li>
            <li><b>Water-to-Coffee Ratio</b>: A common ratio is 1:15.</li>
            <li><b>Blooming</b>: Pour water over fresh grounds and let it bloom for 30 seconds.</li>
          </ul>
        </div>

        <div id="finishing-touches" className="blog-page-section">
          <h3>The Finishing Touches</h3>
          <ul>
            <li><b>Milk and Sweeteners</b>: Customize creaminess and sweetness.</li>
            <li><b>Latte Art</b>: Create beautiful designs with steamed milk.</li>
            <li><b>Flavor Additions</b>: Spice it up with cinnamon, vanilla, or nutmeg.</li>
          </ul>
        </div>

        <div id="conclusion" className="blog-page-section">
          <h3>In Conclusion</h3>
          <p>The art of making coffee is a journey filled with exploration and experimentation...</p>
        </div>
        <h4>The End</h4>
      </section>
    </div>
  );
};

export default MakingCoffee;
