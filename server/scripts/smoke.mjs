const baseUrl = process.env.API_BASE_URL || "http://localhost:3000";

async function assertRequest(name, input, init, validate) {
  const res = await fetch(input, init);
  const text = await res.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }

  const ok = validate(res, body);
  if (!ok) {
    throw new Error(`${name} failed: status=${res.status}, body=${JSON.stringify(body)}`);
  }
  console.log(`PASS: ${name}`);
}

await assertRequest(
  "GET / health",
  `${baseUrl}/`,
  { method: "GET" },
  (res, body) => res.status === 200 && typeof body === "string" && body.includes("API WORKING")
);

await assertRequest(
  "POST /api/users/login validation",
  `${baseUrl}/api/users/login`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  },
  (res, body) =>
    res.status === 400 &&
    body?.success === false &&
    body?.message === "Validation failed" &&
    Array.isArray(body?.data?.issues)
);

await assertRequest(
  "POST /api/ai/ats-score unauthorized",
  `${baseUrl}/api/ai/ats-score`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jobDescription: "Need React and Node developer with MongoDB experience.",
      resumeData: {},
    }),
  },
  (res, body) => res.status === 401 && body?.success === false
);

console.log("Smoke checks passed.");
