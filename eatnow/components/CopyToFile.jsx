// components/CopyLink.js

import { useRef, useState } from "react";

const CopyLink = ({ link }) => {
  const inputRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      if (inputRef.current) {
        await navigator.clipboard.writeText(inputRef.current.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy the link.");
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <input
        className="text-sm border-none rounded p-2 w-full"
        type="text"
        ref={inputRef}
        value={link}
        readOnly
      />
      <img
        className="w-6 h-6 cursor-pointer"
        src="/images/copy.png"
        alt="Click to copy"
        onClick={copyToClipboard}
      />
      {copied && <span className="text-green-500 text-sm">Copied!</span>}
    </div>
  );
};

export default CopyLink;
