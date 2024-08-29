import React from 'react';

interface FacebookShareButtonProps {
  url: string;
  quote?: string; // Optional, since YouTube videos might not need a quote
}

const FacebookShareButton: React.FC<FacebookShareButtonProps> = ({ url, quote }) => {
  // Encode URL and quote if provided
  const encodedUrl = encodeURIComponent(url);
  const encodedQuote = quote ? encodeURIComponent(quote) : '';

  // Construct share URL
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}${encodedQuote ? `&quote=${encodedQuote}` : ''}`;

  return (
    <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
      Share on Facebook
    </a>
  );
};

export default FacebookShareButton;
