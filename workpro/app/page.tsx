'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUpload, FaFileAlt, FaBriefcase, FaRocket, FaShieldAlt, FaUserAlt, FaFileContract, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="header">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="text-2xl font-bold flex items-center">
            <FaBriefcase className="mr-2" /> WorkPro
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-white hover:text-opacity-80 font-medium">Home</Link>
            <Link href="/jobs" className="text-white hover:text-opacity-80 font-medium">Jobs</Link>
            <Link href="/profile" className="text-white hover:text-opacity-80 font-medium">Profile</Link>
            <Link href="/contracts" className="text-white hover:text-opacity-80 font-medium">Smart Contracts</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-white hover:text-opacity-80 font-medium">Log in</Link>
            <Link href="/signup" className="btn btn-accent">Get started</Link>
          </div>
        </div>
      </header>

      {/* Hero Section with animated gradient background */}
      <div className="animated-bg py-24">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              DISTRIBUTED <br />
              <span className="highlight">STORAGE</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 opacity-90">
              Smart contracts with blockchain security and distributed storage
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Link href="/profile/create" className="btn btn-accent text-lg flex items-center justify-center">
                Get started <FaArrowRight className="ml-2" />
              </Link>
              <Link href="/docs" className="btn bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 text-lg">
                Read docs
              </Link>
            </div>
            <div className="bg-foreground/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/10 inline-block">
              <pre className="text-left font-mono text-white">
                <code>npm install workpro-sdk</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-foreground text-white py-10 text-center">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">ENTERPRISE-GRADE STORAGE SOLUTION</h2>
          <div className="flex flex-wrap justify-center items-center space-x-8 space-y-4 md:space-y-0">
            {/* Would insert partner logos here */}
            <div className="h-8 w-24 bg-white/20 rounded-md"></div>
            <div className="h-8 w-24 bg-white/20 rounded-md"></div>
            <div className="h-8 w-24 bg-white/20 rounded-md"></div>
            <div className="h-8 w-24 bg-white/20 rounded-md"></div>
            <div className="h-8 w-24 bg-white/20 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Service Comparison */}
      <div className="py-20 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Storage <span className="gradient-text">Solutions</span></h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">SCENARIO</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">PINATA (IPFS)</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">AUTONOMYS (DSN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Temporary Data</td>
                  <td className="px-6 py-4 text-sm text-gray-600">User avatars, job descriptions, drafts</td>
                  <td className="px-6 py-4 text-sm text-gray-600"><span className="text-red-500">✕</span> (Use Pinata for ephemeral data)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Permanent Data</td>
                  <td className="px-6 py-4 text-sm text-gray-600"><span className="text-red-500">✕</span> (Use Autonomys)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Contracts, payment records, agent memory</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Frequent Updates</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Profile updates, temporary messages</td>
                  <td className="px-6 py-4 text-sm text-gray-600"><span className="text-red-500">✕</span> (Autonomys is immutable)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">Trustless Verification</td>
                  <td className="px-6 py-4 text-sm text-gray-600"><span className="text-red-500">✕</span> (IPFS is centralized via Pinata)</td>
                  <td className="px-6 py-4 text-sm text-gray-600">On-chain agent interactions, NFTs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Technical <span className="gradient-text">Integration</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-foreground rounded-xl overflow-hidden shadow-xl">
                <div className="flex items-center bg-gray-900 px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-gray-200 text-sm">Terminal</div>
                </div>
                <div className="p-4 font-mono text-sm text-green-400 bg-black">
                  <div className="mb-2">$ npm i workpro-sdk</div>
                  <div className="text-gray-400 mb-2">Installing packages...</div>
                  <div className="text-gray-400 mb-2">Added 42 packages in 3.2s</div>
                  <div className="mb-2">$ node</div>
                  <div className="mb-2">&gt; const workpro = require('workpro-sdk')</div>
                  <div className="mb-2">&gt; const client = new workpro.Client('API_KEY')</div>
                  <div className="mb-2">&gt; const contract = await client.createContract(data)</div>
                  <div className="mb-2 text-white">'Contract stored on Autonomys DSN: autonomys-4f8b9c'</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Dual Storage Architecture</h3>
              <p className="text-lg text-gray-600 mb-6">
                WorkPro implements a strategic dual-storage approach:
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium">Pinata (IPFS)</h4>
                    <p className="text-gray-600">For ephemeral data, user profiles, and content that requires frequent updates</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-lg font-medium">Autonomys (DSN)</h4>
                    <p className="text-gray-600">For immutable contracts, payment records, and trustless verification</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/docs/integration" className="text-primary font-medium hover:text-primary-hover">View integration docs →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-bg text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Start building today</h2>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/profile/create" className="btn bg-white text-primary hover:bg-white/90 text-lg">
              Create Profile
            </Link>
            <Link href="/jobs/post" className="btn bg-foreground text-white hover:bg-foreground/90 border border-white/20 text-lg">
              Post a Job
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <FaBriefcase className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold">WorkPro</span>
              </div>
              <p className="text-gray-400">Decentralized Work Platform</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Platform</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/jobs" className="text-gray-400 hover:text-white">Jobs</Link></li>
                <li><Link href="/profile" className="text-gray-400 hover:text-white">Profile</Link></li>
                <li><Link href="/contracts" className="text-gray-400 hover:text-white">Smart Contracts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/docs" className="text-gray-400 hover:text-white">Documentation</Link></li>
                <li><Link href="/api" className="text-gray-400 hover:text-white">API Reference</Link></li>
                <li><a href="https://github.com/example/workpro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} WorkPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}