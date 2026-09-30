import { authenticate } from "@/lib/middleware/auth";
import { unauthorized, ok, bad } from "@/lib/api";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request) {
  if (!(await authenticate())) return unauthorized();

  const form = await request.formData();
  const file = form.get("file");
  if (!file || !file.name) return bad("No file provided");

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "vedam/gallery",
          resource_type: "image",
          filename: file.name.replace(/\.[^.]+$/, ""),
        },
        (err, res) => (err ? reject(err) : resolve(res))
      );
      stream.end(buffer);
    });

    return ok({ url: result.secure_url }, 201);
  } catch (err) {
    return bad(err.message || "Upload failed", 502);
  }
}
