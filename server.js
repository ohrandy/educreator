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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
