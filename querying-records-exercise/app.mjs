import express from 'express';
import { pool } from './db.mjs';

const app = express();
const port = 4000;

app.use(express.json());
// 📍 **** สร้าง API เพื่อใช้ในการดูข้อมูลหนังแต่ละเรื่องด้วย movieId ตรงนี้ ****
app.get('/movie', async (req, res) => {
  try {
    const result = await pool.query('select * from movies');
    return res.json({
      data: result.rows,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.get('/movie/:movieID', async (req, res) => {
  try {
    const movieID = req.params.movieID;
    const result = await pool.query(
      'select * from movies where movie_id = $1',
      [movieId],
    );
    return res.json({
      data: result.rows[0],
    });
  } catch (error) {
    return res.json({
      message: 'ไม่สามารถเชื่อมต่อ Database ได้',
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running at ${port}`);
});
