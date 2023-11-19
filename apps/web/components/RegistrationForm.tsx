import React from 'react';

const RegistrationForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle registration logic here


  };
 //WITHDRAW CODE


  return (
    <form className="mx-auto mt-8 max-w-lg w-full w-[350px]" onSubmit={handleSubmit}>
  <h2 className="text-2xl font-bold mb-4 text-center">WITHDRAW</h2>
  <div className="mb-4">
    <input type="text" placeholder="$Nullifier" className="w-[350px] h-[50px] p-2 border" required />
  </div>
  <div className="mb-4">
    <input type="text" placeholder="$MerkleWitness" className="w-[350px] h-[50px] p-2 border" required />
  </div>
  <button type="submit" className="w-full bg-purple-800 w-[200px] h-[40px] text-white py-1 rounded">
    Generate Proof
  </button>
  <div className="mb-4">
    <input type="text" placeholder="     ===PROOF===" className=" p-2 border item-center" readOnly />
  </div>
  <button type="submit" className="w-full bg-purple-800 text-white py-2 rounded w-[200px] h-[40px] ">
    Withdraw Tokens
  </button>
</form>

  
  );
};

export default RegistrationForm;
