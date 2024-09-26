import { RouteObject } from 'react-router-dom';

export declare type MenuRouteObject ={
  icon?: React.ReactNode;
  label?: string;
  children?: MenuRouteObject[] | null;
} & RouteObject;
