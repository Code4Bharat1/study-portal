'use client'

import { useState } from "react";
import Link from 'next/link';

const MongoDBSidebar = () => {
  const [isOpen, setIsOpen] = useState({});

  const toggleDropdown = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-64 bg-white text-black p-4 h-screen fixed">
      <h2 className="text-2xl font-bold mb-6">MongoDB Tutorial</h2>
      <nav className="space-y-2">
        <ul>
          <li>
            <a
              href="/homemongodbpage"
              className="block p-2 rounded-md hover:bg-green-300"
            >
              MongoDB HOME
            </a>
          </li>
          <li>
            <a
              href="/apimongodb"
              className="block p-2 rounded-md hover:bg-green-300"
            >
              MongoDB API
            </a>
          </li>
          <li>
            <a
              href="/installationMongo"
              className="block p-2 rounded-md hover:bg-green-700"
            >
              MongoDB Installation
            </a>
          </li>
          <li>
            <a
              href="/basicmongo"
              className="block p-2 rounded-md hover:bg-green-700"
            >
              MongoDB Basics
            </a>
          </li>
          <li>
            <a
              href="/curdmongo"
              className="block p-2 rounded-md hover:bg-green-700"
            >
              MongoDB CRUD Operations
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-2 rounded-md hover:bg-green-700"
            >
              MongoDB Collections
            </a>
          </li>
          <li>
            <button
              onClick={() => toggleDropdown("aggregation")}
              className="block w-full text-left p-2 rounded-md hover:bg-green-700"
            >
              MongoDB Aggregation
            </button>
            {isOpen.aggregation && (
              <ul className="pl-4">
                <li>
                  <a
                    href="#"
                    className="block p-2 rounded-md hover:bg-green-700"
                  >
                    Aggregation Pipeline
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 rounded-md hover:bg-green-700"
                  >
                    Group Stage
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => toggleDropdown("indexes")}
              className="block w-full text-left p-2 rounded-md hover:bg-green-700"
            >
              MongoDB Indexes
            </button>
            {isOpen.indexes && (
              <ul className="pl-4">
                <li>
                  <a
                    href="#"
                    className="block p-2 rounded-md hover:bg-green-700"
                  >
                    Index Types
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block p-2 rounded-md hover:bg-green-700"
                  >
                    Creating Indexes
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <a
              href="#"
              className="block p-2 rounded-md hover:bg-green-700"
            >
              MongoDB Security
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-2 rounded-md hover:bg-green-700"
            >
              MongoDB Performance
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-2 rounded-md hover:bg-green-700"
            >
              MongoDB Replication
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-2 rounded-md hover:bg-green-700"
            >
              MongoDB Sharding
            </a>
          </li>
          {/* Continue adding other sections as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default MongoDBSidebar;
