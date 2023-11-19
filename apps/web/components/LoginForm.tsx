import React from 'react';

const LoginForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // DEPOSIT
  };

  return (
    <form className="w-64 mx-auto mt-8 text-center" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-center">DEPOSIT</h2>
      <div className="mb-4">
      <input
  type="text"
  readOnly
  className="w-full p-2 border"
  placeholder="1.0 L2 MINA Token"
/>
      </div>
      <button type="submit" className="w-full bg-purple-800 text-white py-2 rounded text-center">
        Deposit
      </button>
    </form>
  );
};

export default LoginForm;
