import { useState, useMemo } from 'react';
import logoImg from './assets/logo.png';
import './App.css';

interface ScreenItem {
  category: string;
  menu1: string;
  menu2: string;
  order: string;
  id: string;
  name: string;
  type: '일반' | '모달' | '이메일' | '레이어';
  remarks: string;
  link: string;
}

// Initial empty items or sample data for demonstration
const INITIAL_DATA: ScreenItem[] = [
  { category: '인트로', menu1: '', menu2: '', order: '1', id: 'NIT_01_01', name: '서비스 소개', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '2', id: 'NCM_01_01', name: '남원 로그인', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '3', id: 'NCM_01_02', name: '아이디 찾기', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '4', id: 'NCM_01_03', name: '아이디 찾기 결과', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '5', id: 'NCM_01_04', name: '비밀번호 찾기', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '6', id: 'NCM_01_05', name: '비밀번호 찾기 결과', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '7', id: 'NCM_01_06', name: '회원가입', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '8', id: 'NCM_01_07', name: '회원가입 정보 등록', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '9', id: 'NCM_01_08', name: '회원가입 완료', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '10', id: 'NCM_01_09', name: '비밀번호 재설정 메일', type: '이메일', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '11', id: 'NCM_01_10', name: '비밀번호 재설정 완료', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '12', id: 'NCM_01_11', name: '비밀번호 재설정 확인 메일', type: '이메일', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '13', id: 'NCM_01_12', name: '회원가입 완료 메일', type: '이메일', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '14', id: 'NCM_01_13', name: '가입 승인 메일', type: '이메일', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '15', id: 'NCM_01_14', name: '가입 거절 메일', type: '이메일', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '16', id: 'NCM_02_01', name: '헤더', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '17', id: 'NCM_02_02', name: '풋터', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '18', id: 'NCM_02_03', name: '사이드 바', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '19', id: 'NCM_02_04', name: '공지 팝업', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '20', id: 'NCM_03_01', name: '마이 페이지', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '21', id: 'NCM_03_06', name: '비밀번호 변경', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '22', id: 'NCM_03_02', name: '비밀번호 입력', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '23', id: 'NCM_03_03', name: '회원정보 수정', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '24', id: 'NCM_03_04', name: '스토리지 증량 신청', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '25', id: 'NCM_03_05', name: '비밀번호 변경 알림', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '26', id: 'NCM_04_01', name: '오류', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '27', id: 'NCM_04_02', name: '알림/확인 모달', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '28', id: 'NCM_04_03', name: '공용 팝업 가이드', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '29', id: 'NCM_05_01', name: '공간 편집', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '30', id: 'NCM_05_02', name: '분석 결과 찾기', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '31', id: 'NCM_05_03', name: '지도 찾기', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '32', id: 'NCM_05_04', name: '데이터셋 찾기', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '33', id: 'NCM_05_05', name: '행정정보 찾기', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '34', id: 'NCM_06_01', name: '보안 서약서', type: '모달', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '35', id: 'NCM_06_02', name: '개인정보 처리방침', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '36', id: 'NCM_06_03', name: '이용약관', type: '일반', remarks: '', link: '#' },
  { category: '공통', menu1: '', menu2: '', order: '37', id: 'NCM_06_04', name: '이메일 주소 무단 수집 거부', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '대시보드', menu2: '', order: '38', id: 'NDB_01_01', name: '남원 대시보드 – 통합', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '대시보드', menu2: '', order: '39', id: 'NDB_01_02', name: '남원 대시보드 – 축산과', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '대시보드', menu2: '', order: '40', id: 'NDB_01_03', name: '남원 대시보드 – 농정과', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '대시보드', menu2: '', order: '41', id: 'NDB_01_04', name: '남원 대시보드 – 농업기술센터', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '대시보드', menu2: '', order: '42', id: 'NDB_01_05', name: '남원 대시보드 – 일반', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '분석 서비스', menu2: 'AI 분석', order: '43', id: 'NAA_01_01', name: 'AI 분석 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '분석 서비스', menu2: 'AI 분석', order: '44', id: 'NAA_01_02', name: 'AI 분석 상세 정보', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '분석 서비스', menu2: 'AI 분석', order: '45', id: 'NAA_01_03', name: 'AI 분석 모델 실행 – 단일 모델', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '분석 서비스', menu2: 'AI 분석', order: '46', id: 'NAA_01_04', name: 'AI 분석 모델 실행 – 다중 모델', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '분석 서비스', menu2: 'AI 분석 결과', order: '47', id: 'NAA_02_01', name: 'AI 분석 결과 목록 -전체', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '분석 서비스', menu2: 'AI 분석 결과', order: '48', id: 'NAA_02_02', name: 'AI 분석 결과 목록 -개인', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '분석 서비스', menu2: 'AI 분석 결과', order: '49', id: 'NAA_02_03', name: 'AI 분석 결과 상세 정보', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '분석 서비스', menu2: 'AI 분석 결과', order: '50', id: 'NAA_02_04', name: '사진 보기', type: '모달', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '분석 서비스', menu2: 'AI 분석 결과', order: '51', id: 'NAA_02_05', name: '실사 정보 관리', type: '모달', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '52', id: 'NMP_00_01', name: '지도 헤더', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '53', id: 'NMP_00_02', name: '지도 사이드 바', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '54', id: 'NMP_00_04', name: '지도 저장', type: '모달', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '55', id: 'NMP_00_05', name: '지도 조회', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '56', id: 'NMP_05_01', name: 'AI분석 사료 지도', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '57', id: 'NMP_05_02', name: 'AI분석 사료 구성 목록', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '58', id: 'NMP_05_03', name: 'AI분석 사료 구성 상세 정보', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '59', id: 'NMP_05_04', name: 'AI분석 사료 개별 정보', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '60', id: 'NMP_06_01', name: 'AI분석 곤포 지도', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '61', id: 'NMP_06_02', name: 'AI분석 곤포 구성 목록', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '62', id: 'NMP_06_03', name: 'AI분석 곤포 구성 상세 정보', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '63', id: 'NMP_06_04', name: 'AI분석 곤포 개별 정보', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '64', id: 'NMP_07_01', name: 'AI분석 농지 지도', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '65', id: 'NMP_07_02', name: 'AI분석 농지 구성 목록', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '66', id: 'NMP_07_03', name: 'AI분석 농지 구성 상세 정보', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '67', id: 'NMP_07_04', name: 'AI분석 농지 개별 정보', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '68', id: 'NMP_08_01', name: 'AI분석 영농 지도', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '69', id: 'NMP_08_02', name: 'AI분석 영농 구성 목록', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '70', id: 'NMP_08_03', name: 'AI분석 영농 구성 상세 정보', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '71', id: 'NMP_08_04', name: 'AI분석 영농 개별 정보', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '72', id: 'NMP_09_01', name: 'AI분석 방치 쓰레기 지도', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '73', id: 'NMP_09_02', name: 'AI분석 방치 쓰레기 구성 목록', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '지도 서비스 (새탭)', menu2: '', order: '74', id: 'NMP_09_03', name: 'AI분석 방치 개별 정보', type: '레이어', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '사료작물 정보', order: '75', id: 'NAD_01_01', name: '사료작물 행정정보 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '사료작물 정보', order: '76', id: 'NAD_01_02', name: '사료작물 행정정보 파일 업로드', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '사료작물 정보', order: '77', id: 'NAD_01_03', name: '사료작물 행정정보 등록/수정', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '사료작물 정보', order: '78', id: 'NAD_01_04', name: '사료작물 행정정보 복제 등록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '농지이용 정보', order: '79', id: 'NAD_02_01', name: '농지 행정정보 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '농지이용 정보', order: '80', id: 'NAD_02_02', name: '농지 행정정보 파일 업로드', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '농지이용 정보', order: '81', id: 'NAD_02_03', name: '농지 행정정보 등록/수정', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '농지이용 정보', order: '82', id: 'NAD_02_04', name: '농지 행정정보 복제 등록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '영농시설 정보', order: '83', id: 'NAD_03_01', name: '영농 행정정보 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '영농시설 정보', order: '84', id: 'NAD_03_02', name: '영농 행정정보 파일 업로드', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '영농시설 정보', order: '85', id: 'NAD_03_03', name: '영농 행정정보 등록/수정', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '행정정보 관리', menu2: '영농시설 정보', order: '86', id: 'NAD_03_04', name: '농지 행정정보 복제 등록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '데이터셋 관리', menu2: '정사영상', order: '87', id: 'NDS_01_01', name: '정사영상 데이터셋 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '데이터셋 관리', menu2: '정사영상', order: '88', id: 'NDS_01_02', name: '정사영상 데이터셋 파일 업로드', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '데이터셋 관리', menu2: '정사영상', order: '89', id: 'NDS_01_03', name: '정사영상 데이터셋 등록/수정', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '데이터셋 관리', menu2: '공간정보', order: '90', id: 'NDS_02_01', name: '공간정보 데이터셋 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '데이터셋 관리', menu2: '공간정보', order: '91', id: 'NDS_02_02', name: '공간정보 데이터셋 파일 업로드', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '데이터셋 관리', menu2: '공간정보', order: '92', id: 'NDS_02_03', name: '공간정보 데이터셋 등록/수정', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '데이터셋 관리', menu2: '이미지셋', order: '93', id: 'NDS_03_01', name: '이미지셋 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '데이터셋 관리', menu2: '이미지셋', order: '94', id: 'NDS_03_02', name: '이미지셋 파일 업로드', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '데이터셋 관리', menu2: '이미지셋', order: '95', id: 'NDS_03_03', name: '이미지셋 등록/수정', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '보고서', menu2: '조사료 탐지 결과', order: '96', id: 'NRP_01_01', name: '사료작물 보고서 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '보고서', menu2: '조사료 탐지 결과', order: '97', id: 'NRP_01_02', name: '사료작물 보고서 발급 요청', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '보고서', menu2: '농지 활용 분석', order: '98', id: 'NRP_02_01', name: '농지 활용 보고서 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '보고서', menu2: '농지 활용 분석', order: '99', id: 'NRP_02_02', name: '농지 활용 보고서 발급 요청', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '보고서', menu2: '비닐하우스 탐지', order: '100', id: 'NRP_03_01', name: '비닐하우스 보고서 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '보고서', menu2: '비닐하우스 탐지', order: '101', id: 'NRP_03_02', name: '비닐하우스 보고서 발급 요청', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '통계', menu2: '조사료 탐지 통계', order: '102', id: 'NST_01_01', name: '조사료 탐지 통계', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '통계', menu2: '농지 활용 통계', order: '103', id: 'NST_02_01', name: '농지 활용 통계', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '통계', menu2: '비닐하우스 탐지 통계', order: '103', id: 'NST_03_01', name: '비닐하우스 탐지 통계', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '통계', menu2: '비닐하우스 탐지 통계', order: '104', id: 'NST_03_02', name: '비닐하우스 재배작목 통계', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '서비스 지원', menu2: '공지사항', order: '105', id: 'NBD_01_01', name: '공지사항 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '서비스 지원', menu2: '공지사항', order: '106', id: 'NBD_01_02', name: '공지사항 상세 정보', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '서비스 지원', menu2: '자주 묻는 질문', order: '107', id: 'NBD_02_01', name: '자주 묻는 질문 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '서비스 지원', menu2: '자주 묻는 질문', order: '108', id: 'NBD_02_02', name: '자주 묻는 질문 상세 정보', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '서비스 지원', menu2: '문의하기', order: '109', id: 'NBD_03_01', name: '문의하기 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '서비스 지원', menu2: '문의하기', order: '110', id: 'NBD_03_02', name: '문의하기 등록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '서비스 지원', menu2: '문의하기', order: '111', id: 'NBD_03_03', name: '문의하기 상세 정보', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '서비스 지원', menu2: '활용 사례', order: '112', id: 'NBD_04_01', name: '활용 사례 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '서비스 지원', menu2: '활용 사례', order: '113', id: 'NBD_04_02', name: '활용 사례 상세 정보', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '게시판 관리', menu2: '공지사항 관리', order: '114', id: 'NBM_01_01', name: '공지사항 관리 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '게시판 관리', menu2: '공지사항 관리', order: '115', id: 'NBM_01_02', name: '공지사항 등록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '게시판 관리', menu2: '공지사항 관리', order: '116', id: 'NBM_01_03', name: '공지사항 수정', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '게시판 관리', menu2: '문의 관리', order: '117', id: 'NBM_02_01', name: '문의 관리 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '게시판 관리', menu2: '문의 관리', order: '118', id: 'NBM_02_02', name: '문의 관리 답변 등록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '게시판 관리', menu2: 'FAQ 관리', order: '119', id: 'NBM_03_01', name: 'FAQ 관리 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '게시판 관리', menu2: 'FAQ 관리', order: '120', id: 'NBM_03_02', name: 'FAQ 등록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '게시판 관리', menu2: 'FAQ 관리', order: '121', id: 'NBM_03_02', name: 'FAQ 수정', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '사용자 관리', menu2: '', order: '122', id: 'NSM_01_01', name: '사용자 관리 목록', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '사용자 관리', menu2: '', order: '123', id: 'NSM_01_02', name: '사용자 로그인 이력', type: '일반', remarks: '', link: '#' },
  { category: '대표 메뉴', menu1: '사용자 관리', menu2: '', order: '124', id: 'NSM_01_03', name: '사용자 비밀번호 변경 이력', type: '일반', remarks: '', link: '#' },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return INITIAL_DATA;
    return INITIAL_DATA.filter(item => 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div id="root">
      <header className="header">
        <div className="header-title">
          <img src={logoImg} alt="Land-XI Logo" className="logo-img" />
          <span className="header-subtitle">서비스 구축 프로토타입</span>
        </div>
        <div className="header-info">
          <span>Total: {filteredData.length} Screens</span>
        </div>
      </header>

      <main className="main-content">
        <section className="control-panel">
          <div className="search-wrapper">
            <svg className="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="화면 ID 또는 이름으로 검색..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="status-summary">
            {/* Summary statistics can go here if needed */}
          </div>
        </section>

        <section className="table-container">
          <table>
            <thead>
              <tr>
                <th>구분</th>
                <th>1차 메뉴</th>
                <th>2차 메뉴</th>
                <th>순번</th>
                <th>화면 아이디</th>
                <th>화면 이름</th>
                <th>유형</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => {
                  const isDuplicateCategory = index > 0 && item.category === filteredData[index - 1].category;
                  
                  return (
                    <tr key={index}>
                      <td className={isDuplicateCategory ? 'category-faded' : ''}>{item.category}</td>
                      <td>{item.menu1}</td>
                      <td>{item.menu2}</td>
                      <td>{item.order}</td>
                      <td style={{ color: '#3b82f6', fontWeight: 500 }}>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        <span className={`badge ${
                          item.type === '모달' ? 'badge-type-modal' : 
                          item.type === '이메일' ? 'badge-type-email' : 
                          item.type === '레이어' ? 'badge-type-layer' :
                          'badge-type-general'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td style={{ color: '#5e6368', fontSize: '13px' }}>{item.remarks}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '60px', color: '#9ca3af' }}>
                    데이터가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
