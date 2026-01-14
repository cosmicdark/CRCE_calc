// Test Steel.dev and Upstash Redis connections
const { chromium } = require('playwright-core');
const { Redis } = require('@upstash/redis');

async function testConnections() {
  console.log("=== Testing Steel.dev + Upstash Redis ===\n");
  
  // Test Redis
  console.log("1. Testing Upstash Redis...");
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL) {
      console.log("   ❌ UPSTASH_REDIS_REST_URL not set");
    } else {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      await redis.set("test-key", "hello");
      const value = await redis.get("test-key");
      if (value === "hello") {
        console.log("   ✅ Redis working! Test write/read successful.");
        await redis.del("test-key");
      }
    }
  } catch (e) {
    console.log("   ❌ Redis error:", e.message);
  }

  // Test Steel.dev
  console.log("\n2. Testing Steel.dev...");
  try {
    if (!process.env.STEEL_API_KEY) {
      console.log("   ❌ STEEL_API_KEY not set");
      console.log("   Falling back to local Playwright...");
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto("https://example.com");
      console.log("   ✅ Local Playwright working!");
      await browser.close();
    } else {
      const browser = await chromium.connectOverCDP(
        `wss://connect.steel.dev?apiKey=${process.env.STEEL_API_KEY}`
      );
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto("https://example.com");
      const title = await page.title();
      console.log("   ✅ Steel.dev working! Page title:", title);
      await browser.close();
    }
  } catch (e) {
    console.log("   ❌ Steel.dev error:", e.message);
  }

  console.log("\n=== Test Complete ===");
}

require('dotenv').config({ path: '.env.local' });
testConnections().catch(console.error);
