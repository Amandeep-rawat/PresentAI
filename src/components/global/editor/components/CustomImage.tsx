import Image from 'next/image';
import React from 'react'
import UploadImage from './UploadImage';
import { useSlideStore } from '@/store/useSlideStore';

type Props = {
    src:string;
    alt:string
    className?:string
    isPreview?:boolean
    contentId:string
    onContentChange:(contentId:string,newContent:string | string[] | string[][])=>void
    isEditable?:boolean
}

const CustomImage = ({src,alt,className,isPreview,contentId,onContentChange,isEditable}: Props) => {
  const {currentTheme}=useSlideStore()
// wip add open ai image
  return (
    <div className={`relative group w-full h-full rounded-lg`}>
        <Image
        style={{color:currentTheme.accentColor}}
    src={src} // Assuming the image type is jpeg, replace it with the appropriate type (e.g., png, jpg, etc.)
    alt={alt}
    width={isPreview ? 48 : 800}
    height={isPreview ? 48 : 800}
    className={`w-full h-full rounded-lg object-cover ${className}`}
/>


        {
            !isPreview && isEditable && <div className={'absolute top-0 left-0 hidden group-hover:block'}>
              <UploadImage contentId={contentId} onContentChange={onContentChange}/>
            </div>
        }
    </div>
  )
}

export default CustomImage