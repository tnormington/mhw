import React, { Component } from "react"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./Carousel.sass"
import { Carousel } from "react-responsive-carousel"

export default class ArmorImageCarousel extends Component {
  render() {
    const { item, imgAlt } = this.props

    return (
      <Carousel
        showArrows={false}
        // thumbWidth={50} this doesnt work
        showIndicators={false}
        showStatus={false}
        width="100%">
        <div>
          <img src={item.assets.imageMale} alt={imgAlt + " male"} />
          <label className="img-legend">Male</label>
        </div>
        <div>
          <img src={item.assets.imageFemale} alt={imgAlt + " female"} />
          <label className="img-legend">Female</label>
        </div>
      </Carousel>
    )
  }
}
