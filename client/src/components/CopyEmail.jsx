import { useState } from "react";
import { EnvelopeIcon, ClipboardIcon } from "@heroicons/react/24/outline";

const CopyEmail = () => {
  const [copied, setCopied] = useState(false);
  const email = "grandeile@protonmail.ch";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center space-x-2 text-xs md:text-sm hover:text-blue-600 transition-colors"
    >
      <EnvelopeIcon className="w-4 h-4" />
      <span className="text-xs md:text-lg">{email}</span>
      <ClipboardIcon className="w-4 h-4 text-gray-400" />
      {copied && <span className="text-green-500 text-xs ml-2">Copied</span>}
    </button>
  );
};

export default CopyEmail;
