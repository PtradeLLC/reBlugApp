import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, CheckboxGroup, Checkbox, RadioGroup, Radio, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import DropzoneComponent from '../Dropzone';


const Compose = ({ showModal, setShowModal }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [featureImage, setFeatureImage] = useState('');
    const [content, setContent] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [crossPromote, setCrossPromote] = useState('yes');
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Select a Category"]));
    const [selectedFeatures, setSelectedFeatures] = useState(["article-newsletter", "blog-podcast"]);
    const { data: session, status } = useSession();


    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'], { size: ['huge'] }
            ['clean']
        ],
    },

        formats = [
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
        ];

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
            const selectedCategory = selectedKeys.has("Select a Category") ? null : Array.from(selectedKeys)[0];
            const data = {
                title,
                content,
                crossPromote,
                selectedValue,
                selectedFeatures,
                selectedCategory,
                userInfo,
            };

            const featureImageFile = featureImage[0];
            if (featureImageFile) {
                data.featureImage = featureImageFile;
            };

            // Send the data to the API
            const response = await fetch('/api/blog/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // // Check if the request was successful
            if (response.ok) {
                const data = await response.json();
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
        <>
            <div className='overflow-y-auto h-[360px] mt-3'>
                <div className='mb-4'>
                    <input
                        className='mb-2 bg-transparent border-none w-full'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        placeholder='Enter Title here'
                    />
                    <div className="col-span-full">
                        {/* <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Feature Image
                        </label> */}
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <DropzoneComponent />
                        </div>
                    </div>
                    <ReactQuill
                        className='h-40 px-4 mt-5'
                        theme="snow"
                        value={content}
                        toolbar={true}
                        formats={formats}
                        modules={modules}
                        onChange={setContent}
                        placeholder='Begin by typing here. You may select to highlight texts for format...'
                    />
                </div>
                <RadioGroup
                    id='radio-butt'
                    className='mt-20'
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
        </>
    );
};

export default Compose;
