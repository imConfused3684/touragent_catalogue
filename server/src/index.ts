import express from 'express';
import cors from 'cors';
import HotelsCtrl from './pages/Hotels/HotelsCtrl';
import CommentsCtrl from './pages/Comments/CommentsCtrl';

const PORT = 5000;

const app = express();

app.use(express.json());

app.use(cors());

app.use(HotelsCtrl);
app.use(CommentsCtrl);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})