import { useState, useEffect, useRef } from "react";
import Campaign from "@/components/Campaigns/campaignType";
import { Country, State, City } from "country-state-city";
import { Select, SelectItem } from "@nextui-org/react";

const RaiseFunds = () => {
  const [selectedItem, setSelectedItem] = useState("Select Campaign Type");
  const [textData, setTextData] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [campaignType, setCampaignType] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingStateIndex, setLoadingStateIndex] = useState(0);
  const [loadingStatusIndex, setLoadingStatusIndex] = useState(0);
  const [showLoadingStatus, setShowLoadingStatus] = useState(false);
  //Handling Country selection
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const loadingStateStatus = [
    "Generating Donor List...",
    "Data Collection and Organization",
    "Consolidating Data",
    "Segmenting Data",
    "Conducting Data Analysis",
    "Conducting Descriptive Analytics",
    "Conducting Diagnostic Analytics",
    "Conducting Predictive Analytics",
    "Ideal Donor Profile has been successfully generated.",
  ];

  // State initialization
  const [formData, setFormData] = useState({
    title: "",
    website: "",
    about: "",
    objectives: "",
    demographic: {
      geographic: {
        country: "",
        state: "",
        city: "",
      },
      targetDonor: "",
      gender: "",
      intention: "",
    },
    timeline: "",
    momentum: "",
    postCampaign: "",
    wealthIndicator: "",
    fundingGoals: "",
    donorRetention: "",
    recurringGiving: "",
  });

  const items = [
    "Non Profit",
    "Political Campaign",
    "Movement",
    "Cause",
    "Other Campaigns",
  ];

  // Fetch countries on mount
  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  // Fetch states when country is selected
  useEffect(() => {
    if (formData.demographic.geographic.country) {
      setStates(
        State.getStatesOfCountry(formData.demographic.geographic.country)
      );
      setCities([]); // Reset cities when country changes
    }
  }, [formData.demographic.geographic.country]);

  // Fetch cities when state is selected
  useEffect(() => {
    if (formData.demographic.geographic.state) {
      setCities(
        City.getCitiesOfState(
          formData.demographic.geographic.country,
          formData.demographic.geographic.state
        )
      );
    }
  }, [formData.demographic.geographic.state]);

  // Handlers
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      demographic: {
        ...prevFormData.demographic,
        geographic: {
          ...prevFormData.demographic.geographic,
          country: selectedCountry,
          state: "", // Reset state and city when country changes
          city: "",
        },
      },
    }));
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      demographic: {
        ...prevFormData.demographic,
        geographic: {
          ...prevFormData.demographic.geographic,
          state: selectedState,
          city: "", // Reset city when state changes
        },
      },
    }));
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      demographic: {
        ...prevFormData.demographic,
        geographic: {
          ...prevFormData.demographic.geographic,
          city: selectedCity,
        },
      },
    }));
  };

  const handleGeographicChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      demographic: {
        ...prevFormData.demographic,
        [name]: value,
      },
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCampaignTypeChange = (e) => {
    setCampaignType(e.target.value);
  };

  const loadNextStatus = () => {
    if (loadingStateIndex >= loadingStateStatus.length) {
      setShowLoadingStatus(false);
      setShowFinalMessage(true);
      return;
    }

    const id = setTimeout(() => {
      setLoadingStateIndex((prevIndex) => prevIndex + 1);
    }, 3000);

    setTimeoutId(id);
  };

  const handleLaunch = async () => {
    setShowLoadingStatus(true);
    setShowFinalMessage(false);
    setLoadingStateIndex(0);

    try {
      // Make the POST request to the API endpoint
      const response = await fetch("/api/partner/nationbuilderV1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        const data = await response.json();
        setTextData(data);
      } else {
        console.error("Response not okay:", response.statusText);
      }
    } catch (error) {
      console.error("Error making POST request:", error.message);
    } finally {
      loadNextStatus();
    }
  };

  useEffect(() => {
    if (showLoadingStatus) {
      loadNextStatus();
    }
  }, [loadingStateIndex]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  // Selecting an item from the dropdown to Update state when item is selected
  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  // Handle Multi-selection
  const strategies = [
    { key: " Email", label: " Email" },
    { key: " Social media", label: " Social media" },
    { key: " Events", label: " Events" },
    { key: " Regular mail", label: " Regular mail" },
  ];

  // Call handleLaunch when component mounts
  useEffect(() => {
    console.log("");
  }, [textData]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title) newErrors.title = "Organization name is required.";
    if (!formData.website) newErrors.website = "Campaign website is required.";
    if (selectedItem === "Select Campaign Type")
      newErrors.selectedItem = "Please select a campaign type.";
    if (!formData.about) newErrors.about = "Campaign details are required.";
    if (!formData.objectives)
      newErrors.objectives = "Campaign objectives are required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("/api/productLaunchStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Fundraising
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              To effectively define and identify your ideal donor, please
              provide details about your organization, campaign, and desired
              outcomes.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name of your Organization | Party
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    required
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="block flex-1 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Your organization name"
                  />
                </div>
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="website"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Campaign Website
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                  <input
                    type="text"
                    name="website"
                    required
                    id="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder=" my-nonprofit.org"
                  />
                </div>
                {errors.website && (
                  <p className="text-red-600 text-sm mt-1">{errors.website}</p>
                )}
              </div>
            </div>
            <div className="relative inline-block text-left z-50 col-span-full">
              <select
                value={selectedItem}
                aria-labelledby="campaignType"
                onChange={(e) => setSelectedItem(e.target.value)}
              >
                <option value="Select Campaign Type" disabled>
                  Select Campaign Type
                </option>
                {items.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.selectedItem && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.selectedItem}
                </p>
              )}
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tell us about the campaign
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  required
                  value={formData.about}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  placeholder="Write a few sentences about this campaign."
                />
              </div>
              {errors.about && (
                <p className="text-red-600 text-sm mt-1">{errors.about}</p>
              )}
            </div>
            <div className="col-span-full">
              <label
                htmlFor="objectives"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Goals & Objectives
              </label>
              <div className="mt-2">
                <textarea
                  id="objectives"
                  name="objectives"
                  required
                  value={formData.objectives}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  placeholder="What are the specific goals of the campaign beyond just raising funds? (e.g., increasing awareness, engaging new donors)"
                />
              </div>
              {errors.objectives && (
                <p className="text-red-600 text-sm mt-1">{errors.objectives}</p>
              )}
            </div>
            <div className="col-span-full">
              <label
                htmlFor="features"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Defining Donor demographics
              </label>
              <div className="mt-2">
                <div className="isolate -space-y-px rounded-md shadow-sm">
                  <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                    <label
                      htmlFor="feature02"
                      className="block text-xs font-medium text-gray-900"
                    >
                      Geographic location
                    </label>
                    <div className="mb-3">
                      <label
                        className="block text-xs font-medium text-gray-900"
                        htmlFor="country"
                      >
                        Country:
                      </label>
                      <select
                        id="country"
                        aria-labelledby="country"
                        value={formData.demographic.geographic.country}
                        onChange={handleCountryChange}
                      >
                        <option
                          className="block text-xs font-medium text-gray-900"
                          value=""
                        >
                          Select Country
                        </option>
                        {countries.map((country) => (
                          <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {states.length > 0 && (
                      <div className="mb-3">
                        <label
                          className="block text-xs font-medium text-gray-900"
                          htmlFor="state"
                        >
                          State/Region:
                        </label>
                        <select
                          id="state"
                          aria-labelledby="state"
                          value={formData.demographic.geographic.state}
                          onChange={handleStateChange}
                        >
                          <option
                            className="block text-xs font-medium text-gray-900"
                            value=""
                          >
                            Select State/Region
                          </option>
                          {states.map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {cities.length > 0 && (
                      <div className="mb-3">
                        <label
                          className="block text-xs font-medium text-gray-900"
                          htmlFor="city"
                        >
                          City:
                        </label>
                        <select
                          id="city"
                          aria-labelledby="city"
                          value={formData.demographic.geographic.city}
                          onChange={handleCityChange}
                        >
                          <option
                            className="block text-xs font-medium text-gray-900"
                            value=""
                          >
                            Select City
                          </option>
                          {cities.map((city) => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                    <label
                      htmlFor="targetDonor"
                      className="block text-xs font-medium text-gray-900"
                    >
                      Target Donor: Who are the primary donors?
                    </label>
                    <input
                      type="text"
                      name="targetDonor"
                      required
                      id="targetDonor"
                      value={formData.demographic.targetDonor}
                      onChange={handleGeographicChange}
                      className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="e.g: Gen Z, Baby Boomers, Gen X"
                    />
                    {errors.targetDonor && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.targetDonor}
                      </p>
                    )}
                  </div>

                  <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                    <label
                      htmlFor="gender"
                      className="block text-xs font-medium text-gray-900"
                    >
                      Gender
                    </label>
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      required
                      value={formData.demographic.gender}
                      onChange={handleGeographicChange}
                      className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="E.g: 'Male' or 'Female' "
                    />
                    {errors.gender && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                  <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                    <label
                      htmlFor="intention"
                      className="block text-xs font-medium text-gray-900"
                    >
                      Donor Intention: How do you currently (or previously)
                      identify your donor intentions
                    </label>
                    <input
                      type="text"
                      name="intention"
                      required
                      value={formData.demographic.intention}
                      onChange={handleGeographicChange}
                      id="intention"
                      className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="e.g: One-on-one street outreach, Events"
                    />
                  </div>
                  {errors.intention && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.intention}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="features"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Campaign Strategy
              </label>
              <div className="mt-2">
                <div className="isolate -space-y-px rounded-md shadow-sm">
                  <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                    <label
                      htmlFor="timeline"
                      className="block text-xs font-medium text-gray-900"
                    >
                      What is the timeline for the campaign
                    </label>
                    <input
                      type="text"
                      name="timeline"
                      id="timeline"
                      required
                      value={formData.timeline}
                      onChange={handleChange}
                      className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="ASAP or Within 3 months"
                    />
                    {errors.timeline && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.timeline}
                      </p>
                    )}
                  </div>
                  <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                    <label
                      htmlFor="momentum"
                      className="block text-xs font-medium text-gray-900"
                    >
                      How will you maintain momentum throughout the campaign
                    </label>
                    <input
                      type="text"
                      name="momentum"
                      required
                      id="momentum"
                      value={formData.momentum}
                      onChange={handleChange}
                      className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="via Press releases, social media, email"
                    />
                    {errors.momentum && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.momentum}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="features"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Engagement Strategy
              </label>
              <div className="mt-2">
                <div className="isolate -space-y-px rounded-md shadow-sm">
                  <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                    <label
                      htmlFor="strategy"
                      className="block text-xs font-medium text-gray-900"
                    >
                      How will you keep supporters engaged and informed during
                      the campaign
                    </label>
                    <input
                      type="text"
                      name="strategy"
                      id="strategy"
                      required
                      value={formData.strategy}
                      onChange={handleChange}
                      className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="e.g: via email, social media, traditional media outreach"
                    />
                    {errors.strategy && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.strategy}
                      </p>
                    )}
                  </div>
                  <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                    <label
                      htmlFor="postCampaign"
                      className="block text-xs font-medium text-gray-900"
                    >
                      Post-Campaign Evaluation: How will you gather feedback and
                      evaluate the success of the campaign
                    </label>
                    <input
                      type="text"
                      name="postCampaign"
                      required
                      id="postCampaign"
                      value={formData.postCampaign}
                      onChange={handleChange}
                      className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="e.g: via email, Social media polls"
                    />
                  </div>
                  {errors.postCampaign && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.postCampaign}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="features"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Wealth Indicators
              </label>
              <div className="mt-2">
                <div className="isolate -space-y-px rounded-md shadow-sm">
                  <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                    <label
                      htmlFor="wealthIndicator"
                      className="block text-xs font-medium text-gray-900"
                    >
                      Does individual wealth matter to this campaign?
                    </label>
                    <input
                      type="text"
                      name="wealthIndicator"
                      required
                      id="wealthIndicator"
                      value={formData.wealthIndicator}
                      onChange={handleChange}
                      className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="E.g: Yes or No"
                    />
                  </div>
                  {errors.wealthIndicator && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.wealthIndicator}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="demographic"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fundraising Goals
              </label>
              <div className="isolate -space-y-px rounded-md shadow-sm">
                <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                  <label
                    htmlFor="fundingGoals"
                    className="block text-xs font-medium text-gray-900"
                  >
                    How much are your trying to raise
                  </label>
                  <input
                    type="text"
                    name="fundingGoals"
                    required
                    value={formData.fundingGoals}
                    onChange={handleChange}
                    id="fundingGoals"
                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="What is the desired monetary goal - e.g: $10,000 or €10,000"
                  />
                  {errors.fundingGoals && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.fundingGoals}
                    </p>
                  )}
                </div>
                <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                  <label
                    htmlFor="donorRetention"
                    className="block text-xs font-medium text-gray-900"
                  >
                    Donor retention
                  </label>
                  <input
                    type="text"
                    name="donorRetention"
                    required
                    value={formData.donorRetention}
                    onChange={handleChange}
                    id="donorRetention"
                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="How do you track 'Donor Retention Rate'?"
                  />
                  {errors.donorRetention && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.donorRetention}
                    </p>
                  )}
                </div>

                <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                  <label
                    htmlFor="recurringGiving"
                    className="block text-xs font-medium text-gray-900"
                  >
                    Recurring giving: How would you encourage donor to donate to
                    your campaign again?
                  </label>
                  <input
                    type="text"
                    name="recurringGiving"
                    required
                    value={formData.recurringGiving}
                    onChange={handleChange}
                    id="recurringGiving"
                    className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="e.g: Email follow-up, By Phone"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Strategies and Tactics
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Click the button so we can launch a strategy, and define an Ideal
              Donor Profile, their contact details, and ultimately launch a
              targeted campaign.
            </p>
          </div>

          <div className="grid max-w-2xl justify-center items-center grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="col-span-full">
              {!showLoadingStatus && !showFinalMessage && (
                <button
                  className="bg-green-700 mt-2 rounded-md text-white p-2"
                  onClick={handleLaunch}
                >
                  Begin Strategy
                </button>
              )}

              {showLoadingStatus && (
                <div>
                  <h2>{loadingStateStatus[loadingStateIndex]}</h2>
                </div>
              )}

              {showFinalMessage && (
                <div>
                  <h2>Here is our proposed plan for your campaign.</h2>
                  <button
                    className="bg-green-700 mt-2 rounded-md text-white p-2"
                    onClick={() => {
                      // Handle the "Next" button click action here
                      console.log("Next button clicked");
                    }}
                  >
                    Go to plan
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Proposed Plan
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Based on the provided information, here are data driven summaries
              that addresses the following key points:
              <span className="font-semibold"> Customer behavior</span> and{" "}
              <span className="font-semibold">Motivation</span>,
              <span className="font-semibold"> Ideal Customer Profile</span>,
              <span className="font-semibold"> Demands</span>, and
              <span className="font-semibold"> Lead generation</span>.
            </p>
          </div>

          <div className="max-w-2xl space-y-10 md:col-span-2">
            {textData && (
                            <div>
                                {textData.map((item, index) => (
                                    <div key={index}>
                                        <h3>{Object.keys(item)[0]}</h3>
                                        <p>{Object.values(item)[0]}</p>
                                    </div>
                                ))}
                            </div>
                        )}
            {showLoadingStatus && <p>Loading your Ideal Customers...</p>}
          </div>
        </div> */}
      </div>
    </form>
  );
};

export default RaiseFunds;
