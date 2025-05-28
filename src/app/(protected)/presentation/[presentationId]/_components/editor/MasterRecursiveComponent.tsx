"use client"
import { ContentItem } from '@/lib/types'
import React, { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Heading1, Heading2, Heading3, Heading4, Title } from '@/components/global/editor/components/Headings';
import { cn } from '@/lib/utils';
import DropZone from './DropZone';
import Paragraphs from '@/components/global/editor/components/Paragraphs';
import TableComponent from '@/components/global/editor/components/TableComponent';
import ColumnComponent from '@/components/global/editor/components/ColumnComponent';
import CustomImage from '@/components/global/editor/components/CustomImage';
import BlockQuote from '@/components/global/editor/components/BlockQuote';
import NumberedList, { BulletList, TodoList } from '@/components/global/editor/components/ListComponent';
import CallOutBox from '@/components/global/editor/components/CallOutBox';
import CodeBlock from '@/components/global/editor/components/CodeBlock';
import TableOfContents from '@/components/global/editor/components/TableOfContents';
import { Divide } from 'lucide-react';
import Divider from '@/components/global/editor/components/Divider';
type MasterRecursiveComponentProps = {
    content: ContentItem;
    onContentChange: (
        contentId: string,
        newContent: string | string[] | string[][]
    ) => void;
    isPreview?: boolean;
    isEditable?: boolean
    slideId: string;
    index?: number;
}

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo((
    {
        content, isEditable, onContentChange, slideId, index, isPreview
    }
) => {




    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value)
    }, [content.id, onContentChange])

//  console.log("here is ",content)
    const commonProps = {
        placeholder: content.placeholder,
        value: content.content as string,
        onChange: handleChange,
        isPreview: isPreview,
    }
    const animationProps = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },

        transition: { duration: 0.5 }
    }
    switch (content.type) {
        case 'heading1':
            return <motion.div className='w-full h-full' {...animationProps}>
                <Heading1 {...commonProps} />
            </motion.div>
        case 'heading2':
            return <motion.div className='w-full h-full' {...animationProps}>
                <Heading2 {...commonProps} />
            </motion.div>
        case 'heading3':
            return <motion.div className='w-full h-full' {...animationProps}>
                <Heading3 {...commonProps} />
            </motion.div>
        case 'heading4':
            return <motion.div className='w-full h-full' {...animationProps}>
                <Heading4 {...commonProps} />
            </motion.div>
        case 'title':
            return <motion.div className='w-full h-full' {...animationProps}>
                <Title {...commonProps} />
            </motion.div>
        case 'paragraph':
            return <motion.div className='w-full h-full' {...animationProps}>
                <Paragraphs {...commonProps} />
            </motion.div>
        case 'table':
            return <motion.div className='w-full h-full' {...animationProps}>
                <TableComponent
                    content={content.content as string[][]}
                    onChange={(newContent) => onContentChange(content.id, newContent !== null ? newContent : '')}
                    initialColumnSize={content.initialColumns}
                    initialRowSize={content.initialRows}
                    isEditable={isEditable}
                    isPreview={isPreview}

                />
            </motion.div>

        case 'blockquote':
            return <motion.div {...animationProps} className={cn(`w-full h-full flex flex-col`, content.className)}>
                <BlockQuote>
                    <Paragraphs {...commonProps} />
                </BlockQuote>
            </motion.div>

        case 'numberedList':
            return <motion.div {...animationProps} className='w-full h-full'>
                <NumberedList items={content.content as string[]} onChange={(newItems) => onContentChange(content.id, newItems)} className={content.className} />
            </motion.div>

        case 'bulletList':
            return <motion.div {...animationProps} className='w-full h-full'>
                <BulletList items={content.content as string[]} onChange={(newItems) => onContentChange(content.id, newItems)} className={content.className} />
            </motion.div>
        case 'todoList' :
            return <motion.div {...animationProps} className='w-full h-full'>
                <TodoList items={content.content as string[]} onChange={(newItems) => onContentChange(content.id, newItems)} className={content.className} />
            </motion.div>

        case 'resizable-column':
            if (Array.isArray(content.content)) {
                return <motion.div {...animationProps} className='w-full h-full'>
                    <ColumnComponent content={content.content as ContentItem[]} onContentChange={onContentChange} slideId={slideId} className={content.className} isEditable={isEditable} isPreview={isPreview} />
                </motion.div>
            }
            return null;

        case 'calloutBox':
            <motion.div {...animationProps} className='w-full h-full'>
                    <CallOutBox type={content.callOutType || 'info'} className={content.className} >
                        <Paragraphs {...commonProps} />
                    </CallOutBox>
                </motion.div>

        case 'codeBlock':
            return <motion.div {...animationProps} className='w-full h-full'>
                <CodeBlock code={content.code} language={content.language} onChange={()=>{}} className={content.className} />
            </motion.div>

        case 'tableOfContents':
            return <motion.div {...animationProps} className='w-full h-full'>

                <TableOfContents
                  items={content.content as string[]}
                  onItemClick={(id)=>{
                    console.log(`Navigate to section : ${id} `)
                  }}
                  className={content.className}
                />
            </motion.div>
        case 'divider':
            return <motion.div {...animationProps} className='w-full h-full'>
                <Divider className={content.className}/>
            </motion.div>
        case 'image':
            return <motion.div {...animationProps} className='w-full h-full'>
                <CustomImage src={content.content as string} alt={content.alt || 'Image'} className={content.className} isPreview={isPreview} contentId={content.id} onContentChange={onContentChange} isEditable={isEditable} />
            </motion.div>
        case 'column':
            if (Array.isArray(content.content)) {
                return (
                    <motion.div className={cn('w-full h-full flex flex-col', content.className)} {...animationProps}>
                        {
                            content.content.length > 0 ? (
                                content.content as ContentItem[]
                            ).map((subItem: ContentItem, subIndex: number) => (
                                <React.Fragment key={subItem.id || `item-${subIndex}`}>

                                    {
                                        !isPreview && !subItem.restrictToDrop && subIndex === 0 && isEditable && (
                                            <DropZone index={0} parentId={content.id} slideId={slideId} />
                                        )
                                    }
                                    <MasterRecursiveComponent content={subItem} onContentChange={onContentChange} slideId={slideId} index={subIndex} isPreview={isPreview} isEditable={isEditable} />
                                    {
                                        !isPreview && !subItem.restrictToDrop && isEditable && <DropZone index={subIndex + 1} parentId={content.id} slideId={slideId} />
                                    }
                                </React.Fragment>
                            )) : isEditable ? (
                                <DropZone index={0} parentId={content.id} slideId={slideId} />
                            ) : null
                        }
                    </motion.div>
                )
            }
            return null

        default:
            return null
    }
}

)

export default ContentRenderer


ContentRenderer.displayName = 'ContentRenderer'
// import React from 'react';

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> = React.memo(({
    content, onContentChange, slideId, index, isEditable = true, isPreview = false
}) => {
    // console.log('content is ',content)
    if (isPreview) {
        return <ContentRenderer content={content} onContentChange={onContentChange} slideId={slideId} index={index} isPreview={isPreview} isEditable={isEditable} />;
    }
    return <React.Fragment>
        <ContentRenderer content={content} onContentChange={onContentChange} slideId={slideId} index={index} isPreview={isPreview} isEditable={isEditable} />
    </React.Fragment>

})

MasterRecursiveComponent.displayName = 'MasterRecursiveComponent'