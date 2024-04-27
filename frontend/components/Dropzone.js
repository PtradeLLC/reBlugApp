import React, { useState } from 'react';
import DropzoneComponent from 'react-dropzone';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useSession } from "next-auth/react";

function Dropzone() {
    const [rejected, setRejected] = useState([]);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();

    const maxSize = 20971520;

    const handleDrop = acceptedFiles => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader();

            reader.onabort = () => console.log('File reading was aborted');
            reader.onerror = () => console.log('File reading has failed');
            reader.onload = () => {
                const binaryStr = reader.result;
            };

            reader.readAsArrayBuffer(file);
        });
    };

    return (
        <DropzoneComponent
            minSize={0}
            maxSize={maxSize}
            onDrop={handleDrop}
        >
            {({ getRootProps, getInputProps, isDragActive, fileRejections, isDragReject }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        {!isDragActive && "Click here to drop a file to upload"}
                        {isDragActive && !isDragReject && "Drop to upload this file"}
                        {isDragReject && "File type is not accepted"}
                        {fileRejections.length > 0 && fileRejections[0].file.size > maxSize && (
                            <div className='text-danger-300 mt-2'> File is too large.</div>
                        )}
                    </div>
                </section>
            )}
        </DropzoneComponent>
    );
}

export default Dropzone;
