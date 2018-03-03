import { store } from '../store'
import { Main } from './Main.jsx'

const { Provider } = ReactVuex

export class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.name}!</h1>
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    )
  }
}
