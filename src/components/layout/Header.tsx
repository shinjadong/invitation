"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  coupleNames: {
    bride: string;
    groom: string;
  };
}

/**
 * 청첩장 상단 헤더/네비게이션 컴포넌트
 * 커플 이름과 주요 섹션으로 이동할 수 있는 네비게이션 링크 제공
 */
const Header: React.FC<HeaderProps> = ({ coupleNames }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* 로고 영역 - 커플 이름 */}
        <Link href="#main" className="flex items-center text-lg font-medium">
          <span className="font-sunflower">{coupleNames.bride}</span>
          <span className="mx-1 text-primary">&amp;</span>
          <span className="font-sunflower">{coupleNames.groom}</span>
        </Link>

        {/* 모바일 메뉴 버튼 */}
        <div className="block md:hidden">
          <Button variant="ghost" size="sm" className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">메뉴</span>
          </Button>
        </div>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#couple" className="text-sm font-medium hover:text-primary transition-colors">
            신랑 & 신부
          </Link>
          <Link href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">
            사진첩
          </Link>
          <Link href="#guestbook" className="text-sm font-medium hover:text-primary transition-colors">
            방명록
          </Link>
          <Link href="#location" className="text-sm font-medium hover:text-primary transition-colors">
            오시는 길
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
