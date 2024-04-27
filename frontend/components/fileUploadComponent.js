import { useState, useRef } from 'react';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function AvatarUploadPage() {
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <form
                onSubmit={async (event) => {
                    event.preventDefault();

                    try {
                        const file = inputFileRef.current.files[0];

                        const response = await fetch(
                            `/api/avatar/upload?filename=${file.name}`,
                            {
                                method: 'POST',
                                body: file,
                            },
                        );

                        if (!response.ok) {
                            throw new Error('Failed to upload image');
                        }

                        const newBlob = await response.json();
                        setBlob(newBlob);
                    } catch (error) {
                        console.error('Error uploading image:', error);
                    }
                }}
            >
                <input
                    className='mb-2'
                    name="file"
                    ref={inputFileRef}
                    type="file"
                    onChange={handleFileChange}
                    required
                />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Selected Image"
                        style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '10px' }}
                    />
                )}
                <button
                    className="mt-2 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded text-xs"
                    type="submit"
                >
                    Set Image
                </button>
            </form>
            {blob && (
                <div>
                    Blob url: <a href={blob.url}>{blob.url}</a>
                </div>
            )}
        </>
    );
}