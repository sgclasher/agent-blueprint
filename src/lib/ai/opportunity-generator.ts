import { openai } from '@/lib/openai/client';
import { opportunityGeneratorSystemPrompt } from '@/lib/openai/prompts';
import { saveOpportunitiesTool } from '@/lib/openai/tools';
import { type SurveyFormData } from '@/lib/validations/survey';

export async function generateOpportunities(surveyData: SurveyFormData) {
  try {
    const userContent = `
      Initiative: ${surveyData.initiative}
      Challenge: ${surveyData.challenge}
      Current Systems: ${surveyData.systems.join(', ')}
      Business Value: ${surveyData.value}
    `;

    const model = 'gpt-4o';
    console.log(`--- Calling OpenAI with model: ${model} ---`);

    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: opportunityGeneratorSystemPrompt },
        { role: 'user', content: userContent },
      ],
      tools: [saveOpportunitiesTool],
      tool_choice: {
        type: 'function',
        function: { name: 'save_opportunities' },
      },
    });
    
    const toolCall = response.choices[0].message.tool_calls?.[0];
    if (!toolCall || toolCall.function.name !== 'save_opportunities') {
      throw new Error('Invalid response from AI. Expected a tool call to `save_opportunities`.');
    }

    const { opportunities } = JSON.parse(toolCall.function.arguments);
    
    if (!opportunities || !Array.isArray(opportunities) || opportunities.length !== 3) {
      throw new Error('Invalid response from AI. Expected an array of 3 opportunities.');
    }
    
    // Here we would typically also add logging of the AI interaction (cost, tokens, etc.)
    // This will be implemented in Week 4.

    return opportunities;

  } catch (error) {
    console.error('Error generating opportunities:', error);
    // For now, we'll re-throw. In a production app, you might want more robust error handling,
    // like returning a fallback or retrying with a different model.
    throw new Error('Failed to generate AI opportunities.');
  }
} 