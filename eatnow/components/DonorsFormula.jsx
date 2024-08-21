import React from "react";

const DonorsFormula = () => {
  return (
    <div>
      <ul className="list-disc">
        <li>
          Demographic Alignment Geographic Fit: Ensures the donor's location
          (country, state, city) aligns with the campaign's primary geographic
          focus.
        </li>
        <li>
          Gender Alignment: If gender-specific campaigns are in place, we match
          donors based on gender preferences.
        </li>
        <li>
          Target Donor Type: Matches the donor's profile to the target donor
          type (e.g., individual, corporate, community group).
        </li>
        <li>
          Wealth and Financial Capacity Wealth Indicator: Prioritizes donors
          with a wealth indicator that aligns with the campaign's funding goals.
          Higher wealth indicators correlates with campaigns requiring larger
          funding.
        </li>
        <li>
          Intention: Ensures that the donor’s intentions align with the
          campaign’s objectives (e.g., social impact, political change).
        </li>
        <li>
          Recurring Giving Potential: Assesses the donor's likelihood of
          recurring donations based on past behavior or the nature of the
          campaign.
        </li>
        <li>
          Donor Retention: Use donor retention data to identify donors who have
          historically supported similar causes, indicating a higher probability
          of engagement.
        </li>
        <li>
          Skills and Expertise: Match donors who possess relevant skills or
          expertise that the campaign might benefit from, such as legal,
          medical, or technological expertise.
        </li>
        <li>
          Behavioral and Psychological Alignment Donor Motivations: Identifies
          and matches the campaign’s unique aspects and donor motivations. For
          instance, if the campaign appeals to environmental sustainability, we
          target donors motivated by environmental causes.
        </li>
        <li>
          Seasonal and Event-Based Factors Seasonal Trends: Analyzes donation
          patterns based on seasonal trends, ensuring the campaign aligns with
          times when donations typically increase.
        </li>
        <li>
          Upcoming Events: Leverage upcoming events related to the campaign to
          attract donors who are influenced by these milestones (e.g., awareness
          months, elections).
        </li>
        <li>
          Campaign-Specific Aspects Problem Alignment: Ensure that donors
          resonate with the problem the campaign aims to solve. This can be
          based on past behavior or stated interests.
        </li>
        <li>
          Influencers: Engage donors who have previously followed or supported
          similar Influencers or organizations associated with the campaign.
        </li>
        <li>
          Supporters and Unique Aspects: Highlight unique aspects of the
          campaign that differentiate it from others, appealing to donors who
          are looking for specific impacts.
        </li>
        <li>
          Donor Behavior: Analyzes previous donor behavior to identify patterns
          and target similar behavior in new campaigns. For instance, donors who
          responded well to digital campaigns might be targeted for online
          fundraising efforts.
        </li>
      </ul>
      <div>
        <p className="font-bold text-2xl my-3">Donor Profiling Formula</p>
        <div>
          {/* Based on the data points, the formula to derive an Ideal Donor Profile
          look like this: */}
          {/* <div className="font-thin my-3 bg-slate-100 p-3 text-wrap">
            Ideal Donor Profile = ( Geographic Fit × Target Donor Type ×
            Gender Alignment × Intention ) + ( Wealth Indicator × Funding Goals
            ) + ( Donor Motivations × Behavior × Skills and Expertise ) + (
            Seasonal Trends × Upcoming Events ) + ( Problem Alignment ×
            Supporters and Influencers × Unique Aspects )
            Ideal Donor Profile=(Geographic Fit×Target Donor Type×Gender Alignment×Intention)+
            (Wealth Indicator×Funding Goals)+(Donor Motivations×Behavior×Skills and Expertise)+
            (Seasonal Trends×Upcoming Events)+(Problem Alignment×Supporters and Influencers×Unique 
            Aspects)
          </div> */}
          <p>
            Based on the data points, the formula to derive an Ideal Donor
            Profile is where each factor can be assigned a weight based on its
            importance for the specific campaign. These weights can be adjusted
            based on real-time data and insights, allowing for dynamic donor
            profiling.
          </p>
        </div>
        <div>
          <p className="font-semibold my-2">Actionable Insights</p>
          <div>
            <ul className="list-disc">
              <li>
                We prioritize donors with the highest overall score based on
                mathematical formula.
              </li>
              <li>
                Segment donors based on specific criteria (e.g., high wealth,
                specific geographic location e.t.c.) to tailor campaign
                strategies.
              </li>
              <li>
                We use the donor profile to personalize outreach, ensuring
                alignment with their interests and motivations.
              </li>
              <p>Close</p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorsFormula;
