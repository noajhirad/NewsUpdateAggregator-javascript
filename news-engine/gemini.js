"use strict";

const {
  GoogleGenerativeAI,
  FunctionDeclarationSchemaType,
} = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: FunctionDeclarationSchemaType.ARRAY,
      items: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          title: {
            type: FunctionDeclarationSchemaType.STRING,
          },
          link: {
            type: FunctionDeclarationSchemaType.STRING,
          },
          summary: {
            type: FunctionDeclarationSchemaType.STRING,
          },
        },
      },
    },
  },
});

async function getTopArticles(articles, preferences) {
  try {
    const prompt = `Select at least 5 of the most interesting articles based on their titles and links, and summarize each article. Consider that the reader's preferences are ${preferences}. Output a list of the most interesting articles, formatted as an array of objects with title, link and summary properties. Here is the list of arricles: ${JSON.stringify(
      articles
    )}`;
    const result = await model.generateContent(prompt);

    return [result.response.text(), 200, ""];
  } catch (error) {
    return [[], 500, error.message];
  }
}

module.exports = {
  getTopArticles,
};

/*
[
  {
    title: 'USI Expands Global Footprint: New Completion of Tonala Site in Mexico',
    link: 'https://www.prnewswire.com/apac/news-releases/usi-expands-global-footprint-new-completion-of-tonala-site-in-mexico-302198813.html'
  },
  {
    title: 'USI Expands Global Footprint: New Completion of Tonala Site in Mexico',
    link: 'https://en.prnasia.com/story/454345-0.shtml'
  },
  {
    title: 'Ditch Prime Day: These 50+ Walmart deals are even better',
    link: 'https://www.zdnet.com/home-and-office/best-prime-day-walmart-deals-2024-07-16/'
  },
  {
    title: 'NIC Stock Earnings: Nicolet Bankshares Beats EPS, Beats Revenue for Q2 2024',
    link: 'https://investorplace.com/earning-results/2024/07/nic-stock-earnings-nicolet-bankshares-for-q2-of-2024/'
  },
  {
    title: 'CARV Stock Earnings: Carver Bancorp Reported Results for Q4 2024',
    link: 'https://investorplace.com/earning-results/2024/07/carv-stock-earnings-carver-bancorp-for-q4-of-2024/'
  },
  {
    title: 'BFC Stock Earnings: Bank First Beats EPS, Misses Revenue for Q2 2024',
    link: 'https://investorplace.com/earning-results/2024/07/bfc-stock-earnings-bank-first-for-q2-of-2024/' 
  },
  {
    title: 'Engineering marvel to smooth flow of traffic, wealth across Pearl River Delta',
    link: 'http://www.ecns.cn/news/society/2024-07-17/detail-iheeixnu9403652.shtml'
  },
  {
    title: 'Shenzhen to offer affordable self-driving minibus rides',
    link: 'http://www.ecns.cn/news/society/2024-07-17/detail-iheeixnu9403646.shtml'
  },
  {
    title: "China's first commercial space launch site gears up",
    link: 'http://www.ecns.cn/news/sci-tech/2024-07-17/detail-iheeixnu9403650.shtml'
  },
  {
    title: 'Structural reforms key priority area',
    link: 'http://www.ecns.cn/news/economy/2024-07-17/detail-iheeixnu9403656.shtml'
  },
  {
    title: 'Every AFL contender’s critical fixtures revealed as final awaits fallen giant',
    link: 'https://www.foxsports.com.au/afl/afl-2024-every-finals-contenders-defining-fixtures-fixture-analysis-run-home-predicted-win-totals-top-eight-first-crack-comments-latest-news/news-story/758503d7ca86fd39a7f0d4611b93b0a7'
  },
  {
    title: 'Giant 96-foot asteroid hurtling toward close encounter with Earth at 26525 kmph today: NASA',   
    link: 'https://www.news9live.com/science/bta-giant-96-foot-asteroid-hurtling-toward-encounter-with-earth-at-speed-of-26525-kmph-today-nasa-2620235'
  },
  {
    title: 'Grassroots soccer event helps boost consumption',
    link: 'http://www.ecns.cn/news/economy/2024-07-17/detail-iheeixnu9403644.shtml'
  },
  {
    title: 'Engineering marvel to smooth flow of traffic, wealth across Pearl River Delta',
    link: 'http://www.ecns.cn/news/society/2024-07-17/detail-iheeixnu9403652.shtml'
  },
  {
    title: "Watch: Photographer captures goat 'dancing' on Subaru at Mount Blue Sky",
    link: 'https://ca.news.yahoo.com/watch-photographer-captures-goat-dancing-015259666.html'
  },
  {
    title: "Julie Bishop doesn't look like this anymore! Minister for Fashion unveils yet another hair transformation after experimenting with an edgy cut",
ster-Fashion-unveils-daring-new-edgy-hair-transformation.html?ito=1490&ns_campaign=1490&ns_mchannel=rss'    
  },
  {
    title: 'Washington state awards $52 million from carbon auctions for tribal climate adaptation',        
    link: 'https://www.eagletribune.com/region/washington-state-awards-52-million-from-carbon-auctions-for-tribal-climate-adaptation/article_7d7b582c-bc89-5e07-814f-bd49bf97cc73.html'
  },
  {
    title: "Prime Day tablet deals 2024: all the best discounts we've spotted",
    link: 'https://www.gamesradar.com/amazon-prime-day-tablet-deals/'
  },
  {
    title: 'YouTube star wakes up in hospital to learn his girlfriend had died from an infection after the pair fell sick eating seafood',
    link: 'https://www.dailymail.co.uk/femail/article-13641453/youtuber-Billy-LeBlanc-hospital-girlfriend-died-eating-seafood-infection.html?ito=1490&ns_campaign=1490&ns_mchannel=rss'
  },
  {
    title: '8 Prime Day deals from Reddit users that are actually good, according to our experts',
    link: 'https://www.businessinsider.com/guides/deals/amazon-prime-day-reddit-recommended-products-2024-7'  }
]
*/
