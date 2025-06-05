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
  const [
    imageUrl,
    photographer = 'Unknown',
    photographerProfile = '#',
    , // skip unsplashLink
    downloadLocation = '#'
  ] = src.split('||');

  const appName = 'presentai'; // Replace with your real app name if different

  const photographerLink = `${photographerProfile}?utm_source=${appName}&utm_medium=referral`;
  const unsplashLink = `https://unsplash.com/?utm_source=${appName}&utm_medium=referral`;

  useEffect(() => {
    if (!isPreview && downloadLocation !== '#') {
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

      {!isPreview && isEditable && (
        <div className="absolute top-0 left-0 hidden group-hover:block">
          <UploadImage contentId={contentId} onContentChange={onContentChange} />
        </div>
      )}

      {!isPreview && (
        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-gray-300 text-xs px-2 py-1 z-10">
          Photo by{' '}
          <a href={photographerLink} target="_blank" rel="noopener noreferrer" className="underline">
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
