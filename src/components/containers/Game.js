import Game from  '../ui/Game'
import { connect } from 'react-redux'
import {handleNotCorrectSource} from '../../actions'

const mapStateToProps = (state, props) =>(
    {
        player :state.player
    }
)
const mapDispatchToProps = dispatch => 
(
    {
        
    }
)
export const Container = connect(mapStateToProps, mapDispatchToProps)(Game)	



