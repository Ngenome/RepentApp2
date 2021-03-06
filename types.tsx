/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

interface DetailScreenParams {
  event: string;
  id: string;
}
export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: object;
  loading: undefined;
  AttendancesView: undefined;
  AttendanceDetailScreen: DetailScreenParams;
  GroupAttendanceDetailScreen: DetailScreenParams;
  SaintViewScreen: any;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  RegisterUser: undefined;
  Search: undefined;
  AddEvent: undefined;
  AddAttendance: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
export interface AttendanceDetailRouteParams {
  route: {
    params: {
      id: string;
      event: string;
    };
  };
}
