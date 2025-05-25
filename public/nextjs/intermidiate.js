import {
  FaCodeBranch,
  FaFolderOpen,
  FaBug,
  FaShieldAlt,
  FaDatabase,
  FaUserShield,
  FaLock,
  FaSync,
  FaUserEdit,
  FaEnvelopeOpenText,
} from "react-icons/fa";

const nextjsIntermediateMenu = [
  {
    label: "1. Create dynamic API routes with query params",
    icon: <FaCodeBranch className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-intermediate/1/dynamic-api-routes"),
  },
  {
    label: "2. Implement API route middleware for logging",
    icon: <FaFolderOpen className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-intermediate/2/api-route-logging"),
  },
  {
    label: "3. Handle errors gracefully in API routes",
    icon: <FaBug className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-intermediate/3/api-error-handling"),
  },
  {
    label: "4. Use SWR for client-side data fetching",
    icon: <FaShieldAlt className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-intermediate/4/swr-data-fetching"),
  },
  {
    label: "5. Integrate getServerSideProps with external API",
    icon: <FaDatabase className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-intermediate/5/server-side-props"),
  },
  {
    label: "6. Protect pages with authentication in middleware",
    icon: <FaUserShield className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-intermediate/6/auth-middleware"),
  },
  {
    label: "7. Use environment variables securely in Next.js",
    icon: <FaLock className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-intermediate/7/env-variables"),
  },
  {
    label: "8. Implement incremental static regeneration",
    icon: <FaSync className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-intermediate/8/incremental-regeneration"),
  },
  {
    label: "9. Create API route for file upload handling",
    icon: <FaUserEdit className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-intermediate/9/file-upload-api"),
  },
  {
    label: "10. Send emails from Next.js API route",
    icon: <FaEnvelopeOpenText className="inline mr-2 text-xl" />,
    onClick: (e) => handleOnChange("nextjs-intermediate/10/send-email-api"),
  },
];

export default nextjsIntermediateMenu;
