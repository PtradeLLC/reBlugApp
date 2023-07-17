import Widget from "../../../components/widgets/Widget";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append(
        "api-key",
        `${process.env.NEXT_PUBLIC_BREVO_FORGEDMART_API_KEY}`
      );

      const chatFunctn = () => {
        // Specify chatWidth and chatHeight (in pixels) before the widget code:
        window.BrevoConversationsSetup = {
          chatWidth: 400,
          chatHeight: 550,
          buttonSize: 100,
          startHidden: false,
          colors: {
            buttonText: "#f0f0f0" /* chat button text color */,
            buttonBg: "#565656" /* chat button background color */,
            visitorBubbleBg: "#e7ffd1" /* visitor’s message bubble color */,
            agentBubbleBg: "#deffff" /* agent’s message bubble color */,
          },
          buttonPosition:
            window.innerWidth < 1024 /* width threshold */
              ? "bl" /* chat button position on small screens */
              : "br" /* chat button position on big screens */,
          mode: "widget",
          visitorId: "kZMvWhf8npAu3H6qd57w2Hv6nh6rnxvg",
        };
      };

      const modifyRawBody = (raw) => {
        const modifiedBody = JSON.parse(raw);
        modifiedBody.messageVersions[0].params.chatFunctn =
          chatFunctn.toString();
        return JSON.stringify(modifiedBody);
      };

      const raw = JSON.stringify({
        sender: {
          email: "support@forgedmart.com",
          name: "ForgedMart",
        },
        subject: "Thank you for testing this tool",
        templateId: 6,
        params: {
          title: "This is my default greeting",
          headline: "This is my default headline",
        },
        messageVersions: [
          {
            to: [
              {
                email: "chrisbitoy@gmail.com",
                name: "Chris Boy",
              },
            ],
            params: {
              title: "Product Template",
            },
            subject: "Thank you for testing this tool",
          },
        ],
      });

      const modifiedRaw = modifyRawBody(raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: modifiedRaw,
        redirect: "follow",
      };

      fetch("https://api.brevo.com/v3/smtp/email", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      res.status(200).json({ name: "John Doe", widget: <Widget /> });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: `Something went wrong: ${error.message}` });
    }
  } else {
    res.status(500).json({ message: "Invalid request method" });
  }
}

// import Widget from "../../../components/EmailWidget";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       var myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");
//       myHeaders.append("Accept", "application/json");
//       myHeaders.append(
//         "api-key",
//         `${process.env.NEXT_PUBLIC_BREVO_FORGEDMART_API_KEY}`
//       );

//       const chatFunctn = () => {
//         // Specify chatWidth and chatHeight (in pixels) before the widget code:
//         window.BrevoConversationsSetup = {
//           chatWidth: 400,
//           chatHeight: 550,
//           buttonSize: 100,
//           startHidden: false,
//           colors: {
//             buttonText: "#f0f0f0" /* chat button text color */,
//             buttonBg: "#565656" /* chat button background color */,
//             visitorBubbleBg: "#e7ffd1" /* visitor’s message bubble color */,
//             agentBubbleBg: "#deffff" /* agent’s message bubble color */,
//           },
//           buttonPosition:
//             window.innerWidth < 1024 /* width threshold */
//               ? "bl" /* chat button position on small screens */
//               : "br" /* chat button position on big screens */,

//           mode: "widget",
//           visitorId: "kZMvWhf8npAu3H6qd57w2Hv6nh6rnxvg",
//         };
//       };

//       const modifyRawBody = (raw) => {
//         const modifiedBody = JSON.parse(raw);
//         modifiedBody.messageVersions[0].params.chatFunctn =
//           chatFunctn.toString();
//         return JSON.stringify(modifiedBody);
//       };

//       const raw = JSON.stringify({
//         sender: {
//           email: "support@forgedmart.com",
//           name: "ForgedMart",
//         },
//         subject: "Thank you for testing this tool",
//         templateId: 6,
//         params: {
//           title: "This is my default greeting",
//           headline: "This is my default headline",
//         },
//         messageVersions: [
//           {
//             to: [
//               {
//                 email: "chrisbitoy@gmail.com",
//                 name: "Chris Boy",
//               },
//             ],
//             params: {
//               title: "Product Template",
//             },
//             subject: "Thank you for testing this tool",
//           },
//         ],
//       });

//       const modifiedRaw = modifyRawBody(raw);

//       const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: modifiedRaw,
//         redirect: "follow",
//       };

//       fetch("https://api.brevo.com/v3/smtp/email", requestOptions)
//         .then((response) => response.text())
//         .then((result) => console.log(result))
//         .catch((error) => console.log("error", error));

//       res.status(200).json({ name: "John Doe", widget: <Widget /> });
//     } catch (error) {
//       console.log(error);
//       res
//         .status(500)
//         .json({ message: `Something went wrong: ${error.message}` });
//     }
//   } else {
//     res.status(500).json({ message: "Invalid request method" });
//   }
// }
