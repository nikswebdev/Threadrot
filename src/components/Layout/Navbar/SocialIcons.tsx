// src/components/Layout/Navbar/SocialIcons.tsx
import React from "react";
import { Github, Twitter, Instagram } from "lucide-react"; // Assuming you have lucide-react
import "./MainNavbar.css";

const SocialIcons: React.FC = () => (
  <div className="social-icons">
    <a
      href="https://github.com/your-repo"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <Github size={20} />
    </a>
    <a
      href="https://twitter.com/your-handle"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
    >
      <Twitter size={20} />
    </a>
    <a
      href="https://instagram.com/your-handle"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
    >
      <Instagram size={20} />
    </a>
  </div>
);

export default SocialIcons;
