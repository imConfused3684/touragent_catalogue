import express from 'express';
import cors from 'cors';
import HotelsCtrl from './pages/Hotels/HotelsCtrl';
import UsersCtrl from './pages/Users/UsersCtrl';

const PORT = 5000;

const app = express();

app.use(express.json({limit: '500mb'}));

app.use(cors());

app.use(HotelsCtrl);
app.use(UsersCtrl);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})