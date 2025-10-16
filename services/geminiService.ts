
import { GoogleGenAI } from "@google/genai";
import { Fortune, UserInfo } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFortune = async (userInfo: UserInfo): Promise<Fortune> => {
  const { name, year, month, day, bloodType, zodiacSign } = userInfo;

  const prompt = `
    あなたは、世界一当たる、優しく思慮深い占い師です。診断結果は、ユーザーに寄り添い、未来を良くするための現実的なアドバイスを提供します。

    # 個人情報
    - 氏名: ${name}
    - 生年月日: ${year}年${month}月${day}日
    - 血液型: ${bloodType}型
    - 星座: ${zodiacSign}

    # 最重要ルール：エラー回避のため、この指示を厳守すること
    1.  **診断**: ユーザーの生年月日をもとに、その日の運勢を診断します。
    2.  **トーン**: 言葉遣いは優しく、丁寧で簡潔にしてください。
    3.  **評価**: 総合運、金運、健康運、恋愛運、仕事運の5項目すべてについて、\`luck\`として★の数（1～5の数値）で評価します。
        * **運勢が平均的、または標準的な場合**は、必ず**★3つ（\`"luck": 3\`）**を使用してください。
    4.  **ラッキーアイテム**: アイテム名とその具体的な活用方法を提案してください。
    5.  **出力形式**: **一切の追加の挨拶や説明をせず**、以下のJSON形式に**厳密に**従って日本語で出力してください。説明や前置き、\`\`\`jsonのようなマークダウンは一切含めないでください。

    # 指示
    - 上記のルールに厳密に従い、以下の情報を分析して、今日の運勢を占ってください。
    - Google検索も利用して、占いの結果にリアリティと深みを与えてください。
    - 結果は、以下のJSON形式に厳密に従って日本語で出力してください。

    {
      "overall": { "luck": 3, "text": "[簡潔な診断結果]" },
      "money": { "luck": 3, "text": "[簡潔な診断結果]" },
      "health": { "luck": 3, "text": "[簡潔な診断結果]" },
      "love": { "luck": 3, "text": "[簡潔な診断結果]" },
      "work": { "luck": 3, "text": "[簡潔な診断結果]" },
      "luckyItem": "[アイテム名と活用方法]"
    }
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    // Clean potential markdown formatting
    const cleanedJsonText = jsonText.replace(/^```json\s*|```$/g, '');
    return JSON.parse(cleanedJsonText) as Fortune;
  } catch (error) {
    console.error("Error fetching fortune from Gemini API:", error);
    throw new Error("Failed to generate fortune.");
  }
};

export const getOmikuji = async (): Promise<string> => {
  const prompt = `
あなたはプロの占い師です。
ユーザーのために、今日のおみくじを生成してください。

# ルール
- 以下の5項目について、星1から5個（★☆☆☆☆～★★★★★）で運勢を評価します。
- 星の数は、完全にランダムかつ均等な確率で決定してください。
- 各項目の評価には、その星の数に基づいた前向きで簡潔なコメントを添えてください。
- 最後に、占い師からのポジティブなアドバイスを30～50字程度で加えてください。
- 出力は、以下の「出力形式」を厳密に守ってください。挨拶や他のテキストは一切含めないでください。

# 出力形式
---
✨ 今日のあなたの運勢 ✨

【総合運】
（ここに星評価とコメント）

【金運】
（ここに星評価とコメント）

【恋愛運】
（ここに星評価とコメント）

【仕事運】
（ここに星評価とコメント）

【健康運】
（ここに星評価とコメント）

---
🔮 占い師からのアドバイス：
（ここにアドバイス）
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error fetching omikuji from Gemini API:", error);
        throw new Error("Failed to generate omikuji.");
    }
};
