import React from "react";
import { Textarea } from "@nextui-org/react";
import Progress from "@/components/blogProgress";

export default function BeginnerBlogger() {
  return (
    <>
      <div className="mt-20 mb-10">
        <h1 className="text-3xl font-bold mb-2">But why blog, you ask? The benefits are plentiful</h1>
        <ol className="list-decimal list-inside mt-3">
          <li>Become an Expert: The act of writing forces you to delve deeper into your chosen field, solidifying your knowledge and establishing you as a thought leader.</li>
          <li>Connect with a Community: Blogging fosters a sense of connection.  Engage with your readers, build a loyal following, and share your voice with the world.</li>
          <li>Storytelling Simplified: Learn to craft compelling narratives within your chosen niche. reBlug provides frameworks and templates to structure your blog posts for maximum impact.</li>
          <li>Open Doors to Opportunity: A well-maintained blog can open doors to exciting new possibilities  – from freelance writing gigs to brand collaborations.</li>
        </ol>

        <img className="float-right w-80 rounded-lg p-3" src="/images/scorpionTypist.png" />
        <p className="text-xl font-semibold my-2">No experience? No problem! Go from blank page to brilliant blog with AI-Powered guided step.</p>
        <ol className="list-disc list-inside">
          <li>Find Your Niche: Feeling overwhelmed by topic choices? We help you discover your niche – that sweet spot where your interests meet an engaged audience.</li>
          <li>Idea Ignition: Spark inspiration with our topic suggestion engine. Never get stuck with writer's block again!</li>
          <li>Storytelling Simplified: Learn to craft compelling narratives within your chosen niche. reBlug provides frameworks and templates to structure your blog posts for maximum impact.</li>
          <li>Research Like a Pro: Unearth credible sources and learn to weave them seamlessly into your writing, building trust and authority with your readers.</li>
        </ol>

        <p className="text-xl font-semibold mt-2">reBlug empowers you to:</p>
        <ol className="list-disc list-inside">
          <li>Write with Confidence: Develop the skills and knowledge to express yourself clearly and effectively.</li>
          <li>Idea Ignition: Spark inspiration with our topic suggestion engine. Never get stuck with writer's block again!</li>
          <li>Storytelling Simplified: Learn to craft compelling narratives within your chosen niche. reBlug provides frameworks and templates to structure your blog posts for maximum impact.</li>
          <li>Research Like a Pro: Unearth credible sources and learn to weave them seamlessly into your writing, building trust and authority with your readers.</li>
          <li>Find Your Voice: Discover your unique writing style and share your passions with the world.</li>
          <li>Embrace the Journey: Transform from a hesitant beginner to a passionate blogger, one captivating post at a time.</li>
        </ol>
      </div>
      <p className="text-md font-normal mb-2">Ready to embark on your blogging adventure? Get started today by using the tool below.</p>
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 bg-gray-100 rounded-lg p-4">
        <Textarea
          minRows={1}
          maxRows={1}
          isRequired={true}
          label="Title"
          placeholder="Enter title for your blog post"
        />
        <Textarea
          label="Content"
          isRequired={true}
          placeholder="Tell your story by adding content"
        />
        <Textarea
          label="Conclusion"
          isRequired={true}
          placeholder="Add a conclusion"
        />

      </div>
      <div className="w-full mt-3">
        <Progress />
      </div>
    </>
  );
}


