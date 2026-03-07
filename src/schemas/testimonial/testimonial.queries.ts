import { groq } from 'next-sanity';

export const testimonialFields = groq` _type == "testimonial" => {
  ...
}`;
