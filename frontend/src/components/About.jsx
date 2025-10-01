import React from 'react';

const About = () => {
  return (
    <section id="about" className="content-section alt-bg">
      <div className="container about-flex">
        <div className="about-image">
          {/* Replace with your actual photo URL */}
          <img src="https://images.unsplash.com/photo-1581456495146-65a71b2c8e52?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800" alt="Photographer John Doe" />
        </div>
        <div className="about-text">
          <h2>About Me</h2>
          <p>Hi, I'm John Doe. For over a decade, I've been capturing moments and telling stories through my lens. My passion lies in finding the extraordinary in the ordinary and creating images that are both authentic and artistic.</p>
          <p>Whether it's a breathtaking landscape, an intimate portrait, or a dynamic event, I strive to create photographs that you'll cherish forever.</p>
        </div>
      </div>
    </section>
  );
};

export default About;