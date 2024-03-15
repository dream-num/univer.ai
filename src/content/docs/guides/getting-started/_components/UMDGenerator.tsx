import { Checkbox, CheckboxGroup } from '@univerjs/design'
import { useState } from 'react'

export default function UMDGenerator() {
  const [result, setResult] = useState<(string | number | boolean)[]>([])

  function handleChange(value: (string | number | boolean)[]) {
    setResult(value)
  }

  return (
    <section>
      <CheckboxGroup value={result as any} onChange={handleChange}>
        <Checkbox>xx</Checkbox>
        <Checkbox>xx</Checkbox>
        <Checkbox>xx</Checkbox>
      </CheckboxGroup>
    </section>
  )
}
