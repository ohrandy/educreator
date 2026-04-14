const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 간단한 테스트 엔드포인트
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'educreator API is running' });
});

// OpenAPI/Swagger 문서 엔드포인트
app.get('/api/docs', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'Educreator API',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'https://educreator.onrender.com',
        description: 'Production server'
      }
    ],
    paths: {
      '/api/health': {
        get: {
          summary: 'Health check',
          responses: {
            '200': {
              description: 'Service is healthy'
            }
          }
        }
      }
    }
  });
});
// 데이터를 임시로 저장할 변수 (서버 재시작 전까지 유지됨)
let latestAnalysisData = null;

// [Gems용] GPTs Action이 분석 결과를 보낼 주소
app.post('/api/save-analysis', (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ error: "No data provided" });
  }
  latestAnalysisData = data; // 전달받은 JSON을 서버 변수에 저장
  console.log("New Analysis Data Saved!");
  res.json({ message: "Success", timestamp: new Date() });
});

// [대시보드용] 리액트 Canvas가 데이터를 가져갈 주소
app.get('/api/get-analysis', (req, res) => {
  if (!latestAnalysisData) {
    return res.status(204).send(); // 보낼 데이터가 없으면 '내용 없음' 응답
  }
  res.json(latestAnalysisData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
