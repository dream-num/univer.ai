export const IssueType = {
  'chrome-extension': 'chrome-extension',
  'gpt-extension': 'gpt-extension',
  'ai-completion': 'ai-completion',
} as const

// eslint-disable-next-line ts/no-redeclare
export type IssueType = typeof IssueType[keyof typeof IssueType]

export const issueTypeLabels: Record<IssueType, string> = {
  [IssueType['chrome-extension']]: 'Chrome extension',
  [IssueType['gpt-extension']]: 'GPT extension',
  [IssueType['ai-completion']]: 'Data completion',
}

export const issueTypeOptions = [
  { value: IssueType['chrome-extension'], label: issueTypeLabels[IssueType['chrome-extension']] },
  { value: IssueType['gpt-extension'], label: issueTypeLabels[IssueType['gpt-extension']] },
  { value: IssueType['ai-completion'], label: issueTypeLabels[IssueType['ai-completion']] },
]
