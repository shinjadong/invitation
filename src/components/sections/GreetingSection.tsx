"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';

interface GreetingSectionProps {
  title: string;
  subtitle?: string;
  message: string;
  coupleNames: {
    bride: {
      fullName: string;
      engName?: string;
    };
    groom: {
      fullName: string;
      engName?: string;
    };
  };
}

/**
 * 청첩장 인사말 섹션 컴포넌트
 * 결혼 소식을 알리는 인사말과 신랑신부 이름을 표시
 */
const GreetingSection: React.FC<GreetingSectionProps> = ({
  title,
  subtitle,
  message,
  coupleNames
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="greeting" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          {subtitle && (
            <h3 className="text-sm md:text-base text-muted-foreground uppercase tracking-wider mb-2">
              {subtitle}
            </h3>
          )}
          <h2 className="text-2xl md:text-3xl font-medium font-sunflower mb-8">
            {title}
          </h2>

          <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-muted">
            <CardContent className="pt-6">
              <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
                {message}
              </p>
            </CardContent>
          </Card>

          <div className="mt-12 flex flex-col items-center">
            <h4 className="text-xl md:text-2xl font-medium mb-6 flex flex-wrap items-center justify-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground mb-1">신부</span>
                <span className="font-sunflower">{coupleNames.bride.fullName}</span>
                {coupleNames.bride.engName && (
                  <span className="text-sm text-muted-foreground mt-1">{coupleNames.bride.engName}</span>
                )}
              </div>
              
              <span className="text-primary">&amp;</span>
              
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground mb-1">신랑</span>
                <span className="font-sunflower">{coupleNames.groom.fullName}</span>
                {coupleNames.groom.engName && (
                  <span className="text-sm text-muted-foreground mt-1">{coupleNames.groom.engName}</span>
                )}
              </div>
            </h4>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GreetingSection;
