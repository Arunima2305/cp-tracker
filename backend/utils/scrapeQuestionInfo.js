import axios from "axios";
import * as cheerio from "cheerio";
export async function getQuestionInfo(url) {
  if (url.includes("codeforces")) return scrapeCodeforces(url); 
  if (url.includes("leetcode.com")) return scrapeLeetCode(url);
  return { error: "Unsupported platform" };
}
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import chromium from 'chrome-aws-lambda';

puppeteerExtra.use(StealthPlugin());

async function scrapeCodeforces(url) {
  let browser = null;
  try {
    browser = await puppeteerExtra.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage"],
});

    // ...the rest of your scraping logic...
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    await page.waitForSelector(".problem-statement", { timeout: 15000 });
    const html = await page.content();
    const $ = cheerio.load(html);

    const title = $(".problem-statement .header .title").first().text().trim();
    const tags = [];
    $("span.tag-box").each((_, el) => tags.push($(el).text().trim()));
    let difficulty = null;
    const lastTag = tags[tags.length - 1];
    if (lastTag && lastTag[0] === '*') {
      difficulty = lastTag;
      tags.pop();
    }

    await browser.close();

    return {
      platform: "Codeforces",
      title,
      tags,
      difficulty,
    };
  } catch (err) {
    if (browser) await browser.close();
    console.error("❌ Scraping Codeforces failed:", err.message);
    return { error: err.message };
  }
}


async function scrapeLeetCode(url) {
    try {
      const slug = url.split("/problems/")[1].split("/")[0];
  
      const query = {
        query: `
          query getQuestionDetail($titleSlug: String!) {
            question(titleSlug: $titleSlug) {
              questionId
              title
              difficulty
              topicTags {
                name
              }
            }
          }
        `,
        variables: {
          titleSlug: slug,
        },
      };
  
      const res = await axios.post("https://leetcode.com/graphql", query, {
        headers: {
          "Content-Type": "application/json",
          Referer: `https://leetcode.com/problems/${slug}/`,
          Origin: "https://leetcode.com",
          "User-Agent": "Mozilla/5.0",
        },
      });
  
      const q = res.data.data.question;
  
      return {
        platform: "LeetCode",
        title: q.title,
        tags: q.topicTags.map((tag) => tag.name),
        difficulty: q.difficulty,
      };
    } catch (err) {
      console.error("❌ LeetCode API scrape failed:", err.message);
      return { error: err.message };
    }
  }


