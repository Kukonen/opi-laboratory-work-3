import React from 'react'

import './HomeTemplateWithTitle.css'

interface HomeTemplateWithTitleProps {
    headline: string;
    children: React.ReactNode;
}

export default ({headline, children}: HomeTemplateWithTitleProps) => {
  return (
    <div className="home-with-title">
        <div className='block home-with-title__section'>
            <h3 
                className='home-with-title__headline'
            >
                {headline}
            </h3>

            <div
                className='home-with-title__section__content'
            >
                {children}
            </div>
        </div>
    </div>
  )
}
