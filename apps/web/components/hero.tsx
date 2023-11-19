import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero" id="hero">
      <div className="home-content -mx-64 align-center mt-20">
        <h1 className="text-7xl text-gap" style={{ color: '#6e00f5', fontWeight: 800 }}>
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            zKeeper, <span style={{ fontWeight: 600, color: 'black' }}>keeps your right</span>
          </div>
          <div className="text-center mx-auto mt-5" style={{ fontWeight: 600, color: 'black' }}>
            to <span style={{ color: '#6e00f5', fontWeight: 800}}>privacy.</span>
          </div>
        </h1>

        <p className="text-2xl break-words mt-14 mx-auto">
          zKeeper is a pioneering zero-knowledge application ensuring absolute privacy in transactions among individuals
          and the public. While championing user privacy, we maintain government support and transparency by not hiding
          transactions from regulatory oversight, ensuring both confidentiality and compliance.
        </p>
        
        
      </div>
    </section>
  );
};

export default Hero;
