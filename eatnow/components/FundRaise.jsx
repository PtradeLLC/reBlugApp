import { useState, useEffect } from "react";
import Plan from "@/components/Campaigns/ProposedPlan";
import DonorsFormula from "@/components/DonorsFormula";
import { Country, State, City } from "country-state-city";
import SeriesModalComponent from "@/components/EmailMarketingTool";
import { useNationBuild } from "@/app/api/partner/nationbuilderV1/nationHook";

const RaiseFunds = ({ onProposedPlanClick }) => {
  const [selectedItem, setSelectedItem] = useState("Select Campaign Type");
  const [textData, setTextData] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadingStateIndex, setLoadingStateIndex] = useState(0);
  const [showLoadingStatus, setShowLoadingStatus] = useState(false);
  const [donorFormula, setDonorFormula] = useState(false);
  const [proposedPlan, setProposedPlan] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [askQuestion, setAskQuestion] = useState(false);
  const { makeRequest, isLoading, apiResponse } = useNationBuild();
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState("");

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
    strategy: "",
    postCampaign: "",
    wealthIndicator: "",
    fundingGoals: "",
    donorRetention: "",
    commonPattern: "",
    interests: "",
    philanthropic_Interests: "",
    recurringGiving: "",
    politicalAffiliation: "",
  });

  const items = [
    "Non Profit",
    "Political Campaign",
    "Movement",
    "Cause",
    "Other Campaigns",
  ];

  const checkFormValidity = () => {
    let invalidFields = [];

    const isValid = Object.entries(formData).every(([key, value]) => {
      if (key === "campaignSolution" || key === "demographic") {
        return Object.entries(value).every(([subKey, subValue]) => {
          if (typeof subValue === "object") {
            return Object.entries(subValue).every(
              ([nestedKey, nestedValue]) => {
                if (nestedKey === "city") return true;

                const isValid = nestedValue.trim() !== "";
                if (!isValid)
                  invalidFields.push(`${key}.${subKey}.${nestedKey}`);
                return isValid;
              }
            );
          }
          const isValid = subValue.trim() !== "";
          if (!isValid) invalidFields.push(`${key}.${subKey}`);
          return isValid;
        });
      }
      if (typeof value === "string") {
        const isValid = value.trim() !== "";
        if (!isValid) invalidFields.push(key);
        return isValid;
      }
      return true;
    });

    return isValid;
  };

  useEffect(() => {
    const valid = checkFormValidity();
    setIsFormValid(valid);
  }, [formData, selectedItem]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (formData.demographic.geographic.country) {
      setStates(
        State.getStatesOfCountry(formData.demographic.geographic.country)
      );
      setCities([]);
    }
  }, [formData.demographic.geographic.country]);

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

  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleCampaignTypeChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedItem(selectedValue);
    setFormData((prevData) => ({
      ...prevData,
      campaignType: selectedValue,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGeographicChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      demographic: {
        ...prevData.demographic,
        geographic: {
          ...prevData.demographic.geographic,
          [field]: value,
        },
      },
    }));
  };

  const loadNextStatus = () => {
    if (loadingStateIndex >= loadingStateStatus.length - 1) {
      setShowLoadingStatus(false);
      setShowFinalMessage(true);
    } else {
      setTimeout(() => {
        setLoadingStateIndex((prevIndex) => prevIndex + 1);
      }, 3000);
    }
  };

  const iterateLoadingMessages = async () => {
    for (let message of loadingStateStatus) {
      setCurrentLoadingMessage(message);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for 3 seconds
    }
  };

  const handleLaunch = async () => {
    setDonorFormula(false);
    setShowLoadingStatus(true);
    setShowFinalMessage(false);
    setLoadingStateIndex(0);
    setApiStatus(null);
    setTextData(null);

    try {
      // Start displaying loading messages
      const messagePromise = iterateLoadingMessages();

      // Make the API request
      const response = await fetch("/api/partner/nationbuilderV1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: formData }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from nationbuilderV1");
      }

      const data = await response.json();

      // Wait for loading messages to complete
      await messagePromise;

      if (data.status === "SUCCESS") {
        setTextData(data.assistantResponse);
        setApiStatus("SUCCESS");

        // Save the response to local storage
        localStorage.setItem(
          "finalResponse",
          JSON.stringify(data.assistantResponse)
        );
        console.log("Saved to local storage:", data.assistantResponse);
      } else if (data.status === "NO_RESULTS") {
        setApiStatus("NO_RESULTS");
      } else {
        setApiStatus("ERROR");
      }
    } catch (error) {
      console.error("Error in handleLaunch:", error.message || error);
      setApiStatus("ERROR");
    } finally {
      setShowLoadingStatus(false);
      setShowFinalMessage(true);
    }
  };

  // const handleLaunch = async () => {
  //   setDonorFormula(false);
  //   setShowLoadingStatus(true);
  //   setShowFinalMessage(false);
  //   setLoadingStateIndex(0);
  //   setApiStatus(null);
  //   setTextData(null);

  //   try {
  //     // Start displaying loading messages
  //     const messagePromise = iterateLoadingMessages();

  //     // Make the API request
  //     const response = await makeRequest({
  //       messages: [{ role: "user", content: formData }],
  //     });

  //     // Wait for loading messages to complete
  //     await messagePromise;

  //     if (response) {
  //       if (response.status === "SUCCESS") {
  //         setTextData(response.assistantResponse);
  //         setApiStatus("SUCCESS");
  //       } else if (response.status === "NO_RESULTS") {
  //         setApiStatus("NO_RESULTS");
  //       } else {
  //         setApiStatus("ERROR");
  //       }
  //     } else {
  //       setApiStatus("ERROR");
  //     }
  //   } catch (error) {
  //     console.error("Error in handleLaunch:", error.message || error);
  //     setApiStatus("ERROR");
  //   } finally {
  //     setShowLoadingStatus(false);
  //     setShowFinalMessage(true);
  //   }
  // };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === "string" && subValue.trim() === "") {
            newErrors[`${key}.${subKey}`] =
              `${subKey.replace(/_/g, " ")} is required.`;
          } else if (subValue === null || subValue === undefined) {
            newErrors[`${key}.${subKey}`] =
              `${subKey.replace(/_/g, " ")} is required.`;
          }
        });
      } else if (typeof value === "string" && value.trim() === "") {
        newErrors[key] = `${key.replace(/_/g, " ")} is required.`;
      } else if (value === null || value === undefined) {
        newErrors[key] = `${key.replace(/_/g, " ")} is required.`;
      }
    });

    if (selectedItem === "Select Campaign Type") {
      newErrors.selectedItem = "Please select a campaign type.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    handleLaunch();
  };

  const handleProposedPlan = () => {
    setProposedPlan(true);
    onProposedPlanClick();
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
                <InputField
                  label="Name of your Organization | Party"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                  placeholder="Your organization name"
                />

                <InputField
                  label="Campaign Website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  error={errors.website}
                  placeholder="my-nonprofit.org"
                />

                <div className="col-span-full">
                  <label
                    htmlFor="campaignType"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Campaign Type
                  </label>
                  <select
                    id="campaignType"
                    value={selectedItem}
                    onChange={handleCampaignTypeChange}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6"
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

                <InputField
                  label="Tell us about the campaign"
                  name="about"
                  value={formData.about}
                  placeholder="What is the campaign about?"
                  onChange={handleChange}
                  error={errors.about}
                  isTextArea
                />

                <CampaignSolutionFields
                  formData={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />

                <InputField
                  label="Your Goals & Objectives"
                  name="objectives"
                  placeholder="What are your goals and objectives?"
                  value={formData.objectives}
                  onChange={handleChange}
                  error={errors.objectives}
                  isTextArea
                />

                <GeographicFields
                  formData={formData}
                  handleGeographicChange={handleGeographicChange}
                  countries={countries}
                  states={states}
                  cities={cities}
                  errors={errors}
                />

                <DemographicFields
                  formData={formData}
                  handleInputChange={handleInputChange}
                  errors={errors}
                />

                <CampaignStrategyFields
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />

                <EngagementStrategyFields
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />

                <WealthIndicatorField
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />

                <FundraisingGoalsFields
                  formData={formData}
                  handleChange={handleChange}
                  errors={errors}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Strategies and Tactics
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Click the button to launch a strategy, define an Ideal Donor
                  Profile, their contact details, and ultimately launch a
                  targeted campaign.
                </p>
                <button
                  type="button"
                  onClick={() => setDonorFormula(true)}
                  className="cursor-pointer text-xs font-semibold mt-3 underline"
                >
                  How Ideal Donors Profile is derived
                </button>
              </div>

              <div className="grid max-w-2xl justify-center items-center grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                <div className="col-span-full">
                  {!showLoadingStatus && !showFinalMessage && (
                    <button
                      type="submit"
                      className={`mt-2 mb-3 rounded-md text-white p-2 ${
                        isFormValid
                          ? "bg-green-700 hover:bg-green-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!isFormValid}
                    >
                      Begin Campaign Strategy
                    </button>
                  )}
                  {showLoadingStatus && (
                    <div>
                      <h2>{currentLoadingMessage}</h2>
                    </div>
                  )}
                  {showFinalMessage && (
                    <div>
                      <h2>We have a plan to propose for your campaign.</h2>
                      {apiStatus === "SUCCESS" && textData ? (
                        <button
                          className="bg-green-700 mt-2 rounded-md text-white p-2 hover:bg-green-600"
                          onClick={handleProposedPlan}
                        >
                          Here's our Proposed plan
                        </button>
                      ) : (
                        <p className="text-red-600 mt-2">
                          Sorry, we couldn't generate a plan at this time.
                          Please try again later.
                        </p>
                      )}
                    </div>
                  )}
                  {donorFormula && <DonorsFormula />}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      <div>
        <SeriesModalComponent
          title={"Ask a Question"}
          textData={textData}
          askQuestion={askQuestion}
        />
      </div>
    </>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  error,
  isTextArea = false,
  placeholder = "",
}) => (
  <div className="col-span-full">
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2">
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      )}
    </div>
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

const CampaignSolutionFields = ({ formData, handleInputChange, errors }) => (
  <div className="col-span-full">
    <h3 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
      Causes & Effects
    </h3>
    <InputField
      label="What specific problem or need does this campaign address?"
      name="problem"
      value={formData.campaignSolution.problem}
      onChange={(e) =>
        handleInputChange("campaignSolution", "problem", e.target.value)
      }
      error={errors["campaignSolution.problem"]}
      placeholder="e.g., Environmental sustainability, Education access"
    />
    <InputField
      label="Who has shown interest in similar causes in the past?"
      name="supporters"
      value={formData.campaignSolution.supporters}
      onChange={(e) =>
        handleInputChange("campaignSolution", "supporters", e.target.value)
      }
      error={errors["campaignSolution.supporters"]}
      placeholder="e.g., Tech professionals, University students"
    />
    <InputField
      label="Are there any notable supporters or Influencers associated with this cause?"
      name="influencers"
      value={formData.campaignSolution.influencers}
      onChange={(e) =>
        handleInputChange("campaignSolution", "influencers", e.target.value)
      }
      error={errors["campaignSolution.influencers"]}
      placeholder="e.g., Celebrity names, Industry leaders"
    />
    <InputField
      label="What unique aspects of this campaign might appeal to certain donor segments?"
      name="unique_aspects"
      value={formData.campaignSolution.unique_aspects}
      onChange={(e) =>
        handleInputChange("campaignSolution", "unique_aspects", e.target.value)
      }
      error={errors["campaignSolution.unique_aspects"]}
      placeholder="e.g., Innovative approach, Direct impact"
    />
    <InputField
      label="Have you identified any patterns in donor behavior from previous similar campaigns?"
      name="donor_behavior"
      value={formData.campaignSolution.donor_behavior}
      onChange={(e) =>
        handleInputChange("campaignSolution", "donor_behavior", e.target.value)
      }
      error={errors["campaignSolution.donor_behavior"]}
      placeholder="e.g., Preference for monthly donations, Event-driven giving"
    />
    <InputField
      label="Are there any upcoming events or milestones related to this cause that might influence donor interest?"
      name="upcoming_events"
      value={formData.campaignSolution.upcoming_events}
      onChange={(e) =>
        handleInputChange("campaignSolution", "upcoming_events", e.target.value)
      }
      error={errors["campaignSolution.upcoming_events"]}
      placeholder="e.g., World Environment Day, Annual Fundraising Gala"
    />
    <InputField
      label="What are the primary motivations you believe drive donors to support this particular cause?"
      name="donor_motivations"
      value={formData.campaignSolution.donor_motivations}
      onChange={(e) =>
        handleInputChange(
          "campaignSolution",
          "donor_motivations",
          e.target.value
        )
      }
      error={errors["campaignSolution.donor_motivations"]}
      placeholder="e.g., Desire to make a difference, Personal connection to the cause"
    />
    <InputField
      label="Are there any seasonal or cyclical trends you have noticed in donor support for this cause?"
      name="seasonal_trends"
      value={formData.campaignSolution.seasonal_trends}
      onChange={(e) =>
        handleInputChange("campaignSolution", "seasonal_trends", e.target.value)
      }
      error={errors["campaignSolution.seasonal_trends"]}
      placeholder="e.g., Increased giving during holiday seasons, End-of-year donations"
    />
  </div>
);

const GeographicFields = ({
  formData,
  handleGeographicChange,
  countries,
  states,
  cities,
  errors,
}) => (
  <div className="col-span-full">
    <h3 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
      Geographic location
    </h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="country"
          className="block text-xs font-medium text-gray-900"
        >
          Country
        </label>
        <select
          id="country"
          value={formData.demographic.geographic.country}
          onChange={(e) => handleGeographicChange("country", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
        {errors["demographic.geographic.country"] && (
          <p className="text-red-600 text-xs mt-1">
            {errors["demographic.geographic.country"]}
          </p>
        )}
      </div>

      {states.length > 0 && (
        <div>
          <label
            htmlFor="state"
            className="block text-xs font-medium text-gray-900"
          >
            State/Region
          </label>
          <select
            id="state"
            value={formData.demographic.geographic.state}
            onChange={(e) => handleGeographicChange("state", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          >
            <option value="">Select State/Region</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
          {errors["demographic.geographic.state"] && (
            <p className="text-red-600 text-xs mt-1">
              {errors["demographic.geographic.state"]}
            </p>
          )}
        </div>
      )}

      {cities.length > 0 && (
        <div>
          <label
            htmlFor="city"
            className="block text-xs font-medium text-gray-900"
          >
            City (Optional)
          </label>
          <select
            id="city"
            value={formData.demographic.geographic.city}
            onChange={(e) => handleGeographicChange("city", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-300 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          >
            <option value="">Select City (Optional)</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  </div>
);

const DemographicFields = ({ formData, handleInputChange, errors }) => (
  <div className="col-span-full">
    <h3 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
      Demographic Information
    </h3>
    <InputField
      label="Target Donor: Who are the primary donors?"
      name="targetDonor"
      value={formData.demographic.targetDonor}
      onChange={(e) =>
        handleInputChange("demographic", "targetDonor", e.target.value)
      }
      error={errors["demographic.targetDonor"]}
      placeholder="e.g: Gen Z, Baby Boomers, Gen X"
    />
    <InputField
      label="Gender"
      name="gender"
      value={formData.demographic.gender}
      onChange={(e) =>
        handleInputChange("demographic", "gender", e.target.value)
      }
      error={errors["demographic.gender"]}
      placeholder="e.g: Any"
    />
    <InputField
      label="Donor Intention: How do you currently (or previously) identify your donor intentions"
      name="intention"
      value={formData.demographic.intention}
      onChange={(e) =>
        handleInputChange("demographic", "intention", e.target.value)
      }
      error={errors["demographic.intention"]}
      placeholder="e.g: One-on-one street outreach, Events"
    />
  </div>
);

const CampaignStrategyFields = ({ formData, handleChange, errors }) => (
  <div className="col-span-full">
    <h3 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
      Campaign Strategy
    </h3>
    <InputField
      label="What is the timeline for the campaign"
      name="timeline"
      value={formData.timeline}
      onChange={handleChange}
      error={errors.timeline}
      placeholder="ASAP or Within 3 months"
    />
    <InputField
      label="How will you maintain momentum throughout the campaign"
      name="momentum"
      value={formData.momentum}
      onChange={handleChange}
      error={errors.momentum}
      placeholder="via Press releases, social media, email"
    />
  </div>
);

const EngagementStrategyFields = ({ formData, handleChange, errors }) => (
  <div className="col-span-full">
    <h3 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
      Engagement Strategy
    </h3>
    <InputField
      label="How will you keep supporters engaged and informed during the campaign"
      name="strategy"
      value={formData.strategy}
      onChange={handleChange}
      error={errors.strategy}
      placeholder="e.g: via email, social media, traditional media outreach"
    />
    <InputField
      label="Post-Campaign Evaluation: How will you gather feedback and evaluate the success of the campaign"
      name="postCampaign"
      value={formData.postCampaign}
      onChange={handleChange}
      error={errors.postCampaign}
      placeholder="e.g: via email, Social media polls"
    />
  </div>
);

const WealthIndicatorField = ({ formData, handleChange, errors }) => (
  <div className="col-span-full">
    <h3 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
      Wealth Indicators
    </h3>
    <InputField
      label="Does individual wealth matter to this campaign?"
      name="wealthIndicator"
      value={formData.wealthIndicator}
      onChange={handleChange}
      error={errors.wealthIndicator}
      placeholder="E.g: Owns Property, Business Affiliations"
    />
  </div>
);

const FundraisingGoalsFields = ({ formData, handleChange, errors }) => (
  <div className="col-span-full">
    <h3 className="block text-sm font-medium leading-6 text-gray-900 mb-2">
      Fundraising Goals
    </h3>
    <InputField
      label="How much are you trying to raise"
      name="fundingGoals"
      value={formData.fundingGoals}
      onChange={handleChange}
      error={errors.fundingGoals}
      placeholder="What is the desired monetary goal - e.g: $10,000 or €10,000"
    />
    <InputField
      label="Donation History (how much does donor donate if done frequently?)"
      name="donorRetention"
      value={formData.donorRetention}
      onChange={handleChange}
      error={errors.donorRetention}
      placeholder="(e.g: $100-$500)?"
    />
    <InputField
      label="Common Pattern (Any similar cause your donors support?)"
      name="commonPattern"
      value={formData.commonPattern}
      onChange={handleChange}
      error={errors.commonPattern}
      placeholder="(e.g: Supports Green Initiatives)?"
    />
    <InputField
      label="Interests (Any interests your donors have?)"
      name="interests"
      value={formData.interests}
      onChange={handleChange}
      error={errors.interests}
      placeholder="(e.g: Sustainability, Clean Energy)?"
    />
    <InputField
      label="Philanthropic Interests (Does donors have any Philanthropic Interests?)"
      name="philanthropic_Interests"
      value={formData.philanthropic_Interests}
      onChange={handleChange}
      error={errors.philanthropic_Interests}
      placeholder="(e.g: Environmental Projects)?"
    />
    <InputField
      label="Political Affiliation (Does donors have any Political Affiliation?)"
      name="politicalAffiliation"
      value={formData.politicalAffiliation}
      onChange={handleChange}
      error={errors.politicalAffiliation}
      placeholder="(e.g: Moderate or Progressive (if relevant)"
    />
    <InputField
      label="Recurring giving: How would you encourage donor to donate to your campaign again?"
      name="recurringGiving"
      value={formData.recurringGiving}
      onChange={handleChange}
      error={errors.recurringGiving}
      placeholder="e.g: Email follow-up, By Phone"
    />
  </div>
);

export default RaiseFunds;
