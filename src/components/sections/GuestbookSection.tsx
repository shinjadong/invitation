"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface GuestbookSectionProps {
  title: string;
  subtitle?: string;
  entries?: GuestbookEntry[];
}

/**
 * 방명록 섹션 컴포넌트
 * 방문자들이 축하 메시지를 남기고 볼 수 있는 기능 제공
 * Prisma를 사용하여 서버 측 데이터 저장
 */
const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  title,
  subtitle,
  entries = []
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>([]);
  const [password, setPassword] = useState('');
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // API에서 방명록 데이터 가져오기
  useEffect(() => {
    const fetchGuestbookEntries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/guestbook');
        
        if (!response.ok) {
          throw new Error('방명록 데이터를 가져오는 중 오류가 발생했습니다.');
        }
        
        const data = await response.json();
        setGuestbookEntries(data.entries);
      } catch (error) {
        console.error('방명록 데이터 로딩 오류:', error);
        toast({
          title: "데이터 로딩 오류",
          description: "방명록을 불러오는 중 문제가 발생했습니다.",
          variant: "destructive",
        });
        // 초기 데이터 사용
        setGuestbookEntries(entries);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuestbookEntries();
  }, [entries, toast]);

  // 방명록 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });
      
      if (!response.ok) {
        throw new Error('방명록을 저장하는 중 오류가 발생했습니다.');
      }
      
      const data = await response.json();
      
      // 새 항목을 목록 맨 위에 추가
      setGuestbookEntries(prevEntries => [data.entry, ...prevEntries]);
      
      // 입력 필드 초기화
      setName('');
      setMessage('');
      
      // 성공 알림
      toast({
        title: "방명록 등록 완료",
        description: "소중한 메시지가 등록되었습니다.",
        duration: 3000,
      });
    } catch (error) {
      console.error('방명록 저장 중 오류:', error);
      toast({
        title: "오류 발생",
        description: "방명록을 저장하는 중 문제가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 방명록 삭제 모드 활성화
  const toggleDeleteMode = (entryId: string) => {
    setIsDeleteMode(true);
    setEntryToDelete(entryId);
  };

  // 방명록 삭제 취소
  const cancelDelete = () => {
    setIsDeleteMode(false);
    setEntryToDelete(null);
    setPassword('');
  };

  // 방명록 삭제 처리
  const handleDelete = async () => {
    if (!entryToDelete) return;
    
    try {
      const response = await fetch(`/api/guestbook/${entryToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '방명록 삭제 중 오류가 발생했습니다.');
      }
      
      // 삭제된 항목을 목록에서 제거
      setGuestbookEntries(prevEntries => 
        prevEntries.filter(entry => entry.id !== entryToDelete)
      );
      
      toast({
        title: "삭제 완료",
        description: "메시지가 삭제되었습니다.",
      });
    } catch (error: any) {
      const errorMessage = error.message || '방명록을 삭제하는 중 문제가 발생했습니다.';
      
      toast({
        title: "오류 발생",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsDeleteMode(false);
      setEntryToDelete(null);
      setPassword('');
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <section id="guestbook" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {subtitle && (
            <h3 className="text-sm md:text-base text-muted-foreground uppercase tracking-wider mb-2">
              {subtitle}
            </h3>
          )}
          <h2 className="text-2xl md:text-3xl font-medium font-sunflower">
            {title}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* 방명록 작성 폼 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-lg">축하 메시지 남기기</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">메시지</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                    placeholder="축하 메시지를 입력하세요"
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? '등록 중...' : '메시지 등록하기'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 방명록 목록 */}
          <div className="space-y-4">
            {isDeleteMode && (
              <Card className="p-4 mb-4 bg-muted/50">
                <CardContent className="p-0">
                  <h4 className="font-medium mb-2">메시지 삭제</h4>
                  <p className="text-sm mb-4">이 메시지를 삭제하려면 비밀번호를 입력하세요.</p>
                  <div className="flex space-x-2">
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호"
                      className="max-w-[200px]"
                    />
                    <Button variant="destructive" onClick={handleDelete} size="sm">삭제</Button>
                    <Button variant="outline" onClick={cancelDelete} size="sm">취소</Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">방명록을 불러오는 중...</p>
              </div>
            ) : guestbookEntries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                아직 작성된 메시지가 없습니다. 첫 번째 메시지를 남겨보세요!
              </div>
            ) : (
              guestbookEntries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{entry.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(entry.createdAt)}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0" 
                          onClick={() => toggleDeleteMode(entry.id)}
                        >
                          <span className="sr-only">삭제</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm whitespace-pre-line">{entry.message}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestbookSection;
