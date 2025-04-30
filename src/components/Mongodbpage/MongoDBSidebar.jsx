


'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaDatabase, FaCogs, FaLayerGroup, FaSitemap, FaLock, FaRocket,
  FaCopy, FaProjectDiagram, FaChevronDown, FaChevronUp
} from 'react-icons/fa';

const MongoDBSidebar = () => {
  const [isOpen, setIsOpen] = useState({});
  const pathname = usePathname();

  const toggleDropdown = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getLinkClass = (href) => (
    `block p-2 rounded transition-all duration-200 ease-in-out
    hover:bg-[#d0f0fd]
    ${pathname === href ? 'bg-[#d0f0fd] font-semibold text-black' : 'text-gray-700'}`
  );

  return (
    <div className="w-70 bg-white text-black p-4 h-screen fixed flex flex-col border-r shadow-lg overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">MongoDB Tutorial</h2>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <ul className="space-y-4 pb-29"> {/* <- pb-20 added for padding at bottom */}
          <li>
            <Link href="/homemongodbpage" className={getLinkClass("/homemongodbpage")}>
              <FaDatabase className="inline mr-2 text-xl" /> MongoDB HOME
            </Link>
          </li>
          <li>
            <Link href="/apimongodb" className={getLinkClass("/apimongodb")}>
              <FaCogs className="inline mr-2 text-xl" /> MongoDB API
            </Link>
          </li>
          <li>
            <Link href="/installationMongo" className={getLinkClass("/installationMongo")}>
              <FaCogs className="inline mr-2 text-xl" /> Installation
            </Link>
          </li>
          <li>
            <Link href="/basicmongo" className={getLinkClass("/basicmongo")}>
              <FaLayerGroup className="inline mr-2 text-xl" /> Basics
            </Link>
          </li>
          <li>
            <Link href="/curdmongo" className={getLinkClass("/curdmongo")}>
              <FaCopy className="inline mr-2 text-xl" /> CRUD Operations
            </Link>
          </li>

          <li>
            <button
              className="w-full text-left flex items-center justify-between text-lg font-semibold"
              onClick={() => toggleDropdown('aggregation')}
            >
              <span>MongoDB Aggregation</span>
              {isOpen['aggregation'] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isOpen['aggregation'] && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <Link href="/agrigationpipelinemongo" className={getLinkClass("/aggregation-pipeline")}>
                    <FaProjectDiagram className="inline mr-2 text-xl" /> Aggregation Pipeline
                  </Link>
                </li>
                <li>
                  <Link href="/aggregationgroupstage" className={getLinkClass("/group-stage")}>
                    <FaProjectDiagram className="inline mr-2 text-xl" /> Group Stage
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              className="w-full text-left flex items-center justify-between text-lg font-semibold"
              onClick={() => toggleDropdown('indexes')}
            >
              <span>MongoDB Indexes</span>
              {isOpen['indexes'] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isOpen['indexes'] && (
              <ul className="pl-6 mt-2 space-y-2">
                <li>
                  <Link href="/indextypemongo" className={getLinkClass("/index-types")}>
                    <FaLayerGroup className="inline mr-2 text-xl" /> Index Types
                  </Link>
                </li>
                <li>
                  <Link href="/indexcreatingmongo" className={getLinkClass("/creating-indexes")}>
                    <FaLayerGroup className="inline mr-2 text-xl" /> Creating Indexes
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/collectionmongo" className={getLinkClass("/collections")}>
              <FaSitemap className="inline mr-2 text-xl" /> Collections
            </Link>
          </li>
          <li>
            <Link href="/mongoqueryoperator" className={getLinkClass("/security")}>
              <FaLock className="inline mr-2 text-xl" /> Query Operator
            </Link>
          </li>
          <li>
            <Link href="/mongoUpdateoperator" className={getLinkClass("/performance")}>
              <FaRocket className="inline mr-2 text-xl" /> Update Operator
            </Link>
          </li>
          <li>
            <Link href="/mongoDriver" className={getLinkClass("/replication")}>
              <FaCopy className="inline mr-2 text-xl" /> Mongodb Driver
            </Link>
          </li>
          <li>
            <Link href="/mongovaliadtion" className={getLinkClass("/sharding")}>
              <FaProjectDiagram className="inline mr-2 text-xl" />  Validation
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MongoDBSidebar;



