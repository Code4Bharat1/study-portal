import React from 'react'

const StringJava = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800">Strings in Java</h1>

          <p className="mt-4 text-lg text-gray-700">
            In Java, a <strong>String</strong> is an object that represents a sequence of characters. Strings are widely used in Java programming and are immutable, meaning once created, their values cannot be changed.
          </p>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Creating Strings</h2>
          <p className="mt-2 text-lg text-gray-700">There are two ways to create a string in Java:</p>
          <ul className="list-disc pl-6 mt-2 text-lg text-gray-700">
            <li>Using string literals</li>
            <li>Using the <code>new</code> keyword</li>
          </ul>

          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-4 overflow-auto">
{`String str1 = "Hello";              // String literal
String str2 = new String("World");   // Using new keyword`}
          </pre>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">String Methods</h2>
          <p className="mt-2 text-lg text-gray-700">Java provides many built-in methods for string manipulation:</p>
          <ul className="list-disc pl-6 mt-2 text-lg text-gray-700">
            <li><code>length()</code> – returns the length of the string</li>
            <li><code>charAt(int index)</code> – returns character at specified index</li>
            <li><code>substring(int start, int end)</code> – extracts part of the string</li>
            <li><code>toLowerCase()</code> / <code>toUpperCase()</code> – changes case</li>
            <li><code>contains(String)</code> – checks for a substring</li>
            <li><code>equals(String)</code> – compares content</li>
            <li><code>equalsIgnoreCase(String)</code> – compares ignoring case</li>
            <li><code>trim()</code> – removes leading and trailing spaces</li>
            <li><code>replace(old, new)</code> – replaces characters</li>
          </ul>

          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-4 overflow-auto">
{`String message = " Java Programming ";
System.out.println(message.length());          // 19
System.out.println(message.charAt(2));         // v
System.out.println(message.trim());            // "Java Programming"
System.out.println(message.toUpperCase());     // " JAVA PROGRAMMING "
System.out.println(message.contains("Pro"));   // true`}
          </pre>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">String Comparison</h2>
          <p className="mt-2 text-lg text-gray-700">
            Strings can be compared using <code>equals()</code> and <code>==</code>.
            It's important to use <code>equals()</code> when checking string values.
          </p>

          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-4 overflow-auto">
{`String a = "Hello";
String b = new String("Hello");

System.out.println(a == b);         // false (compares references)
System.out.println(a.equals(b));    // true (compares values)`}
          </pre>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">String Concatenation</h2>
          <p className="mt-2 text-lg text-gray-700">
            You can join strings using the <code>+</code> operator or <code>concat()</code> method.
          </p>

          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-4 overflow-auto">
{`String first = "Java";
String second = "Rocks";
System.out.println(first + " " + second);        // Java Rocks
System.out.println(first.concat(" " + second));  // Java Rocks`}
          </pre>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Why Strings Are Immutable?</h2>
          <p className="mt-2 text-lg text-gray-700">
            Strings are immutable in Java to improve performance and security. For example, string pooling saves memory by reusing literal values, and immutability makes strings safe to use in multithreaded environments.
          </p>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">StringBuffer and StringBuilder</h2>
          <p className="mt-2 text-lg text-gray-700">
            If you need a mutable string (i.e., one that can be modified), use:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-700 mt-2">
            <li><strong>StringBuffer</strong> – Thread-safe</li>
            <li><strong>StringBuilder</strong> – Faster but not thread-safe</li>
          </ul>

          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-4 overflow-auto">
{`StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
System.out.println(sb);   // Hello World`}
          </pre>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Conclusion</h2>
          <p className="mt-2 text-lg text-gray-700">
            Strings are essential in Java for handling text. Mastering string methods and understanding immutability will make you more effective in building Java applications.
          </p>
        </div>
      </div>
    </>
  )
}

export default StringJava
