import React, { Component } from 'react'

function imagesLoaded(parentNode) {
  const imgElements = [...parentNode.querySelectorAll('img')]
  for (let i = 0; i < imgElements.length; i += 1) {
    const img = imgElements[i]
    if (!img.complete) {
      return false
    }
  }
  return true
}

class Gallery extends Component {

  handleImageChange = () => {
    const isFinshed = !imagesLoaded(this.galleryElement)
    this.props.onHandleImgLoaded(isFinshed)
  }

  renderImage(imageUrl) {
    return (
      <div
        key={imageUrl}>
        <img
          src={imageUrl}
          onLoad={this.handleImageChange}
          onError={this.handleImageChange}
          alt={imageUrl}
        />
      </div>
    )
  }

  render() {
    return (
      <div
        className="gallery"
        style={{display: 'none'}}
        ref={element => {
          this.galleryElement = element
        }}
      >
        <div className="images">
          {this.props.imgs.map(imageUrl => this.renderImage(imageUrl))}
        </div>
      </div>
    )
  }
}

export default Gallery
