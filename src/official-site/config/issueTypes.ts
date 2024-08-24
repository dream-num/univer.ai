export const IssueType = {
  clipsheet: 'clipsheet',
  'gpt-extension': 'gpt-extension',
  'ai-completion': 'ai-completion',
  'univer-sheet': 'univer-sheet',
} as const

// eslint-disable-next-line ts/no-redeclare
export type IssueType = typeof IssueType[keyof typeof IssueType]

export const issueTypeLabels: Record<IssueType, string> = {
  [IssueType.clipsheet]: 'ClipSheet',
  [IssueType['gpt-extension']]: 'GPT extension',
  [IssueType['ai-completion']]: 'Data completion',
  [IssueType['univer-sheet']]: 'Univer Sheet',
}

export const issueTypeOptions = [
  { value: IssueType.clipsheet, label: issueTypeLabels[IssueType.clipsheet] },
  // { value: IssueType['gpt-extension'], label: issueTypeLabels[IssueType['gpt-extension']] },
  // { value: IssueType['ai-completion'], label: issueTypeLabels[IssueType['ai-completion']] },
  { value: IssueType['univer-sheet'], label: issueTypeLabels[IssueType['univer-sheet']] },
]
