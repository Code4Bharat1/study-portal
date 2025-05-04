"use client";
import useReadingTracker from '@/components/useReadingTracker';
import React from 'react';

const Basicmongo = () => {
  useReadingTracker('basicmongo');
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">Basic MongoDB Operations</h1>

          {/* Introduction Section */}
          <p className="mt-4 text-lg text-gray-600">
            MongoDB is a powerful, flexible, and scalable NoSQL database that stores data in JSON-like documents. This
            section will introduce you to basic MongoDB operations such as creating databases, creating collections, and
            performing CRUD operations (Create, Read, Update, Delete).
          </p>

          {/* Connecting to MongoDB Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Connecting to MongoDB</h2>
            <p className="mt-4 text-lg text-gray-600">
              To connect to MongoDB, open your terminal or command prompt and type the following command:
            </p>
            <pre className="p-4 bg-gray-100 text-green-600 rounded-lg">
              {`mongo`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              This will connect to the default MongoDB server running on <strong>localhost</strong> at port <strong>27017</strong>.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              To connect to a specific database, use the following command:
            </p>
            <pre className="p-4 bg-gray-100 text-green-600 rounded-lg">
              {`use myDatabase`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              Replace <strong>myDatabase</strong> with the name of the database you want to connect to.
            </p>
          </div>

          {/* Creating a Database Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Creating a Database</h2>
            <p className="mt-4 text-lg text-gray-600">
              MongoDB databases are created automatically when you insert data. To create a database, simply use the
              <code>use</code> command. If the database does not exist, MongoDB will create it for you:
            </p>
            <pre className="p-4 bg-gray-100 text-green-600 rounded-lg">
              {`use myDatabase`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              This command will create a database named <strong>myDatabase</strong> if it doesn’t already exist.
            </p>
          </div>

          {/* Creating a Collection Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Creating a Collection</h2>
            <p className="mt-4 text-lg text-gray-600">
              In MongoDB, a collection is similar to a table in a relational database. To create a collection, use the
              <code>db.createCollection()</code> method:
            </p>
            <pre className="p-4 bg-gray-100 text-green-600 rounded-lg">
              {`db.createCollection("myCollection")`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              This creates a collection named <strong>myCollection</strong> within the current database.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              However, you don’t need to explicitly create collections in MongoDB. If you insert a document into a collection
              that doesn’t exist, MongoDB will automatically create the collection.
            </p>
          </div>

          {/* Inserting Data into MongoDB Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Inserting Data into a Collection</h2>
            <p className="mt-4 text-lg text-gray-600">
              To insert data into a collection, use the <code>insertOne()</code> method for inserting a single document:
            </p>
            <pre className="p-4 bg-gray-100 text-green-600 rounded-lg">
              {`db.myCollection.insertOne({ name: "John", age: 30 })`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              This command inserts a single document into the <strong>myCollection</strong> collection.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              To insert multiple documents, use the <code>insertMany()</code> method:
            </p>
            <pre className="p-4 bg-gray-100 text-green-600 rounded-lg">
              {`db.myCollection.insertMany([{ name: "Jane", age: 25 }, { name: "Mark", age: 40 }])`}
            </pre>
          </div>

          {/* Reading Data from MongoDB Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Reading Data from MongoDB</h2>
            <p className="mt-4 text-lg text-gray-600">
              To retrieve documents from a collection, use the <code>find()</code> method. This command returns all documents:
            </p>
            <pre className="p-4 bg-gray-100 text-green-600 rounded-lg">
              {`db.myCollection.find()`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              To filter the results, pass a query object. For example, to find documents where the <strong>age</strong> is greater than 30:
            </p>
            <pre className="p-4 bg-gray-100 text-green-600 rounded-lg">
              {`db.myCollection.find({ age: { $gt: 30 } })`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              The query above will return documents where the <strong>age</strong> field is greater than 30.
            </p>
          </div>

          {/* Updating Data in MongoDB Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Updating Data in MongoDB</h2>
            <p className="mt-4 text-lg text-gray-600">
              To update a document, use the <code>updateOne()</code> method. For example, to update a document where the
              <strong>name</strong> is "John":
            </p>
            <pre className="p-4 bg-gray-100 text-green-600 rounded-lg">
              {`db.myCollection.updateOne(
  { name: "John" },
  { $set: { age: 35 } }
)`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              This will update the <strong>age</strong> field of the document where the <strong>name</strong> is "John" to 35.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              To update multiple documents, use the <code>updateMany()</code> method.
            </p>
          </div>

          {/* Deleting Data from MongoDB Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Deleting Data from MongoDB</h2>
            <p className="mt-4 text-lg text-gray-600">
              To delete a document, use the <code>deleteOne()</code> method:
            </p>
            <pre className="p-4 bg-gray-100 text-green-600 rounded-lg">
              {`db.myCollection.deleteOne({ name: "John" })`}
            </pre>
            <p className="mt-4 text-lg text-gray-600">
              This will delete the first document where the <strong>name</strong> is "John".
            </p>
            <p className="mt-4 text-lg text-gray-600">
              To delete multiple documents, use the <code>deleteMany()</code> method.
            </p>
          </div>

          {/* Conclusion Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Conclusion</h2>
            <p className="mt-4 text-lg text-gray-600">
              MongoDB is a flexible, scalable NoSQL database that supports easy creation and manipulation of data using
              a variety of operations. This guide covered the basics of MongoDB, including connecting to MongoDB, creating
              databases and collections, and performing basic CRUD operations. You can now use these basic operations to
              start building applications with MongoDB.
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-6">
            <button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition">
              Start building with MongoDB now &raquo;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Basicmongo;
