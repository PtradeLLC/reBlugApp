import React, { useEffect, useState } from 'react';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import { RadioGroup, Radio, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import DropzoneComponent from '../Dropzone';


const CommChat = ({ showModal, setShowModal }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [featureImage, setFeatureImage] = useState('');
    const [content, setContent] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [crossPromote, setCrossPromote] = useState('yes');
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Select a Niche"]));
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
        const fetchChat = async () => {
            try {
                const response = await fetch('/api/chatContent');

                if (response.ok) {
                    // Parse the response data
                    const jsonData = await response.json();

                    console.log(jsonData);
                    // setUserInfo(jsonData);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchChat();
    }, []);

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    const handleMessage = async (e) => {
        e.preventDefault();
        try {
            const selectedCategory = selectedKeys.has("Select your Niche") ? null : Array.from(selectedKeys)[0];
            const data = {
                content,
                selectedValue,
                selectedCategory,
            };

            const featureImageFile = featureImage[0];
            if (featureImageFile) {
                data.featureImage = featureImageFile;
            };

            console.log(data);

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
                console.log(data);
            } else {
                console.error('Failed to publish article');
            }
            setFeatureImage('');
            setContent('');
            setSelectedKeys(new Set(["Select a Niche"]));
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
                    <div>
                        <div className='my-3 w-72 bg-white'>
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        variant="bordered"
                                        className="border rounded-sm border-gray-600 text-black font-thin h-7 mb-1"
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
                                        <DropdownItem className='bg-white' key={item.name}>{item.name}</DropdownItem>

                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                    <div>
                        <ReactQuill
                            className='h-40 px-4 mt-5'
                            theme="snow"
                            value={content}
                            toolbar={true}
                            formats={formats}
                            modules={modules}
                            onChange={setContent}
                            placeholder='Send a message to the community!'
                        />
                    </div>

                </div>
                <div className='flex justify-end'>
                    <button onClick={handleMessage} className='bg-white border w-auto border-slate-600 mt-2 rounded-md text-black font-medium p-2 mr-6 mb-2'>Send message</button>
                </div>
            </div>
        </>
    );
};

export default CommChat;
