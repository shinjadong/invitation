import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET: 모든 방명록 메시지 가져오기
export async function GET() {
  try {
    const guestbookEntries = await prisma.guestbook.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ entries: guestbookEntries }, { status: 200 });
  } catch (error) {
    console.error('방명록 조회 중 오류:', error);
    return NextResponse.json(
      { error: '방명록 데이터를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// POST: 새 방명록 메시지 추가
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message } = body;

    // 필수 필드 검증
    if (!name || !message) {
      return NextResponse.json(
        { error: '이름과 메시지는 필수 항목입니다.' },
        { status: 400 }
      );
    }

    // 새 방명록 항목 생성
    const newEntry = await prisma.guestbook.create({
      data: {
        name,
        message,
      },
    });

    return NextResponse.json({ entry: newEntry }, { status: 201 });
  } catch (error) {
    console.error('방명록 추가 중 오류:', error);
    return NextResponse.json(
      { error: '방명록을 저장하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 