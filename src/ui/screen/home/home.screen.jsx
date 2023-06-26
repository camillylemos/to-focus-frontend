import { Menu } from '@components'
import { RoutesConfigGlobal } from '@contexts'
import { RelatorioScreen } from '../data/data.screen'
import { EisenhowerMatrixScreen } from '../eisenhower-matrix/eisenhower-matrix.screen'
import { PomodoroScreen } from '../pomodoro/pomodoro.screen'
import { TaskScreen } from '../task/task.screen'
import './home.style.scss'

const ScreenComponents = {
  PomodoroScreen: <PomodoroScreen />,
  TaskScreen: <TaskScreen />,
  EisenhowerMatrixScreen: <EisenhowerMatrixScreen />,
  RelatorioScreen: <RelatorioScreen />,
}

const HomeScreen = () => {
  const [routesConfig] = RoutesConfigGlobal()

  return (
    <section className="home">
      <div className="home__container">
        <main className="home__main">{ScreenComponents[routesConfig]}</main>
        <Menu className="home__menu" />
      </div>
    </section>
  )
}

export { HomeScreen }
