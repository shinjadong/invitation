"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface FooterProps {
  coupleNames: {
    bride: string;
    groom: string;
  };
  weddingDate: string;
  shareLinks?: {
    kakao?: string;
    facebook?: string;
    twitter?: string;
  };
  accountInfo?: {
    bride?: {
      name: string;
      bank: string;
      accountNumber: string;
    };
    groom?: {
      name: string;
      bank: string;
      accountNumber: string;
    };
  };
}

/**
 * 청첩장 푸터 컴포넌트
 * 공유 버튼, 계좌번호 정보, 저작권 정보 등을 표시
 */
const Footer: React.FC<FooterProps> = ({
  coupleNames,
  weddingDate,
  shareLinks,
  accountInfo
}) => {
  // 현재 연도 계산
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* 공유 버튼 */}
        {shareLinks && (
          <div className="flex justify-center mb-8">
            <div className="flex gap-3">
              {shareLinks.kakao && (
                <Button variant="outline" size="icon" asChild>
                  <a href={shareLinks.kakao} target="_blank" rel="noopener noreferrer" aria-label="카카오톡으로 공유하기">
                    <svg width="18" height="18" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor" d="M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-10.237 35.344-10.581 37.689c0 0-.207 1.762.934 2.434s2.483.15 2.483.15c3.272-.457 37.943-24.811 43.944-29.04 5.995.849 12.168 1.29 18.472 1.29 57.438 0 104-36.712 104-82c0-45.287-46.562-82-104-82z"/>
                    </svg>
                  </a>
                </Button>
              )}
              
              {shareLinks.facebook && (
                <Button variant="outline" size="icon" asChild>
                  <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="페이스북으로 공유하기">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </Button>
              )}
              
              {shareLinks.twitter && (
                <Button variant="outline" size="icon" asChild>
                  <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="트위터로 공유하기">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* 계좌번호 정보 */}
        {accountInfo && (
          <div className="flex justify-center mb-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">계좌번호 보기</Button>
              </DialogTrigger>
              <DialogContent 
                className="sm:max-w-md"
              >
                <DialogHeader>
                  <DialogTitle className="text-center">축하의 마음 전하기</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-center text-sm font-medium text-muted-foreground">신랑측</h4>
                      <div className="flex flex-col items-center p-4 border rounded-md">
                        <p className="font-medium">신안식 <span className="text-sm text-muted-foreground">부</span></p>
                        <p className="text-sm text-muted-foreground">새마을금고</p>
                        <p className="text-sm mt-1">9003-2863-0563-0</p>
                        <Button variant="ghost" size="sm" className="mt-2" onClick={() => {
                          navigator.clipboard.writeText("9003-2863-0563-0");
                          alert('계좌번호가 복사되었습니다.');
                        }}>
                          복사하기
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-center text-sm font-medium text-muted-foreground">신부측</h4>
                      <div className="flex flex-col items-center p-4 border rounded-md mb-3">
                        <p className="font-medium">김용석 <span className="text-sm text-muted-foreground">부</span></p>
                        <p className="text-sm text-muted-foreground">카카오뱅크</p>
                        <p className="text-sm mt-1">3333-0000-1111</p>
                        <Button variant="ghost" size="sm" className="mt-2" onClick={() => {
                          navigator.clipboard.writeText("3333-0000-1111");
                          alert('계좌번호가 복사되었습니다.');
                        }}>
                          복사하기
                        </Button>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 border rounded-md mb-3">
                        <p className="font-medium">노혜경 <span className="text-sm text-muted-foreground">모</span></p>
                        <p className="text-sm text-muted-foreground">카카오뱅크</p>
                        <p className="text-sm mt-1">3333-0000-2222</p>
                        <Button variant="ghost" size="sm" className="mt-2" onClick={() => {
                          navigator.clipboard.writeText("3333-0000-2222");
                          alert('계좌번호가 복사되었습니다.');
                        }}>
                          복사하기
                        </Button>
                      </div>
                      
                      <div className="flex flex-col items-center p-4 border rounded-md mb-3">
                        <p className="font-medium">김태린 (정주희) <span className="text-sm text-muted-foreground">신부</span></p>
                        <p className="text-sm text-muted-foreground">하나은행</p>
                        <p className="text-sm mt-1">230-145980-01-012</p>
                        <Button variant="ghost" size="sm" className="mt-2" onClick={() => {
                          navigator.clipboard.writeText("230-145980-01-012");
                          alert('계좌번호가 복사되었습니다.');
                        }}>
                          복사하기
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* 저작권 정보 */}
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">
            {coupleNames.bride} & {coupleNames.groom} | {weddingDate}
          </p>
          <p>
            © {currentYear} Wedding Invitation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
