import React from 'react'
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

export default function Carousel() {
  return (
    <CarouselProvider
      className="aspect-video bg-slate-300"
      naturalSlideWidth={100}
      naturalSlideHeight={125}
      totalSlides={3}
    >
      <Slider>
        <Slide className="max-h-48" index={0}>
          {' '}
          <img className="max-h-48" src="/dylan.png" />
        </Slide>
        <Slide className="max-h-48" index={1}>
          {' '}
          <img className="max-h-48"  src="/corey.png" />
        </Slide>
        <Slide className="max-h-48" index={2}>
          {' '}
          <img  className="max-h-48" src="/jake.png" />
        </Slide>
      </Slider>
      <ButtonBack>Back</ButtonBack>
      <ButtonNext>Next</ButtonNext>
    </CarouselProvider>
  )
}
