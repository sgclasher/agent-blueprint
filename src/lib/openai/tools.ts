import { type OpenAI } from 'openai';

export const saveOpportunitiesTool: OpenAI.Chat.Completions.ChatCompletionTool = {
  type: 'function',
  function: {
    name: 'save_opportunities',
    description: 'Saves the three generated AI opportunities to the database.',
    parameters: {
      type: 'object',
      properties: {
        opportunities: {
          type: 'array',
          description: 'An array of three distinct AI opportunities.',
          items: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'A concise, compelling title for the opportunity.',
              },
              description: {
                type: 'string',
                description: 'A clear, brief description of the proposed solution.',
              },
              roiEstimate: {
                type: 'object',
                properties: {
                  timeframe: {
                    type: 'string',
                    description: 'The estimated timeframe for seeing a return (e.g., "per week", "per month").',
                  },
                  metric: {
                    type: 'string',
                    description: 'The primary metric for the ROI (e.g., "hours saved", "cost reduction").',
                  },
                  value: {
                    type: 'string',
                    description: 'The quantifiable value of the ROI (e.g., "10", "15%").',
                  },
                },
                required: ['timeframe', 'metric', 'value'],
              },
              workflowSteps: {
                type: 'array',
                description: 'A high-level list of steps to implement the solution.',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string', description: 'The title of the workflow step.' },
                    description: { type: 'string', description: 'A brief description of the step.' },
                    toolsRequired: {
                      type: 'array',
                      items: { type: 'string' },
                      description: 'A list of tools or software needed for this step.',
                    },
                  },
                  required: ['title', 'description', 'toolsRequired'],
                },
              },
              priority: {
                type: 'string',
                enum: ['high', 'medium', 'low'],
                description: 'The priority of the opportunity based on its impact-to-effort ratio.',
              },
            },
            required: ['title', 'description', 'roiEstimate', 'workflowSteps', 'priority'],
          },
        },
      },
      required: ['opportunities'],
    },
  },
}; 