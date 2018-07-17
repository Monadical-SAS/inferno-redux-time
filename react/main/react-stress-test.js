import React from 'react'
import ReactDOM from 'react-dom'
import Button from 'react-bootstrap/lib/Button'

import {createStore, combineReducers} from 'redux'
import {Provider, connect} from 'react-redux'

import {range} from 'redux-time/node/util.js'
import {animationsReducer, startAnimation} from 'redux-time/node/main.js'
import {Become, Translate, RepeatSequence, Flatten} from 'redux-time/node/animations'



const SOURCE = "https://github.com/Monadical-SAS/redux-time/blob/master/warped-time/examples/stress-test.js"

window.initial_state = {balls: {}}

window.store = createStore(combineReducers({animations: animationsReducer}))
window.time = startAnimation(window.store, window.initial_state)

const flat_style = (style) => {
    const style_arr = Object.keys(style).map(key => `${key}: ${style[key]}`)
    return style_arr.join(';')
}

const BallComponent = (props) => <div style={props.style}></div>

const BallsComponent = ({balls}) => {
    const keys = Object.keys(balls)
    const children = keys.map(idx => <BallComponent style={balls[idx].style}/> )
    return <div>{children}</div>
}

const StressTesterComponent = ({balls, addBalls, fps, speed, getTime}) => {
    const keys = Object.keys(balls)
    const len = keys.length
    return <div>
        <Button onClick={() => addBalls(getTime())}>Add 100 Balls</Button> &nbsp;
        {len} balls animating @ {fps} FPS  🖥
        <br/><br/>
        <div style={{height: 620, width: '100%', padding: 20, position: 'relative', borderRadius: 10, margin: 'auto', backgroundColor: '#ddd'}}>
            <BallsComponent balls={balls}/>
        </div>
    </div>
}

const ball_style = {
    position: 'absolute',
    backgroundColor: 'red',
    top: '50%',
    left: '50%',
    width: 20,
    height: 20,
    borderRadius: 10
}

let num_balls = 0

const ADD_BALLS_ANIMATIONS = (start_time, num) => {
    const width = window.innerWidth
    const new_anims = Flatten(
        range(num).map(idx =>
            [
                Become({
                    path: `/balls/${num_balls + idx}/style`,
                    start_time,
                    state: {
                        ...ball_style,
                        top: Math.random() * 600,
                        left: Math.random() * width
                    },
                }),
                Translate({
                    path: `/balls/${num_balls + idx}`,
                    start_time,
                    start_state: {top: 0, left: 0},
                    end_state: {top: 0, left: Math.random() * width - width/2},
                    duration: 10000,
                })
            ]
    ))
    num_balls += num
    return new_anims
}

const FPS = (speed, warped_time, former_time) =>
    Math.round((speed * 1000)/(warped_time - former_time)) || 0


const mapStateToProps = ({animations}) => ({
    balls: animations.state.balls,
    fps: FPS(animations.speed, animations.warped_time, animations.former_time),
    speed: animations.speed,
})
const mapDispatchToProps = (dispatch) => ({
    addBalls: (start_time) => {
        dispatch({type: 'ANIMATE', animations: ADD_BALLS_ANIMATIONS(start_time, 100)})
    },
})

const StressTester = connect(mapStateToProps, mapDispatchToProps)(StressTesterComponent)

const react_mount = document.getElementById('react')
react_mount.innerHTML = ''
ReactDOM.render(
    <Provider store={window.store}>
        <div>
            <StressTester getTime={window.time.getWarpedTime.bind(window.time)}/>
        </div>
    </Provider>,
    react_mount,
)

window.onmousemove = (e) => {
    window.mouseY = e.pageY
    window.mouseX = e.pageX
}
