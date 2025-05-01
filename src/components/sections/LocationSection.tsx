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
  phone?: string;
  transportationInfo?: {
    car?: string;
    publicTransport?: string;
    shuttle?: string;
  };
  facilities?: {
    parking?: string;
    restaurant?: string;
    restroom?: string;
    [key: string]: string | undefined;
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

  const TransportationCard = ({ title, content, icon }: { title: string; content: string; icon: string }) => {
    return (
      <Card className="mb-4 border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mr-3">
              <span className="text-rose-500 text-xl">{icon}</span>
            </div>
            <h4 className="font-semibold text-lg">{title}</h4>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{content}</p>
        </CardContent>
      </Card>
    );
  };

  const FacilityItem = ({ icon, label, description }: { icon: string; label: string; description: string }) => {
    return (
      <div className="flex items-start mb-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-50 mr-3 flex-shrink-0">
          <span className="text-rose-500">{icon}</span>
        </div>
        <div>
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    );
  };

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
                <p className="mb-6"><strong>주소:</strong> {location.address}</p>
                {location.phone && (
                  <p className="mb-6"><strong>문의:</strong> {location.phone}</p>
                )}
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
                <Button variant="outline" asChild className="flex items-center">
                  <a href={`https://map.kakao.com/link/search/${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <rect width="256" height="256" rx="50" fill="#FEE500"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M128 85.5C85.5 85.5 64 106.5 64 131.5C64 149.5 76 165 94.5 172C93.5 176 89.5 189.5 88.5 192C87.5 196 91 195.5 93 193.5C94.5 192 111 181 118 176.5C121.5 177 124.5 177.5 128 177.5C170.5 177.5 192 156.5 192 131.5C192 106.5 170.5 85.5 128 85.5Z" fill="#181600"/>
                    </svg>
                    카카오맵
                  </a>
                </Button>
                <Button variant="outline" asChild className="flex items-center">
                  <a href={`https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <rect width="256" height="256" rx="50" fill="#03C75A"/>
                      <path d="M147.37 116.46L109.69 64.5H78.33V191.5H109.69V139.54L147.37 191.5H178.73V64.5H147.37V116.46Z" fill="white"/>
                    </svg>
                    네이버맵
                  </a>
                </Button>
                <Button variant="outline" asChild className="flex items-center">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`} target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M69.9 128C69.9 95.4 96.4 69 129 69C145.5 69 160 75.8 170.4 87L192.9 64.4C177.1 49.7 154.3 41 129 41C81.1 41 42.3 79.8 42.3 128C42.3 176.2 81.1 215 129 215C154.3 215 177.1 206.3 192.9 191.6C208.7 176.9 214.6 156.4 214.6 139.9C214.6 133.1 213.7 126.3 212.8 121.3H129V148H186.5C184.6 161.8 177.1 173.3 170.4 181C161.8 188.7 147.3 196.4 129 196.4C96.4 196.4 69.9 170 69.9 128Z" fill="#4285F4"/>
                      <path d="M69.9 128C69.9 95.4 96.4 69 129 69C145.5 69 160 75.8 170.4 87L192.9 64.4C177.1 49.7 154.3 41 129 41C81.1 41 42.3 79.8 42.3 128C42.3 176.2 81.1 215 129 215C154.3 215 177.1 206.3 192.9 191.6C208.7 176.9 214.6 156.4 214.6 139.9C214.6 133.1 213.7 126.3 212.8 121.3H129V148H186.5C184.6 161.8 177.1 173.3 170.4 181C161.8 188.7 147.3 196.4 129 196.4C96.4 196.4 69.9 170 69.9 128Z" fill="#4285F4"/>
                    </svg>
                    구글맵
                  </a>
                </Button>
              </div>

              {/* 편의시설 정보 */}
              {location.facilities && Object.keys(location.facilities).length > 0 && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-center font-medium mb-4">편의시설 안내</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {location.facilities.parking && (
                      <FacilityItem icon="🅿️" label="주차" description={location.facilities.parking} />
                    )}
                    {location.facilities.restaurant && (
                      <FacilityItem icon="🍽️" label="식당" description={location.facilities.restaurant} />
                    )}
                    {location.facilities.restroom && (
                      <FacilityItem icon="🚻" label="화장실" description={location.facilities.restroom} />
                    )}
                    {Object.entries(location.facilities)
                      .filter(([key]) => !['parking', 'restaurant', 'restroom'].includes(key))
                      .map(([key, value]) => (
                        <FacilityItem 
                          key={key}
                          icon="📌" 
                          label={key} 
                          description={value || ''} 
                        />
                      ))
                    }
                  </div>
                </div>
              )}

              {/* 교통 정보 */}
              {location.transportationInfo && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-center">오시는 길</h3>
                  <div className="space-y-4">
                    {location.transportationInfo.car && (
                      <TransportationCard 
                        title="자가용" 
                        content={location.transportationInfo.car} 
                        icon="🚗"
                      />
                    )}
                    {location.transportationInfo.publicTransport && (
                      <TransportationCard 
                        title="대중교통" 
                        content={location.transportationInfo.publicTransport} 
                        icon="🚇"
                      />
                    )}
                    {location.transportationInfo.shuttle && (
                      <TransportationCard 
                        title="셔틀버스" 
                        content={location.transportationInfo.shuttle} 
                        icon="🚌"
                      />
                    )}
                  </div>
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
