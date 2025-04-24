"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LocationInfo {
  name: string;
  address: string;
  detailAddress?: string;
  mapUrl: string;
  transportationInfo?: {
    car?: string;
    publicTransport?: string;
    shuttle?: string;
  };
}

interface LocationSectionProps {
  title: string;
  subtitle?: string;
  location: LocationInfo;
  weddingDate: string;
  weddingTime: string;
}

/**
 * 위치 정보 섹션 컴포넌트
 * 결혼식 장소의 위치와 오시는 길 정보 제공
 */
const LocationSection: React.FC<LocationSectionProps> = ({
  title,
  subtitle,
  location,
  weddingDate,
  weddingTime
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="location" className="py-20 bg-background">
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
          {/* 날짜 및 시간 정보 */}
          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-6 text-center">
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                <div className="flex flex-col items-center">
                  <h4 className="text-sm text-muted-foreground mb-1">날짜</h4>
                  <p className="text-lg font-medium">{weddingDate}</p>
                </div>
                <div className="hidden md:block w-px h-12 bg-border"></div>
                <div className="flex flex-col items-center">
                  <h4 className="text-sm text-muted-foreground mb-1">시간</h4>
                  <p className="text-lg font-medium">{weddingTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 위치 정보 */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">{location.name}</h3>
                <p className="text-lg mb-4">{location.detailAddress}</p>
                <p className="mb-2"><strong>주소:</strong> {location.address}</p>
                <p className="mb-6"><strong>전화:</strong> 02-538-3300</p>
              </div>

              {/* 지도 영역 */}
              <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden rounded-md">
                <iframe
                  src={location.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="결혼식장 위치"
                ></iframe>
              </div>

              {/* 지도 앱으로 열기 버튼 */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Button variant="outline" asChild>
                  <a href={`https://map.kakao.com/link/search/${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                    카카오맵
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={`https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                    네이버맵
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                    구글맵
                  </a>
                </Button>
              </div>

              {/* 교통 정보 */}
              {location.transportationInfo && (
                <div className="space-y-4">
                  <h4 className="text-center font-medium">오시는 길</h4>
                  
                  {location.transportationInfo.car && (
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
                          <circle cx="7" cy="17" r="2" />
                          <path d="M9 17h6" />
                          <circle cx="17" cy="17" r="2" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">자가용</h5>
                        <p className="text-sm text-muted-foreground">{location.transportationInfo.car}</p>
                      </div>
                    </div>
                  )}
                  
                  {location.transportationInfo.publicTransport && (
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <path d="M7 10h10" />
                          <path d="M7 14h10" />
                          <circle cx="7" cy="7" r="1" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">대중교통</h5>
                        <p className="text-sm text-muted-foreground">{location.transportationInfo.publicTransport}</p>
                      </div>
                    </div>
                  )}
                  
                  {location.transportationInfo.shuttle && (
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M8 6v6" />
                          <path d="M15 6v6" />
                          <path d="M2 12h19.6" />
                          <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
                          <circle cx="7" cy="18" r="2" />
                          <path d="M9 18h5" />
                          <circle cx="16" cy="18" r="2" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">셔틀버스</h5>
                        <p className="text-sm text-muted-foreground">{location.transportationInfo.shuttle}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
