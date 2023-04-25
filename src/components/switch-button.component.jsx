import { useState } from 'react';

export default function SwitchButton() {
  const [position, setPosition] = useState('left');

  const togglePosition = () => {
    if (position === 'left') {
      setPosition('right');
    } else {
      setPosition('left');
    }
  };

  return (
    <button
      className={`flex items-center justify-center h-5 w-[38px] rounded-full bg-[#FA6400] ${
        position === 'left' ? 'opacity-50' : ' opacity-100 '
      }`}
      onClick={togglePosition}
    >
      <span
        className={`bg-white h-4 w-4 rounded-full shadow-md transform transition-transform ${
          position === 'left' ? '-translate-x-2' : 'translate-x-2'
        }`}
      />
    </button>
  );
}