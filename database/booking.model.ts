import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import EventModel, { EventDocument } from './event.model';

// Strongly-typed Booking document interface
export interface BookingDocument extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<BookingDocument>(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: [true, 'eventId is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => {
          // simple email regex validation
          return /^(?:[a-zA-Z0-9_'^&+\-/=]+(?:\.[a-zA-Z0-9_'^&+\-/=]+)*)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(v);
        },
        message: 'Invalid email format',
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index on eventId for faster lookups
BookingSchema.index({ eventId: 1 });

// Pre-save hook: verify referenced event exists before saving booking
BookingSchema.pre<BookingDocument>('save', async function (next) {
  try {
    const eventExists = await EventModel.exists({ _id: this.eventId });
    if (!eventExists) {
      throw new Error('Referenced event does not exist');
    }
    next();
  } catch (err) {
    next(err as Error);
  }
});

const BookingModel: Model<BookingDocument> =
  mongoose.models.Booking || mongoose.model<BookingDocument>('Booking', BookingSchema);

export default BookingModel;
