import React, { useState, useEffect } from 'react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'clients', label: 'Clients' },
  { id: 'faqs', label: 'FAQs' }
];

const ScrollIndicator = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.3; // 30% viewport offset
      
      // If we are at the very top of the page, force "home" to be active
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }
      
      let currentSection = 'home';
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const topRelativeToViewport = rect.top + window.scrollY;
          // If the element's top has scrolled past the threshold, mark it as current
          if (scrollPos >= topRelativeToViewport - 120) {
            currentSection = id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also run on resize to adapt to layout shifts
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Defer initial check slightly to allow page elements to mount fully
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="fixed right-[20px] md:right-[30px] top-1/2 -translate-y-1/2 z-[100] hidden sm:flex flex-col items-center justify-center pointer-events-auto">
      <div 
        className="flex flex-col items-center gap-5 px-[10px] py-[18px] rounded-full shadow-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <div
              key={section.id}
              onClick={() => handleScrollTo(section.id)}
              className="relative cursor-pointer flex items-center justify-center w-[18px] h-[18px]"
              title={section.label}
            >
              {/* Active ring — CSS transition instead of motion layoutId */}
              <div
                className="absolute inset-0 rounded-full border-[2px] transition-all duration-300"
                style={{
                  borderColor: isActive ? '#1a1a1a' : 'transparent',
                  transform: isActive ? 'scale(1)' : 'scale(0.5)',
                  opacity: isActive ? 1 : 0,
                }}
              />
              {/* Dot */}
              <div
                className="rounded-full bg-[#1a1a1a] transition-all duration-200"
                style={{
                  width: isActive ? 7 : 6,
                  height: isActive ? 7 : 6,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollIndicator;
