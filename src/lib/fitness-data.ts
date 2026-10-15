import strength from '@/assets/strength.jpg';
import yoga from '@/assets/yoga.jpg';
import hero from '@/assets/gym-hero.jpg';
import dumbbells from '@/assets/dumbbells.jpg';
import mat from '@/assets/mat.jpg';
import bands from '@/assets/bands.jpg';
import shaker from '@/assets/shaker.jpg';
import shirt from '@/assets/shirt.jpg';
import gear from '@/assets/gear.jpg';
export const programs = [
  {name:'Weight Training',tag:'BUILD YOUR FOUNDATION',image:strength,description:'Build confidence and lasting strength with expert-guided resistance training.',detail:'A progressive full-body program focused on technique, compound lifts, and sustainable strength. Sessions can be adapted for every experience level.'},
  {name:'Yoga & Flexibility',tag:'FIND YOUR BALANCE',image:yoga,description:'Move mindfully, improve mobility, and make a little space for yourself.',detail:'Combine mindful movement, guided breathing, and restorative stretching. A welcoming practice for beginners and experienced members alike.'},
  {name:'Personal Training',tag:'YOUR GOALS. YOUR WAY.',image:hero,description:'One-on-one support and a plan that is built around you, not the other way around.',detail:'Work with a dedicated coach on movement assessments, personalized workouts, and regular progress check-ins, all at your own pace.'},
  {name:'Cardio Fitness',tag:'MOVE WITH ENERGY',image:hero,description:'Find your rhythm with energizing, endurance-focused sessions.',detail:'Build cardiovascular fitness through treadmill intervals, cycling, and low-impact circuits tailored to your current fitness level.'},
  {name:'Strength Building',tag:'STRONGER EVERY SESSION',image:strength,description:'Make measurable progress with structured strength sessions.',detail:'Refine your lifting technique and progressively develop strength with a structured training cycle and thoughtful recovery.'},
];
export const products = [
 {id:1,name:'Hex Dumbbell Pair',category:'Equipment',price:49,image:dumbbells,description:'A dependable grip for your everyday strength sessions.',rating:4.9,popularity:99},
 {id:2,name:'Everyday Yoga Mat',category:'Yoga & Recovery',price:35,image:mat,description:'Cushioned comfort. A little more balance in every flow.',rating:4.8,popularity:98},
 {id:3,name:'Resistance Band Set',category:'Equipment',price:22,image:bands,description:'Small in your bag. Big on training possibilities.',rating:4.7,popularity:92},
 {id:4,name:'Essential Protein Shaker',category:'Accessories',price:18,image:shaker,description:'Your post-workout ritual, made a little simpler.',rating:4.8,popularity:96},
 {id:5,name:'Performance Training Tee',category:'Apparel',price:29,image:shirt,description:'An easy-moving essential for wherever you train.',rating:4.9,popularity:91},
 {id:6,name:'Home Workout Essentials',category:'Accessories',price:89,image:gear,description:'The essentials to make your space a training space.',rating:4.9,popularity:95},
];
export type Product = typeof products[number];
export function meta(title:string,description:string) { return {meta:[{title:`${title} | FitZone Fitness Club`},{name:'description',content:description},{property:'og:title',content:`${title} | FitZone Fitness Club`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}; }
