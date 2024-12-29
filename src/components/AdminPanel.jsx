import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = ({ setIsAuthenticated }) => {
  const [jobListings, setJobListings] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", description: "", location: "", salary: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);

  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");

    if (!isAuthenticated || userRole !== "admin") {
      alert("Unauthorized access");
      navigate("/login/admin", { replace: true });
    }
  }, [navigate]);

  // Load job listings from localStorage
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobListings")) || [];
    setJobListings(storedJobs);
  }, []);

  // Update localStorage whenever jobListings changes
  useEffect(() => {
    localStorage.setItem("jobListings", JSON.stringify(jobListings));
  }, [jobListings]);

  // Add a new job
  const handleAddJob = () => {
    if (Object.values(newJob).some((field) => !field)) {
      alert("Please fill out all fields");
      return;
    }

    const jobWithId = { ...newJob, id: Date.now() };
    setJobListings([...jobListings, jobWithId]);
    setNewJob({ title: "", description: "", location: "", salary: "" });
  };

  // Edit an existing job
  const handleEditJob = (job) => {
    setIsEditing(true);
    setEditJobId(job.id);
    setNewJob({ title: job.title, description: job.description, location: job.location, salary: job.salary });
  };

  // Update a job after editing
  const handleUpdateJob = () => {
    if (Object.values(newJob).some((field) => !field)) {
      alert("Please fill out all fields");
      return;
    }

    const updatedJobs = jobListings.map((job) => (job.id === editJobId ? { ...job, ...newJob } : job));
    setJobListings(updatedJobs);
    setIsEditing(false);
    setNewJob({ title: "", description: "", location: "", salary: "" });
  };

  // Delete a job
  const handleDeleteJob = (id) => {
    setJobListings(jobListings.filter((job) => job.id !== id));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login/admin", { replace: true });
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      {/* Add/Edit Job Form */}
      <div className="job-form">
        <h3>{isEditing ? "Edit Job" : "Add New Job"}</h3>
        <input
          type="text"
          placeholder="Job Title"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newJob.description}
          onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newJob.location}
          onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Salary"
          value={newJob.salary}
          onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
        />
        <button onClick={isEditing ? handleUpdateJob : handleAddJob}>
          {isEditing ? "Update Job" : "Add Job"}
        </button>
      </div>

      {/* Job Listings */}
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
              <button onClick={() => handleEditJob(job)}>Edit</button>
              <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AdminPanel;
