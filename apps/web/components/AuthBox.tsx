import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthBox: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleForm = () => {
    setShowLogin(prevState => !prevState);
  };

  return (
    <div className="w-[550px] mx-auto mt-20 mb-20 p-6 bg-white rounded-lg shadow-md text-center border border-gray-600">
    {showLogin ? <LoginForm /> : <RegistrationForm />}
    <p className="mt-4 text-gray-600">
      <button
        className="text-gray-600 focus:outline-none font-bold font-size"
        onClick={handleToggleForm}
      >
        {showLogin ? 'WITHDRAW' : 'DEPOSIT'}
      </button>
    </p>
  </div>
  


  );
};

export default AuthBox;
