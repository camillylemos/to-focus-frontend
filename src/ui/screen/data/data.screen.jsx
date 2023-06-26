import { useEffect, useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { PageTitle } from '@components'
import {
  addFormatationEnglishToPortuguese,
  addFormatationPortugueseToEnglish,
} from '@formatters'
import { UseData } from '@hooks'
import './data.style.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      onClick: null,
      onHover: null,
      display: false,
    },
  },
  height: 300,
}

const optionsBar = {
  ...options,
  scales: {
    y: {
      grid: {
        color: 'transparent',
      },
      ticks: {
        stepSize: 1,
        precision: 0,
      },
    },
    x: {
      grid: {
        color: 'transparent',
      },
    },
  },
  barPercentage: 1.15,
  categoryPercentage: 0.7,
}

const renderizarRelatorioPomodoro = pomodoro => {
  const data = {
    labels: ['Pomodoros concluídos', 'Pomodoros não concluídos'],
    datasets: [
      {
        data: [pomodoro.finalizados, pomodoro.naoFinalizados],
        backgroundColor: ['#2e7f7b', '#F29166'],
        borderWidth: 0,
      },
    ],
  }

  return <Doughnut data={data} options={options} />
}

const renderizarRelatorioTarefa = tarefa => {
  const labels = Object.keys(tarefa.porData).map(label =>
    addFormatationEnglishToPortuguese(label)
  )

  const datasets = labels.map(label => ({
    label,
    data: tarefa.porData[addFormatationPortugueseToEnglish(label)],
  }))

  const data = {
    labels,
    datasets: [
      {
        label: 'Tarefas realizadas',
        data: datasets.map(({ data }) => data),
        backgroundColor: '#2e7f7b',
        borderRadius: 5,
      },
    ],
  }

  return <Bar options={optionsBar} data={data} />
}

function RelatorioScreen() {
  const [relatorio, setRelatorio] = useState()

  const { getData } = UseData()

  useEffect(() => {
    const getRelatorio = async () => {
      const resultado = await getData()

      if (resultado) {
        setRelatorio(resultado)
      }
    }

    getRelatorio()
  }, [getData])

  return (
    relatorio && (
      <section className="relatorio">
        <PageTitle titulo="Relatório de Produtividade" />

        <div className="relatorio__pomodoro">
          <div className="relatorio__grafico">
            {renderizarRelatorioPomodoro(relatorio.pomodoro)}
          </div>

          <div className="relatorio__legenda">
            <div className="relatorio__grafico__legenda">
              <div className="relatorio__grafico__legenda__cor--verde" />
              <p className="relatorio__grafico__legenda__texto">
                Pomodoros concluídos
              </p>
            </div>

            <div className="relatorio__grafico__legenda">
              <div className="relatorio__grafico__legenda__cor--laranja" />
              <p className="relatorio__grafico__legenda__texto">
                Pomodoros não concluídos
              </p>
            </div>

            <p className="relatorio__texto">{`Tempo total de foco: ${relatorio.pomodoro.tempoTotalFoco} minutos`}</p>
          </div>
        </div>

        <div className="relatorio__tarefa">
          <div className="relatorio__grafico">
            {renderizarRelatorioTarefa(relatorio.tarefa)}
          </div>

          <div className="relatorio__legenda">
            <div className="relatorio__grafico__legenda">
              <div className="relatorio__grafico__legenda__cor--verde" />
              <p className="relatorio__grafico__legenda__texto">
                Tarefas realizadas
              </p>
            </div>

            <p className="relatorio__texto">{`Total de tarefas realizadas: ${relatorio.tarefa.concluidas}`}</p>
          </div>
        </div>
        <p className="relatorio__autenticacao">
          {`Você esteve conosco por ${
            relatorio.autenticacao.diasAutenticados + 1
          } dias`}
        </p>
      </section>
    )
  )
}

export { RelatorioScreen }
