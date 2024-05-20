import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Gugi&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-no-repeat w-full bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
