import React, { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import SponsorsModalComponent from "@/components/SponsorsModalCompTwo";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import useSWR from "swr";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Define your fetcher function
const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

const SeriesModalComponent = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("md");
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(" ");
  const [seriesPosts, setSeriesPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  // const [getSeries, setGetSeries] = useState(null);
  const [getSeries, setGetSeries] = useState([]);
  const [articleData, setArticleData] = useState({
    articleTitle: "",
    coverImage: "",
    articleBody: {
      articleContent: {
        bodyContent: "",
        bodyImage: "",
        sponsorship: {
          productTitle: "",
          productUrl: "",
          productImage: "",
          productMessage: "",
        },
      },
    },
    categoryNiche: "",
    articleFeatures: {
      crossPromotion: false,
      publishEverywhere: false,
      podcastSingleCast: false,
      podcastMultiCast: false,
    },
    isSeries: false,
    seriesTitle: "",
  });

  // Fetch posts related to the user
  const { data: postsData, error: postsError } = useSWR(
    `/api/blog/getPosts?userId=${user}`,
    fetcher
  );

  useEffect(() => {
    const fetchSeriesPosts = async () => {
      try {
        if (!Array.isArray(postsData)) {
          throw new Error("postsData is not an array");
        }

        const seriesIds = [
          ...new Set(postsData.map((post) => post.seriesId)),
        ].filter((id) => id !== null);

        // Ensure seriesIds is an array and not empty
        if (seriesIds.length > 0) {
          const response = await fetch("/api/seriesPost", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ seriesIds }), // Send seriesIds as an array
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          // Flatten the array of arrays
          const flattenedSeriesPosts = data.seriesPosts.flat();
          setSeriesPosts(flattenedSeriesPosts || []);
        } else {
          console.warn("No series IDs to fetch.");
        }
      } catch (error) {
        console.error("Failed to fetch series posts:", error);
      }
    };

    if (postsData) {
      fetchSeriesPosts();
    }
  }, [postsData]);

  const handleOpen = (post) => {
    setSelectedPost(post);
    setSize("4xl"); // Set the modal size
    onOpen(); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setArticleData((prevData) => ({
        ...prevData,
        coverImage: reader.result, // This should be base64 encoded string
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const [formData, setFormData] = useState({
    brandName: "",
    productName: "",
    productImage: null,
    website: "",
    socialMedia: "",
    productMessage: "",
    additionalInfo: "",
  });

  const handleFormDataChange = (newFormData) => {
    setFormData(newFormData);
  };

  const optionList = {
    AC: "American Culture",
    AF: "African Culture",
    AU: "Australian Culture",
    BL: "Books and Literature",
    CE: "Current Events",
    CC: "Chinese Culture",
    DI: "DIY and Crafts",
    PC: "Pop Culture",
    EL: "Environmentalism",
    EN: "Entertainment",
    EC: "European Culture",
    FI: "Finance",
    FP: "Food Photography",
    FB: "Fashion and Beauty",
    FC: "Food and Cooking",
    HW: "Health and Wellness",
    HE: "Healthy Eating",
    IC: "Indian Culture",
    JA: "Japanese Culture",
    KO: "Korean Culture",
    LI: "Lifestyle",
    LE: "Learning",
    LG: "LGBTQ",
    PA: "Parenting",
    MU: "Music",
    MC: "Middle Eastern Culture",
    MX: "Mexican Culture",
    PH: "Photography",
    PE: "Pets",
    RE: "Relationships",
    RS: "Religion and Spirituality",
    SC: "Science and Technology",
    SF: "Sports and Fitness",
    SP: "Spirituality",
    ST: "Style",
    SO: "Social Media",
    TR: "Travel",
    TE: "Television",
    VE: "Veganism",
    WE: "Wellness",
    WR: "Writing",
  };

  const handleBodyChange = (content, delta, source, editor) => {
    const text = editor.getText();
    setArticleData({
      ...articleData,
      articleBody: {
        ...articleData.articleBody,
        articleContent: {
          ...articleData.articleBody.articleContent,
          bodyContent: content,
        },
      },
    });
    setWordCount(countWords(text));
  };

  // Handles category change
  const handleCategoryChange = (event) => {
    setArticleData({
      ...articleData,
      categoryNiche: event.target.value,
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Saves article in the series table
  const handleSaveArticle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user || !user.$id) {
        throw new Error("User is not available.");
      }

      const userId = user.$id;
      const slug = generateSlug(articleData.articleTitle);
      const selectedOptionText =
        optionList[articleData.categoryNiche] || "None";

      if (!selectedOptionText) {
        setClientMessage("Please make a selection");
        return;
      }

      const response = await fetch(`/api/blog/userPostArticle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          title: articleData.articleTitle,
          featureImage: articleData.coverImage,
          content: articleData.articleBody.articleContent.bodyContent,
          categorySlug: selectedOptionText,
          publishedChannels: false,
          crossPromote: false,
          author: user,
          categories: selectedOptionText,
          podcastSingleCast: true,
          podcastMultiCast: false,
          isDraft: true,
          slug,
          isSeries: articleData.isSeries,
          seriesTitle: articleData.seriesTitle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Verify that the above input fields are correctly filled please. Failed to save draft"
        );
      }

      // Handle success and update state
      setDrafts((prevDrafts) => [...prevDrafts, data.post]);
      setMessage("Your draft has been saved successfully");

      setTimeout(() => {
        setMessage("");
      }, 3000);

      // Redirect user to the profile page
      router.push(`/profile`);
    } catch (error) {
      console.error("There was an error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  //GETS SERIES FROM THE SERVER
  useEffect(() => {
    async function fetchPostsAndSeries() {
      try {
        const response = await fetch("/api/seriesPost");
        const data = await response.json();

        setGetSeries(data);
      } catch (error) {
        console.error("Error fetching posts and series:", error);
      }
    }

    fetchPostsAndSeries();
  }, []);

  return (
    <div>
      {/* Blug Status Section */}
      <div className="blug-status-section">
        <h3>Blug Series</h3>
        <div className="flex flex-col gap-3 bg-slate-50 rounded-md">
          {getSeries.length > 0 ? (
            getSeries.map((series) => (
              <div key={series.id}>
                <h2>{series.title}</h2>
                <ul>
                  {/* {series.Posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                  ))} */}
                </ul>
              </div>
            ))
          ) : (
            <p>No series found.</p>
          )}
          {/* {seriesPosts?.map((post, index) => (
            <Button key={index} onPress={() => handleOpen(post)}>
              {series.title}
            </Button>
          ))} */}
        </div>
      </div>

      {/* Modal for displaying post details */}
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-slate-300 rounded-sm">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-slate-50">
                Blog Series - {selectedPost?.title}
              </ModalHeader>
              <ModalBody className="bg-white">
                <>
                  <div className="flex justify-center mt-5 px-4">
                    <form onSubmit={handleSaveArticle}>
                      <div className="grid grid-cols-1">
                        <div className="col-span-2">
                          <div className="space-y-12 sm:space-y-16">
                            <div className="my-4">
                              <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Write an article
                              </h2>
                              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                                Use the entries below to compose and publish
                                your article. Need inspiration? Check out the
                                tools in the right column. Avoid writers block
                                with our AI-powered brainstorming tool, blogging
                                tips, and monetization features.
                              </p>
                              <div className="mt-10 space-y-8 border-gray-900/10 pb-1 sm:space-y-0 sm:border-t sm:pb-0">
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                                  >
                                    Article Title
                                  </label>
                                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                                      <input
                                        id="title"
                                        name="title"
                                        required
                                        type="text"
                                        onChange={(e) =>
                                          setArticleData({
                                            ...articleData,
                                            articleTitle: e.target.value,
                                          })
                                        }
                                        value={articleData.articleTitle}
                                        placeholder="Give your article a title"
                                        autoComplete="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                                  >
                                    Part of a Series?
                                  </label>
                                  <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <div className="flex items-center gap-x-3">
                                      <input
                                        id="series-no"
                                        name="series-option"
                                        type="radio"
                                        value="no"
                                        defaultChecked
                                        onChange={(e) =>
                                          setArticleData((prev) => ({
                                            ...prev,
                                            isSeries: e.target.value === "yes",
                                          }))
                                        }
                                        className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                      />
                                      <label
                                        htmlFor="series-no"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        No
                                      </label>

                                      <input
                                        id="series-yes"
                                        name="series-option"
                                        type="radio"
                                        value="yes"
                                        onChange={(e) =>
                                          setArticleData((prev) => ({
                                            ...prev,
                                            isSeries: e.target.value === "yes",
                                          }))
                                        }
                                        className="ml-4 h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                                      />
                                      <label
                                        htmlFor="series-yes"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Yes
                                      </label>
                                    </div>
                                    <div className="mt-4 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                                      <input
                                        id="series"
                                        name="series"
                                        type="text"
                                        disabled={!articleData.isSeries}
                                        onChange={(e) =>
                                          setArticleData({
                                            ...articleData,
                                            seriesTitle: e.target.value,
                                          })
                                        }
                                        value={articleData.seriesTitle}
                                        placeholder="If yes, please enter series title"
                                        autoComplete="off"
                                        className="block disabled:cursor-not-allowed flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                          <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
                                          >
                                            <span>Upload a file</span>
                                            <input
                                              id="file-upload"
                                              name="file-upload"
                                              onChange={handleFileChange}
                                              type="file"
                                              required
                                              className="sr-only"
                                            />
                                          </label>
                                          <p className="pl-1">
                                            or drag and drop
                                          </p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">
                                          PNG, JPG, GIF up to 5MB
                                        </p>
                                        {articleData.coverImage && (
                                          <img
                                            src={articleData.coverImage}
                                            alt="Cover"
                                            className="mt-4 h-40 w-40 object-contain"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 mb-3">
                                  <label htmlFor="category">
                                    Select Category:
                                  </label>
                                  <select
                                    id="category"
                                    onChange={handleCategoryChange}
                                    value={articleData.categoryNiche}
                                  >
                                    <option value="">Select...</option>
                                    {Object.entries(optionList).map(
                                      ([key, name]) => (
                                        <option key={key} value={key}>
                                          {name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                                <div className="block h-60">
                                  <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                    <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                                      <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                                        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                                          <button
                                            type="button"
                                            onClick={handleModalOpen}
                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                          >
                                            <span className="text-xs text-gray-700 font-semibold">
                                              Add Sponsorship
                                            </span>
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => setOpenModal(true)}
                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                          >
                                            <span className="sr-only">
                                              Insert Product
                                            </span>
                                            <span className="text-xs text-gray-700 font-semibold">
                                              Insert Product
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className=" px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                      <label
                                        htmlFor="editor"
                                        className="sr-only"
                                      >
                                        Publish post
                                      </label>
                                      <div className="">
                                        <ReactQuill
                                          value={
                                            articleData.articleBody
                                              .articleContent.bodyContent
                                          }
                                          onChange={handleBodyChange}
                                          modules={{
                                            toolbar: [
                                              [
                                                { header: "1" },
                                                { header: "2" },
                                                { font: [] },
                                              ],
                                              [
                                                { list: "ordered" },
                                                { list: "bullet" },
                                              ],
                                              ["bold", "italic", "underline"],
                                              [{ align: [] }],
                                              ["link", "image"],
                                              ["clean"],
                                            ],
                                          }}
                                          formats={[
                                            "header",
                                            "font",
                                            "list",
                                            "bullet",
                                            "bold",
                                            "italic",
                                            "underline",
                                            "align",
                                            "link",
                                            "image",
                                          ]}
                                          className=" max-h-48 overflow-y-auto block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                          placeholder="Start your article here..."
                                          required
                                        />
                                      </div>
                                      <div
                                        className={`mt-1 mb-1 ${wordCount >= 600 ? "text-green-500" : "text-red-500"} text-xs px-4`}
                                      >
                                        You currently have: {wordCount} words.
                                        Your article must be at least 600 words
                                        at the minimum to publish.
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Features
                              </h2>
                              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                                You may choose additional services to bolster
                                your blog in user engagement and growth
                              </p>
                              <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                                <fieldset>
                                  <legend className="sr-only">
                                    Additional services
                                  </legend>
                                  <div className="space-y-6 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:gap-4 sm:py-6">
                                    {/* Cross-Promotion */}
                                    <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                                      <div className="text-sm font-semibold leading-6 text-gray-900">
                                        Cross-Promotion
                                        <br />
                                        <span className="text-xs text-gray-700">
                                          With Bloggers Network / Newsletter
                                        </span>
                                      </div>
                                      <div className="mt-4 sm:col-span-2 sm:mt-0">
                                        <div className="space-y-4">
                                          <div className="flex items-center gap-x-3">
                                            {/* <input
                                              id="cross-promotion-yes"
                                              name="crossPromotion"
                                              type="radio"
                                              value={true}
                                              checked={
                                                articleData.articleFeatures
                                                  .crossPromotion === true
                                              }
                                              onChange={() =>
                                                handleFeatureChange(
                                                  "crossPromotion",
                                                  true
                                                )
                                              }
                                              className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                                            /> */}
                                            <label
                                              htmlFor="cross-promotion-yes"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Yes
                                            </label>
                                          </div>
                                          <div className="flex items-center gap-x-3">
                                            {/* <input
                                              id="cross-promotion-no"
                                              name="crossPromotion"
                                              type="radio"
                                              value={false}
                                              checked={
                                                articleData.articleFeatures
                                                  .crossPromotion === false
                                              }
                                              onChange={() =>
                                                handleFeatureChange(
                                                  "crossPromotion",
                                                  false
                                                )
                                              }
                                              className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                            /> */}
                                            <label
                                              htmlFor="cross-promotion-no"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              No
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Publish Everywhere */}
                                    <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                                      <div className="text-sm font-semibold leading-6 text-gray-900">
                                        Publish Everywhere
                                        <br />
                                        <span className="text-xs text-gray-700">
                                          ReBlug, Medium, Dev.to, Blogger,
                                          Tumblr, Wordpress, Ghost e.t.c.
                                        </span>
                                      </div>
                                      <div className="mt-4 sm:col-span-2 sm:mt-0">
                                        <div className="space-y-4">
                                          <div className="flex items-center gap-x-3">
                                            <input
                                              id="publish-everywhere-yes"
                                              name="publishEverywhere"
                                              type="radio"
                                              value={true}
                                              checked={
                                                articleData.articleFeatures
                                                  .publishEverywhere === true
                                              }
                                              onChange={() =>
                                                handleFeatureChange(
                                                  "publishEverywhere",
                                                  true
                                                )
                                              }
                                              className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                                            />
                                            <label
                                              htmlFor="publish-everywhere-yes"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              Yes
                                            </label>
                                          </div>
                                          <div className="flex items-center gap-x-3">
                                            <input
                                              id="publish-everywhere-no"
                                              name="publishEverywhere"
                                              type="radio"
                                              value={false}
                                              checked={
                                                articleData.articleFeatures
                                                  .publishEverywhere === false
                                              }
                                              onChange={() =>
                                                handleFeatureChange(
                                                  "publishEverywhere",
                                                  false
                                                )
                                              }
                                              className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                            />
                                            <label
                                              htmlFor="publish-everywhere-no"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              No
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Blog-2-Podcast */}
                                    <div className="sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4 sm:py-6">
                                      <div className="text-sm font-semibold leading-6 text-gray-900">
                                        Blog-2-Podcast
                                        <br />
                                        <span className="text-xs text-gray-700">
                                          Turn your blog to Podcast? SingleCast
                                          features one AI voice personality
                                          while MultiCast features multiple AI
                                          conversations
                                        </span>
                                      </div>
                                      <div className="mt-4 sm:col-span-2 sm:mt-0">
                                        <div className="space-y-4">
                                          <div className="flex items-center gap-x-3">
                                            <input
                                              id="podcast-single-cast"
                                              name="blog-to-podcast"
                                              type="radio"
                                              value="singleCast"
                                              checked={
                                                articleData.articleFeatures
                                                  .podcastSingleCast === true
                                              }
                                              onChange={() =>
                                                handleFeatureChange(
                                                  "podcastSingleCast",
                                                  true
                                                )
                                              }
                                              className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                                            />
                                            <label
                                              htmlFor="podcast-single-cast"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              SingleCast
                                            </label>
                                          </div>
                                          <div className="flex items-center gap-x-3">
                                            <input
                                              id="podcast-multi-cast"
                                              name="blog-to-podcast"
                                              disabled
                                              type="radio"
                                              value="multiCast"
                                              checked={
                                                articleData.articleFeatures
                                                  .podcastMultiCast === true
                                              }
                                              onChange={() =>
                                                handleFeatureChange(
                                                  "podcastMultiCast",
                                                  true
                                                )
                                              }
                                              className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                                            />
                                            <label
                                              htmlFor="podcast-multi-cast"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              MultiCast{" "}
                                              <span className="text-xs">
                                                (coming soon)
                                              </span>
                                            </label>
                                          </div>
                                          <div className="flex items-center gap-x-3">
                                            <input
                                              id="no-podcast"
                                              name="blog-to-podcast"
                                              type="radio"
                                              value={false}
                                              checked={
                                                articleData.articleFeatures
                                                  .podcastSingleCast ===
                                                  false &&
                                                articleData.articleFeatures
                                                  .podcastMultiCast === false
                                              }
                                              onChange={() => {
                                                handleFeatureChange(
                                                  "podcastSingleCast",
                                                  false
                                                );
                                                handleFeatureChange(
                                                  "podcastMultiCast",
                                                  false
                                                );
                                              }}
                                              className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                                            />
                                            <label
                                              htmlFor="no-podcast"
                                              className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                              No
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </fieldset>
                              </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={() => router.push("/dashboard")}
                                className="text-sm font-semibold leading-6 text-gray-900"
                              >
                                Cancel
                              </Button>
                              {loading ? (
                                <p className="text-xs">publishing..</p>
                              ) : (
                                <Button
                                  type="submit"
                                  onClick={handleSaveArticle}
                                  variant="primary"
                                  className="text-sm text-gray-900 font-semibold leading-6 hover:bg-slate-400 hover:text-white"
                                >
                                  Save & Publish
                                </Button>
                              )}
                            </div>
                            {message && (
                              <div className="mt-4 flex justify-end font-semibold text-green-600 text-lg">
                                {message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                    <div>
                      <SponsorsModalComponent
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        formData={formData}
                        setFormData={handleFormDataChange}
                      />
                      {formData.brandName &&
                        formData.productName &&
                        formData.productMessage &&
                        formData.productImage && (
                          <SponsMessage formData={formData} />
                        )}
                    </div>
                  </div>
                </>
              </ModalBody>
              <ModalFooter className="bg-slate-50">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add to Series
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SeriesModalComponent;
