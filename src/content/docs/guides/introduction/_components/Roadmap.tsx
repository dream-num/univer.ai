import { Chart } from '@antv/g2'
import React, { useEffect, useRef } from 'react'

interface IProps {
  values: {
    start: string
    end: string
    type: string
    text: string
  }[]
}

export default function Roadmap(_props: IProps) {
  const chartRef = useRef(null)

  useEffect(() => {
    const { theme } = document.documentElement.dataset

    const chart = new Chart({
      container: chartRef.current!,
      autoFit: true,
      theme,
    })

    chart.coordinate({ transform: [{ type: 'transpose' }] })

    const data = [
      { name: 'a', month: 'Jan.', start: 1, end: 12 },
      { name: 'b', month: 'Feb.', start: 1, end: 12 },
      { name: 'c', month: 'Mar.', start: 1, end: 12 },
      { name: 'd', month: 'Apr.', start: 1, end: 12 },
      { name: 'e', month: 'May', start: 1, end: 12 },
      { name: 'f', month: 'Jun', start: 3, end: 12 },
      { name: 'g', month: 'Jul.', start: 1, end: 12 },
      { name: 'h', month: 'Aug.', start: 1, end: 12 },
      { name: 'i', month: 'Sep.', start: 1, end: 12 },
      { name: 'j', month: 'Oct.', start: 1, end: 12 },
      { name: 'k', month: 'Nov.', start: 1, end: 12 },
      { name: 'l', month: 'Dec.', start: 1, end: 12 },
      { name: 'Total', start: 1, end: 12 },
    ]

    chart
      .interval()
      .data(data)
      .encode('x', 'name')
      .encode('y', ['end', 'start'])
      .encode('color', (d: typeof data[number]) => d.name)
      .axis('y', {
        title: 'Frequency',
        labelFormatter: (_d: any) => 'd.repeat(3)',
        // titlePosition: 'top',
        // labelFormatter: (d, b, data) => {
        //   console.log(d, b, data)
        //   return data.month
        // },
      })
      .tooltip(['start', 'end'])

    chart.render()
  }, [])

  return (
    <div>
      <div ref={chartRef} />
    </div>
  )
}
