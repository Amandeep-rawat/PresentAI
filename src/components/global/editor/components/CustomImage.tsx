// import Image from 'next/image';
// import React from 'react'
// import UploadImage from './UploadImage';
// import { useSlideStore } from '@/store/useSlideStore';

// type Props = {
//     src:string;
//     alt:string
//     className?:string
//     isPreview?:boolean
//     contentId:string
//     onContentChange:(contentId:string,newContent:string | string[] | string[][])=>void
//     isEditable?:boolean
// }

// const CustomImage = ({src,alt,className,isPreview,contentId,onContentChange,isEditable}: Props) => {
//   const {currentTheme}=useSlideStore()
// // wip add open ai image
//   return (
//     <div className={`relative group overflow-hidden w-full ${!isPreview ? '!h-[300px]' : 'h-full'}  rounded-lg`}>
//         <Image
//         style={{color:currentTheme.accentColor}}
//     src={src} // Assuming the image type is jpeg, replace it with the appropriate type (e.g., png, jpg, etc.)
//     alt={alt}
//     width={isPreview ? 48 : 800}
//     height={isPreview ? 48 : 800}
//     className={`w-full !h-full  rounded-lg object-cover ${className}`}
// />


//         {
//             !isPreview && isEditable && <div className={'absolute top-0 left-0 hidden group-hover:block'}>
//               <UploadImage contentId={contentId} onContentChange={onContentChange}/>
//             </div>
//         }
//     </div>
//   )
// }

// export default CustomImage

"use client"


import Image from 'next/image';
import React, { useEffect } from 'react';
import UploadImage from './UploadImage';
import { useSlideStore } from '@/store/useSlideStore';

type Props = {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  contentId: string;
  onContentChange: (contentId: string, newContent: string | string[] | string[][]) => void;
  isEditable?: boolean;
};

const CustomImage = ({
  src,
  alt,
  className,
  isPreview,
  contentId,
  onContentChange,
  isEditable
}: Props) => {
  const { currentTheme } = useSlideStore();

  // 🔽 Split the custom formatted image string
 const [imageUrl, photographer = 'Unknown', photographerProfile = '#', unsplashLink = '#', downloadLocation = '#'] = src.split('||');

 console.log("all date",imageUrl,photographer,photographerProfile,unsplashLink,downloadLocation)

  useEffect(() => {
    console.log("use effeect running")
    // Trigger Unsplash download event only when image is used (and not in preview)
    if (!isPreview && downloadLocation!== '#') {
      fetch(downloadLocation, {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
        },
      })
      .then(res => {
        if (res.ok) {
        console.log('✅ Unsplash download endpoint triggered successfully');
      } else {
        console.warn('⚠️ Failed to trigger Unsplash download endpoint:', res.status, res.statusText);
      }
      })
      .catch(err => {
        console.error('Error triggering Unsplash download:', err);
      });
    }
  }, [downloadLocation, isPreview]);
  return (
    <div className={`relative group overflow-hidden w-full ${!isPreview ? '!h-[300px]' : 'h-full'} rounded-lg`}>
      <Image
        style={{ color: currentTheme.accentColor }}
        src={imageUrl}
        alt={alt}
        width={isPreview ? 48 : 800}
        height={isPreview ? 48 : 800}
        className={`w-full !h-full rounded-lg object-cover ${className}`}
      />

      {/* Upload Button when editable */}
      {!isPreview && isEditable && (
        <div className="absolute top-0 left-0 hidden group-hover:block">
          <UploadImage contentId={contentId} onContentChange={onContentChange} />
        </div>
      )}

    
         {/* 🔽 Attribution overlay inside image */}
  {!isPreview && (
    <div className="absolute bottom-0 left-0 w-full bg-black/50 text-gray-300 text-xs px-2 py-1 z-10">
      Photo by{' '}
      <a href={photographerProfile} target="_blank" rel="noopener noreferrer" className="underline">
        {photographer}
      </a>{' '}
      on{' '}
      <a href={unsplashLink} target="_blank" rel="noopener noreferrer" className="underline">
        Unsplash
      </a>
    </div>
  )}
    
    </div>
  );
};

export default CustomImage;
