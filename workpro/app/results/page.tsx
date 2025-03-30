'use client';

import { useEffect, useState } from 'react';
import { FaBriefcase, FaBuilding, FaEnvelope, FaGlobe, FaLinkedin, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaUserTie, FaHeart, FaRocket, FaArrowLeft, FaCheckCircle, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

export default function ResultsPage() {
  const [allMatches, setAllMatches] = useState<any[]>([]);
  const [displayedMatches, setDisplayedMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const matchesPerPage = 3;

  useEffect(() => {
    // Get matches from localStorage
    const storedMatches = localStorage.getItem('jobMatches');
    if (storedMatches) {
      const parsedMatches = JSON.parse(storedMatches);
      setAllMatches(parsedMatches);
      setDisplayedMatches(parsedMatches.slice(0, matchesPerPage));
    }
    setLoading(false);
  }, []);

  const loadMoreMatches = () => {
    const nextPage = page + 1;
    const startIndex = 0;
    const endIndex = nextPage * matchesPerPage;
    setDisplayedMatches(allMatches.slice(startIndex, endIndex));
    setPage(nextPage);
  };

  const hasMoreMatches = displayedMatches.length < allMatches.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your matches...</p>
        </div>
      </div>
    );
  }

  if (allMatches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No matches found</h2>
          <p className="text-gray-600 mb-8">Please try uploading your resume again</p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaArrowLeft size={20} className="mr-2" />
            Back to Upload
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <FaArrowLeft size={20} className="mr-2" />
            Back to Upload
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Job Matches
            </h1>
            <p className="text-xl text-gray-600">
              We've analyzed your resume and found {allMatches.length} matches for your skills
            </p>
          </div>

          <div className="grid gap-8">
            {displayedMatches.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{match.title}</h2>
                      <div className="flex items-center text-gray-600 mt-2">
                        <FaBuilding size={20} className="mr-2" />
                        <span className="text-xl">{match.company}</span>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-lg font-medium">
                      {match.matchScore}% Match
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt size={20} className="mr-2 text-blue-500" />
                      <span>{match.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMoneyBillWave size={20} className="mr-2 text-green-500" />
                      <span>{match.salary}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaClock size={20} className="mr-2 text-purple-500" />
                      <span>{match.jobType}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaUserTie size={20} className="mr-2 text-indigo-500" />
                      <span>{match.experience}</span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
                    <p className="text-gray-600 leading-relaxed">{match.description}</p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {match.requirements && match.requirements.length > 0 ? (
                          match.requirements.map((req: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <FaCheckCircle size={20} className="text-green-500 mr-2 mt-1" />
                              <span className="text-gray-600">{req}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">No specific requirements listed</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {match.skills && match.skills.length > 0 ? (
                          match.skills.map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {skill}
                              {index < match.skills.length - 1 && (
                                <span className="mx-1 text-blue-400">,</span>
                              )}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">No specific skills listed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {match.benefits && match.benefits.length > 0 ? (
                        match.benefits.map((benefit: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <FaCheckCircle size={20} className="text-green-500 mr-2 mt-1" />
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No specific benefits listed</li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Company Culture</h3>
                      <div className="flex items-start">
                        <FaHeart size={20} className="mr-2 text-red-500 mt-1" />
                        <p className="text-gray-600">{match.culture}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Growth Opportunities</h3>
                      <div className="flex items-start">
                        <FaRocket size={20} className="mr-2 text-purple-500 mt-1" />
                        <p className="text-gray-600">{match.growth}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a
                      href={match.applicationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaBriefcase size={20} className="mr-2" />
                      Apply Now
                    </a>
                    <a
                      href={`mailto:careers@${match.company.toLowerCase().replace(/\s+/g, '')}.com`}
                      className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaEnvelope size={20} className="mr-2" />
                      Contact HR
                    </a>
                    <a
                      href={`https://www.linkedin.com/company/${match.company.toLowerCase().replace(/\s+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaLinkedin size={20} className="mr-2" />
                      LinkedIn Profile
                    </a>
                    <a
                      href={`https://${match.company.toLowerCase().replace(/\s+/g, '')}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FaGlobe size={20} className="mr-2" />
                      Company Website
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMoreMatches && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMoreMatches}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <FaPlus size={20} className="mr-2" />
                Load More Opportunities
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 