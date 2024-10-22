// src/app/onboarding/Onboarding.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {step === 0 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Pallas!</h1>
          <p className="mt-4">Get ready to organize your activities based on your ideal week.</p>
          <button onClick={handleNext} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Set Up Your Account</h1>
          <input
            type="text"
            placeholder="Enter your name"
            className="mt-4 border border-gray-300 rounded p-2"
          />
          <button onClick={handleNext} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
          <button onClick={handleBack} className="mt-2 text-gray-500">
            Back
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Discover Key Features</h1>
          <p className="mt-4">Let’s highlight some of the features you can use.</p>
          {/* You can implement a simple feature tour here */}
          <button onClick={handleNext} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
          <button onClick={handleBack} className="mt-2 text-gray-500">
            Back
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">You’re All Set!</h1>
          <p className="mt-4">Thank you for completing the onboarding! Start organizing your tasks now.</p>
          <button onClick={() => {router.push('/dashboard');}} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded">
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;