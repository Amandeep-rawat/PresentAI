"use client"

import { useSlideStore } from '@/store/useSlideStore'
import { redirect, useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAnimation } from 'framer-motion'
import { Theme } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import ThemeCard from './ThemeCard'
import ThemePicker from './ThemePicker'
import { themes } from '@/lib/constants'

const ThemePreview = () => {
    const router = useRouter();
    const params = useParams()
    const { currentTheme, project, setCurrentTheme,} = useSlideStore()
    const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);
    const controls = useAnimation();
const applyTheme=(theme:Theme)=>{
    setSelectedTheme(theme);
    setCurrentTheme(theme);
}
    useEffect(() => {
        if (project?.slides) {
            redirect(`/presentation/${params.presentationId}`)
        }
    }, [project, params.presentationId])
    
    useEffect(() => {
        controls.start('visible');
    }, [controls, selectedTheme])
    

    const leftCardContent = <div className='space-y-4'>
        <div className="rounded-xl   p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
            <h3 style={{ color: selectedTheme.accentColor }} className='text-xl font-semibold mb-4'>
                Quick Start Guide.
            </h3>
            <ol style={{ color: selectedTheme.accentColor }} className='list-decimal list-inside space-y-2'>
                <li>Choose a Theme</li>
                <li>Customize colors and fonts</li>
                <li>Add your content</li>
                <li>Preview and publish</li>
            </ol>
        </div>
    <Button className='w-full
    h-12 text-lg font-medium' style={{backgroundColor:selectedTheme.accentColor,color:selectedTheme.accentColor}}>
        Get started
    </Button>
    </div>

    const mainCardContent=(
        <div className="space-y-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className='rounded-xl p-6' style={{
                    backgroundColor:selectedTheme.accentColor+'10'
                }}>
                    <p style={{color:selectedTheme.accentColor}}>
                        This is a smart layout:it act as text box.
                    </p>

                </div>
                <div className='rounded-xl p-6' style={{
                    backgroundColor:selectedTheme.accentColor+'10'
                }}>
                    <p style={{color:selectedTheme.accentColor}}>
                        You can get these by typing /smart
                    </p>

                </div>


            </div>
            <div className="flex flex-wrap gap-4">
                <Button style={{
                    backgroundColor:selectedTheme.accentColor,color:selectedTheme.backgroundColor
                }} className='h-12 px-6 text-lg font-medium'>
                    Primary Button
                </Button>
                <Button variant={"outline"} style={{
                    borderColor:selectedTheme.accentColor,color:selectedTheme.accentColor
                }} className='h-12 px-6 text-lg font-medium'>
                    Secondary Button
                </Button>
            </div>
        </div>
    )
    const rightCardContent=(
        <div className="space-y-4">
            <div style={{
                backgroundColor:selectedTheme.accentColor+"10"
            }} className="rounded-xl p-6">
                    <h3 style={{

                        color:selectedTheme.accentColor
                    }} className="text-xl font-semibold mb-4">
                            Theme Features
                        </h3>
                        <ul style={{
                            color:selectedTheme.accentColor
                        }} className="list-desc list-inside space-y-2">
                            <li>Responsive design</li>
                            <li>Dark and light modes</li>
                            <li>Custom color schemes</li>
                            <li>Accessiblity optimized</li>
                        </ul>
            </div>
            <Button variant={"outline"} style={{
                borderColor:selectedTheme.accentColor, color:selectedTheme.accentColor
            }} className='w-full h-12 text-lg font-medium'>Explore features</Button>

        </div>
    )
    return (
        <div className='h-screen w-full flex' style={{
            backgroundColor:selectedTheme.backgroundColor,color:selectedTheme.accentColor,fontFamily:selectedTheme.fontFamily
        }}>

            <div className="flex-grow max-sm:hidden  overflow-hidden">
                <div className="p-12 flex flex-col items-center min-h-screen">
                    <Button variant={"outline"} className='mb-12 self-start' size={"lg"} style={{
                        backgroundColor:selectedTheme.accentColor +'10',
                        color:selectedTheme.accentColor,
                        border:selectedTheme.accentColor+'20'
                    }} onClick={()=>router.push('/create-page')}>
                        
                            <ArrowLeft className='mr-2 h-5 w-5'/>
                        Back</Button>

                        <div className="w-full flex justify-center items-center relative flex-grow">
                            <ThemeCard title='Quick Start Guide' description='A quick start guide to get you started with our presentation creation tool.' content={leftCardContent} theme={selectedTheme} controls={controls} variant={'left'}/>
                            <ThemeCard title='Main Preview' description='This is the main theme preview.' content={mainCardContent} theme={selectedTheme} controls={controls} variant={'main'}/>
                            <ThemeCard title='Theme Features' description='Discover what out themes can do' content={rightCardContent} theme={selectedTheme} controls={controls} variant={'right'}/>
                        </div>
                </div>
            </div>
            <ThemePicker selectedTheme={selectedTheme} themes={themes} onThemeSelect={applyTheme}/>
        </div>
    )
}

export default ThemePreview