import React from "react";
import QuillComponent from "../../components/Quill";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

const ChatAIBob = () => {
  return (
    <div className="flex justify-center mt-5 px-4">
      <form>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="space-y-12 sm:space-y-16">
              <div className="my-4">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Write an article
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                  Use the form below to compose and publish your article. Need
                  inspiration? Check out the tools in the right column. They
                  include AI-powered brainstorming, blogging tips, and
                  monetization features.
                </p>

                <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Article Title
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
                        <input
                          id="title"
                          name="title"
                          type="text"
                          placeholder="Give your article a title"
                          autoComplete="title"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                    >
                      Cover photo
                    </label>
                    <div className="mt-2 sm:col-span-2 sm:mt-0">
                      <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon
                            aria-hidden="true"
                            className="mx-auto h-12 w-12 text-gray-300"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-28">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                      >
                        Article
                      </label>
                      <QuillComponent />
                    </div>
                    <div className="flex">
                      <label
                        htmlFor="niche"
                        className=" text-sm font-medium leading-6 text-gray-900 sm:pt-1.0"
                      >
                        Your Niche
                      </label>
                      <p className="text-sm ml-2 font-medium leading-6 text-gray-900">
                        Niche
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Features
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                  You may choose additional services to bolster your blog in
                  these areas (Engagement, Growth)
                </p>

                <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                  <fieldset>
                    <legend className="sr-only">Additional services</legend>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
                      <div
                        aria-hidden="true"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Additional services
                      </div>
                      <div className="mt-4 sm:col-span-2 sm:mt-0">
                        <div className="max-w-lg space-y-6">
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="comments"
                                name="comments"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor="comments"
                                className="font-medium text-gray-900"
                              >
                                Comments
                              </label>
                              <p className="mt-1 text-gray-600">
                                Get notified when someones posts a comment.
                              </p>
                            </div>
                          </div>
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="candidates"
                                name="candidates"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor="candidates"
                                className="font-medium text-gray-900"
                              >
                                Cross promotion
                              </label>
                              <p className="mt-1 text-gray-600">
                                Enable to Cross-promote this article with other
                                bloggers within your category/niche
                              </p>
                            </div>
                          </div>
                          <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                              <input
                                id="offers"
                                name="offers"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
                              />
                            </div>
                            <div className="text-sm leading-6">
                              <label
                                htmlFor="offers"
                                className="font-medium text-gray-900"
                              >
                                Publish Everywhere{" "}
                                <span className="text-sm text-red-800">
                                  (Note: This feature needs to be configured)
                                </span>
                              </label>
                              <p className="mt-1 text-gray-600">
                                Publish this article here and on other platform.{" "}
                                <span className="text-sm text-red-800">
                                  (Click to configure)
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Save for later
              </button>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Preview & Submit
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-lg text-gray-600 pl-1">Tools</p>
            <div className="border mt-3 mx-2 px-3">
              <Button className="my-2 mx-2" type="button">
                Beginners Guide
              </Button>
              <Button className="my-2 mx-2 bg-stone-700" type="button">
                Brainstorm Ideas
              </Button>
              <Button className="my-2 mx-2 bg-red-700" type="button">
                Include Sponsor
              </Button>
              <Button className="my-2 mx-2 bg-lime-700" type="button">
                Generated with AI
              </Button>
              <Button className="my-2 mx-2 bg-blue-700" type="button">
                Article Assistant for your website
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatAIBob;

// import React from "react";
// import QuillComponent from "../../components/Quill";
// import { PhotoIcon } from "@heroicons/react/24/solid";
// import { Button } from "@/components/ui/button";

// const ChatAIBob = () => {
//   return (
//     <div className="flex justify-center mt-5 px-4">
//       <form>
//         <div div className="grid lg:grid-cols-3 gap-4 ">
//           <div className="col-span-2">
//             <div className="space-y-12 sm:space-y-16">
//               <div className="my-4">
//                 <h2 className="text-base font-semibold leading-7 text-gray-900">
//                   Write an article
//                 </h2>
//                 <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
//                   Use the form below to compose and publish your article. Need
//                   inspiration? Check out the tools in the right column. They
//                   include AI-powered brainstorming, blogging tips, and
//                   monetization features.
//                 </p>

//                 <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
//                   <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
//                     <label
//                       htmlFor="title"
//                       className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
//                     >
//                       Article Title
//                     </label>
//                     <div className="mt-2 sm:col-span-2 sm:mt-0">
//                       <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-red-600 sm:max-w-md">
//                         <input
//                           id="title"
//                           name="title"
//                           type="text"
//                           placeholder="Give your article a title"
//                           autoComplete="title"
//                           className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
//                     <label
//                       htmlFor="cover-photo"
//                       className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
//                     >
//                       Cover photo
//                     </label>
//                     <div className="mt-2 sm:col-span-2 sm:mt-0">
//                       <div className="flex max-w-2xl justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//                         <div className="text-center">
//                           <PhotoIcon
//                             aria-hidden="true"
//                             className="mx-auto h-12 w-12 text-gray-300"
//                           />
//                           <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                             <label
//                               htmlFor="file-upload"
//                               className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
//                             >
//                               <span>Upload a file</span>
//                               <input
//                                 id="file-upload"
//                                 name="file-upload"
//                                 type="file"
//                                 className="sr-only"
//                               />
//                             </label>
//                             <p className="pl-1">or drag and drop</p>
//                           </div>
//                           <p className="text-xs leading-5 text-gray-600">
//                             PNG, JPG, GIF up to 10MB
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="">
//                     <div className="mb-28">
//                       <label
//                         htmlFor="about"
//                         className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
//                       >
//                         Article
//                       </label>
//                       <QuillComponent />
//                     </div>
//                     <div className="flex">
//                       <label
//                         htmlFor="niche"
//                         className=" text-sm font-medium leading-6 text-gray-900 sm:pt-1.0"
//                       >
//                         Your Niche
//                       </label>
//                       <p className="text-sm ml-2 font-medium leading-6 text-gray-900">
//                         Niche
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h2 className="text-base font-semibold leading-7 text-gray-900">
//                   Features
//                 </h2>
//                 <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
//                   You may choose additional services to bolster your blog in
//                   these areas (Engagement, Growth)
//                 </p>

//                 <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
//                   <fieldset>
//                     <legend className="sr-only">Additional services</legend>
//                     <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:py-6">
//                       <div
//                         aria-hidden="true"
//                         className="text-sm font-semibold leading-6 text-gray-900"
//                       >
//                         Additional services
//                       </div>
//                       <div className="mt-4 sm:col-span-2 sm:mt-0">
//                         <div className="max-w-lg space-y-6">
//                           <div className="relative flex gap-x-3">
//                             <div className="flex h-6 items-center">
//                               <input
//                                 id="comments"
//                                 name="comments"
//                                 type="checkbox"
//                                 className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
//                               />
//                             </div>
//                             <div className="text-sm leading-6">
//                               <label
//                                 htmlFor="comments"
//                                 className="font-medium text-gray-900"
//                               >
//                                 Comments
//                               </label>
//                               <p className="mt-1 text-gray-600">
//                                 Get notified when someones posts a comment.
//                               </p>
//                             </div>
//                           </div>
//                           <div className="relative flex gap-x-3">
//                             <div className="flex h-6 items-center">
//                               <input
//                                 id="candidates"
//                                 name="candidates"
//                                 type="checkbox"
//                                 className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
//                               />
//                             </div>
//                             <div className="text-sm leading-6">
//                               <label
//                                 htmlFor="candidates"
//                                 className="font-medium text-gray-900"
//                               >
//                                 Cross promotion
//                               </label>
//                               <p className="mt-1 text-gray-600">
//                                 Enable to Cross-promote this article with other
//                                 bloggers within your category/niche
//                               </p>
//                             </div>
//                           </div>
//                           <div className="relative flex gap-x-3">
//                             <div className="flex h-6 items-center">
//                               <input
//                                 id="offers"
//                                 name="offers"
//                                 type="checkbox"
//                                 className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
//                               />
//                             </div>
//                             <div className="text-sm leading-6">
//                               <label
//                                 htmlFor="offers"
//                                 className="font-medium text-gray-900"
//                               >
//                                 Publish Everywhere{" "}
//                                 <span className="text-sm text-red-800">
//                                   (Note: This feature needs to be configured)
//                                 </span>
//                               </label>
//                               <p className="mt-1 text-gray-600">
//                                 Publish this article here and on other platform.{" "}
//                                 <span className="text-sm text-red-800">
//                                   (Click to configure)
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </fieldset>
//                   {/* <fieldset>
//                     <legend className="sr-only">Push Notifications</legend>
//                     <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
//                       <div
//                         aria-hidden="true"
//                         className="text-sm font-semibold leading-6 text-gray-900"
//                       >
//                         Push Notifications
//                       </div>
//                       <div className="mt-1 sm:col-span-2 sm:mt-0">
//                         <div className="max-w-lg">
//                           <p className="text-sm leading-6 text-gray-600">
//                             These are delivered via SMS to your mobile phone.
//                           </p>
//                           <div className="mt-6 space-y-6">
//                             <div className="flex items-center gap-x-3">
//                               <input
//                                 id="push-everything"
//                                 name="push-notifications"
//                                 type="radio"
//                                 className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
//                               />
//                               <label
//                                 htmlFor="push-everything"
//                                 className="block text-sm font-medium leading-6 text-gray-900"
//                               >
//                                 Everything
//                               </label>
//                             </div>
//                             <div className="flex items-center gap-x-3">
//                               <input
//                                 id="push-email"
//                                 name="push-notifications"
//                                 type="radio"
//                                 className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
//                               />
//                               <label
//                                 htmlFor="push-email"
//                                 className="block text-sm font-medium leading-6 text-gray-900"
//                               >
//                                 Same as email
//                               </label>
//                             </div>
//                             <div className="flex items-center gap-x-3">
//                               <input
//                                 id="push-nothing"
//                                 name="push-notifications"
//                                 type="radio"
//                                 className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
//                               />
//                               <label
//                                 htmlFor="push-nothing"
//                                 className="block text-sm font-medium leading-6 text-gray-900"
//                               >
//                                 No push notifications
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </fieldset> */}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex items-center justify-end gap-x-6">
//               <button
//                 type="button"
//                 className="text-sm font-semibold leading-6 text-gray-900"
//               >
//                 Save for later
//               </button>
//               <button
//                 type="submit"
//                 className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
//               >
//                 Preview & Submit
//               </button>
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <p className="font-semibold text-lg text-gray-600 pl-1">Tools</p>
//             <div className=" border mt-3 mx-2 px-3">
//               <Button className="my-2 mx-2" type="button">
//                 Beginners Guide
//               </Button>
//               <Button className="my-2 mx-2 bg-stone-700" type="button">
//                 Brainstorm Ideas
//               </Button>
//               <Button className="my-2 mx-2 bg-red-700" type="button">
//                 Include Sponsor
//               </Button>
//               <Button className="my-2 mx-2 bg-lime-700" type="button">
//                 Generated with AI
//               </Button>
//               <Button className="my-2 mx-2 bg-blue-700" type="button">
//                 Article Assistant for your website
//               </Button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatAIBob;
