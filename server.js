const express = require('express');
const cors = require('cors');

const app = express();

// 1. 기본 설정 및 보안(CORS)
app.use(cors());

// 2. 용량 제한 설정 (긴 지문 분석 데이터 전송을 위해 50MB로 확장)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 3. 데이터 저장 변수 (단 한 번만 선언)
let latestAnalysisData = null;

// 4. API 경로 설정

// [Gems용] 분석 결과 저장
app.post('/api/save-analysis', (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ error: "No data provided" });
  }
  latestAnalysisData = data;
  console.log("✅ New Analysis Data Saved!");
  res.json({ message: "Success", timestamp: new Date() });
});

// [대시보드용] 분석 결과 가져오기
app.get('/api/get-analysis', (req, res) => {
  if (!latestAnalysisData) {
    return res.status(204).send(); // 데이터 없음
  }
  res.json(latestAnalysisData);
});

// [관리용] 서버 상태 체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'educreator API is running' });
});

// 5. 서버 시작 (단 한 번만 실행)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
