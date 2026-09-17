import mongoose from "mongoose";

/**
 * Single-document "About Us" content editor.
 * The whole About page is one document with nested sections.
 */
const AboutSectionSchema = new mongoose.Schema(
  {
    eyebrow: String,
    title: String,
    body: String,
    image: String,
    founderName: String,
    founderRole: String,
    est: String,
  },
  { _id: false }
);

const AboutSchema = new mongoose.Schema(
  {
    hero: { type: AboutSectionSchema, default: {} },
    quote: {
      text: { type: String, default: "" },
      attribution: { type: String, default: "" },
      _id: false,
    },
    story: {
      eyebrow: String,
      title: String,
      paragraphs: [String],
      signature: String,
      image: String,
      _id: false,
    },
    overview: {
      eyebrow: String,
      title: String,
      body: String,
      values: [{ title: String, desc: String, _id: false }],
      _id: false,
    },
    stats: [{ value: Number, suffix: String, label: String, _id: false }],
    faqs: [{ question: String, answer: String, _id: false }],
  },
  { timestamps: true }
);

export default mongoose.models.About || mongoose.model("About", AboutSchema);