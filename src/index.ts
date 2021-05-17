import express from 'express';
import cors from 'cors';
import postRoutes from './routes/v1/posts';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port);
console.log('Express WebAPI listening on port ' + port);
