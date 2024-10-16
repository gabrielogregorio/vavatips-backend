import mongoose from 'mongoose';
import { IView } from 'src/interfaces/view';

const viewSchema = new mongoose.Schema<IView>(
  {
    // decidi remover completamnente o _id, ele causa várias inconsistencias chatas que não quero lidar, além de acoplar o formato dos ids
    id: {
      type: String,
      unique: true,
    },
    ip: String,
    dateAccess: Date,
  },
  {
    timestamps: true,
    id: true,
  },
);

export const View = mongoose.model<IView>('View', viewSchema);
