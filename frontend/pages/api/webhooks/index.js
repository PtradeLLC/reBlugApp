const handleEvent = async (req) => {
  const { evt } = req.body;

  if (!evt || typeof evt !== "object") {
    console.error("Invalid 'evt' object received.");
    return;
  }

  const { type, data } = evt;

  if (!type || !data) {
    console.error(
      "Required properties 'type' and 'data' are missing in 'evt'."
    );
    return;
  }

  switch (type) {
    case "user.created":
      const { email, firstName, lastName } = data;
      if (email && firstName && lastName) {
        await createUserEntry(email, firstName, lastName);
      } else {
        console.error(
          "Required properties 'email', 'firstName', and 'lastName' are missing in 'data'."
        );
      }
      break;
    // Add other cases for different event types if needed
    default:
      // Handle other event types or implement a default behavior
      break;
  }
};

export default handleEvent;
