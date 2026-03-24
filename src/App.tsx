import { useState, useMemo } from 'react';
import './App.css';

interface ScreenItem {
  category: string;
  menu1: string;
  menu2: string;
  id: string;
  name: string;
  status: string;
  remarks: string;
  link: string;
}

// Initial empty items or sample data for demonstration
const INITIAL_DATA: ScreenItem[] = [
  { category: '공통', menu1: '메인', menu2: '-', id: 'COM_MAIN_01', name: '대시보드', status: '진행중', remarks: '디자인 반영중', link: '#' },
  { category: '공통', menu1: '로그인', menu2: '일반', id: 'COM_LOGIN_01', name: '로그인 메인', status: '완료', remarks: '', link: '#' },
  { category: '회원', menu1: '가입', menu2: '본인인증', id: 'MB_JOIN_01', name: '회원가입 약관동의', status: '대기', remarks: '', link: '#' },
  { category: '회원', menu1: '정보수정', menu2: '-', id: 'MB_INFO_01', name: '회원정보 관리', status: '진행중', remarks: '추가 요구사항 확인 필요', link: '#' },
  { category: '시스템', menu1: '관리자', menu2: '권한관리', id: 'SYS_PERM_01', name: '권한 설정', status: '대기', remarks: '', link: '#' },
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
          <h1>Land-XI</h1>
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
                <th>화면 ID</th>
                <th>화면 이름</th>
                <th>구분</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} onClick={() => window.open(item.link, '_blank')}>
                    <td>{item.category}</td>
                    <td>{item.menu1}</td>
                    <td>{item.menu2}</td>
                    <td style={{ color: '#3b82f6', fontWeight: 500 }}>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <span className={`badge ${item.status === '진행중' ? 'badge-progress' : item.status === '대기' ? 'badge-pending' : 'badge-default'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ color: '#5e6368', fontSize: '13px' }}>{item.remarks}</td>
                  </tr>
                ))
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
