"use client";

import { Barlow_Condensed } from '@next/font/google';

// Import and configure the Barlow Condensed font
const barlowCondensed = Barlow_Condensed({
    weight: ['400', '700'], // Specify the weights you want to use
    subsets: ['latin'], // Specify the subsets you need
    display: 'swap', // Customize the font loading strategy (optional)
});

export default function ClientStyle() {
    return (
        <style jsx global>{`
      html, body {
        font-family: ${barlowCondensed.style.fontFamily};
      }
      .font-barlow-condensed {
        font-family: ${barlowCondensed.style.fontFamily};
      }
    `}</style>
    );
}