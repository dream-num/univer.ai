'use client'

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
  const [chartInstance, setChartInstance] = useState<Chart | null>(null)

  useEffect(() => {
    import('@antv/g2').then(({ Chart }) => {
      const chart = new Chart({
        container: chartRef.current!,
        autoFit: true,
        theme: resolvedTheme === 'dark' ? 'dark' : 'light',
        height: data.length * 42 + 128,
      })

      chart.coordinate({ transform: [{ type: 'transpose' }] })

      chart
        .interval()
        .data(data.map(item => ({
          name: item.name,
          start: dayjs(item.start).startOf('M').valueOf(),
          end: dayjs(item.end).endOf('M').valueOf(),
        })))
        .encode('x', 'name')
        .encode('y', ['end', 'start'])
        .encode('size', 32)
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
        .style('height', 18)
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

      setChartInstance(chart)
    })
  }, [])

  useEffect(() => {
    if (chartInstance) {
      chartInstance.theme({ type: resolvedTheme === 'dark' ? 'dark' : 'light' })
      chartInstance.render()
    }
  }, [resolvedTheme])

  return (
    <div className="mt-6" ref={chartRef} />
  )
}
