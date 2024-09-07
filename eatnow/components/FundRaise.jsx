import { useState, useEffect, useRef } from "react";
import Plan from "@/components/Campaigns/ProposedPlan";
import DonorsFormula from "@/components/DonorsFormula";
import { Country, State, City } from "country-state-city";

const RaiseFunds = () => {
  const [selectedItem, setSelectedItem] = useState("Select Campaign Type");
  const [textData, setTextData] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [campaignType, setCampaignType] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingStateIndex, setLoadingStateIndex] = useState(0);
  const [loadingStatusIndex, setLoadingStatusIndex] = useState(0);
  const [showLoadingStatus, setShowLoadingStatus] = useState(false);
  const [donorFormula, setDonorFormula] = useState(false);
  const [proposedPlan, setProposedPlan] = useState(false);
  //Handling Country selection
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const loadingStateStatus = [
    "Generating Donor List...",
    "Data Collection and Organization",
    "Consolidating Data",
    "Generating baseline profile",
    "Segmenting Data Analysis",
    "Conducting Data Analysis",
    "Conducting Descriptive Analysis",
    "Conducting Diagnostic Analysis",
    "Conducting Predictive Analysis",
    "Developing Strategies...",
    "Performing Target Donor Segmentation",
    "Personalizing Donor Communication",
    "Preparing Donor Retention Strategies",
    "Implementing Strategies...",
    "Evaluating Outcomes",
    "Setting up system to Learn and Iterate",
    "Ideal Donor Profile has been successfully generated.",
  ];

  // State initialization
  const [formData, setFormData] = useState({
    title: "",
    website: "",
    campaignType: "",
    about: "",
    objectives: "",
    campaignSolution: {
      problem: "",
      supporters: "",
      influencers: "",
      unique_aspects: "",
      donor_behavior: "",
      upcoming_events: "",
      donor_skills: "",
      donor_motivations: "",
      seasonal_trends: "",
    },
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

  const checkFormValidity = () => {
    const requiredFields = [
      formData.title,
      formData.website,
      formData.about,
      formData.objectives,
      formData.campaignSolution.problem,
      formData.campaignSolution.supporters,
      formData.campaignSolution.influencers,
      formData.campaignSolution.unique_aspects,
      formData.campaignSolution.donor_behavior,
      formData.campaignSolution.upcoming_events,
      formData.campaignSolution.donor_motivations,
      formData.campaignSolution.seasonal_trends,
      formData.demographic.targetDonor,
      formData.demographic.gender,
      formData.demographic.intention,
      formData.timeline,
      formData.momentum,
      formData.strategy,
      formData.postCampaign,
      formData.wealthIndicator,
      formData.fundingGoals,
      formData.donorRetention,
      formData.recurringGiving,
    ];

    return (
      requiredFields.every((field) => field?.trim() !== "") &&
      selectedItem !== "Select Campaign Type"
    );
  };

  useEffect(() => {
    setIsFormValid(checkFormValidity());
  }, [formData, selectedItem]);

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
          state: "",
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

  //ADJUST OR DELETHIS
  const handleLaunch = async () => {
    setDonorFormula(false);
    setShowLoadingStatus(true);
    setShowFinalMessage(false);
    setLoadingStateIndex(0);

    try {
      const message = {
        messages: [
          {
            role: "user",
            content: formData,
          },
        ],
      };

      // Make the POST request to the API endpoint
      const response = await fetch("/api/partner/nationbuilderV1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        const data = await response.json();

        setTextData(data.results);
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
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const showDonorFormula = () => {
    setDonorFormula(true);
  };

  const handleProposedPlan = () => {
    setProposedPlan(true);
  };

  return (
    <>
      {proposedPlan ? (
        <Plan textData={textData} />
      ) : (
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
                  outcomes. <br />
                  <span className="text-red-700">
                    (All fields are required)
                  </span>
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
                      <p className="text-red-600 text-sm mt-1">
                        {errors.title}
                      </p>
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
                      <p className="text-red-600 text-sm mt-1">
                        {errors.website}
                      </p>
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
                    htmlFor="problem"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Causes & Effects
                  </label>
                  <div className="isolate -space-y-px rounded-md shadow-sm">
                    {/* Problem Field */}
                    <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                      <label
                        htmlFor="problem"
                        className="block text-xs font-medium text-gray-900"
                      >
                        What specific problem or need does this campaign
                        address?
                      </label>
                      <input
                        type="text"
                        name="problem"
                        required
                        value={formData.campaignSolution.problem}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            campaignSolution: {
                              ...formData.campaignSolution,
                              problem: e.target.value,
                            },
                          })
                        }
                        id="problem"
                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="e.g: Youth Basketball program"
                      />
                      {errors.problem && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.problem}
                        </p>
                      )}
                    </div>

                    {/* Supporters Field */}
                    <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                      <label
                        htmlFor="supporters"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Who has shown interest in similar causes in the past?
                      </label>
                      <input
                        type="text"
                        name="supporters"
                        required
                        value={formData.campaignSolution.supporters}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            campaignSolution: {
                              ...formData.campaignSolution,
                              supporters: e.target.value,
                            },
                          })
                        }
                        id="supporters"
                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="e.g: Basketball coaches"
                      />
                      {errors.supporters && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.supporters}
                        </p>
                      )}
                    </div>

                    {/* Influencers Field */}
                    <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                      <label
                        htmlFor="influencers"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Are there any notable supporters or Influencers
                        associated with this cause?
                      </label>
                      <input
                        type="text"
                        name="influencers"
                        required
                        value={formData.campaignSolution.influencers}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            campaignSolution: {
                              ...formData.campaignSolution,
                              influencers: e.target.value,
                            },
                          })
                        }
                        id="influencers"
                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="e.g: Oprah Winfrey"
                      />
                      {errors.influencers && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.influencers}
                        </p>
                      )}
                    </div>

                    {/* Unique Aspects Field */}
                    <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                      <label
                        htmlFor="unique_aspects"
                        className="block text-xs font-medium text-gray-900"
                      >
                        What unique aspects of this campaign might appeal to
                        certain donor segments?
                      </label>
                      <input
                        type="text"
                        name="unique_aspects"
                        required
                        value={formData.campaignSolution.unique_aspects}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            campaignSolution: {
                              ...formData.campaignSolution,
                              unique_aspects: e.target.value,
                            },
                          })
                        }
                        id="unique_aspects"
                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="e.g: Free tickets to games"
                      />
                      {errors.unique_aspects && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.unique_aspects}
                        </p>
                      )}
                    </div>

                    {/* Donor Behavior Field */}
                    <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                      <label
                        htmlFor="donor_behavior"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Have you identified any patterns in donor behavior from
                        previous similar campaigns?
                      </label>
                      <input
                        type="text"
                        name="donor_behavior"
                        required
                        value={formData.campaignSolution.donor_behavior}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            campaignSolution: {
                              ...formData.campaignSolution,
                              donor_behavior: e.target.value,
                            },
                          })
                        }
                        id="donor_behavior"
                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="e.g: Donation pools"
                      />
                      {errors.donor_behavior && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.donor_behavior}
                        </p>
                      )}
                    </div>

                    {/* Upcoming Events Field */}
                    <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                      <label
                        htmlFor="upcoming_events"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Are there any upcoming events or milestones related to
                        this cause that might influence donor interest?
                      </label>
                      <input
                        type="text"
                        name="upcoming_events"
                        required
                        value={formData.campaignSolution.upcoming_events}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            campaignSolution: {
                              ...formData.campaignSolution,
                              upcoming_events: e.target.value,
                            },
                          })
                        }
                        id="upcoming_events"
                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="e.g: Summer Championship Games"
                      />
                      {errors.upcoming_events && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.upcoming_events}
                        </p>
                      )}
                    </div>

                    {/* Donor Motivations Field */}
                    <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                      <label
                        htmlFor="donor_motivations"
                        className="block text-xs font-medium text-gray-900"
                      >
                        What are the primary motivations you believe drive
                        donors to support this particular cause?
                      </label>
                      <input
                        type="text"
                        name="donor_motivations"
                        required
                        value={formData.campaignSolution.donor_motivations}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            campaignSolution: {
                              ...formData.campaignSolution,
                              donor_motivations: e.target.value,
                            },
                          })
                        }
                        id="donor_motivations"
                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="e.g: Free tickets to games"
                      />
                      {errors.donor_motivations && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.donor_motivations}
                        </p>
                      )}
                    </div>

                    {/* Seasonal Trends Field */}
                    <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-red-600">
                      <label
                        htmlFor="seasonal_trends"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Are there any seasonal or cyclical trends you have
                        noticed in donor support for this cause?
                      </label>
                      <input
                        type="text"
                        name="seasonal_trends"
                        required
                        value={formData.campaignSolution.seasonal_trends}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            campaignSolution: {
                              ...formData.campaignSolution,
                              seasonal_trends: e.target.value,
                            },
                          })
                        }
                        id="seasonal_trends"
                        className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="e.g: Increased support during holiday seasons"
                      />
                      {errors.seasonal_trends && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.seasonal_trends}
                        </p>
                      )}
                    </div>
                  </div>
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
                    <p className="text-red-600 text-sm mt-1">
                      {errors.objectives}
                    </p>
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
                              <option
                                key={country.isoCode}
                                value={country.isoCode}
                              >
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
                                <option
                                  key={state.isoCode}
                                  value={state.isoCode}
                                >
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
                          How will you keep supporters engaged and informed
                          during the campaign
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
                          Post-Campaign Evaluation: How will you gather feedback
                          and evaluate the success of the campaign
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
                        Recurring giving: How would you encourage donor to
                        donate to your campaign again?
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
              <div className="">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Strategies and Tactics
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Click the button so we can launch a strategy, and define an
                  Ideal Donor Profile, their contact details, and ultimately
                  launch a targeted campaign.
                </p>
                <button
                  type="button"
                  onClick={showDonorFormula}
                  className="cursor-pointer text-xs font-semibold mt-3 underline"
                >
                  How Ideal Donors Profile is derived
                </button>
              </div>

              <div className="grid max-w-2xl justify-center items-center grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                <div className="col-span-full">
                  {/* {!showLoadingStatus && !showFinalMessage && (
                    <button
                      className="bg-green-700 mt-2 mb-3 rounded-md text-white p-2"
                      onClick={handleLaunch}
                    >
                      Begin Campaign Strategy
                    </button>
                  )} */}
                  {!showLoadingStatus && !showFinalMessage && (
                    <button
                      className={`mt-2 mb-3 rounded-md text-white p-2 ${
                        isFormValid
                          ? "bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      onClick={handleLaunch}
                      disabled={!isFormValid}
                    >
                      Begin Campaign Strategy
                    </button>
                  )}

                  {showLoadingStatus && (
                    <div>
                      <h2>{loadingStateStatus[loadingStateIndex]}</h2>
                    </div>
                  )}

                  {showFinalMessage && (
                    <div>
                      <h2>We have a plan to propose for your campaign.</h2>
                      <button
                        className="bg-green-700 mt-2 rounded-md text-white p-2"
                        onClick={handleProposedPlan}
                      >
                        Here's your Proposed plan
                      </button>
                    </div>
                  )}
                  {donorFormula && <DonorsFormula />}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default RaiseFunds;
