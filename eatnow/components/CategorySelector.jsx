"use client";

import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

const CategorySelected = ({ user }) => {
  const [storeNiche, setStoreNiche] = useState("");
  const [clientMessage, setClientMessage] = useState("");
  const [userId, setUserId] = useState(null);

  // Handle userId from cookies or user prop
  useEffect(() => {
    const cookies = parseCookies();
    const userIdFromCookies = cookies.userId;

    if (userIdFromCookies) {
      setUserId(userIdFromCookies);
    } else if (user && user.$id) {
      setUserId(user.$id);
      setCookie(null, "userId", user.$id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
  }, [user]);

  // Fetch niche based on userId
  useEffect(() => {
    const fetchNiche = async () => {
      try {
        if (!userId) {
          console.error("User ID not found in cookies");
          return;
        }

        const response = await fetch(`/api/getNiche?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("ClientData", data);
          setStoreNiche(data.userNiche.name || "");
        } else {
          console.error("Error fetching niche");
        }
      } catch (error) {
        console.error("Network error", error);
      }
    };

    if (userId) {
      fetchNiche();
    }
  }, [userId]);

  // Submit selected niche
  const submitNiche = async () => {
    try {
      const selectElement = document.getElementById("small");
      const selectedOptionText =
        selectElement.options[selectElement.selectedIndex].text;

      if (!selectedOptionText) {
        setClientMessage("Please make a selection");
        return;
      }

      const response = await fetch("/api/getNiche", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ niche: selectedOptionText, userId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setClientMessage(`Niche is set to ${selectedOptionText}`);
        setStoreNiche(selectedOptionText); // Update the state with the new niche
      } else {
        console.error("Error submitting niche");
        setClientMessage("Error submitting niche");
      }
    } catch (error) {
      console.error("Network error", error);
      setClientMessage("Network error");
    }
  };

  return (
    <div>
      <form className="w-[180px] mx-3">
        <select
          id="small"
          className="block w-full p-2 my-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          value={storeNiche}
          onChange={(e) => setStoreNiche(e.target.value)}
        >
          <option value="">Select your Niche</option>
          {/* Add all other options here */}
          <option value="AC">American Culture</option>
          <option value="AF">African Culture</option>
          <option value="AU">Australian Culture</option>
          <option value="BL">Books and Literature</option>
          <option value="CE">Current Events</option>
          <option value="CC">Chinese Culture</option>
          <option value="DI">DIY and Crafts</option>
          <option value="PC">Pop Culture</option>
          <option value="EL">Environmentalism</option>
          <option value="EN">Entertainment</option>
          <option value="EC">European Culture</option>
          <option value="FI">Finance</option>
          <option value="FP">Food Photography</option>
          <option value="FB">Fashion and Beauty</option>
          <option value="FC">Food and Cooking</option>
          <option value="HW">Health and Wellness</option>
          <option value="HE">Healthy Eating</option>
          <option value="IC">Indian Culture</option>
          <option value="JA">Japanese Culture</option>
          <option value="KO">Korean Culture</option>
          <option value="LI">Lifestyle</option>
          <option value="LE">Learning</option>
          <option value="LG">LGBTQ</option>
          <option value="PA">Parenting</option>
          <option value="MU">Music</option>
          <option value="MC">Middle Eastern Culture</option>
          <option value="MX">Mexican Culture</option>
          <option value="PH">Photography</option>
          <option value="PE">Pets</option>
          <option value="RE">Relationships</option>
          <option value="RS">Religion and Spirituality</option>
          <option value="SC">Science and Technology</option>
          <option value="SF">Sports and Fitness</option>
          <option value="SP">Spirituality</option>
          <option value="ST">Style</option>
          <option value="SO">Social Media</option>
          <option value="TR">Travel</option>
          <option value="TE">Television</option>
          <option value="VE">Veganism</option>
          <option value="WE">Wellness</option>
          <option value="WR">Writing</option>
        </select>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 bg-slate-600 text-primary-foreground hover:bg-primary/90 text-xs cursor-pointer w-[115px] h-[20px] p-3"
          type="button"
          onClick={submitNiche}
        >
          Submit selection
        </button>
        {clientMessage && <div>{clientMessage}</div>}
      </form>
    </div>
  );
};

export default CategorySelected;
