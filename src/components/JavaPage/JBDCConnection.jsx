import React from 'react'

const JBDCConnection = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800">JDBC Connection in Java</h1>

          <p className="mt-4 text-lg text-gray-700">
            JDBC (Java Database Connectivity) is an API provided by Java to connect and execute queries with databases. It enables Java applications to interact with various databases using SQL.
          </p>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Key Components of JDBC</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 mt-2">
            <li><strong>DriverManager</strong> – Manages a list of database drivers</li>
            <li><strong>Connection</strong> – Interface for establishing a database connection</li>
            <li><strong>Statement</strong> – Used to execute SQL queries</li>
            <li><strong>ResultSet</strong> – Stores the results of SQL queries</li>
          </ul>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Steps to Connect to a Database Using JDBC</h2>
          <ol className="list-decimal pl-6 text-lg text-gray-700 mt-2">
            <li>Load the JDBC driver</li>
            <li>Establish a connection</li>
            <li>Create a statement</li>
            <li>Execute the query</li>
            <li>Process the results</li>
            <li>Close the connection</li>
          </ol>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Example: Connecting to MySQL Database</h2>
          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-2 overflow-auto">
{`import java.sql.*;

public class DBConnection {
  public static void main(String[] args) {
    try {
      // Step 1: Load the driver
      Class.forName("com.mysql.cj.jdbc.Driver");

      // Step 2: Create a connection
      Connection con = DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/mydatabase", "root", "password");

      // Step 3: Create a statement
      Statement stmt = con.createStatement();

      // Step 4: Execute query
      ResultSet rs = stmt.executeQuery("SELECT * FROM users");

      // Step 5: Process the result
      while (rs.next()) {
        System.out.println(rs.getInt(1) + " " + rs.getString(2));
      }

      // Step 6: Close the connection
      con.close();

    } catch (Exception e) {
      System.out.println(e);
    }
  }
}`}
          </pre>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Common JDBC Drivers</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 mt-2">
            <li>MySQL – <code>com.mysql.cj.jdbc.Driver</code></li>
            <li>Oracle – <code>oracle.jdbc.driver.OracleDriver</code></li>
            <li>SQL Server – <code>com.microsoft.sqlserver.jdbc.SQLServerDriver</code></li>
            <li>PostgreSQL – <code>org.postgresql.Driver</code></li>
          </ul>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Using PreparedStatement</h2>
          <p className="mt-2 text-lg text-gray-700">
            A <strong>PreparedStatement</strong> is used for executing parameterized queries which improve performance and security.
          </p>
          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-2 overflow-auto">
{`PreparedStatement ps = con.prepareStatement("INSERT INTO users (name, age) VALUES (?, ?)");
ps.setString(1, "Alice");
ps.setInt(2, 25);
ps.executeUpdate();`}
          </pre>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Conclusion</h2>
          <p className="mt-2 text-lg text-gray-700">
            JDBC is essential for Java applications to communicate with relational databases. It provides a standard interface for database interaction, allowing you to build dynamic and data-driven applications.
          </p>
        </div>
      </div>
    </>
  )
}

export default JBDCConnection
