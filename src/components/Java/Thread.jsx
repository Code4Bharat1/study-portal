import React from 'react'

const Threadjava = () => {
  return (
    <>
      <div className="p-6 ml-80">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800">Threads in Java</h1>

          <p className="mt-4 text-lg text-gray-700">
            A <strong>Thread</strong> in Java is a lightweight process. Java supports multithreading, which allows multiple threads to run concurrently. Threads are useful for performing multiple tasks simultaneously, such as downloading files, handling user input, and background tasks.
          </p>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">What is Multithreading?</h2>
          <p className="mt-2 text-lg text-gray-700">
            <strong>Multithreading</strong> is a programming concept where two or more threads run concurrently to achieve parallelism. It helps to utilize the CPU efficiently.
          </p>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Creating Threads in Java</h2>
          <p className="mt-2 text-lg text-gray-700">
            There are two ways to create a thread in Java:
          </p>
          <ul className="list-disc pl-6 mt-2 text-lg text-gray-700">
            <li>By extending the <code>Thread</code> class</li>
            <li>By implementing the <code>Runnable</code> interface</li>
          </ul>

          <h3 className="mt-4 text-xl font-semibold text-gray-800">1. Extending the Thread Class</h3>
          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-2 overflow-auto">
{`class MyThread extends Thread {
  public void run() {
    System.out.println("Thread is running...");
  }

  public static void main(String[] args) {
    MyThread t1 = new MyThread();
    t1.start();  // Starts the thread
  }
}`}
          </pre>

          <h3 className="mt-4 text-xl font-semibold text-gray-800">2. Implementing the Runnable Interface</h3>
          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-2 overflow-auto">
{`class MyRunnable implements Runnable {
  public void run() {
    System.out.println("Runnable thread running...");
  }

  public static void main(String[] args) {
    MyRunnable obj = new MyRunnable();
    Thread t1 = new Thread(obj);
    t1.start();
  }
}`}
          </pre>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Thread Lifecycle</h2>
          <p className="mt-2 text-lg text-gray-700">
            A Java thread can be in one of the following states:
          </p>
          <ul className="list-disc pl-6 text-lg text-gray-700 mt-2">
            <li><strong>New</strong>: Thread is created but not started</li>
            <li><strong>Runnable</strong>: Thread is ready to run</li>
            <li><strong>Running</strong>: Thread is currently executing</li>
            <li><strong>Blocked/Waiting</strong>: Waiting for a resource</li>
            <li><strong>Terminated</strong>: Thread has completed execution</li>
          </ul>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Thread Methods</h2>
          <ul className="list-disc pl-6 text-lg text-gray-700 mt-2">
            <li><code>start()</code> – starts the thread</li>
            <li><code>run()</code> – defines the task</li>
            <li><code>sleep(ms)</code> – pauses thread for given milliseconds</li>
            <li><code>join()</code> – waits for a thread to finish</li>
            <li><code>isAlive()</code> – checks if thread is active</li>
            <li><code>setPriority()</code> – sets thread priority</li>
          </ul>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Example with Sleep and Join</h2>
          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-2 overflow-auto">
{`class Demo extends Thread {
  public void run() {
    for (int i = 1; i <= 5; i++) {
      try {
        Thread.sleep(500);
      } catch (InterruptedException e) {
        System.out.println(e);
      }
      System.out.println(i);
    }
  }

  public static void main(String[] args) {
    Demo t1 = new Demo();
    Demo t2 = new Demo();
    t1.start();
    t2.start();
  }
}`}
          </pre>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Thread Synchronization</h2>
          <p className="mt-2 text-lg text-gray-700">
            When multiple threads access shared resources, we must ensure that only one thread can access the resource at a time. This is called <strong>synchronization</strong>.
          </p>
          <pre className="p-4 bg-gray-100 text-[#37474f] rounded-lg mt-2 overflow-auto">
{`class Table {
  synchronized void printTable(int n) {
    for (int i = 1; i <= 5; i++) {
      System.out.println(n * i);
      try {
        Thread.sleep(500);
      } catch (Exception e) {
        System.out.println(e);
      }
    }
  }
}`}
          </pre>

          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Conclusion</h2>
          <p className="mt-2 text-lg text-gray-700">
            Threads are essential for building high-performance Java applications that can perform multiple tasks concurrently. Understanding how to create, manage, and synchronize threads will help you write more responsive and efficient code.
          </p>
        </div>
      </div>
    </>
  )
}

export default Threadjava
