import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import SectionView from './components/SectionView';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <ThemeProvider>
      <Layout 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      >
        <SectionView section={activeSection} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;