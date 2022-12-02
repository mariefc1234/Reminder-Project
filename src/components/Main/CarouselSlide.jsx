/* eslint-disable react/prop-types */
import { Paper } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

const images = [
  { id: 1, alt: 'Water', ref: 'https://cdn.pixabay.com/photo/2014/12/24/05/02/drop-of-water-578897__480.jpg' },
  { id: 2, alt: 'Stretch', ref: 'https://cdn.mos.cms.futurecdn.net/mFVAjG4U9LELrtjGfEgcQE-1200-80.jpg' },
  { id: 3, alt: 'Clock', ref: 'https://www.kent.co.in/blog/wp-content/uploads/2017/04/10-Amazing-Reasons-you-Need-to-Drink-Sufficient-Water.jpg' },
  { id: 4, alt: 'Clock', ref: 'https://secondwindmovement.com/wp-content/uploads/2022/03/image1-2.png' },
  { id: 5, alt: 'Clock', ref: 'https://blogimage.vantagefit.io/vfitimages/2022/07/Five-Mental-benefits-of--stretching.png' },
  { id: 6, alt: 'Clock', ref: 'https://birminghamchristian.com/wp-content/uploads/2017/09/bigstock-166945772.jpg' },
  { id: 7, alt: 'Clock', ref: 'https://www.genhealthtips.com/wp-content/uploads/2019/05/yoga-poses-for-desk-or-offi.jpg' },
  { id: 8, alt: 'Clock', ref: 'https://www.adecco.com.au/media/adecco-au/client/Blog/2020%20images/2020%20yoga/Top-5-yoga-stretches.jpg' },
  { id: 9, alt: 'Clock', ref: 'https://c8.alamy.com/comp/2FK1EJG/office-syndrome-stretching-exercise-neck-back-shoulder-stretch-sitting-work-from-home-fitness-workout-for-freelancer-vector-illustration-2FK1EJG.jpg' },
  { id: 10, alt: 'Clock', ref: 'https://sprigghr.com/wp-content/uploads/2020/11/Taking-Breaks-at-Work-e1604350090480.png' },
  { id: 11, alt: 'Clock', ref: 'https://i.pinimg.com/736x/b3/c1/d6/b3c1d6e46e8fc4c404366e4d0039fa1c.jpg' },
  { id: 12, alt: 'Clock', ref: 'https://blog.noisli.com/wp-content/uploads/2016/02/Noisli-Tired-or-Burning-Eyes-You-may-have-Eyestrain-1.png' },
  { id: 13, alt: 'Clock', ref: 'https://static.vecteezy.com/system/resources/previews/006/407/764/non_2x/prevent-eye-strain-with-the-20-20-20-rule-to-take-a-break-every-20-minutes-and-20-second-vector.jpg' },
];

function Item({ item }) {
  return (
    <Paper
      elevation={0}
      style={{
      backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', width: '100%', height: '30vh',
      }}
    >
      <img src={item.ref} alt={item.alt} />
    </Paper>
  );
}

export default function CarouselSlide() {
  return (
    <Carousel>
      {images.map((image) => (
        <Item
          key={image.id}
          item={image}
        />
      ))}
    </Carousel>
  );
}
