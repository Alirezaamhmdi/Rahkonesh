import {createContext} from 'react'
const observerContext = createContext<IntersectionObserver|null>(null)
export default observerContext