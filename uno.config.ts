import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['u-border-primary', { 'border-color': '#ffbb00' }],
    ['u-border-default', { 'border-color': '#f6f6f6' }],
    ['u-bg-primary', { 'background-color': '#ffbb00' }],
    ['u-bg-default', { 'background-color': '#f9f9f9' }],
    ['u-bg-auxiliary', { 'background-color': '#f7f7f7' }],
    ['u-text-title', { color: '#333333' }],
    ['u-text-content', { color: '#666666' }],
    ['u-text-tip', { color: '#999999' }],
    ['u-text-default', { color: '#f9f9f9' }],
    ['u-text-primary', { color: '#ffbb00' }]
  ]
})
