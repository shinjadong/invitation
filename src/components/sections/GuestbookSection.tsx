"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
  const [localEntries, setLocalEntries] = useState<GuestbookEntry[]>(entries);

  // 방명록 제출 핸들러 (실제 구현에서는 API 호출 필요)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    
    // 실제 구현에서는 API 호출로 대체
    setTimeout(() => {
      const newEntry: GuestbookEntry = {
        id: Date.now().toString(),
        name,
        message,
        createdAt: new Date().toISOString(),
      };
      
      setLocalEntries(prev => [newEntry, ...prev]);
      setName('');
      setMessage('');
      setIsSubmitting(false);
    }, 500);
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
            {localEntries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                아직 작성된 메시지가 없습니다. 첫 번째 메시지를 남겨보세요!
              </div>
            ) : (
              localEntries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{entry.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(entry.createdAt)}
                      </span>
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
