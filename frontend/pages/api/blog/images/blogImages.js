import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedField, setSelectedField] = useState('profileImage');

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

                        const formData = new FormData();
                        formData.append('file', file);

                        const response = await fetch(`/api/avatar/upload?filename=${file.name}&field=${selectedField}`,
                            {
                                method: 'POST',
                                body: formData,
                            },
                        );

                        if (!response.ok) {
                            throw new Error('Failed to upload image', response.Error)
                        }

                        const newBlob = await response.json();
                        setBlob(newBlob);

                    } catch (error) {
                        console.error('Error uploading image:', error);
                    }
                }}
            >
                <select
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                >
                    <option value="profileImage">featureImage</option>
                    <option value="brandLogo">contentImage</option>
                </select>
                <br />
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
                    className="mt-2 bg-white border border-slate-800 hover:bg-slate-700 hover:text-white text-black font-medium py-2 px-4 rounded text-xs"
                    type="submit"
                >
                    Click to Set Image
                </button>
            </form>
        </>
    );
}
