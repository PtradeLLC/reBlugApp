import Image from "next/image";

const testimonials = [
  [
    [
      {
        body: `Ever wondered creating and delivering your contents to your followers, growing & monetizing followers and contents, but not on any social media platform?`,
        author: {
          name: "Making AI useful",
          handle: "We have a tool for that",
          imageUrl: "/images/Beauty.png",
        },
      },
    ],
    [
      {
        body: `Escape the constraints of platform algorithms and connect with your audience on a local level through text messages.`,
        author: {
          name: "Accept donations for content well done",
          handle: "Generosity via text",
          imageUrl: "/images/Creativity.gif",
        },
      },
    ],
    [
      {
        body: "Manage audience growth, content monetization while maintaining fruitful relationships with brands through text messages on your mobile phone.",
        author: {
          name: "Partnership based on trust",
          handle: "Brand Sponsorship",
          imageUrl: "/images/spons.gif",
        },
      },
    ],
  ],
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MobilePlatform() {
  return (
    <div className="relative isolate bg-white sm:pt-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid max-w-7xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 lg:grid-cols-3 text-gray-900">
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div
              key={columnGroupIdx}
              className="space-y-8 xl:contents xl:space-y-0 mt-2"
            >
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 &&
                        columnIdx === columnGroup.length - 1)
                      ? "xl:row-span-2"
                      : "space-y-8"
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial.author.handle}
                      className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                    >
                      <blockquote className="text-gray-900">
                        <p>{`${testimonial.body}`}</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <Image
                          className="h-20 w-10 rounded-lg object-cover bg-gray-50"
                          src={testimonial.author.imageUrl}
                          alt=""
                          width={200}
                          height={200}
                        />
                        <div>
                          <div className="font-semibold">
                            {testimonial.author.name}
                          </div>
                          <div className="text-gray-600">{`${testimonial.author.handle}`}</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
