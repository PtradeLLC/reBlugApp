// _document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon.png"></link>
                <meta name="#6c6b6a" content="#fff" />
                {/* <link
                    href="https://unpkg.com/tailwindcss@^2.0.0/dist/tailwind.min.css"
                    rel="stylesheet"
                /> */}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}


// import { Html, Head, Main, NextScript } from "next/document";
// export default function Document() {
//     return (
//         <Html>
//             <Head>
//                 <link rel="manifest" href="/manifest.json" />
//                 <link rel="apple-touch-icon" href="/icon.png"></link>
//                 <meta name="#6c6b6a" content="#fff" />
//                 <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Gugi&display=swap" rel="stylesheet" />
//                 <link rel="preconnect" href="https://fonts.googleapis.com" />
//                 <link rel="preconnect" href="https://fonts.gstatic.com" />
//             </Head>
//             <body>
//                 <Main />
//                 <NextScript />
//             </body>
//         </Html>
//     );
// }