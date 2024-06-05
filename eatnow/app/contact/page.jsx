"use client";
import React, { useState } from "react";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      firstName,
      lastName,
      company,
      email,
      reason,
      message,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFirstName("");
        setLastName("");
        setCompany("");
        setEmail("");
        setReason("General Inquiry");
        setMessage("");
        setSuccess(
          "Thanks! Your inquiry has been successfully submitted, and we'll get back to you as soon as possible."
        );
        setTimeout(() => {
          setSuccess("");
        }, 7000); // Reset the success message after 7 seconds
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main className="py-14 mt-4">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-lg mx-auto space-y-3 sm:text-center">
            <h3 className="text-red-600 font-semibold">Contact</h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Get in touch
            </p>
            <p>We’d love to hear from you! Please fill out the form below.</p>
          </div>
          <div className="mt-12 max-w-lg mx-auto">
            {success && <p className="text-green-600">{success}</p>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
                <div>
                  <label className="font-medium">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
                    name="firstName"
                  />
                </div>
                <div>
                  <label className="font-medium">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
                    name="lastName"
                  />
                </div>
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
                  name="email"
                />
              </div>
              <div>
                <label className="font-medium">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
                  name="company"
                />
              </div>
              <div className="mt-2">
                <label className="font-medium mt-2">Reason for contact</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
                  name="reason"
                >
                  <option>General Inquiry</option>
                  <option>Press Inquiry</option>
                  <option>Support</option>
                  <option>Sales</option>
                  <option>Investor Relations</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="w-full mt-2">
                <label className="font-medium mt-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
                  name="message"
                ></textarea>
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;

// "use client";
// import React, { useState } from "react";

// const Contact = () => {
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Get form inputs
//     const firstName = event.target.firstName.value;
//     const lastName = event.target.lastName.value;
//     const company = event.target.company.value;
//     const email = event.target.email.value;
//     const message = event.target.message.value;

//     // Reset the form inputs
//     event.target.reset();

//     // Construct the data object with form inputs
//     const formData = {
//       firstName,
//       lastName,
//       company,
//       email,
//       message,
//     };

//     try {
//       // Send the API request using fetch
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           company: formData.company,
//           email: formData.email,
//           message: formData.message,
//         }),
//       });

//       // Handle the API response
//       if (response.ok) {
//         setFirstName("");
//         setLastName("");
//         setCompany("");
//         setEmail("");
//         setMessage("");
//         setSuccess(
//           "Thanks! Your inquiry is successfully submitted, and we'll get back to you as soon as possible."
//         );
//         // Reset the success message after a few seconds (optional)
//         setTimeout(() => {
//           setSuccess("");
//         }, 7000); // Reset the success message after 5 seconds
//       } else {
//         throw new Error("Network response was not ok");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <main className="py-14 mt-4">
//         <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
//           <div className="max-w-lg mx-auto space-y-3 sm:text-center">
//             <h3 className="text-red-600 font-semibold">Contact</h3>
//             <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
//               Get in touch
//             </p>
//             <p>We’d love to hear from you! Please fill out the form bellow.</p>
//           </div>
//           <div className="mt-12 max-w-lg mx-auto">
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
//                 <div>
//                   <label className="font-medium">First name</label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-medium">Last name</label>
//                   <input
//                     type="text"
//                     required
//                     className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="font-medium">Email</label>
//                 <input
//                   type="email"
//                   required
//                   className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
//                 />
//               </div>
//               <div>
//                 <label className="font-medium">Company</label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
//                 />
//               </div>
//               <div className="mt-2">
//                 <label className="font-medium mt-2">Reason for contact</label>
//                 <div className="relative mt-2">
//                   <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
//                     <select className="text-sm mt-2 bg-transparent outline-none rounded-lg h-full">
//                       <option>General Inquiry</option>
//                       <option>Press Inquiry</option>
//                       <option>Support</option>
//                       <option>Sales</option>
//                       <option>Investor Relations</option>
//                       <option>Other</option>
//                     </select>
//                   </div>
//                   <input
//                     type="dropdown"
//                     placeholder="General Inquiry"
//                     required
//                     className="w-full mt-2 pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
//                   />
//                 </div>
//               </div>
//               <div className="w-full mt-2">
//                 <label className="font-medium mt-2">Message</label>
//                 <textarea
//                   required
//                   className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
//                 ></textarea>
//               </div>
//               <button className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Contact;
