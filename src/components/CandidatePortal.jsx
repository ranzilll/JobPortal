import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CandidatePortal.css";

const CandidatePortal = ({ setIsAuthenticated }) => {
  const [jobListings, setJobListings] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");

    if (!isAuthenticated || userRole !== "candidate") {
      alert("Unauthorized access");
      navigate("/login/candidate", { replace: true });
    }
  }, [navigate]);

  // Load data from localStorage
  useEffect(() => {
    setJobListings(JSON.parse(localStorage.getItem("jobListings")) || []);
    setAppliedJobs(JSON.parse(localStorage.getItem("appliedJobs")) || []);
  }, []);

  // Apply for a job
  const handleApplyJob = (job) => {
    if (appliedJobs.some((appliedJob) => appliedJob.id === job.id)) {
      alert("You have already applied for this job.");
      return;
    }

    const updatedAppliedJobs = [...appliedJobs, job];
    setAppliedJobs(updatedAppliedJobs);
    localStorage.setItem("appliedJobs", JSON.stringify(updatedAppliedJobs));
    alert("Job application successful!");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login/candidate", { replace: true });
  };

  return (
    <div className="candidate-portal">
      <h2>Candidate Portal</h2>
      {/* Job Listings */}
      <h3>Available Jobs</h3>
      <ul className="job-list">
        {jobListings.length === 0 ? (
          <p>No job listings available.</p>
        ) : (
          jobListings.map((job) => (
            <li key={job.id}>
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <p>Location: {job.location}</p>
              <p>Salary: {job.salary}</p>
              <button
                disabled={appliedJobs.some((appliedJob) => appliedJob.id === job.id)}
                onClick={() => handleApplyJob(job)}
              >
                {appliedJobs.some((appliedJob) => appliedJob.id === job.id) ? "Applied" : "Apply"}
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Applied Jobs */}
      <h3>Applied Jobs</h3>
      <ul>
        {appliedJobs.map((job) => (
          <li key={job.id}>
            <h4>{job.title}</h4>
            <p>Application submitted successfully!</p>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default CandidatePortal;
