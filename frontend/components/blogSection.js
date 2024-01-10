import { useState } from 'react'
import BlogComponent from './blogComponent'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AIBlog() {
    return (
        <div className="bg-white">
            {/* Header */}
            <main>
                <BlogComponent />
            </main>
        </div>
    )
}
