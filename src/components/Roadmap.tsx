import type { Chart } from '@antv/g2'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useTheme } from 'nextra-theme-docs'
import React, { useEffect, useRef, useState } from 'react'

dayjs.extend(customParseFormat)

interface IProps {
  data: {
    start: string
    end: string
    name: string
  }[]
}

export default function Roadmap(props: IProps) {
  const { data } = props

  const { resolvedTheme } = useTheme()

  const chartRef = useRef(null)
  const [chart, setChart] = useState<Chart | null>(null)

  useEffect(() => {
    if (chart) {
      chart.destroy()
      setChart(null)
    }

    import('@antv/g2').then(({ Chart }) => {
      const chart = new Chart({
        container: chartRef.current!,
        autoFit: true,
        theme: resolvedTheme,
        height: data.length * 64 + 128,
      })

      setChart(chart)

      chart.coordinate({ transform: [{ type: 'transpose' }] })

      chart
        .title('Roadmap')
        .interval()
        .data(data.map(item => ({
          name: item.name,
          start: dayjs(item.start).startOf('M').valueOf(),
          end: dayjs(item.end).endOf('M').valueOf(),
        })))
        .encode('x', 'name')
        .encode('y', ['end', 'start'])
        .encode('size', 40)
        .encode('color', (d: typeof data[number]) => d.name)
        .axis('x', false)
        .axis('y', {
          title: 'Month',
          labelFormatter: (_d: number) => dayjs(_d).format('MMM YYYY'),
        })
        .label({
          formatter: (_: number, raw: typeof data[number]) => raw.name,
          position: 'left',
          fill: '#1b1b1b',
          x: 8,
          backgroundRadius: 20,
        })
        .style('radius', 20)
        .style('height', 26)
        .tooltip({
          items: [{
            field: 'start',
            valueFormatter: (d: number) => dayjs(d).format('MMM YYYY'),
          }, {
            field: 'end',
            valueFormatter: (d: number) => dayjs(d).format('MMM YYYY'),
          }],
        })

      chart.render()
    })
  }, [resolvedTheme])

  return (
    <div ref={chartRef} />
  )
}