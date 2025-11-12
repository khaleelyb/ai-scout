import { GoogleGenAI } from "@google/genai";
import { Player } from '../types';

// Fix: Per coding guidelines, initialize the AI client directly with the environment variable.
// Assume process.env.API_KEY is available in the execution context.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateScoutingReport = async (player: Player): Promise<string> => {
  try {
    const prompt = `
      Act as a world-class football scout with decades of experience identifying top talent.
      Based on the following young player's profile, write a detailed, professional scouting report.

      Player Profile:
      - Name: ${player.name}
      - Age: ${player.age}
      - Position: ${player.position}
      - Club: ${player.club}
      - Nationality: ${player.nationality}
      - Key Stats (this season): ${player.stats.goals} goals, ${player.stats.assists} assists, ${player.stats.rating.toFixed(1)} average rating.

      The report should be structured with the following sections, using Markdown for formatting (e.g., use '##' for headings):
      1.  ## Player Summary
          A brief, high-level overview of the player's profile and potential.

      2.  ## Key Strengths
          Analyze and list 3-4 of the player's most significant strengths. Be specific (e.g., "Exceptional close control in tight spaces" instead of just "Good dribbling").

      3.  ## Areas for Development
          Identify 2-3 specific weaknesses or areas where the player needs to improve to reach the next level. Frame this constructively.

      4.  ## Tactical Fit & Potential
          Describe the ideal tactical system for this player. Project their potential - are they a future squad player for a top team, a rotational option, or a world-class talent?

      5.  ## Professional Comparison
          Compare the player's style to a well-known current or former professional player, explaining the similarities.

      Generate the report now.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("Error generating scouting report:", error);
    // Fix: Updated error message to be more generic and user-friendly, avoiding mention of API keys as per guidelines.
    return "## Error\n\nThere was an issue generating the scouting report. Please try again later.";
  }
};
