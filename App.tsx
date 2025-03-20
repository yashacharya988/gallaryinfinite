import React from 'react';
import styled from 'styled-components';
import Gallery from './components/Gallery';

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Gallery />
    </AppContainer>
  );
};

export default App; 