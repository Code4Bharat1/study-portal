import React from 'react';

const FileHandling = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-gray-800">File Handling in Java</h1>

          {/* Introduction */}
          <p className="mt-4 text-lg text-gray-600">
            File handling in Java allows programs to create, read, update, and delete files. Java provides a rich set of APIs to work with files, using classes from the <code>java.io</code> and <code>java.nio</code> packages. In this section, we will focus on basic file operations such as reading and writing files using the <code>File</code>, <code>FileReader</code>, <code>FileWriter</code>, and other related classes.
          </p>

          {/* File Handling in Java */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Basic File Operations</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li><strong>Creating a File:</strong> Using <code>File</code> class.</li>
              <li><strong>Reading from a File:</strong> Using <code>FileReader</code> and <code>BufferedReader</code>.</li>
              <li><strong>Writing to a File:</strong> Using <code>FileWriter</code> and <code>BufferedWriter</code>.</li>
              <li><strong>Deleting a File:</strong> Using the <code>delete()</code> method from the <code>File</code> class.</li>
            </ul>
          </div>

          {/* File Creation Example */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Creating a File</h2>
            <p className="mt-4 text-lg text-gray-600">
              Java provides the <code>File</code> class to create files in the system. Here's how to create a file in Java:
            </p>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`import java.io.File;
import java.io.IOException;

public class CreateFile {
    public static void main(String[] args) {
        try {
            File file = new File("example.txt");
            if (file.createNewFile()) {
                System.out.println("File created: " + file.getName());
            } else {
                System.out.println("File already exists.");
            }
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}`}
            </pre>
          </div>

          {/* Reading from a File */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Reading from a File</h2>
            <p className="mt-4 text-lg text-gray-600">
              To read the contents of a file, we can use the <code>FileReader</code> and <code>BufferedReader</code> classes. Here's an example:
            </p>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`import java.io.File;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;

public class ReadFile {
    public static void main(String[] args) {
        try {
            FileReader fr = new FileReader("example.txt");
            BufferedReader br = new BufferedReader(fr);
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
            br.close();
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}`}
            </pre>
          </div>

          {/* Writing to a File */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Writing to a File</h2>
            <p className="mt-4 text-lg text-gray-600">
              To write data to a file, we use <code>FileWriter</code> and <code>BufferedWriter</code>. Here's an example of writing text to a file:
            </p>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`import java.io.File;
import java.io.FileWriter;
import java.io.BufferedWriter;
import java.io.IOException;

public class WriteFile {
    public static void main(String[] args) {
        try {
            FileWriter writer = new FileWriter("example.txt");
            BufferedWriter bw = new BufferedWriter(writer);
            bw.write("Hello, World!");
            bw.newLine();
            bw.write("This is Java file handling.");
            bw.close();
            System.out.println("File written successfully.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}`}
            </pre>
          </div>

          {/* Deleting a File */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Deleting a File</h2>
            <p className="mt-4 text-lg text-gray-600">
              Java provides the <code>delete()</code> method to delete files. Here's an example of how to delete a file:
            </p>
            <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg overflow-auto">
{`import java.io.File;

public class DeleteFile {
    public static void main(String[] args) {
        File file = new File("example.txt");
        if (file.delete()) {
            System.out.println("Deleted the file: " + file.getName());
        } else {
            System.out.println("Failed to delete the file.");
        }
    }
}`}
            </pre>
          </div>

          {/* File Handling Best Practices */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Best Practices in File Handling</h2>
            <ul className="mt-4 text-lg text-gray-600 list-disc pl-6">
              <li>Always use <code>BufferedReader</code> and <code>BufferedWriter</code> for efficient reading and writing.</li>
              <li>Handle exceptions properly using <code>try-catch</code> blocks.</li>
              <li>Use <code>finally</code> to ensure that files are closed after operations.</li>
              <li>Use relative file paths when working with files to avoid system-dependent paths.</li>
              <li>Check if the file exists before performing operations like reading or deleting.</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="mt-6">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition">
              Next: Learn about Java Multithreading &raquo;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileHandling;
