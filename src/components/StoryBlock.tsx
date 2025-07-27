import React from 'react';

interface StoryBlockProps {
  title?: string;
  text: string;
  imageUrl?: string;
  className?: string;
}

const StoryBlock: React.FC<StoryBlockProps> = ({ title, text, imageUrl, className }) => {
  return (
    <section
      className={`scroll-block ${className || ''}`}
      data-scroll-section
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4rem',
        background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : '#000',
        color: '#fff',
      }}
    >
      {title && (
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>
          {title}
        </h2>
      )}
      <p style={{ fontSize: '1.25rem', maxWidth: '860px', lineHeight: '1.7' }}>
        {text}
      </p>
    </section>
  );
};

export default StoryBlock;