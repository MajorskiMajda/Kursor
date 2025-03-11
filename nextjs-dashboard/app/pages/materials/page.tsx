"use client"
import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners'; // Import a spinner from react-spinners

const CalendlyEmbed = () => {
  const [isLoading, setIsLoading] = useState(true);

  


  const handleIframeLoad = () => {
    // Add a delay before setting loading to false
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after the delay
    }, 500); // 1 second delay (you can adjust this as needed)
  };
  

  return (
    <div style={{ position: 'relative',backgroundColor:'white', height: '100%' }}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}>
          {/* Using ClipLoader from react-spinners */}
          <ClipLoader size={100} color="#3498db" />
        </div>
      )}

      <iframe
        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0u_ALq9xwcohtEApN-t4tbVj490AqVGkaCo3Evu7elTcWJhEwcsGUPJaLJCKgfPu3SPl3U8WMN?gv=true"
        style={{ border: 0 }}
        width="100%"
        height="1000px"
        title="Google Calendar Appointments"
        onLoad={handleIframeLoad}
      />
    </div>
  );
};

export default CalendlyEmbed;
