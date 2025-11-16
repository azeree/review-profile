export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  profilePicture: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  date: string;
}

export interface FoodReview extends Review {
  foodName: string;
}

export type RootDrawerParamList = {
  Profile: undefined;
  About: undefined;
  FAQ: undefined;
  Settings: undefined;
};