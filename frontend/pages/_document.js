import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {(process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            data-project-id="lRteNBy9a1w5QCIgHBBOoUIBD60RWsCEvGQmezTV"
            data-is-production-environment="false"
            src="https://snippet.meticulous.ai/v1/meticulous.js"
          />
        )}
      </Head>
      <body className="bg-no-repeat w-full bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
