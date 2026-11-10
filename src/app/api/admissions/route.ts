import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "admissions.json");

function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export async function GET() {
  try {
    ensureFile();
    const data = fs.readFileSync(DATA_FILE, "utf8");
    const applications = JSON.parse(data);
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

    ensureFile();
    const data = fs.readFileSync(DATA_FILE, "utf8");
    const applications = JSON.parse(data);

    const newApplication = {
      id: "APP-" + Date.now().toString(36).toUpperCase(),
      name,
      email,
      phone,
      program: program || "B.Sc. in CSE",
      sscGpa: parseFloat(sscGpa) || 0,
      hscGpa: parseFloat(hscGpa) || 0,
      status: "Submitted",
      createdAt: new Date().toISOString(),
    };

    applications.unshift(newApplication);
    fs.writeFileSync(DATA_FILE, JSON.stringify(applications, null, 2), "utf8");

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully!",
        applicationId: newApplication.id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
