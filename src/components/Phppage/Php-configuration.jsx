'use client';

import useReadingTracker from "@/app/hook/useReadingTracker";

export default function PhpConfiguration() {
  useReadingTracker('php-configuration');
  return (
    <div className="p-6 ml-70">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">PHP Configuration</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-[#DDA0DD] mb-4">php.ini Settings</h2>
        
        <div className="text-gray-800 space-y-6 text-sm leading-relaxed">
          <p>
            The php.ini file controls PHP's behavior and security settings.
          </p>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Important Settings</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`; Error reporting
error_reporting = E_ALL
display_errors = Off
log_errors = On

; File uploads
file_uploads = On
upload_max_filesize = 2M
max_file_uploads = 20

; Security
allow_url_fopen = Off
allow_url_include = Off
expose_php = Off

; Session
session.cookie_httponly = 1
session.cookie_secure = 1
session.use_strict_mode = 1`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold text-[#DDA0DD]">Runtime Configuration</h3>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code className="text-[#DDA0DD]">
{`<?php
  // Set configuration at runtime
  ini_set('display_errors', 0);
  ini_set('log_errors', 1);
  ini_set('error_log', '/var/log/php_errors.log');
?>`}
            </code>
          </pre>
        </div>

        <button className="mt-8 bg-[#DDA0DD] text-white px-6 py-2 rounded-full hover:bg-[#BA55D3]">
          Learn Deployment
        </button>
      </div>
    </div>
  );
}