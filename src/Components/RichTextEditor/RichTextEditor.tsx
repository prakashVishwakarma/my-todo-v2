import React, { useRef, useState } from 'react'
import dynamic from 'next/dynamic';
import storeDataInSessionStorage from '@/Utils/storeDataInSessionStorage';
import { myRichTextEditorData } from '@/Constants/myLocalData';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

interface RichTextEditorProps {
  data: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ data }) => {

  const editor = useRef(null);
  const [content, setContent] = useState<string>(data); // data not working ( on page reload editor data should not lost )

  function handleOnchangeRichTextEditor(newContent: React.SetStateAction<string>): void {
    if (!storeDataInSessionStorage(myRichTextEditorData, newContent)) return
    setContent(newContent)
  }

  return (<>
    <JoditEditor
      ref={editor}
      value={content}
      // tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => handleOnchangeRichTextEditor(newContent)}
    />

    <div dangerouslySetInnerHTML={{ __html: content }} />
  </>)
}

export default RichTextEditor
