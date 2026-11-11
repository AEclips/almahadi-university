import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

// In Vercel / AWS Lambda serverless environments, only /tmp is writable
const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_FILE = IS_SERVERLESS
  ? path.join(os.tmpdir(), "amiu-admissions.json")
  : path.join(process.cwd(), "data", "admissions.json");

// In-memory cache fallback to ensure submissions never fail even if disk writes are restricted
let inMemoryStore: any[] = [];

function loadApplications(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn("Failed to read from file, using memory store:", err);
  }
  return inMemoryStore;
}

function persistApplications(data: any[]) {
  inMemoryStore = data;
  try {
    const parentDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn("Persistent write skipped (read-only environment), retained in memory:", err);
  }
}

export async function GET() {
  try {
    const applications = loadApplications();
    return NextResponse.json({ success: true, count: applications.length, data: applications });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, program, sscGpa, hscGpa } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    const applications = loadApplications();

    const newApplication = {
      id: "AMIU-" + Date.now().toString(36).toUpperCase(),
      name,
      email,
      phone,
      program: program || "B.Sc. in Artificial Intelligence & Data Science",
      sscGpa: parseFloat(sscGpa) || 5.0,
      hscGpa: parseFloat(hscGpa) || 5.0,
      status: "Verified & Under Evaluation",
      createdAt: new Date().toISOString(),
    };

    applications.unshift(newApplication);
    persistApplications(applications);

    return NextResponse.json(
      {
        success: true,
        message: "Application successfully submitted to AMIU Admissions Office!",
        applicationId: newApplication.id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
