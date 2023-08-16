import { useState } from 'react';

export default function DisplayWebpage(url) {
  const [open, setOpen] = useState(false);

  // Function to open the pop-up window
  const openPopUp = () => {
    const screenWidth = typeof window !== 'undefined' ? window.screen.width : 800;
    const halfScreenWidth = screenWidth / 2;
    window.open(url, 'newWindow', `width=${halfScreenWidth},height=600`);
    setOpen(true);
  };
  return (
    <div>
      <button onClick={openPopUp}>Display Webpage</button>
    </div>
  );
}
