import { RefObject, useEffect, useMemo, useRef, useState } from "react";

// Это хук для отслеживания, присутствует ли элемент из рефа во вьюпорте

export default function useOnScreen (ref: RefObject<HTMLElement>) {
  const [onScreen, setOnScreen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
  }, [])
  
  useEffect(() => {
    observer.current!.observe(ref.current!); // постулируем существование елемента, без него хук вызывать нельзя
    return () => observer.current!.disconnect();
  }, [ref])
  
  return onScreen;
}