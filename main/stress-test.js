import {render} from 'inferno'

import Button from 'inferno-bootstrap/dist/Button'

import {createStore, combineReducers} from 'redux'
import {Provider, connect} from 'inferno-redux'

import {range} from 'redux-time/node/util.js'
import {animationsReducer, startAnimation} from 'redux-time/node/main.js'
import {Become, Translate, RepeatSequence, Flatten} from 'redux-time/node/animations'



const SOURCE = "https://github.com/Monadical-SAS/redux-time/blob/master/warped-time/examples/stress-test.js"

window.initial_state = {balls: {}}

window.store = createStore(combineReducers({animations: animationsReducer}))
window.time = startAnimation(window.store, window.initial_state)


const StessTesterComponent = ({balls, addBalls, fps, speed, getTime}) => {
    const keys = Object.keys(balls)
    const len = keys.length
    return <div>
        <Button onClick={() => addBalls(getTime())}>Add 100 Balls</Button> &nbsp;
        {len} balls animating @ {fps} FPS  🖥
        <br/><br/>

        <div style={{height: 620, width: '100%', padding: 20, position: 'relative', borderRadius: 10, margin: 'auto', backgroundColor: '#ddd'}}>
            {keys.map(idx =>
                <div style={balls[idx].style}></div>)}
            {!len ? 'Click "Add 100 Balls" to start stress-testing.' : ''}
            {(fps && fps < 23 && speed != 0) ?
                <div style={{position: 'absolute', left: '5%', zIndex: 20, width: '90%', backgroundColor: 'red', padding: 20}}>
                    Further optimization is needed to render more than ~{len} elements.
                </div> : ''}
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
    borderRadius: 10,
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
                        left: Math.random() * width,
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

const StessTester = connect(mapStateToProps, mapDispatchToProps)(StessTesterComponent)

const inferno_mount = document.getElementById('inferno')
inferno_mount.innerHTML = ''
render(
    <Provider store={window.store}>
        <div>
            <StessTester getTime={window.time.getWarpedTime.bind(window.time)}/>
        </div>
    </Provider>,
    inferno_mount,
)

window.onmousemove = (e) => {
    window.mouseY = e.pageY
    window.mouseX = e.pageX
}
