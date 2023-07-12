const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const trends = {
  title: "ForgedAI",
  content: `Creating a Buyer Persona
      Identify the problem the "product" solves and determine how it benefits the target audience.
      Conduct thorough research to identify the target audience for this "product", considering demographics, interests, and online behavior.
      Develop a detailed buyer persona that represents the target audience, including information such as age, gender, occupation, hobbies, preferred social media platforms, and online habits.
      
      ##Trends Analysis
      
      Gather data on the "product"'s market and analyze it to identify patterns, common themes, and emerging trends.
      Use reliable sources for data collection, such as industry reports and social media insights tools.
      Clean and process the data to ensure accuracy and completeness.
      Analyze trends in the "product" categories, understand consumer preferences, and identify emerging technologies in respect to the ecommerce industry.
      Look for recurring features, customer preferences, technological advancements, and shifts in consumer behavior to identify patterns in the data.
      Utilize social media platforms and communities to gather insights into consumer opinions, preferences, and emerging trends.
      Utilize social commerce market reports to study valuable information on market size, growth rates, key players, and emerging trends.
      Use data visualization tools to communicate and present the trends analysis effectively.
      If you don't know the answer, don't try to make up an answer, say that you can conduct further research on the subject, and get back with an answer. Request for user's email
      
      `,
};
const marketing = {
  title: "marketing",
  content: `
      
      Social Media Marketing Plan
      
      Research and select relevant social media platforms to launch a campaign for the "product".
      Analyze which social media platforms are most popular among the target audience to choose platforms where the audience spends the most time to maximize reach and engagement.
      Develop a comprehensive social media strategy that aligns with the "product", target audience, and business goals.
      Determine the types of content to share, frequency of posting, and the tone of voice that reflects the "brandPersona".
      Create and schedule platform-specific content, including captions, hashtags, and responses to user interactions. Analyze engagement metrics to optimize future content and maximize reach.
      Establish key performance indicators (KPIs) to measure the success of social media campaigns.
      Develop compelling and visually appealing content that captures the audience's attention.
      Tailor content to each social media platform to maximize its impact.
      Actively engage with the target audience by responding to their comments, messages, and feedback.
      Encourage discussions, ask questions, and run contests or giveaways to foster a sense of community and increase brand loyalty.
      Use various strategies, including influencer marketing (human or AI-based), paid advertising (if budget allows), and community engagement to promote the "product".
      Use data visualization to highlight target audience demographics, prevailing trends, and social media platform choice among the target audience.
      If you don't know the answer, don't try to make up an answer, say that you can conduct further research on the subject, and get back with an answer. Request for user's email.
      `,
};
const about_us = {
  title: "About us",
  content: `
## About Us
"Providing automated social tools for eCommerce brands to reach wider audience and increase sales on social media.
Our automated AI tools come equipped with powerful strategies that can help eCommerce brands achieve rapid growth and record-breaking sales."

## Tools

"Look no further than our AI-powered tool to automate content creation and posting on social media to facilitate growth. With our tool, you can easily analyze trends in products and services, plan and launch campaigns effectively on social media, generate high-quality content that's tailored to your audience, and schedule it to be posted at the optimal times for maximum engagement.
You can train this tool to create and post content on social media, conveying messages exactly the way your brand would bring it to your audience based on your previous posts.
Schedule and take a break to focus on other aspect of your business."
Try our tool today and experience the power of AI automation for yourself on social media.

## Influencers and Creators

"We have tools to help influencers productively engage with their audience on all social media platforms.
Our content creation tool allows Influencers and Creators to automate content creation by using AI to generate videos, images, stories based on related topics, and schedules to be posted at varying times.
While this tool was developed to help Influencers grow thier audience organically, it also provides various health benefits such as reducing The pressure of keeping up a persona, reduce social media related anxiety, burnout, and help avoid Online hate and abuse.
Our messaging tool allows users to invite their audience to join their private messaging group on their mobile devices. This frees them from the algorithm constraints of social media platforms, which can limit their growth potential.\
Influencers and Creators are introduced and exposed to brand advertisers based on product categories. This gives them maximum exposure to brand sponsorships, and excellent opportunity to monetize their audience locally."

## Affiliate program

"It's easy to earn on ForgedMart and you don't have to wait for your affiliate payout like you do with other programs that typically pay out on the first or middle of the month. With ForgedMart affiliate program, you can refer your friends and get paid on the same day they sign up - Thanks to our partnership with Stripe."

## Terms of use

1.  Use of our platform
    1.1. You must be at least 18 years of age to use our platform.
    1.2. You may not use our platform for any illegal or unauthorized purpose nor may you, in the use of the platform, violate any laws in your jurisdiction.
    1.3. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the platform without our express written permission.
    1.4. We reserve the right to modify, suspend or terminate the platform for any reason, without notice at any time. We also reserve the right to refuse service to anyone for any reason at any time.

2.  Subscription payments
    2.1. By subscribing to our platform, you agree to pay all applicable fees and charges in full.
    2.2. All subscription payments are final, and no refunds will be issued for any reason.
    2.3. If you cancel your subscription, your access to our platform will be terminated at the end of your current billing cycle.
    2.4. We reserve the right to modify the subscription fees at any time. We will provide you with notice of any fee changes before they take effect.

3.  Intellectual property
    3.1. All content included on our platform, including text, graphics, logos, images, and software, is the property of our platform or its content suppliers and protected by international copyright laws.
    3.2. You may not modify, publish, transmit, participate in the transfer or sale of, create derivative works from, distribute, display, reproduce or perform, or in any way exploit in any format whatsoever any of the content of the platform, in whole or in part without our prior written consent.

4.  Disclaimers and limitations of liability
    4.1. The platform is provided on an "as is" and "as available" basis, and we make no representations or warranties of any kind, express or implied, as to the operation of the platform or the information, content, materials, or products included on the platform.
    4.2. To the full extent permissible by applicable law, we disclaim all warranties, express or implied, including but not limited to, implied warranties of merchantability and fitness for a particular purpose.
    4.3. We will not be liable for any damages of any kind arising from the use of the platform, including but not limited to direct, indirect, incidental, punitive, and consequential damages.

5.  Indemnification
    5.1. You agree to indemnify and hold us and our affiliates, officers, agents, employees, and partners harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the platform, your violation of these Terms of Service, or your violation of any rights of another.

6.  Governing law and jurisdiction
    6.1. These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which our platform operates.
    6.2. Any disputes arising from or related to these Terms of Service shall be subject to the exclusive jurisdiction of the courts in the jurisdiction in which our platform operates.

7.  Changes to the Terms of Service
    7.1. We reserve the right to modify these Terms of Service at any time. If we make material changes to these Terms of Service, we will notify you by email or by posting a notice on our platform.
    7.2. Your continued use of our platform after any modifications to these Terms of

8.  Use of our platform
    1.1. You must be at least 18 years of age to use our platform.
    1.2. You may not use our platform for any illegal or unauthorized purpose nor may you, in the use of the platform, violate any laws in your jurisdiction.
    1.3. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the platform without our express written permission.
    1.4. We reserve the right to modify, suspend or terminate the platform for any reason, without notice at any time. We also reserve the right to refuse service to anyone for any reason at any time.

9.  Subscription payments
    2.1. By subscribing to our platform, you agree to pay all applicable fees and charges in full.
    2.2. All subscription payments are final, and no refunds will be issued for any reason.
    2.3. If you cancel your subscription, your access to our platform will be terminated at the end of your current billing cycle.
    2.4. We reserve the right to modify the subscription fees at any time. We will provide you with notice of any fee changes before they take effect.

10. Intellectual property
    3.1. All content included on our platform, including text, graphics, logos, images, and software, is the property of our platform or its content suppliers and protected by international copyright laws.
    3.2. You may not modify, publish, transmit, participate in the transfer or sale of, create derivative works from, distribute, display, reproduce or perform, or in any way exploit in any format whatsoever any of the content of the platform, in whole or in part without our prior written consent.

11. Disclaimers and limitations of liability
    4.1. The platform is provided on an "as is" and "as available" basis, and we make no representations or warranties of any kind, express or implied, as to the operation of the platform or the information, content, materials, or products included on the platform.
    4.2. To the full extent permissible by applicable law, we disclaim all warranties, express or implied, including but not limited to, implied warranties of merchantability and fitness for a particular purpose.
    4.3. We will not be liable for any damages of any kind arising from the use of the platform, including but not limited to direct, indirect, incidental, punitive, and consequential damages.

12. Indemnification
    5.1. You agree to indemnify and hold us and our affiliates, officers, agents, employees, and partners harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the platform, your violation of these Terms of Service, or your violation of any rights of another.

13. Governing law and jurisdiction
    6.1. These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which our platform operates.
    6.2. Any disputes arising from or related to these Terms of Service shall be subject to the exclusive jurisdiction of the courts in the jurisdiction in which our platform operates.

14. Changes to the Terms of Service
    7.1. We reserve the right to modify these Terms of Service at any time. If we make material changes to these Terms of Service, we will notify you by email or by posting a notice on our platform.


## Privacy Policy

This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.

We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.

Interpretation

The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.

Log Files

For the purposes of this Privacy Policy:

Account means a unique account created for You to access our Service or parts of our Service.
Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Brandname LLC, sweeden.
Cookies are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.
Country refers to: Sweden
Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.
Personal Data is any information that relates to an identified or identifiable individual.
Service refers to the Website.
Service Provider means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
Third-party Social Media Service refers to any website or any social network website through which a User can log in or create an account to use the Service.
Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
Website refers to ForgedMart, accessible from forgedmart.com
You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.

Personal Data

While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:

Email address
First name and last name
Phone number
Address, State, Province, ZIP/Postal code, City
Usage Data

Data Deletion
You have the right to request the deletion of your personal information from our systems at any time. To do so, please contact us at info@publictrades.com. You may also delete your data by closing/deleting your account with us.  We will process your request within 5 business days.

Usage Data

Usage Data is collected automatically when using the Service.

Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.

When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.

We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.

Information from Third-Party Social Media Services

The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:

Google
Facebook
Twitter
Twitch

If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service's account, such as Your name, Your email address, Your activities or Your contact list associated with that account.

You may also have the option of sharing additional information with the Company through Your Third-Party Social Media Service's account. If You choose to provide such information and Personal Data, during registration or otherwise, You are giving the Company permission to use, share, and store it in a manner consistent with this Privacy Policy.

Limited Use Policy
Our app complies with the Google API Services User Data Policy, including the Limited Use requirements. We do not allow humans to read the user's data unless they have given their affirmative agreement to view specific messages, files, or other data. We also limit our use of data to providing or improving user-facing features that are prominent in the requesting application's user interface. ForgedMart’s use and transfer to any other app of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.

Tracking Technologies and Cookies
We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:

Cookies or Browser Cookies. A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.
Flash Cookies. Certain features of our Service may use local stored objects (or Flash Cookies) to collect and store information about Your preferences or Your activity on our Service. Flash Cookies are not managed by the same browser settings as those used for Browser Cookies. For more information on how You can delete Flash Cookies, please read "Where can I change the settings for disabling, or deleting local shared objects?" available at https://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html#main\_Where\_can\_I\_change\_the\_settings\_for\_disabling\_\_or\_deleting\_local\_shared\_objects\_
Web Beacons. Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).

Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. Learn more about cookies: Cookies: What Do They Do?.

We use both Session and Persistent Cookies for the purposes set out below:

Necessary / Essential Cookies

Type: Session Cookies

Administered by: Us

Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.

Cookies Policy / Notice Acceptance Cookies

Type: Persistent Cookies

Administered by: Us

Purpose: These Cookies identify if users have accepted the use of cookies on the Website.

Functionality Cookies

Type: Persistent Cookies

Administered by: Us

Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.

For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.

Retention of Your Personal Data

The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.

The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.

Retention of Your Personal Data

Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.

Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.

The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.

Business Transaction

If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.

Law enforcement

Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).

Other legal requirements

The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:

Comply with a legal obligation
Protect and defend the rights or property of the Company
Prevent or investigate possible wrongdoing in connection with the Service
Protect the personal safety of Users of the Service or the public
Protect against legal liability

Security of Your Personal Data

The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.

## Contact Us:
If you have any questions about this Privacy Policy, You can contact us:
By email: support@forgedmart.com
If you don't know the answer, don't try to make up an answer, say that you can conduct further research on the subject, and get back with an answer. Request for user's email

`,
};

//Todo - Delete entries in the db, add the entry below.
async function main() {
  const forgedAI = await prisma.ForgedAI.createMany({
    data: [
      { title: trends.title, content: trends.content },
      { title: marketing.title, content: marketing.content },
      { title: about_us.title, content: about_us.content },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
