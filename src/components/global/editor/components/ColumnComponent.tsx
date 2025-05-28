import { MasterRecursiveComponent } from '@/app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ContentItem } from '@/lib/types'
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'

type Props = {
    content:ContentItem[];
    className?:string;
    isPreview?:boolean
    slideId:string;
    onContentChange:(contentId:string,newContent:string | string[] | string[][])=>void
    isEditable?:boolean
}


// const ColumnComponent = ({content,onContentChange,slideId,className,isEditable,isPreview}: Props) => {

//     const [columns,setColumns]=useState<ContentItem[]>([])
//     const createDefaultColumns=(count:number)=>{
//         return Array(count).fill(null).map(()=>(
//             {
//                 id:uuidv4(),
//                 type: 'paragraph' as const ,
//                  name:'Paragraph',
//                  content:'',
//                  placeholder:'Start typing...'
//             }
//         ))
//     }
//     useEffect(()=>{
//         if(content.length ===0){
//             setColumns(createDefaultColumns(2))
//         }
//         else{
//             setColumns(content)
//         }
//     },[content])
//   return (
//     <div className='relative w-full h-[500px]'>
//         <ResizablePanelGroup className={cn(`h-full w-full flex   `, !isEditable && '!border-0',className)} direction='vertical'>
//             {
//                 columns.map((item,index)=>(
//                     <React.Fragment key={item.id}>
//                             <ResizablePanel minSize={20} defaultSize={100/columns.length}>
//                             <div className={cn(`h-full  w-full`,item.className)}>
//                                 <MasterRecursiveComponent content={item} onContentChange={onContentChange} slideId={slideId} isEditable={isEditable} isPreview={isPreview}/>
//                             </div>
//                             </ResizablePanel>
//                             {
//                                 index < columns.length-1  && isEditable && (
//                                     <ResizableHandle withHandle={!isPreview}/>

                                    
//                                 )
//                             }
//                     </React.Fragment>
//                 ))
//             }
//         </ResizablePanelGroup>
//     </div>
//   )
// }

// export default ColumnComponent




const ColumnComponent = ({content,onContentChange,slideId,className,isEditable,isPreview}: Props) => {

  const [columns,setColumns]=useState<ContentItem[]>([])
  const createDefaultColumns=(count:number)=>{
      return Array(count).fill(null).map(()=>({
          id:uuidv4(),
          type: 'paragraph' as const,
          name:'Paragraph',
          content:'',
          placeholder:'Start typing...'
      }))
  }
  useEffect(()=>{
      if(content.length ===0){
          setColumns(createDefaultColumns(2))
      }
      else{
          setColumns(content)
      }
  },[content])

  // We can track window width if needed, but better to handle purely with CSS + conditional class

  return (
    <div className={cn(
      'relative w-full h-full',            // default h-full
      'max-[900px]:!h-[500px]',              // for screen <= 900px height 500px
    )}>
      <ResizablePanelGroup
        className={cn(
          'h-full w-full flex',
          !isEditable && '!border-0',
          className
        )}
        // For direction, we'll use Tailwind + state to toggle class conditionally:
        // but React-resizable-panels expects direction prop, so set dynamically here:
        direction={window.innerWidth <= 900 ? 'vertical' : 'horizontal'} 
      >
        {
          columns.map((item,index)=>(
            <React.Fragment key={item.id}>
              <ResizablePanel minSize={20} defaultSize={100/columns.length}>
                <div className={cn(`h-full w-full`, item.className)}>
                  <MasterRecursiveComponent
                    content={item}
                    onContentChange={onContentChange}
                    slideId={slideId}
                    isEditable={isEditable}
                    isPreview={isPreview}
                  />
                </div>
              </ResizablePanel>
              {
                index < columns.length-1 && isEditable && (
                  <ResizableHandle withHandle={!isPreview}/>
                )
              }
            </React.Fragment>
          ))
        }
      </ResizablePanelGroup>
    </div>
  )
}

export default ColumnComponent



