import { FoodReview, Review, UserData } from '../types';

export const initialUserData: UserData = {
  id: 1,
  name: 'Mikhail Ivan Dante R. Galban',
  username: '@liahkimnablag',
  email: 'mikhail.galban2004@gmail.com',
  dateOfBirth: '1995-06-15',
  profilePicture: 'D:\\School\\REACT\\Native\\FoodReviewApp\\assets\\images\\images.jpg'
};

export const initialAppReviews: Review[] = [
  { id: 1, rating: 5, comment: 'Amazing app! Love the food recommendations.', date: '2024-11-10' },
  { id: 2, rating: 4, comment: 'Great interface, easy to use.', date: '2024-10-28' }
];

export const initialFoodReviews: FoodReview[] = [
  { id: 1, foodName: 'Lomi', rating: 5, comment: 'Delicious and comforting noodle soup.', date: '2024-11-12' },
  { id: 2, foodName: 'Fried Chicken', rating: 4, comment: 'Juicy and well-seasoned, a must-try!', date: '2024-11-05' },
  { id: 3, foodName: 'Menudo', rating: 3, comment: 'Hearty and flavorful, but a bit too salty for my taste.', date: '2024-10-30' }
];