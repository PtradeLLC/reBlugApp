export default async function handler(req, res) {

  const { body } = await req;
  const { email, name } = JSON.parse(body);

  // Extract the word before '@' from the email
  const atIndex = email.indexOf('@');
  const username = email.slice(0, atIndex);

  console.log(username)

  // Create the modified email
  const modifiedEmail = `${username}@forgedmart.com`;

  console.log(modifiedEmail);

  try {
    // const apiKey = `${process.env.MAILERSEND_API_KEY}`;
    // const apiUrl = "https://api.mailersend.com/v1/identities"
    // const identity = {
    //   "domain_id": "v69oxl519qz4785k",
    //   "email": modifiedEmail, // Use the modified email
    //   "name": name,
    //   "personal_note": "Hi Pedro, please confirm this email by clicking on the link below.",
    //   "reply_to_name": "Test Doe",
    //   "is_verified": true,
    //   "reply_to_email": "support@forgedmart.com",
    //   "add_note": true
    // }

    // const headers = {
    //   "content-type": "application/json",
    //   "Authorization": `Bearer ${apiKey}`,
    // };

    // const brandIdentity = await fetch(apiUrl, {
    //   method: "POST",
    //   headers,
    //   body: JSON.stringify(identity)
    // })

    // const data = await brandIdentity.json()
    // console.log("DATA:", data)

    // console.log("LOGS", name, modifiedEmail)
    res.status(200).json({ message: "Success from the server" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
