import express from 'express';
import { pool } from './db.mjs';

const app = express();
const port = 4000;

// 📍 **** สร้าง API เพื่อใช้ในการเพิ่มข้อมูลหนังเรื่องใหม่ไปที่ Database ตรงนี้ ****
app.use(express.json());
app.post('/movies', async (req, res) => {
  try {
    const newMovie = {
      ...req.body,
    };
    await pool.query(
      `insert into movies ( title, description, genres, year, poster, rating)
    values ($1, $2, $3, $4, $5, $6)`,
      [
        newMovie.title,
        newMovie.descript,
        newMovie.genres,
        newMovie.year,
        newMovie.poster,
        newMovie.rating,
      ],
    );
    return res.json({
      message: 'Movie has been created.',
    });
  } catch (e) {
    return res.json({
      message: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running at ${port}`);
});
