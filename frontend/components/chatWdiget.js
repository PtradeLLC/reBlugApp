import React from "react";

const ChatWidget = () => {
  const initializeBrevoConversations = (d, w, c) => {
    w.BrevoConversationsID = "64ae423dc9574471816653f0";
    w[c] =
      w[c] ||
      function () {
        (w[c].q = w[c].q || []).push(arguments);
      };
    var s = d.createElement("script");
    s.async = true;
    s.src = "https://conversations-widget.brevo.com/brevo-conversations.js";
    if (d.head) d.head.appendChild(s);
  };

  initializeBrevoConversations(document, window, "BrevoConversations");

  return <div></div>;
};

export default ChatWidget;
