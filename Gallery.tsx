import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

// Styled components
const GalleryContainer = styled.div`
  width: 100%;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%; // 1:1 Aspect ratio
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  ${ImageContainer}:hover & {
    transform: scale(1.1);
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  grid-column: 1 / -1;
`;

// Generate random image URLs (replace with your actual image sources)
const generateImageUrl = (index: number) => 
  `https://source.unsplash.com/random/800x800?sig=${index}`;

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const loadMoreImages = useCallback(() => {
    setLoading(true);
    const newImages = Array.from({ length: 12 }, (_, i) => 
      generateImageUrl(images.length + i)
    );
    
    setImages(prev => [...prev, ...newImages]);
    setLoading(false);
  }, [images.length]);

  useEffect(() => {
    if (inView && !loading) {
      loadMoreImages();
    }
  }, [inView, loading, loadMoreImages]);

  // Initial load
  useEffect(() => {
    loadMoreImages();
  }, []);

  return (
    <GalleryContainer>
      {images.map((src, index) => (
        <ImageContainer key={index}>
          <Image src={src} alt={`Gallery image ${index + 1}`} loading="lazy" />
        </ImageContainer>
      ))}
      <LoadingContainer ref={ref}>
        {loading ? 'Loading...' : ''}
      </LoadingContainer>
    </GalleryContainer>
  );
};

export default Gallery; 