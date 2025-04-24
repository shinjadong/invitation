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
        firstName: '지',
        lastName: '민',
        fullName: '민지',
        engName: 'Minji',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
        description: '밝고 따뜻한 마음을 가진 신부',
        tags: ['밝은', '다정한', '지혜로운'],
        phoneNumber: '010-1234-5678',
        parents: [
          { relation: '아버지', name: '김철수', phoneNumber: '010-1234-5678' },
          { relation: '어머니', name: '이영희', phoneNumber: '010-8765-4321' }
        ]
      },
      groom: {
        firstName: '호',
        lastName: '준',
        fullName: '준호',
        engName: 'Junho',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
        description: '듬직하고 다정한 신랑',
        tags: ['다정한', '책임감', '유머러스'],
        phoneNumber: '010-9876-5432',
        parents: [
          { relation: '아버지', name: '박영수', phoneNumber: '010-2345-6789' },
          { relation: '어머니', name: '최미영', phoneNumber: '010-9876-5432' }
        ]
      }
    },
    wedding: {
      date: '2025년 5월 25일 일요일 오후 1시',
      time: '오후 1시',
      location: {
        name: '더 그랜드 호텔 서울',
        address: '서울특별시 강남구 테헤란로 123',
        detailAddress: '그랜드볼룸 3층',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.0522635455!2d127.03062707576861!3d37.50332622778731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3eb14a1e3dd%3A0x1e1cd306fe1b3bf!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6TrnoDroZwgNTIz!5e0!3m2!1sko!2skr!4v1682329285752!5m2!1sko!2skr',
        transportationInfo: {
          car: '강남역에서 테헤란로를 따라 2km 직진 후 우회전',
          publicTransport: '지하철 2호선 강남역 3번 출구에서 도보 10분',
          shuttle: '강남역 4번 출구 앞에서 셔틀버스 운행 (20분 간격)'
        }
      },
      backgroundImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop',
      message: '우리의 새로운 시작을 함께 축복해 주세요. 소중한 분들과 함께하는 자리에 여러분을 초대합니다.'
    },
    greeting: {
      title: '소중한 분들께 알립니다',
      subtitle: 'invitation',
      message: `여행 같은 결혼식을 꿈꿔왔던 저희는\n모든 것이 새로워지는 봄날에 결혼식을 올리게 되었습니다.\n\n늘 멀리서도 응원해주시고 아껴주시는\n고마운 분들과 함께하고자 합니다.\n저희의 앞날을 축복해주시면\n감사한 마음 오래도록 간직하고\n행복하게 잘 살겠습니다.`
    },
    gallery: {
      title: '사진첩',
      subtitle: 'our gallery',
      images: [
        { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop', alt: '커플 사진 1', width: 1000, height: 1500 },
        { src: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=1000&auto=format&fit=crop', alt: '커플 사진 2', width: 1000, height: 1500 },
        { src: 'https://images.unsplash.com/photo-1537907510278-a4d35a3de7e8?q=80&w=1000&auto=format&fit=crop', alt: '커플 사진 3', width: 1000, height: 1500 },
        { src: 'https://images.unsplash.com/photo-1522673607200-164d1b3ce551?q=80&w=1000&auto=format&fit=crop', alt: '커플 사진 4', width: 1000, height: 1500 },
        { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop', alt: '커플 사진 5', width: 1000, height: 1500 },
        { src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1000&auto=format&fit=crop', alt: '커플 사진 6', width: 1000, height: 1500 },
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
        name: '김민지',
        bank: '신한은행',
        accountNumber: '110-123-456789'
      },
      groom: {
        name: '박준호',
        bank: '국민은행',
        accountNumber: '123-45-6789012'
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
