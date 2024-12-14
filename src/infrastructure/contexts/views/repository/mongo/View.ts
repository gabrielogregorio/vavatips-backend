import { IView } from '@/infrastructure/api/interfaces/view';
import mongoose from 'mongoose';

const viewSchema = new mongoose.Schema<IView>(
  {
    ip: String,
    dateAccess: Date,
  },
  {
    timestamps: true,
    id: true,
  },
);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const View = mongoose.model<IView>('View', viewSchema);
