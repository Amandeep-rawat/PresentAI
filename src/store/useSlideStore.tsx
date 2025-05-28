import { ContentItem, Slide, Theme } from '@/lib/types';
import { Project } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from "uuid"

interface SlideState {
  slides: Slide[];
  setSlides: (slides: Slide[]) => void;
  project: Project | null;
  setProject: (id: Project) => void
  currentTheme: Theme
  setCurrentTheme: (theme: Theme) => void
  getOrderedSlides: () => Slide[]
  reorderedSlides: (fromIndex: number, toIndex: number) => void
  currentSlide: number
  removeSlide: (id: string) => void
  addSlideIndex: (slide: Slide, index: number) => void;
  addComponentInSlide: (slideId: string, item: ContentItem, parentId: string, index: number) => void
  setCurrentSlide: (index: number) => void
  updateContentItem: (slideId: string, contentId: string, newContent: string[] | string[][] | string) => void
}
const defaultTheme: Theme = { name: 'Default', fontFamily: 'Inter', fontColor: '#333333', backgroundColor: '#f0f0f0', slideBackgroundColor: '#ffffff', accentColor: '#3b82f6', type: 'light' }
export const useSlideStore = create(
  persist<SlideState>(
    (set, get) => ({
      slides: [],
      currentTheme: defaultTheme,
      currentSlide: 0,
      project: null
      ,
      setCurrentTheme: (theme: Theme) => {
        set({ currentTheme: theme });
      },
      addComponentInSlide:(slideId:string,item:ContentItem,parentId:string,index:number)=>{set((state)=>{
        const updatedSlides=state.slides.map((slide)=>{
          if(slide.id===slideId){
            const updateContentRecursively=(content:ContentItem):ContentItem=>{
              if(content.id===parentId && Array.isArray(content.content)){
                const updatedContent=[...content.content]
                updatedContent.splice(index,0,item)
                return {
                  ...content,
                  content:updatedContent as unknown as string[]
                }
              }
              return content
            }
            return {
              ...slide,
              content:updateContentRecursively(slide.content)
            }
          }
          return slide

        })
        return {slides:updatedSlides}
      })},
      setCurrentSlide: (index: number) => set({ currentSlide: index })
      ,
      updateContentItem: (slideId, contentId, newContent) => {
        set((state) => {
          const updateContentRecursively = (item: ContentItem): ContentItem => {
            if (item.id === contentId) {
              return { ...item, content: newContent };
            }

            if (
              Array.isArray(item.content) &&
              item.content.every((i) => typeof i !== "string")
            ) {
              return {
                ...item,
                content: item.content.map((subItem) => {
                  if (typeof subItem !== "string") {
                    return updateContentRecursively(subItem as ContentItem);
                  }
                  return subItem;
                }) as ContentItem[],
              };
            }

            return item;
          };

          return {
            slides: state.slides.map((slide) =>
              slide.id === slideId
                ? { ...slide, content: updateContentRecursively(slide.content) }
                : slide
            ),
          };
        });
      },

      getOrderedSlides: () => {
        const state = get();
        return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder);
      },

      reorderedSlides: (fromIndex: number, toIndex: number) => {
        set((state) => {
          const newSlides = [...state.slides];
          const [removed] = newSlides.splice(fromIndex, 1);
          newSlides.splice(toIndex, 0, removed);
          return {
            slides: newSlides.map((slide, index) => ({
              ...slide,
              slideOrder: index,
            })),
          };
        });
      },


      setProject: (project: Project) => set({ project }),
      setSlides: (slides: Slide[]) => set({ slides }),
      removeSlide: (id: string) => set(state => ({ slides: state.slides.filter(slide => slide.id !== id) })),
      addSlideIndex: (slide: Slide, index: number) => {
        set((state) => {
          const newSlides = [...state.slides]
          newSlides.splice(index, 0, { ...slide, id: uuidv4() })
          newSlides.forEach((slide, i) => slide.slideOrder = i)
          return { slides: newSlides, currentSlide: index }
        })
      }
    }),

    {
      name: 'slides-storage',
    }
  )
);
