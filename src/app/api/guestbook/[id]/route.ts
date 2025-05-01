import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// DELETE: 특정 방명록 메시지 삭제
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  
  // 비밀번호 확인 로직
  // 실제 구현에서는 더 안전한 인증 방식을 사용하는 것이 좋습니다!
  try {
    const body = await req.json();
    const { password } = body;
    
    // 간단한 비밀번호 확인 (이것은 데모 용도이며 실제로는 더 안전한 방법을 사용해야 합니다)
    if (password !== '1234') {
      return NextResponse.json(
        { error: '비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }
    
    // 방명록 항목 삭제
    await prisma.guestbook.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: '방명록이 삭제되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('방명록 삭제 중 오류:', error);
    return NextResponse.json(
      { error: '방명록을 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 