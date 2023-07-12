import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-no-repeat">
        <Main />
        <NextScript />
        <script
          id="gorgias-chat-widget-install-v3"
          src="https://config.gorgias.chat/bundle-loader/01H27JQ75RPGAJF5YC84FYY9XH"
          async
        ></script>
      </body>
    </Html>
  );
}
