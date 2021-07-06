import React from 'react';
import { Chart } from 'react-charts'

function Charts(props) {
    const { serieType } = props
    const data = React.useMemo(
        () => [
          {
            label: 'Series 1',
            data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
          },
          {
            label: 'Series 2',
            data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
          },
          {
            label: 'Series 3',
            data: [[0, 10], [1, 9], [2, 4], [3, 7], [4, 7]]
          }
        ],
        []
      )
     
      const axes = React.useMemo(
        () => [
        { primary: true, type: 'linear', position: 'bottom' },
        { type: 'linear', position: 'left' }
        ],
        []
        
    )
    const series = React.useMemo(
        () => ({
            type: serieType
        }),
        [serieType]
    )
    return (
        <div
            style={{
                width: '100%',
                height: '300px'
            }}
            >
                <Chart data={data} axes={axes} series={series} tooltip />
        </div>
    );
}

export default Charts;