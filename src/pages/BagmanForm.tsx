import React, { useEffect } from "react";

const BagmanForm = () => {
  useEffect(() => {
    // Redirect to external URL immediately when component mounts
    window.location.href = "https://www.bagmanpack.com/form";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Redirecting to Bagman form...</p>
      </div>
    </div>
  );
};

export default BagmanForm;