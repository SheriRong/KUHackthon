'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaFileUpload, FaBriefcase, FaUser, FaSearch } from 'react-icons/fa';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
}

interface Profile {
  resumeIpfsHash: string;
  skills: string[];
  experience: number;
  bio: string;
  location: string;
}

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [matchedJobs, setMatchedJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
    fetchMatchedJobs();
    fetchApplications();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchMatchedJobs = async () => {
    try {
      const response = await fetch('/api/jobs/matches');
      const data = await response.json();
      setMatchedJobs(data);
    } catch (error) {
      console.error('Error fetching matched jobs:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">My Profile</h2>
            <button
              onClick={() => router.push('/profile/edit')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
          {profile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <p>{profile.experience} years</p>
              </div>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>

        {/* Matched Jobs Section */}
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <h2 className="text-xl font-bold mb-4">Matched Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedJobs.map((job) => (
              <div
                key={job.id}
                className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {job.matchScore}% Match
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">
                    <FaUser className="inline mr-1" /> {job.type}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <FaSearch className="inline mr-1" /> {job.location}
                  </p>
                </div>
                <button
                  onClick={() => router.push(`/jobs/${job.id}`)}
                  className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/resume/upload')}
            className="flex items-center justify-center gap-2 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <FaFileUpload className="text-blue-500" />
            <span>Upload New Resume</span>
          </button>
          <button
            onClick={() => router.push('/jobs/search')}
            className="flex items-center justify-center gap-2 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <FaBriefcase className="text-blue-500" />
            <span>Browse All Jobs</span>
          </button>
          <button
            onClick={() => router.push('/applications')}
            className="flex items-center justify-center gap-2 bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <FaSearch className="text-blue-500" />
            <span>View Applications</span>
          </button>
        </div>
      </div>
    </div>
  );
}
