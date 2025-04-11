import React from 'react';
import { Share2Icon, FacebookIcon, InstagramIcon, MailIcon } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
}

export function ShareButton({ title, text }: ShareButtonProps) {
  const shareUrl = window.location.href;
  const encodedText = encodeURIComponent(`${title}: ${text}`);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodedText}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%20${encodeURIComponent(shareUrl)}`,
  };

  return (
    <div className="relative group">
      <button className="rounded-full p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
        <Share2Icon className="h-5 w-5" />
      </button>
      
      <div className="absolute right-0 mt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
          <div className="flex flex-col gap-2">
            <a
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <InstagramIcon className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FacebookIcon className="h-4 w-4" />
              Facebook
            </a>
            <a
              href={shareLinks.email}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <MailIcon className="h-4 w-4" />
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}