// @thrphybot — main entry point
// Stack: Node.js + Telegraf
// Deploy target: Railway (via GitHub)

const { Telegraf, Markup } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("Missing BOT_TOKEN environment variable. Set it in Railway's Variables tab.");
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

// ---- Menu of functions ----
const FUNCTIONS = [
  { id: "dashboard", label: "📊 Generate Dashboard" },
  { id: "analytics", label: "📈 Chrome Web Store Analytics Report" },
  { id: "fake_dashboard", label: "🖼️ Fake Dashboard (UI Demo)" },
  { id: "landing_page", label: "🌐 Product Landing Page" },
  { id: "promo_screenshots", label: "📸 Promotional Screenshots" },
  { id: "logo", label: "🎨 Extension Logo" },
  { id: "icons", label: "🧩 Extension Icons" },
  { id: "feature_cards", label: "🗂️ Feature Cards" },
  { id: "banner", label: "🏳️ Extension Banner" },
  { id: "store_screenshots", label: "🛍️ Chrome Store Screenshots" },
  { id: "readme", label: "📄 README" },
  { id: "api_docs", label: "📚 API Documentation" },
  { id: "project_structure", label: "🗃️ Project Structure" },
  { id: "investor_deck", label: "💼 Investor Presentation" },
];

function mainMenu() {
  const buttons = FUNCTIONS.map((f) =>
    Markup.button.callback(f.label, `run:${f.id}`)
  );
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }
  return Markup.inlineKeyboard(rows);
}

// ---- Handlers ----

bot.start((ctx) => {
  ctx.reply(
    `Welcome to @thrphybot 👋\n\nChoose what you'd like to generate:`,
    mainMenu()
  );
});

bot.help((ctx) => {
  ctx.reply(
    "Send /start to see the menu of generator functions.\nEach button triggers a specific generation task."
  );
});

bot.action(/run:(.+)/, async (ctx) => {
  const id = ctx.match[1];
  const fn = FUNCTIONS.find((f) => f.id === id);
  await ctx.answerCbQuery();

  if (!fn) {
    return ctx.reply("Unknown function.");
  }

  // Placeholder — replace with real generation logic per function id
  await ctx.reply(
    `⚙️ Running: ${fn.label}\n\n(This is a stub. Wire up the actual generation logic for "${id}" here.)`
  );
});

bot.on("text", (ctx) => {
  ctx.reply("Use /start to see available generator functions.");
});

// ---- Launch ----
bot.launch();
console.log("thrphybot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
