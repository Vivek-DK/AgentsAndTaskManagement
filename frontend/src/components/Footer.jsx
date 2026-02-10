import "./footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-left">
          <h3>AgentTask Manager</h3>
          <p>
            Manage agents, distribute tasks automatically, and monitor workflow
            efficiently with a simple and scalable dashboard.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-center">
          <h4>Tech Stack</h4>
          <ul>
            <li>MongoDB</li>
            <li>Express.js</li>
            <li>React.js</li>
            <li>Node.js</li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="footer-right">
          <h4>Contact</h4>

          <div className="footer-icons">

            <a
              href="https://github.com/Vivek-DK"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/vivekdk1310"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:vivek.dkrishnamurthy@gmail.com"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>

          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Agent & Task Manager — Built with MERN Stack
      </div>
    </footer>
  );
}

export default Footer;
