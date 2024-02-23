import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import { PhotoIcon } from '@heroicons/react/24/solid'
import 'react-quill/dist/quill.bubble.css';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, CheckboxGroup, Checkbox, RadioGroup, Radio, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";


const Compose = ({ showModal, setShowModal }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [featureImage, setFeatureImage] = useState('');
    const [content, setContent] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [crossPromote, setCrossPromote] = useState('yes');
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Select a Category"]));
    const [selectedFeatures, setSelectedFeatures] = useState(["article-newsletter", "blog-podcast"]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/fetchUser');

                if (response.ok) {
                    // Parse the response data
                    const jsonData = await response.json();

                    setUserInfo(jsonData);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const handlePublish = async (e) => {
        e.preventDefault();
        try {
            const data = {
                title,
                featureImage,
                content,
                crossPromote,
                selectedValue,
                selectedFeatures,
                userInfo,
            };

            // Send the data to the API
            const response = await fetch('/api/blog/commentsystem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // // Check if the request was successful
            if (response.ok) {
                const data = await response.json();

                console.log('Article published successfully!', data);

            } else {
                console.error('Failed to publish article');
            }

            setTitle('');
            setFeatureImage('');
            setContent('');
            setSelectedKeys(new Set(["Select a Category"]));
            setCrossPromote('yes');
            setSelectedFeatures(["article-newsletter", "blog-podcast"]);
        } catch (error) {
            console.error('Error publishing article:', error);
        }
    };



    const blogCategories = [
        { name: "Books and Literature", href: "#", icon: "booksIcon" },
        { name: "DIY and Crafts", href: "#", icon: "diyIcon" },
        { name: "Learning", href: "#", icon: "educationIcon" },
        { name: "Entertainment", href: "#", icon: "entertainmentIcon" },
        { name: "Marketing", href: "#", icon: "entertainmentIcon" },
        { name: "Pop Culture", href: "#", icon: "environmentIcon" },
        { name: "Environmentalism", href: "#", icon: "environmentIcon" },
        { name: "Fashion and Beauty", href: "#", icon: "fashionIcon" },
        { name: "Finance", href: "#", icon: "financeIcon" },
        { name: "Food and Cooking", href: "#", icon: "foodIcon" },
        { name: "Health and Wellness", href: "#", icon: "healthIcon" },
        { name: "Lifestyle", href: "#", icon: "lifestyleIcon" },
        { name: "Parenting", href: "#", icon: "parentingIcon" },
        { name: "Photography", href: "#", icon: "photographyIcon" },
        { name: "Current Events", href: "#", icon: "politicsIcon" },
        { name: "Relationships", href: "#", icon: "relationshipsIcon" },
        { name: "Science and Technology", href: "#", icon: "scienceIcon" },
        { name: "Sports and Fitness", href: "#", icon: "sportsIcon" },
        { name: "Travel", href: "#", icon: "travelIcon" }
    ];

    return (
        <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            className="m-auto"
            size={"3xl"}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Write an Article
                </ModalHeader>
                <ModalBody>
                    <div className='overflow-y-auto h-[360px]'>
                        <div className='mb-4'>
                            <input
                                className='mb-2 bg-transparent border-none w-full'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type='text'
                                placeholder='Enter Title here'
                            />
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Feature Image
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={(e) => setFeatureImage(e.target.value)}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`absolute z-10 mr-4`}>
                                <button type='button' onClick={() => setOpen(!open)}>
                                    <Image src={'/images/addme.png'} width={30} height={30} alt='addImage' />
                                </button>

                                {open && (
                                    <div className='flex mx-3'>
                                        <Image className='mx-1' src={'/images/photo-upload.png'} width={25} height={25} alt='' />
                                        <Image className='mx-1' src={'/images/video-file.png'} width={25} height={25} alt='' />
                                        <Image className='mx-1' src={'/images/image-file.png'} width={25} height={25} alt='' />
                                    </div>
                                )}
                            </div>
                            <ReactQuill
                                className='h-40 px-4 mt-5'
                                theme="bubble"
                                value={content}
                                onChange={setContent}
                                placeholder='Begin by typing here. You may select to highlight texts for format...'
                            />
                        </div>
                        <RadioGroup
                            id='radio-butt'
                            className='mt-16'
                            label="Cross-promote this article?"
                            orientation="horizontal"
                            color="success"
                            value={crossPromote}
                            onValueChange={setCrossPromote}
                        >
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no">No</Radio>
                        </RadioGroup>
                        <div className='my-3 w-72'>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                        className="capitalize"
                                    >
                                        {selectedValue}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Single selection example"
                                    variant="flat"
                                    disallowEmptySelection
                                    selectionMode="single"
                                    selectedKeys={selectedKeys}
                                    onSelectionChange={setSelectedKeys}
                                >
                                    {blogCategories.map((item, index) => (
                                        <DropdownItem key={item.name}>{item.name}</DropdownItem>

                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="flex py-2 px-1 justify-between mr-6">
                            <CheckboxGroup
                                label="Select features"
                                orientation="horizontal"
                                color="success"
                                defaultValue={selectedFeatures}
                                onChange={setSelectedFeatures}
                            >
                                <Checkbox value="article-newsletter">Article-to-Newsletter</Checkbox>
                                <Checkbox value="blog-podcast">Blog-to-Podcast</Checkbox>
                            </CheckboxGroup>
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={handlePublish} className='bg-slate-600 w-72 mt-2 rounded-md text-white p-2 mr-6'>Publish</button>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <span className="text-xs font-thin text-gray-600">
                        Powered by{" "}
                        <Link href="http://forgedmart.com/">ForgedMart</Link>
                    </span>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Compose;
