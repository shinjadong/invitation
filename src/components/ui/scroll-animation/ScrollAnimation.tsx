"use client";

import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  style?: 'fade' | 'shorts'; // 애니메이션 스타일 선택 옵션
}

/**
 * 스크롤에 따라 애니메이션 효과를 적용하는 컴포넌트
 * 
 * @param children - 애니메이션 효과를 적용할 컴포넌트
 * @param className - 추가 스타일링을 위한 클래스명
 * @param threshold - 뷰포트에 얼마나 보여야 애니메이션이 시작될지 결정하는 값 (0~1)
 * @param delay - 애니메이션 지연 시간 (밀리초)
 * @param style - 애니메이션 스타일 ('fade' 또는 'shorts')
 */
const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  threshold = 0.1,
  delay = 0,
  style = 'fade'
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (domRef.current) {
              domRef.current.classList.add('is-visible');
              
              // 스타일에 따라 다른 클래스 추가
              if (style === 'shorts') {
                domRef.current.classList.add('shorts-animation');
              }
            }
          }, delay);
          
          // 한 번 애니메이션이 실행된 후 관찰 중단
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: threshold,
      rootMargin: '0px 0px -50px 0px'  // 상단 여백 조정
    });
    
    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay, style]);
  
  const baseClasses = style === 'fade' ? 'fade-in-section' : '';
  
  return (
    <div 
      ref={domRef} 
      className={`${baseClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation; 