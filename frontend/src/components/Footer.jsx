import "./footer.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h3>AgentTask Manager</h3>
          <p>
            Manage agents, distribute tasks automatically, and monitor workflow
            efficiently with a simple and scalable dashboard.
          </p>
        </div>

        <div className="footer-center">
          <h4>Tech Stack</h4>
          <ul>
            <li>MongoDB</li>
            <li>Express.js</li>
            <li>React.js</li>
            <li>Node.js</li>
          </ul>
        </div>

        <div className="footer-right">
          <h4>Contact</h4>
          <div className="footer-icons">
            <FaGithub />
            <FaLinkedin />
            <FaEnvelope />
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