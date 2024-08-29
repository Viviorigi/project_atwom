import React from 'react';
import styled from 'styled-components';

interface FacebookShareButtonProps {
  url: string;
  quote?: string; // Optional, since YouTube videos might not need a quote
}

// Styled component for the button
const StyledButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #4267B2; /* Facebook blue color */
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
  
  .icon {
    margin-right: 8px;
    font-size: 18px;
  }

  &:hover {
    background-color: #365899; /* Darker blue when hovered */
    transform: scale(1.05); /* Slightly enlarge button when hovered */
  }

  &:active {
    background-color: #2a4370; /* Even darker blue when clicked */
  }
`;

const FacebookShareButton: React.FC<FacebookShareButtonProps> = ({ url, quote }) => {
  // Encode URL and quote if provided
  const encodedUrl = encodeURIComponent(url);
  const encodedQuote = quote ? encodeURIComponent(quote) : '';

  // Construct share URL
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}${encodedQuote ? `&quote=${encodedQuote}` : ''}`;

  return (
    <StyledButton href={shareUrl} target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook-f icon"></i> Share on Facebook
    </StyledButton>
  );
};

export default FacebookShareButton;
