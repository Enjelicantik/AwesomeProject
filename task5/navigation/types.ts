export type RootStackParamList = {
  StartScreen: undefined;
  HomeScreen: undefined;
  DetailPage: {
    image: any;
    location: string;
    name: string;
    price: string;
    rating: string;
    description?: string;
    temperature?: string;
    flagImage?: any;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
