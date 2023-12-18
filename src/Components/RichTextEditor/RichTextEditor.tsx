import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const RichTextEditor = () => {

    const editor = useRef(null);
      const [content, setContent] = useState('');
      
    return (<JoditEditor
        ref={editor}
        value={content}
        // tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => setContent(newContent)}
    />)
}

export default RichTextEditor
