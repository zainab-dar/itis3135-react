import React from "react";

export default function Header() {
  return (
    <header>
      <h1>Zainab Dar&apos;s Zen Dolphin | ITIS 3135</h1>
      <p className="tagline">
        Come along as I learn how to build my first webpage!
      </p>

      <nav>
        <a href="/">Home</a>
        <a href="/introduction">Introduction</a>
        <a href="/contract">Contract</a>
      </nav>

      <nav className="secondary-nav">
        <a href="https://webpages.charlotte.edu/zdar1/itis3135/stuff/cRAPPY_PAGE.html">
          CRAPPY Webpage
        </a>
        <a href="./hobby/index.html">Hobby</a>
        <a href="https://yourusername.github.io/itis3135-react">React3</a>
      </nav>
    </header>
  );
}