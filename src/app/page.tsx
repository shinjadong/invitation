import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import GreetingSection from '@/components/sections/GreetingSection';
import CoupleSection from '@/components/sections/CoupleSection';
import LocationSection from '@/components/sections/LocationSection';
import Footer from '@/components/layout/Footer';

// 레이지 로딩을 적용한 컴포넌트
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'), {
  loading: () => <div className="py-20 text-center">갤러리를 불러오는 중...</div>
});

const GuestbookSection = dynamic(() => import('@/components/sections/GuestbookSection'), {
  loading: () => <div className="py-20 text-center">방명록을 불러오는 중...</div>
});

export default function Home() {
  // 청첩장 데이터
  const weddingData = {
    couple: {
      bride: {
        firstName: '태린',
        lastName: '',
        fullName: '김태린',
        engName: 'Taerin',
        image: 'https://bhmrakolqc17mtsl.public.blob.vercel-storage.com/shin-bu-pic-4BnX9zmvDN9VyszBLjQ9tcyrCqAa9X',
        description: '아름답고 지혜로운 신부',
        tags: ['지혜로운', '다정한', '열정적인'],
        phoneNumber: '000-000-0000',
        parents: [
          { relation: '아버지', name: '김용석', phoneNumber: '010-3664-7179' },
          { relation: '어머니', name: '노혜경', phoneNumber: '010-5590-8346' }
        ]
      },
      groom: {
        firstName: '우성',
        lastName: '',
        fullName: '신우성',
        engName: 'Wooseong',
        image: 'https://bhmrakolqc17mtsl.public.blob.vercel-storage.com/shinrang-pic-ZBbsglfT315m0DQpy3i79NdhOlrGSQ',
        description: '듬직하고 다정한 신랑',
        tags: ['다정한', '책임감', '유머러스'],
        phoneNumber: '000-000-0000',
        parents: [
          { relation: '아버지', name: '신안식', phoneNumber: '010-4751-5007' },
          { relation: '어머니', name: '이은혜', phoneNumber: '010-7544-3385' }
        ]
      }
    },
    wedding: {
      date: '2025년 5월 31일',
      time: '오후 4시 40분',
      day: '토요일',
      location: {
        name: '세인트메리엘',
        address: '서울특별시 강남구 테헤란로 123',
        detailAddress: '세인트홀 2F',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.0541593705257!2d127.02824881531017!3d37.49889697981131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15aee9ab0cb%3A0x31793fc63e0cf9d3!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6TrnoDroZwgNDIx!5e0!3m2!1sko!2skr!4v1617091821320!5m2!1sko!2skr',
        transportationInfo: {
          car: '강남역에서 테헤란로를 따라 2km 직진 후 우회전',
          publicTransport: '지하철 2호선 강남역 3번 출구에서 도보 10분',
          shuttle: '강남역 4번 출구 앞에서 셔틀버스 운행 (20분 간격)'
        }
      },
      backgroundImage: 'https://bhmrakolqc17mtsl.public.blob.vercel-storage.com/KakaoTalk_20250424_225551391-wXm3ahlrQzSBycmGYtuWw88jBIqdWM.jpg',
      message: '저희 두 사람이 이제 믿음과 사랑으로 한 가정을 이루게 되었습니다. 부디 함께 하시어 축복해 주시기 바랍니다.'
    },
    greeting: {
      title: '소중한 분들께 알립니다',
      subtitle: 'invitation',
      message: `저희 두 사람이 이제 믿음과 사랑으로 한 가정을 이루게 되었습니다. 부디 함께 하시어 축복해 주시기 바랍니다.`
    },
    gallery: {
      title: '사진첩',
      subtitle: 'our gallery',
      images: [
        { src: 'https://bhmrakolqc17mtsl.public.blob.vercel-storage.com/KakaoTalk_20250424_225551391-wXm3ahlrQzSBycmGYtuWw88jBIqdWM.jpg', alt: '커플 사진 1', width: 1000, height: 1500 },
        { src: 'https://bhmrakolqc17mtsl.public.blob.vercel-storage.com/KakaoTalk_20250424_225551391_01-MYEI3BE52vOCrlYv7k8t4HWBQnn3bf.jpg', alt: '커플 사진 2', width: 1000, height: 1500 },
        { src: 'https://bhmrakolqc17mtsl.public.blob.vercel-storage.com/KakaoTalk_20250424_225551391_02-Z6mwVWcWEWHAUAwVBLTKkW6QjdiU3r.jpg', alt: '커플 사진 3', width: 1000, height: 1500 },
        { src: 'https://bhmrakolqc17mtsl.public.blob.vercel-storage.com/KakaoTalk_20250424_225551391_03-6s3r1ca9Dx8WVJ78pALY1ZL1jxDv6T.jpg', alt: '커플 사진 4', width: 1000, height: 1500 },
        { src: 'https://bhmrakolqc17mtsl.public.blob.vercel-storage.com/KakaoTalk_20250424_225551391_04-72pZYYxTGYWlUbbLWQdj1NsuqQQZ8C.jpg', alt: '커플 사진 5', width: 1000, height: 1500 },
        { src: 'https://bhmrakolqc17mtsl.public.blob.vercel-storage.com/KakaoTalk_20250424_225551391_05-YniyODm3Ay7d9bv7vGZ4p3z8sDRvf4.jpg', alt: '커플 사진 6', width: 1000, height: 1500 }
      ]
    },
    guestbook: {
      title: '방명록',
      subtitle: 'guestbook',
      entries: [
        { id: '1', name: '김영수', message: '두 분의 결혼을 진심으로 축하합니다! 앞으로도 지금처럼 서로 아끼고 사랑하며 행복하게 사세요.', createdAt: '2025-04-20T12:30:00Z' },
        { id: '2', name: '이미라', message: '결혼 정말 축하해요! 오래오래 행복하게 사랑하며 살아가길 바랄게요. 💕', createdAt: '2025-04-21T15:45:00Z' },
      ]
    },
    shareLinks: {
      kakao: 'https://developers.kakao.com/docs/latest/ko/message/js-link#custom-template-msg',
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=https://example.com',
      twitter: 'https://twitter.com/intent/tweet?url=https://example.com&text=민지와 준호의 결혼식에 초대합니다'
    },
    accountInfo: {
      bride: {
        name: '김태린 (신부)',
        bank: '기업은행',
        accountNumber: '000-000-000'
      },
      groom: {
        name: '신우성 (신랩)',
        bank: '신한은행',
        accountNumber: '000-000-000'
      }
    }
  };

  return (
    <>
      <Header 
        coupleNames={{
          bride: weddingData.couple.bride.fullName,
          groom: weddingData.couple.groom.fullName
        }} 
      />
      
      <main>
        <HeroSection 
          coupleNames={{
            bride: {
              firstName: weddingData.couple.bride.firstName,
              lastName: weddingData.couple.bride.lastName,
              engName: weddingData.couple.bride.engName
            },
            groom: {
              firstName: weddingData.couple.groom.firstName,
              lastName: weddingData.couple.groom.lastName,
              engName: weddingData.couple.groom.engName
            }
          }}
          weddingDate={weddingData.wedding.date}
          weddingLocation={weddingData.wedding.location.name}
          backgroundImage={weddingData.wedding.backgroundImage}
          message={weddingData.wedding.message}
        />
        
        <GreetingSection 
          title={weddingData.greeting.title}
          subtitle={weddingData.greeting.subtitle}
          message={weddingData.greeting.message}
          coupleNames={{
            bride: {
              fullName: weddingData.couple.bride.fullName,
              engName: weddingData.couple.bride.engName
            },
            groom: {
              fullName: weddingData.couple.groom.fullName,
              engName: weddingData.couple.groom.engName
            }
          }}
        />
        
        <CoupleSection 
          title="신랑 & 신부"
          subtitle="about us"
          bride={{
            fullName: weddingData.couple.bride.fullName,
            engName: weddingData.couple.bride.engName,
            description: weddingData.couple.bride.description,
            image: weddingData.couple.bride.image,
            parents: weddingData.couple.bride.parents,
            tags: weddingData.couple.bride.tags
          }}
          groom={{
            fullName: weddingData.couple.groom.fullName,
            engName: weddingData.couple.groom.engName,
            description: weddingData.couple.groom.description,
            image: weddingData.couple.groom.image,
            parents: weddingData.couple.groom.parents,
            tags: weddingData.couple.groom.tags
          }}
        />
        
        <Suspense fallback={<div className="py-20 text-center">갤러리를 불러오는 중...</div>}>
          <GallerySection 
            title={weddingData.gallery.title}
            subtitle={weddingData.gallery.subtitle}
            images={weddingData.gallery.images}
          />
        </Suspense>
        
        <LocationSection 
          title="오시는 길"
          subtitle="location"
          location={weddingData.wedding.location}
          weddingDate={weddingData.wedding.date.split(' ').slice(0, 3).join(' ')}
          weddingTime={weddingData.wedding.time}
        />
        
        <Suspense fallback={<div className="py-20 text-center">방명록을 불러오는 중...</div>}>
          <GuestbookSection 
            title={weddingData.guestbook.title}
            subtitle={weddingData.guestbook.subtitle}
            entries={weddingData.guestbook.entries}
          />
        </Suspense>
      </main>
      
      <Footer 
        coupleNames={{
          bride: weddingData.couple.bride.fullName,
          groom: weddingData.couple.groom.fullName
        }}
        weddingDate={weddingData.wedding.date.split(' ').slice(0, 3).join(' ')}
        shareLinks={weddingData.shareLinks}
        accountInfo={weddingData.accountInfo}
      />
    </>
  );
}
