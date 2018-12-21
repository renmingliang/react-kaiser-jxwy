import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// require styles
import 'swiper/dist/css/swiper.css'
import Swiper from 'swiper'

const defaultSwiper = [
  {
    id: '1',
    img: require('../../../assets/images/05/ty.png'),
    img_url: require('../../../assets/images/05/ty-big.png')
  },
  {
    id: '2',
    img: require('../../../assets/images/05/bj.png'),
    img_url: require('../../../assets/images/05/bj-big.png')
  },
  {
    id: '3',
    img: require('../../../assets/images/05/jgl.png'),
    img_url: require('../../../assets/images/05/jgl-big.png')
  }
]

class ListSwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swiperSlides: defaultSwiper
    }
  }

  componentDidMount() {
    new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      freeMode: true
    })
  }

  render() {
    const { swiperSlides } = this.state
    return (
      <div>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {swiperSlides.map(val => {
              return (
                <div key={val.id} className="swiper-slide">
                  <Link to={{ pathname: `/share/${val.id}`, search: val.img_url }}>
                    <img src={val.img} alt={val.id} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default ListSwiper
