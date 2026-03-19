import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Journey
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Diploma in Computer Science</h4>
                <h5>Government Polytechnic, Dhule</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Completed foundational coursework in computer science, including
              Full-Stack Web Development, Data Structures, and Software
              Engineering principles.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E. in Computer Science</h4>
                <h5>Savitribai Phule Pune University (SPPU)</h5>
              </div>
              <h3>2027</h3>
            </div>
            <p>
              Pursuing advanced studies in Computer Science, focusing on cloud
              computing, OOP, AI integration, and scalable system architecture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
