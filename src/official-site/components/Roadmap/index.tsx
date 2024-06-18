import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import React, { useEffect, useRef } from 'react'

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

  const chartRef = useRef(null)

  useEffect(() => {
    import('@antv/g2').then(({ Chart }) => {
      const isDark = document.documentElement.classList.contains('dark')

      const chart = new Chart({
        container: chartRef.current!,
        autoFit: true,
        theme: isDark ? 'dark' : 'light',
        height: data.length * 64 + 128,
      })

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
  }, [])

  return (
    <div ref={chartRef} />
  )
}
