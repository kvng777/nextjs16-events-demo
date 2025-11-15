import mongoose, { Document, Model, Schema } from 'mongoose';

// Strongly-typed Event document interface
export interface EventDocument extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // stored as ISO date string (YYYY-MM-DD)
  time: string; // stored as HH:mm (24h)
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Utility: simple slug generator (no external deps)
function makeSlug(input: string): string {
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace to -
    .replace(/-+/g, '-') // collapse multiple -
    .replace(/^-+|-+$/g, ''); // trim -
}

const EventSchema = new Schema<EventDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      validate: {
        // Ensure validator returns a boolean (avoid returning the raw string when falsy)
        validator: (v: string) => typeof v === 'string' && v.trim().length > 0,
        message: 'Title cannot be empty',
      },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: { type: String, required: [true, 'Description is required'], trim: true },
    overview: { type: String, required: [true, 'Overview is required'], trim: true },
    image: { type: String, required: [true, 'Image is required'], trim: true },
    venue: { type: String, required: [true, 'Venue is required'], trim: true },
    location: { type: String, required: [true, 'Location is required'], trim: true },
    date: { type: String, required: [true, 'Date is required'], trim: true },
    time: { type: String, required: [true, 'Time is required'], trim: true },
    mode: { type: String, required: [true, 'Mode is required'], trim: true },
    audience: { type: String, required: [true, 'Audience is required'], trim: true },
    agenda: {
      type: [String],
      required: [true, 'Agenda is required'],
      validate: {
        validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0,
        message: 'Agenda must be a non-empty array of strings',
      },
    },
    organizer: { type: String, required: [true, 'Organizer is required'], trim: true },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      validate: {
        validator: (arr: string[]) => Array.isArray(arr) && arr.length > 0,
        message: 'Tags must be a non-empty array of strings',
      },
    },
  },
  {
    timestamps: true, // auto-manage createdAt & updatedAt
  }
);

// Add a unique index on slug for fast lookup and uniqueness enforcement
EventSchema.index({ slug: 1 }, { unique: true });

// Pre-save hook: generate/refresh slug only when title changes,
// normalize date to YYYY-MM-DD (ISO date) and time to HH:mm (24h).
EventSchema.pre<EventDocument>('save', function (next) {
  try {
    // Generate slug when title is new or modified
    if (this.isModified('title')) {
      this.slug = makeSlug(this.title);
    }

    // Normalize date: attempt to parse and store as YYYY-MM-DD
    const dateCandidate = new Date(this.date);
    if (Number.isNaN(dateCandidate.getTime())) {
      throw new Error('Invalid date format');
    }
    // Store only the date portion as ISO YYYY-MM-DD
    const isoDate = dateCandidate.toISOString().split('T')[0];
    this.date = isoDate;

    // Normalize time: parse against arbitrary day and store HH:mm (24h)
    const timeCandidate = new Date(`1970-01-01 ${this.time}`);
    if (Number.isNaN(timeCandidate.getTime())) {
      throw new Error('Invalid time format');
    }
    const hh = String(timeCandidate.getUTCHours()).padStart(2, '0');
    const mm = String(timeCandidate.getUTCMinutes()).padStart(2, '0');
    this.time = `${hh}:${mm}`;

    next();
  } catch (err) {
    next(err as Error);
  }
});

const EventModel: Model<EventDocument> =
  mongoose.models.Event || mongoose.model<EventDocument>('Event', EventSchema);

export default EventModel;
