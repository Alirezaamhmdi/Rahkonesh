import { createContext} from "react";
import type { SetStateAction , Dispatch} from 'react'
export interface Point {
    top : number , 
    left : number , 
    state : string , 
    card : string , 
    offset_top : number , 
    offset_left : number ,
    indexGrabbed : number|null  , 
} 
interface CardGrabbingState { 
    card : number , 
    state : string  ,
}
export const CursorContext = createContext<{
  point: Point;
  setPoint: Dispatch<SetStateAction<Point>>;
}>({
  point: { top: 0, left: 0, state: "" , card : "" , offset_left : 0 , offset_top : 0 , indexGrabbed : null},
  setPoint: () => {}
});
export const CardGrabbed = createContext<{
  card: CardGrabbingState;
  setCard: Dispatch<SetStateAction<CardGrabbingState>>;
}>({
  card: {
    card : 0 , 
    state : '' , 
  },
  setCard: () => {} ,
});
