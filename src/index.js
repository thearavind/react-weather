import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import './index.css'
import App from './components/App'
import CustomError from './components/error'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Provider store={store}>
    <Router>
        <div>
            <Route exact path={process.env.PUBLIC_URL + "/"} component={App}/>
            <Route path={process.env.PUBLIC_URL + "/error"} component={CustomError}/>
        </div>
    </Router>
</Provider>, document.getElementById('root'))
registerServiceWorker()
