import React, { useEffect, useRef } from "react";

function ResponseCard({ response }) {
  const responseRef = useRef(null);

  useEffect(() => {
    if (response && responseRef.current) {
      let i = 0;
      const interval = setInterval(() => {
        responseRef.current.textContent = response.substring(0, i);
        i++;
        if (i > response.length) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [response]);

  return (
    <div className="mt-4 w-[650px] max-w-[650px] bg-white text-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 shadow-lg">
      <p ref={responseRef} className="whitespace-pre-wrap text-white-800"></p>
    </div>
  );
}

export default ResponseCard;
